import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IRequestBooks } from "../../dtos/IRequestBooks";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class UpdateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(data: IRequestBooks, id: string): Promise<void> {
    const bookAlreadyExists = await this.booksRepository.findById(id);

    if (!bookAlreadyExists) {
      throw new HttpException("Livro não encontrado com [id] informado!", 404);
    }

    await this.booksRepository.update(data, bookAlreadyExists);
  }
}

export { UpdateBookUseCase };
