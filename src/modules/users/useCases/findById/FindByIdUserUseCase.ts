import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { Users } from "../../entities/Users";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class FindByIdUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(id: string): Promise<Users> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException("No Content", 204);
    }

    return user;
  }
}

export { FindByIdUserUseCase };
