import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IRequestUsers } from "../../dtos/IRequestUsers";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    birthDate,
  }: IRequestUsers): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException(
        "Já existe usuário cadastro com e-mail informado!"
      );
    }

    const encryptedPassword = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      birthDate,
    });
  }
}

export { CreateUserUseCase };
