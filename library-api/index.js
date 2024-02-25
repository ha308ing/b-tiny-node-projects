import express from "express";
import { mainRouter } from "./routes/index.js";

const port = 3000;
const app = express();

// parse incoming requests with JSON data
app.use(express.json());

// parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", mainRouter);

app.use((e, _req, res, _next) => {
  const { message, stack, statusCode } = e;
  console.error(message, stack);
  res.status(statusCode || 500).json({ message });
});

app.listen(port, () => {
  console.log(`library api's started at ${port} port`);
});
