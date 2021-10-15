import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Users } from "../../users/entities/Users";

@Entity("books")
class Books {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  totalPages: number;

  @Column()
  publishingCompany: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  bookCover: string;

  @ManyToMany(() => Users)
  users: Users[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Books };
