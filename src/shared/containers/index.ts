import { UsersRepositories } from "@modules/users/repositories/implementations/UsersRepositories";
import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepositories>(
  "UsersRepositories",
  UsersRepositories
);
