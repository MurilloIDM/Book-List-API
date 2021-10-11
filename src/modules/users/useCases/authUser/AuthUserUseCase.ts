import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../errors/HttpException";
import { IAuthUser } from "../../dtos/IAuthUser";
import { IResponseToken } from "../../dtos/IResponseToken";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: IAuthUser): Promise<IResponseToken> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new HttpException("Usuário não encontrado!", 404);
    }

    const validatePassword = await compare(
      password,
      userAlreadyExists.password
    );

    if (!validatePassword) {
      throw new HttpException("Email ou senha inválidos!");
    }

    const token = sign({}, "a286f20fded6bd61ee197c23d6cccdec", {
      subject: userAlreadyExists.id,
      expiresIn: "90min",
    });

    return {
      access_token: token,
    } as IResponseToken;
  }
}

export { AuthUserUseCase };
