import { forEach, get } from "lodash";
import { getRepository, Repository } from "typeorm";

import { IRequestAddBooks } from "../../dtos/IRequestAddBooks";
import { IRequestRemoveBooks } from "../../dtos/IRequestRemoveBooks";
import { IRequestUsers } from "../../dtos/IRequestUsers";
import { Users } from "../../entities/Users";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = getRepository(Users);
  }

  async create({
    name,
    email,
    password,
    birthDate,
    avatar,
  }: IRequestUsers): Promise<void> {
    const entity = this.repository.create({
      name,
      email,
      password,
      birthDate,
      avatar,
    });
    await this.repository.save(entity);
  }

  async update(data: IRequestUsers, user: Users): Promise<Users> {
    const userUpdated = { ...user, ...data };
    await this.repository.save(userUpdated);

    return userUpdated;
  }

  async findById(id: string): Promise<Users> {
    const entity = await this.repository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.readBooks", "readBooks")
      .leftJoinAndSelect("users.booksInterest", "booksInterest")
      .where("users.id = :id", { id })
      .getOne();

    return entity;
  }

  async findByEmail(email: string): Promise<Users> {
    const entity = await this.repository.findOne({ email });
    return entity;
  }

  async delete(id: string, user: Users): Promise<void> {
    const readBooks = get(user, "readBooks", []);
    const booksInterest = get(user, "booksInterest", []);

    forEach(readBooks, async (book) => {
      await this.repository
        .createQueryBuilder("users")
        .relation("readBooks")
        .of(id)
        .remove(book.id);
    });

    forEach(booksInterest, async (book) => {
      await this.repository
        .createQueryBuilder("users")
        .relation("booksInterest")
        .of(id)
        .remove(book.id);
    });

    await this.repository
      .createQueryBuilder("users")
      .delete()
      .where("id = :id", { id })
      .execute();
  }

  async findAll(): Promise<Users[]> {
    const users = await this.repository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.readBooks", "readBooks")
      .leftJoinAndSelect("users.booksInterest", "booksInterest")
      .getMany();

    return users;
  }

  async addBooks({
    idUser,
    idBook,
    relation,
  }: IRequestAddBooks): Promise<void> {
    await this.repository
      .createQueryBuilder("users")
      .relation(Users, relation)
      .of(idUser)
      .add(idBook);
  }

  async removeBooks({
    idUser,
    idBook,
    relation,
  }: IRequestRemoveBooks): Promise<void> {
    await this.repository
      .createQueryBuilder("users")
      .relation(Users, relation)
      .of(idUser)
      .remove(idBook);
  }
}

export { UsersRepository };
