import { Router } from "express";
import { check, param } from "express-validator";
import multer from "multer";

import uploadConfig from "../config/upload";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { DeleteBookController } from "../modules/books/useCases/deleteBook/DeleteBookController";
import { FindAllBooksController } from "../modules/books/useCases/findAllBooks/FindAllBooksController";
import { FindByIdBookController } from "../modules/books/useCases/findByIdBook/FindByIdBookController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";
import { UpdateBookCoverController } from "../modules/books/useCases/updateBookCover/UpdateBookCoverController";

const booksRouter = Router();

const uploadBookCover = multer(uploadConfig.upload("./tmp/bookCover"));

const createBookController = new CreateBookController();
const findByIdBookController = new FindByIdBookController();
const findAllBooksController = new FindAllBooksController();
const deleteBookController = new DeleteBookController();
const updateBookController = new UpdateBookController();
const updateBookCoverController = new UpdateBookCoverController();

booksRouter.post(
  "/",
  check("name").notEmpty().withMessage("Campo [name] é obrigatório!"),
  check("author").notEmpty().withMessage("Campo [author] é obrigatório!"),
  check("totalPages")
    .notEmpty()
    .isNumeric()
    .withMessage("Campo [totalPages] é obrigatório e deve ser numerico!"),
  check("publishingCompany")
    .notEmpty()
    .withMessage("Campo [publishingCompany] é obrigatório!"),
  createBookController.handle
);

booksRouter.put(
  "/:id",
  check("name").notEmpty().withMessage("Campo [name] é obrigatório!"),
  check("author").notEmpty().withMessage("Campo [author] é obrigatório!"),
  check("totalPages")
    .notEmpty()
    .isNumeric()
    .withMessage("Campo [totalPages] é obrigatório e dever numerico!"),
  check("publishingCompany")
    .notEmpty()
    .withMessage("Campo [publishingCompany] é obrigatório!"),
  updateBookController.handle
);

booksRouter.get("/", findAllBooksController.handle);

booksRouter.get(
  "/:id",
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  findByIdBookController.handle
);

booksRouter.delete(
  "/:id",
  param("id").isUUID().withMessage("ID informado possui formato inválido!"),
  deleteBookController.handle
);

booksRouter.patch(
  "/bookCover/:id",
  param("id").isUUID().withMessage("ID informado possui formato inválido!"),
  uploadBookCover.single("bookCover"),
  updateBookCoverController.handle
);

export { booksRouter };
