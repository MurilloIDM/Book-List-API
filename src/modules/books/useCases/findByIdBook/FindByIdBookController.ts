import { Request, Response } from "express";
import { container } from "tsyringe";

import { Books } from "../../entities/Books";
import { FindByIdBookUseCase } from "./FindByIdBookUseCase";

class FindByIdBookController {
  async handle(request: Request, response: Response): Promise<Response<Books>> {
    const { id } = request.params;

    const findByIdBookUseCase = container.resolve(FindByIdBookUseCase);

    const book = findByIdBookUseCase.execute(id);

    return response.json(book);
  }
}

export { FindByIdBookController };
