require("dotenv").config();
const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const authRouter=require('./router/auth.router')
const accountRouter = require("./router/account.router");
const storyRouter = require("./router/story.router");
require('./helpers/connections_redis')
require("./helpers/connections_mongoose")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(body_parser.urlencoded({ extends: true }));
app.use(body_parser.json());

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/account", accountRouter);
app.use("/v1/api/story", storyRouter);

app.listen(PORT, () => {
  console.log(`server stared at port ${PORT}`);
});
