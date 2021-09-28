import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IRequestUsers } from "../../dtos/IRequestUsers";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IRequestUsers, id: string): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(id);

    if (!userAlreadyExists) {
      throw new HttpException("Usuário não encontrado!", 404);
    }

    const { email } = data;
    const userAlreadyExistsWithEmail = await this.usersRepository.findByEmail(
      email
    );

    if (userAlreadyExistsWithEmail && userAlreadyExistsWithEmail.id !== id) {
      throw new HttpException("Já existe usuário cadastrado com esse e-mail!");
    }

    await this.usersRepository.update(data, userAlreadyExists);
  }
}

export { UpdateUserUseCase };
