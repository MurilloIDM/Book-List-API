import { Router } from "express";

import { authRouter } from "./Auth.routes";
import { booksRouter } from "./Books.routes";
import { usersRouter } from "./Users.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/books", booksRouter);

export { router };
