import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;
    const { name, author, totalPages, publishingCompany } = request.body;

    const updateBookUseCase = container.resolve(UpdateBookUseCase);

    await updateBookUseCase.execute(
      { name, author, totalPages, publishingCompany },
      id
    );

    return response.send();
  }
}

export { UpdateBookController };
