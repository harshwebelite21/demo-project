const controller = require('../controller/controller');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

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
router.route('/delete').delete((req, res) => {
    controller.deletedata(res);
});

// View Perticular user
router.route('/viewuser').get((req, res) => {
    controller.viewuser(req, res);
})
module.exports = router;