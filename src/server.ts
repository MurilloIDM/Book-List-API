import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { HttpError } from "./exceptions/HttpError";
import { router } from "./routes";
import "./shared/containers";
import "./database";

const app = express();

app.use(express.json());
app.use(router);

app.use(HttpError);

app.listen(3000, () => console.log("Server is running!"));
