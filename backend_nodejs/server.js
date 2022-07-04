require("dotenv").config();
const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const accountRouter = require("./router/account.router");
const storyRouter = require("./router/story.router");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/fullstack_blog_truong")
  .then(() => {
    console.log("database connect success!");
  })
  .catch((error) => handleError(error));

app.use(cors());
app.use(body_parser.urlencoded({ extends: true }));
app.use(body_parser.json());

app.use("/v1/api/account", accountRouter);
app.use("/v1/api/story", storyRouter);

app.listen(PORT, () => {
  console.log(`server stared at port ${PORT}`);
});
