import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBookCoverUseCase } from "./UpdateBookCoverUseCase";

class UpdateBookCoverController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;
    const bookCoverFile = request.file.filename;

    const updateBookCoverUseCase = container.resolve(UpdateBookCoverUseCase);

    await updateBookCoverUseCase.execute(id, bookCoverFile);

    return response.status(204).send();
  }
}

export { UpdateBookCoverController };
