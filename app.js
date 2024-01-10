const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const router = require('./routes/basic');
const bodyParser = require('body-parser');


// For use the body parser
app.use(express.json(), bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle Routing
app.use(router);

// Database connnetion
const startServer = async () => {
    mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");
}

//  Start server after cheaking connnection
if (startServer()) {
    app.listen(port, () => {
        console.log("server is running on port " + port);
    });
}



