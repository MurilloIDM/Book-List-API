import { container } from "tsyringe";

import { IBooksRepository } from "../../modules/books/repositories/IBooksRepository";
import { BooksRepository } from "../../modules/books/repositories/implementations/BooksRepository";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IBooksRepository>(
  "BooksRepository",
  BooksRepository
);
