import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IRequestBooks } from "../../dtos/IRequestBooks";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class CreateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({
    name,
    author,
    totalPages,
    publishingCompany,
  }: IRequestBooks): Promise<void> {
    const bookAlreadyExists = await this.booksRepository.findByNameAndCompany(
      name,
      author,
      publishingCompany
    );

    if (bookAlreadyExists) {
      throw new HttpException(
        "Já existe um livro cadastrado com essas informações"
      );
    }

    await this.booksRepository.create({
      name,
      author,
      totalPages,
      publishingCompany,
    });
  }
}

export { CreateBookUseCase };
