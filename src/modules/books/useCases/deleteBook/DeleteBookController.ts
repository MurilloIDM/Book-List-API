import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;

    const deleteBookUseCase = container.resolve(DeleteBookUseCase);

    await deleteBookUseCase.execute(id);

    return response.send();
  }
}

export { DeleteBookController };
