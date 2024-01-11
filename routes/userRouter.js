const express = require('express');

const controller = require('../controller/controller');
const userRouter = express.Router();


// Add New User
userRouter.route('/adduser').post((req, res) => {
    controller.adddata(req, res)
});

// Update Data
userRouter.route('/update/:userId').put((req, res) => {
    controller.updatedata(req, res)
});

// Delete Data
userRouter.route('/delete/:userId').delete((req, res) => {
    controller.deletedata(req, res);
});

// View Perticular user
userRouter.route('/viewuser/:userId').get((req, res) => {
    controller.viewuser(req, res);
})


module.exports = userRouter;