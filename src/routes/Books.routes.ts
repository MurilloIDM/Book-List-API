import { Router } from "express";
import { check } from "express-validator";

import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";

const booksRouter = Router();

const createBookController = new CreateBookController();

booksRouter.post(
  "/",
  check("name").notEmpty().withMessage("Campo [name] é obrigatório!"),
  check("author").notEmpty().withMessage("Campo [author] é obrigatório"),
  check("totalPages")
    .notEmpty()
    .isNumeric()
    .withMessage("Campo [totalPages] é obrigatório e deve ser numerico!"),
  check("publishingCompany")
    .notEmpty()
    .withMessage("Campo [publishingCompany] é obrigatório!"),
  createBookController.handle
);
