const express = require('express');
const connect = require('./config/database');
const Tweet = require('./models/tweet');

const app = express();

app.listen(3000, async () => {
    console.log(`Server started`);
    await connect();
    console.log('Mongo db connected');
    const tweets = await Tweet.find({
        content : ["First Tweet", "Tweet with comment schema"]
    });
    console.log(tweets);
});

// Concept of virtuals : set() & get()
// Concept of hooks : async & sync
// Concept of Indexing in DBMS


/*
Todo : 
1. Bulk create hashtags which are not present in the database 
2. Filter title of hashtags among multiple tags
3. How to add tweet id inside all the hashtags
*/
