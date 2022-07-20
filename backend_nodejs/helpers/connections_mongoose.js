const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/fullstack_blog_truong")
  .then(() => {
    console.log("database connect success!");
  })
  .catch((error) => handleError(error));
