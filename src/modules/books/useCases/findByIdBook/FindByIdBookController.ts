import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { Books } from "../../entities/Books";
import { FindByIdBookUseCase } from "./FindByIdBookUseCase";

class FindByIdBookController {
  async handle(request: Request, response: Response): Promise<Response<Books>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;

    const findByIdBookUseCase = container.resolve(FindByIdBookUseCase);

    const book = findByIdBookUseCase.execute(id);

    return response.json(book);
  }
}

export { FindByIdBookController };
