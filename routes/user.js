const {userById, 
	allUsers, 
	getUser, 
	updateUser, 
	deleteUser, 
	userPhoto, 
	addFollowing, 
	addFollower, 
	removeFollowing, 
	removeFollower
} = require('../controllers/user');
const express = require('express');
const {requireSignin} = require('../controllers/auth');

const router = express.Router(); // capital R

router.put('/user/follow', requireSignin, addFollowing, addFollower );
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower );

router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);

router.get("/user/photo/:userId", userPhoto);

// any routes containing userid the app will first exec userById()
router.param('userId', userById);

module.exports = router;