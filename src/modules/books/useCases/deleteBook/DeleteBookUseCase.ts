import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class DeleteBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(id: string): Promise<void> {
    const findAlreadyExists = await this.booksRepository.findById(id);

    if (!findAlreadyExists) {
      throw new HttpException("Livro não encontrado com [id] informado!", 404);
    }

    await this.booksRepository.delete(findAlreadyExists, id);
  }
}

export { DeleteBookUseCase };
