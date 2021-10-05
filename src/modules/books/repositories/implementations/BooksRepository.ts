import { forEach, get } from "lodash";
import { getRepository, Repository } from "typeorm";

import { IRequestBooks } from "../../dtos/IRequestBooks";
import { Books } from "../../entities/Books";
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

  async findByNameAndCompany(
    name: string,
    author: string,
    company: string
  ): Promise<Books> {
    const book = await this.repository
      .createQueryBuilder("books")
      .where("books.name = :name", { name })
      .andWhere("books.author = :author", { author })
      .andWhere("books.publishingCompany = :company", { company })
      .getOne();

    return book;
  }

  async findById(id: string): Promise<Books> {
    const book = this.repository.findOne(id);
    return book;
  }

  async findAll(): Promise<Books[]> {
    const books = await this.repository.find();
    return books;
  }

  async delete(book: Books, id: string): Promise<void> {
    const users = get(book, "users", []);

    forEach(users, async (user) => {
      await this.repository
        .createQueryBuilder("books")
        .relation("users")
        .of(id)
        .remove(user.id);
    });

    await this.repository
      .createQueryBuilder("books")
      .delete()
      .where("id = :id", { id })
      .execute();
  }
}

export { BooksRepository };
