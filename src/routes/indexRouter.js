const express = require("express");
const route = express.Router();
const userRouter = require("./userRouter");

//  Home Page
route.get("/", (req, res) => {
  res.send("hello");
});

route.use("/users", userRouter);

module.exports = route;
