const express = require('express');

const controller = require('../controller/controller');
const router = express.Router();

//  Home Page
router.route('/').get((req, res) => {
    res.send('hello');
});

// Add New User
router.route('/adduser/users').post((req, res) => {
    controller.adddata(req, res)
});

// Update Data
router.route('/update/users/:userId').put((req, res) => {
    controller.updatedata(req, res)
});

// Delete Data
router.route('/delete/users/:userId').delete((req, res) => {
    controller.deletedata(req, res);
});

// View Perticular user
router.route('/viewuser/users/:userId').get((req, res) => {
    controller.viewuser(req, res);
})
module.exports = router;