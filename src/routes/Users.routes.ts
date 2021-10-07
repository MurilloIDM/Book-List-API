import { Router } from "express";
import { check, param } from "express-validator";

import { AddReadBookController } from "../modules/users/useCases/addReadBooks/AddReadBookController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/DeleteUserController";
import { FindAllUsersController } from "../modules/users/useCases/findAllUsers/FIndAllUsersController";
import { FindByIdUserController } from "../modules/users/useCases/findById/FindByIdUserController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/UpdateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const findByIdUserController = new FindByIdUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const addReadBookController = new AddReadBookController();

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

export { usersRouter };
