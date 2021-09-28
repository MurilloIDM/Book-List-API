import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;
    const { name, email, password, birthDate } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({ name, email, password, birthDate }, id);

    return response.send();
  }
}

export { UpdateUserController };
