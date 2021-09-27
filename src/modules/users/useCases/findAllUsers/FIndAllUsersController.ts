import { Request, Response } from "express";
import { container } from "tsyringe";

import { Users } from "../../entities/Users";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

class FindAllUsersController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Users[]>> {
    const findAllUsersUseCase = container.resolve(FindAllUsersUseCase);

    const users = await findAllUsersUseCase.execute();
    return response.json(users);
  }
}

export { FindAllUsersController };
