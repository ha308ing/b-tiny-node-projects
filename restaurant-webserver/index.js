import express from "express";
import menuItems from "./data/menuItems.js";
import workingHours from "./data/workingHours.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { name: "What's Fare is Fair" });
});

app.get("/menu", (req, res) => {
  res.render("menu", { menuItems });
});

app.get("/hours", (req, res) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  res.render("hours", { workingHours, days });
});

app.listen(port, () => {
  console.log(`web server is listening port ${port}`);
});
