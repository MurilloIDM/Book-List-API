import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authRouter } from "./Auth.routes";
import { booksRouter } from "./Books.routes";
import { usersRouter } from "./Users.routes";

const router = Router();

router.use("/auth", authRouter);

router.use(ensureAuthenticated);
router.use("/users", usersRouter);
router.use("/books", booksRouter);

export { router };
