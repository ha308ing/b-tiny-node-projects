import { Router } from "express";

export const booksRouter = Router();

booksRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error(`booksRouter get error: ${e.message}`);
    next(e);
  }
});

booksRouter.post("/", async (req, res, next) => {
  const { title, author } = req.body;
  try {
    const book = { title, author };
    res.json(book);
  } catch (e) {
    console.error(`booksRouter post error: ${e.message}`);
    next(e);
  }
});

booksRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error(`booksRouter put error: ${e.message}`);
    next(e);
  }
});

booksRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error(`booksRouter delete error: ${e.message}`);
    next(e);
  }
});
