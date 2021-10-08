import { IRequestAddBooks } from "../dtos/IRequestAddBooks";
import { IRequestRemoveBooks } from "../dtos/IRequestRemoveBooks";
import { IRequestUsers } from "../dtos/IRequestUsers";
import { Users } from "../entities/Users";

interface IUsersRepository {
  update(data: IRequestUsers, user: Users): Promise<Users>;
  create(data: IRequestUsers): Promise<void>;
  findById(id: string): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
  delete(id: string, user: Users): Promise<void>;
  findAll(): Promise<Users[]>;
  addBooks(data: IRequestAddBooks): Promise<void>;
  removeBooks(data: IRequestRemoveBooks): Promise<void>;
}

export { IUsersRepository };
