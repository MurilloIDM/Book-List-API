import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { IResponseAddBook } from "../../dtos/IResponseAddBooks";
import { AddBooksInterestUseCase } from "./AddBooksInterestUseCase";

class AddBooksInterestController {
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

    const addBooksInterestUseCase = container.resolve(AddBooksInterestUseCase);

    const result = await addBooksInterestUseCase.execute(idsBooks, id);

    return response.json(result);
  }
}

export { AddBooksInterestController };
