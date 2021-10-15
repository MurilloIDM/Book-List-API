import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class UpdateBookCoverUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(id: string, bookCoverFile: string): Promise<void> {
    const book = await this.booksRepository.findById(id);

    if (book.bookCover) {
      await deleteFile(`./tmp/bookCover/${book.bookCover}`);
    }

    const updatedBook = { ...book };
    updatedBook.bookCover = bookCoverFile;

    await this.booksRepository.update(updatedBook, book);
  }
}

export { UpdateBookCoverUseCase };
