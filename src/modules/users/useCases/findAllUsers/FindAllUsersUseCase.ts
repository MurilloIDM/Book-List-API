import { inject, injectable } from "tsyringe";

import { Users } from "../../entities/Users";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class FindAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(): Promise<Users[]> {
    const users = await this.usersRepository.findAll();
    return users;
  }
}

export { FindAllUsersUseCase };
