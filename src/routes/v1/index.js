const express = require('express');

const { createTweet } = require('../../controllers/tweet-controller');
const { createUser } = require('../../controllers/user-controller');
const { toggleLike } = require('../../controllers/like-controller');

const router = express.Router();

router.post('/tweets', createTweet);
router.post('/users', createUser);
router.post('/likes/toggle', toggleLike);

module.exports = router;
