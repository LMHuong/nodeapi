const {signup, signin, signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const express = require('express');
const {userSignupValidator} = require('../validator');

const router = express.Router(); // capital R

router.post('/signup', userSignupValidator, signup);

router.post('/signin', signin);

router.get('/signout', signout);

// any routes containing userid the app will first exec userById()
router.param('userId', userById);

module.exports = router;