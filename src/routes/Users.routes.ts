import { Router } from "express";
import { check } from "express-validator";

import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { FindAllUsersController } from "../modules/users/useCases/findAllUsers/FIndAllUsersController";
import { FindByIdUserController } from "../modules/users/useCases/findById/FindByIdUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const findByIdUserController = new FindByIdUserController();

usersRouter.post(
  "/",
  check("email").isEmail().withMessage("Não é um e-mail válido!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Senha deve contém no mínimo 5 caracteres!"),
  createUserController.handle
);

usersRouter.get("/", findAllUsersController.handle);

usersRouter.get("/:id", findByIdUserController.handle);

export { usersRouter };
