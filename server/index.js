import express from "express";

const app = express();

const port = process.env.PORT || 7000;

app.post("/register", (req, res, next) => {
  console.log(req.body);
  res.status(200);
  next();
});

app.use("*", (req, res, next) => {
  res.status(200);
  res.send("<h1>hello</h1>");
});

app.listen(port, () => {
  console.log(`app started at ${port} port`);
});
