import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { Books } from "../../entities/Books";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class FindByIdBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(id: string): Promise<Books> {
    const bookAlreadyExists = await this.booksRepository.findById(id);

    if (!bookAlreadyExists) {
      throw new HttpException("Livro não encontrado com ID informado!", 404);
    }

    return bookAlreadyExists;
  }
}

export { FindByIdBookUseCase };
