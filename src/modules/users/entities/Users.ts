import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Books } from "../../books/entities/Books";

@Entity("users")
class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @Column({ type: "date" })
  birthDate: string;

  @Column()
  avatar: string;

  @ManyToMany(() => Books)
  @JoinTable()
  readBooks: Books[];

  @ManyToMany(() => Books)
  @JoinTable()
  booksInterest: Books[];

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Users };
