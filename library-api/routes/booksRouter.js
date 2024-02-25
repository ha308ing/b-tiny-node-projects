import { Router } from "express";
import { Book } from "../models/book.js";

export const booksRouter = Router();

booksRouter.get("/", async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (e) {
    console.error(`booksRouter get error: ${e.message}`);
    next(e);
  }
});

booksRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    res.json(book);
  } catch (e) {
    console.error(`booksRouter get error: ${e.message}`);
    next(e);
  }
});

booksRouter.post("/", async (req, res, next) => {
  const { title, author } = req.body;
  try {
    const savedBook = await Book.findOne({ where: { title, author } });
    if (savedBook) {
      const book = await Book.update(
        { title, author, count: savedBook.count + 1 },
        { where: { id: savedBook.id } }
      );
      res.json(book);
    } else {
      const book = await Book.create({ title, author, count: 1 });
      res.json(book);
    }
  } catch (e) {
    console.error(`booksRouter post error: ${e.message}`);
    next(e);
  }
});

booksRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, author } = req.body;
  console.log({ id, title, author });
  try {
    const book = await Book.update({ title, author }, { where: { id } });
    res.json(book);
  } catch (e) {
    console.error(`booksRouter put error: ${e.message}`);
    next(e);
  }
});

booksRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.destroy({ where: { id } });
    res.json(book);
  } catch (e) {
    console.error(`booksRouter delete error: ${e.message}`);
    next(e);
  }
});
