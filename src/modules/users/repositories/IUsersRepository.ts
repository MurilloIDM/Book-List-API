import { IRequestUsers } from "../dtos/IRequestUsers";
import { Users } from "../entities/Users";

interface IUsersRepository {
  update(data: IRequestUsers, user: Users): Promise<Users>;
  create(data: IRequestUsers): Promise<void>;
  findById(id: string): Promise<Users>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Users[]>;
}

export { IUsersRepository };
