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
    const findAlreadyExists = this.booksRepository.findById(id);

    if (!findAlreadyExists) {
      throw new HttpException(
        "Usuário não encontrado com [id] informado!",
        404
      );
    }

    await this.booksRepository.delete(id);
  }
}

export { DeleteBookUseCase };
