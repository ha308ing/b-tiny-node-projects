import config from "../db/config.js";

const { Sequelize, db } = config;

export const Book = db.define(
  "Book",
  {
    title: {
      type: Sequelize.STRING,
      unique: true,
    },
    author: {
      type: Sequelize.STRING,
    },
    count: {
      type: Sequelize.INTEGER,
      default: 0,
    },
  },
  {}
);

Book.sync({ force: true });
