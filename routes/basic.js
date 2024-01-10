const bodyParser = require('body-parser');
const express = require('express');

const controller = require('../controller/controller');
const app = express();
const router = express.Router();

//  Home Page
router.route('/').get((req, res) => {
    res.send('hello');
});

// Add New User
router.route('/adduser').post((req, res) => {
    controller.adddata(req, res)
});

// Update Data
router.route('/update').put((req, res) => {
    controller.updatedata(req, res)
});

// Delete Data
router.route('/delete/:userId').delete((req, res) => {
    controller.deletedata(req,res);
});

// View Perticular user
router.route('/viewuser/:username').get((req, res) => {
    controller.viewuser(req, res);
})
module.exports = router;