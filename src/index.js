const express = require('express');
const connect = require('./config/database');

const app = express();
const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');

app.listen(3000, async () => {
    console.log(`Server started`);
    await connect();
    console.log('Mongo db connected');

    const tweetRepo = new TweetRepository();

    const tweet = await tweetRepo.create({content : 'Tweet with comment schema'});

    const comment = await Comment.create({content : 'new comment'});
    tweet.comments.push(comment);
    await tweet.save();

    const getTweet = await tweetRepo.getAll(0, 4);
    console.log(getTweet);
});

// Concept of virtuals : set() & get()
// Concept of hooks : async & sync
// Concept of Indexing in DBMS
