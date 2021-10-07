import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { IResponseAddBook } from "../../dtos/IResponseAddBooks";
import { AddReadBooksUseCase } from "./AddReadBooksUseCase";

class AddReadBookController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<IResponseAddBook>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;
    const { idsBooks } = request.body;

    const addReadBookUseCase = container.resolve(AddReadBooksUseCase);

    const result = await addReadBookUseCase.execute(idsBooks, id);

    return response.json(result);
  }
}

export { AddReadBookController };
