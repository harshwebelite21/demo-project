const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./routes/basic');
const { startServer } = require('./loadDb');

const app = express();

// For use the body parser
app.use(express.json(), bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle Routing
app.use(router);
// Database connnetion


startServer()

//  Start server after cheaking connnection
app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("server is running on port " + process.env.PORT);
});





