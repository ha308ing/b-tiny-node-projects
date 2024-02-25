import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
});

try {
  db.authenticate();
  console.log("connection to the database has been established");
} catch (e) {
  console.error(`Unable to connect to the database. ${e}`);
}

export default {
  Sequelize,
  db,
};
