import { Request, Response } from "express";
import { container } from "tsyringe";

import { Users } from "../../entities/Users";
import { FindByIdUserUseCase } from "./FindByIdUserUseCase";

class FindByIdUserController {
  async handle(request: Request, response: Response): Promise<Response<Users>> {
    const { id } = request.params;

    const findByIdUserUseCase = container.resolve(FindByIdUserUseCase);

    const user = await findByIdUserUseCase.execute(id);
    return response.json(user);
  }
}

export { FindByIdUserController };
