const express = require('express');
const router = express.Router();
const Thread = require('../controllers/thread');
const User = require('../controllers/user');
const Answer = require('../controllers/answer');
const passport = require('../helpers/passport');

// User routes
router.post('/signup', User.register);
router.post('/signin', passport.authenticate('local-signin', {session: false}), User.signIn);
router.get('/users', User.showAll);
router.get('/user/:id', User.showById);
router.put('/user/:id', User.update);
router.delete('/user/:id', User.delete);

// Thread routes
router.get('/threads', Thread.showAll);
router.post('/threads', Thread.create);
router.get('/thread/:threadId', Thread.showById);
router.put('/thread/:threadId', Thread.update);
router.delete('/thread/:threadId', Thread.delete);

// Answer routes
router.get('/answers', Answer.showAll);
router.post('/answers', Answer.create);
router.get('/answer/:answerId', Answer.showById);
router.put('/answer/:answerId', Answer.update);
router.delete('/answer/:answerId', Answer.delete);

module.exports = router;
