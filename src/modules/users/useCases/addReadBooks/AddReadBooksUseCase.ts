import { get, map, size, some } from "lodash";
import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IBooksRepository } from "../../../books/repositories/IBooksRepository";
import {
  IResponseAddBook,
  IStatusObjectAddBook,
} from "../../dtos/IResponseAddBooks";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class AddReadBooksUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(data: string[], idUser: string): Promise<IResponseAddBook> {
    const success: IStatusObjectAddBook[] = [];
    const errors: IStatusObjectAddBook[] = [];

    const userAlreadyExists = await this.usersRepository.findById(idUser);

    if (!userAlreadyExists) {
      throw new HttpException("Usuário não encontrado com [id] informado!");
    }

    const readBooks = get(userAlreadyExists, "readBooks", []);

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

        const bookAlreadyExistsInUser = some(
          readBooks,
          ({ id }) => id === idBook
        );

        if (bookAlreadyExistsInUser) {
          errors.push({
            idBook,
            message: "Livro já havia sido adicionado na lista do usuário!",
          });
          return;
        }

        await this.usersRepository.addBooks({
          idUser,
          idBook,
          relation: "readBooks",
        });

        success.push({ idBook, message: "Livro adicionado com sucesso!" });
      })
    );

    return {
      success,
      errors,
      totalAddBooks: size(data),
    } as IResponseAddBook;
  }
}

export { AddReadBooksUseCase };
