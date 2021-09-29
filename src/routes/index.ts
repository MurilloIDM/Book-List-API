import { Router } from "express";

import { booksRouter } from "./Books.routes";
import { usersRouter } from "./Users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/books", booksRouter);

export { router };
