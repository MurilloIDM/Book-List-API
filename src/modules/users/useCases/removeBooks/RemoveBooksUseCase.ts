import { get, map, size, some } from "lodash";
import { inject } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IBooksRepository } from "../../../books/repositories/IBooksRepository";
import {
  IResponseRemoveBook,
  IStatusObjectRemoveBook,
} from "../../dtos/IResponseRemoveBooks";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class RemoveBooksUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(
    data: string[],
    idUser: string,
    relation: string
  ): Promise<IResponseRemoveBook> {
    const success: IStatusObjectRemoveBook[] = [];
    const errors: IStatusObjectRemoveBook[] = [];

    const userAlreadyExists = await this.usersRepository.findById(idUser);

    if (!userAlreadyExists) {
      throw new HttpException("Usuário não encontrado com [id] informado!");
    }

    const books = get(userAlreadyExists, relation, []);

    await Promise.all(
      map(data, async (idBook) => {
        const bookAlreadyExists = await this.booksRepository.findById(idBook);

        if (!bookAlreadyExists) {
          errors.push({
            idBook,
            message: "Livro não encontrado com [id] informado!",
          });
          return;
        }

        const bookAlreadyExistsInUser = some(books, ({ id }) => id === idBook);

        if (!bookAlreadyExistsInUser) {
          errors.push({
            idBook,
            message: "Livro não encontrado na lista!",
          });
          return;
        }

        await this.usersRepository.removeBooks({
          idUser,
          idBook,
          relation,
        });

        success.push({ idBook, message: "Livro removido com sucesso!" });
      })
    );

    return {
      success,
      errors,
      totalAddBooks: size(data),
    } as IResponseRemoveBook;
  }
}

export { RemoveBooksUseCase };
