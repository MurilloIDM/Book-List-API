import { Router } from "express";
import { check } from "express-validator";

import { AuthUserController } from "../modules/users/useCases/authUser/AuthUserController";

const authRouter = Router();

const authUserController = new AuthUserController();

authRouter.post(
  "/login",
  check("email").isEmail().withMessage("Não é um e-mail válido!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Senha deve contém no mínimo 5 caracteres!"),
  authUserController.handle
);

export { authRouter };
