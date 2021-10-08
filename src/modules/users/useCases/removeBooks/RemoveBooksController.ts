import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { IResponseRemoveBook } from "../../dtos/IResponseRemoveBooks";
import { RemoveBooksUseCase } from "./RemoveBooksUseCase";

class RemoveBooksController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<IResponseRemoveBook>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id, relation } = request.params;
    const { idsBooks } = request.body;

    const removeBooksUseCase = container.resolve(RemoveBooksUseCase);

    const result = await removeBooksUseCase.execute(idsBooks, id, relation);

    return response.json(result);
  }
}

export { RemoveBooksController };
