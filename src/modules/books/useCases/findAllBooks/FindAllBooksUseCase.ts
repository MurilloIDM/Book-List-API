import { isEmpty } from "lodash";
import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { Books } from "../../entities/Books";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class FindAllBooksUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(): Promise<Books[]> {
    const books = await this.booksRepository.findAll();

    if (isEmpty(books)) {
      throw new HttpException("No Content", 204);
    }

    return books;
  }
}

export { FindAllBooksUseCase };
