import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { name, totalPages, author, publishingCompany } = request.body;

    const createBookUseCase = container.resolve(CreateBookUseCase);

    await createBookUseCase.execute({
      name,
      totalPages,
      author,
      publishingCompany,
    });

    return response.status(201).send();
  }
}

export { CreateBookController };
