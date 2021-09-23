import { getRepository, Repository } from "typeorm";

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
  }: IRequestUsers): Promise<void> {
    const entity = this.repository.create({ name, email, password, birthDate });
    await this.repository.save(entity);
  }

  async update(data: IRequestUsers, user: Users): Promise<Users> {
    const userUpdated = { ...user, ...data };
    await this.repository.save(userUpdated);

    return userUpdated;
  }

  async findById(id: string): Promise<Users> {
    const entity = await this.repository.findOne(id);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAll(): Promise<Users[]> {
    const users = await this.repository.find();
    return users;
  }
}

export { UsersRepository };
