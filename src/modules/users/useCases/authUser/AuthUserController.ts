import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { IResponseToken } from "../../dtos/IResponseToken";
import { AuthUserUseCase } from "./AuthUserUseCase";

class AuthUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<IResponseToken>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    const authUserUseCase = container.resolve(AuthUserUseCase);

    const result = await authUserUseCase.execute({ email, password });

    return response.json(result);
  }
}

export { AuthUserController };
