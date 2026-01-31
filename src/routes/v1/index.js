const express = require('express');

const { createTweet, getTweet } = require('../../controllers/tweet-controller');
const { createUser } = require('../../controllers/user-controller');
const { toggleLike } = require('../../controllers/like-controller');
const { createComment } = require('../../controllers/comment-controller');
const { signup,login } = require('../../controllers/auth-controller');
const { authenticate } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/tweets', createTweet);
router.get('/tweets/:id', getTweet);
router.post('/users', createUser);
router.post('/likes/toggle', toggleLike);
router.post('/comments', createComment);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
