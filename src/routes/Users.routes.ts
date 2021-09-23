import { Router } from "express";
import { check } from "express-validator";

import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post(
  "/",
  check("email").isEmail().withMessage("Não é um e-mail válido!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Senha deve contém no mínimo 5 caracteres!"),
  createUserController.handle
);

export { usersRouter };
