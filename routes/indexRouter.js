const express = require('express');
const router = express.Router();

//  Home Page
router.route('/').get((req, res) => {
    res.send('hello');
});

router.use('/users', require('./userRouter'));

module.exports = router;