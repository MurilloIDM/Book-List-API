import { IRequestBooks } from "@modules/books/dtos/IRequestBooks";
import { Books } from "@modules/books/entities/Books";
import { getRepository, Repository } from "typeorm";

import { IBooksRepository } from "../IBooksRepository";

class BooksRepository implements IBooksRepository {
  private repository: Repository<Books>;

  constructor() {
    this.repository = getRepository(Books);
  }

  async create({
    name,
    author,
    totalPages,
    publishingCompany,
  }: IRequestBooks): Promise<void> {
    const book = this.repository.create({
      name,
      author,
      totalPages,
      publishingCompany,
    });
    await this.repository.save(book);
  }

  async update(data: IRequestBooks, book: Books): Promise<Books> {
    const bookUpdated = { ...book, ...data };
    await this.repository.save(bookUpdated);

    return bookUpdated;
  }

  async findByName(name: string): Promise<Books> {
    const book = this.repository.findOne({ name });
    return book;
  }

  async findById(id: string): Promise<Books> {
    const book = this.repository.findOne(id);
    return book;
  }

  async findAll(): Promise<Books[]> {
    const books = this.repository.find();
    return books;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { BooksRepository };
