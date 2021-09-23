import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/repositories/implementations/BooksRepository";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IBooksRepository>(
  "BookRepository",
  BooksRepository
);
