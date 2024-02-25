import { Router } from "express";
import { booksRouter } from "./booksRouter.js";

export const mainRouter = Router();

mainRouter.use("/books", booksRouter);
