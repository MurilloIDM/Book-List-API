import { IRequestBooks } from "../dtos/IRequestBooks";
import { Books } from "../entities/Books";

interface IBooksRepository {
  create(data: IRequestBooks): Promise<void>;
  update(data: IRequestBooks, book: Books): Promise<Books>;
  findByName(name: string): Promise<Books>;
  findById(id: string): Promise<Books>;
  findAll(): Promise<Books[]>;
  delete(id: string): Promise<void>;
}

export { IBooksRepository };
