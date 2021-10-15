import { Router } from "express";
import { check, param } from "express-validator";
import multer from "multer";

import uploadConfig from "../config/upload";
import { AddBooksInterestController } from "../modules/users/useCases/addBooksInterest/AddBooksInterestController";
import { AddReadBookController } from "../modules/users/useCases/addReadBooks/AddReadBookController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/DeleteUserController";
import { FindAllUsersController } from "../modules/users/useCases/findAllUsers/FIndAllUsersController";
import { FindByIdUserController } from "../modules/users/useCases/findById/FindByIdUserController";
import { RemoveBooksController } from "../modules/users/useCases/removeBooks/RemoveBooksController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/UpdateUserController";
import { UpdateUserAvatarController } from "../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const findByIdUserController = new FindByIdUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const addReadBookController = new AddReadBookController();
const addBooksInterestController = new AddBooksInterestController();
const removeBooksController = new RemoveBooksController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post(
  "/",
  check("email").isEmail().withMessage("Não é um e-mail válido!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Senha deve contém no mínimo 5 caracteres!"),
  createUserController.handle
);

usersRouter.get("/", findAllUsersController.handle);

usersRouter.get(
  "/:id",
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  findByIdUserController.handle
);

usersRouter.delete(
  "/:id",
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  deleteUserController.handle
);

usersRouter.put(
  "/:id",
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  updateUserController.handle
);

usersRouter.post(
  "/readBooks/:id",
  check("idsBooks")
    .isArray({ min: 1 })
    .withMessage("A lista de livros não pode estar vazia!"),
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  addReadBookController.handle
);

usersRouter.post(
  "/booksInterest/:id",
  check("idsBooks")
    .isArray({ min: 1 })
    .withMessage("A lista de livros não pode estar vazia!"),
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  addBooksInterestController.handle
);

usersRouter.delete(
  "/:relation/:id",
  check("idsBooks")
    .isArray({ min: 1 })
    .withMessage("A lista de livros não pode estar vazia!"),
  param("relation")
    .isString()
    .notEmpty()
    .withMessage("Deve ser especificado uma lista de livros!"),
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  removeBooksController.handle
);

usersRouter.patch(
  "/avatar/:id",
  param("id").isUUID("4").withMessage("ID informado possui formato inválido!"),
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouter };
