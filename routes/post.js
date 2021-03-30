const {getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const express = require('express');
const {userById} = require('../controllers/user');
const {createPostValidator} = require('../validator');

const router = express.Router(); // capital R

router.get('/posts', getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);

// any routes containing userid the app will first exec userById()
router.param('userId', userById);

// any routes containing postid the app will first exec userById()
router.param('postId', postById);

module.exports = router;