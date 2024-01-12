const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const router = require("./routes/indexRouter");
const { startServer } = require("../config/loadDb");

// For use the body parser
app.use(express.json(), bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Handle Routing
app.use(router);
// Database connnetion

startServer();

//  Start server after cheaking connnection
app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
