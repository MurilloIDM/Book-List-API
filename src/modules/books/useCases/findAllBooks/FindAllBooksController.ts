import { Request, Response } from "express";
import { container } from "tsyringe";

import { Books } from "../../entities/Books";
import { FindAllBooksUseCase } from "./FindAllBooksUseCase";

class FindAllBooksController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Books[]>> {
    const findAllBooksUseCase = container.resolve(FindAllBooksUseCase);

    return response.json(findAllBooksUseCase);
  }
}

export { FindAllBooksController };
