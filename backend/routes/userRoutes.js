const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');

const router = express.Router();

// route is api endpoint
// registering data of user - post request
router.route('/').post(registerUser);

router.route('/login').post(authUser);

module.exports = router;