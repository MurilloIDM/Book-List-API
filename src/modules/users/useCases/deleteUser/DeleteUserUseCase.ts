import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(id);

    if (!userAlreadyExists) {
      throw new HttpException("Usuário não encontrado!", 404);
    }

    await this.usersRepository.delete(id, userAlreadyExists);
  }
}

export { DeleteUserUseCase };
