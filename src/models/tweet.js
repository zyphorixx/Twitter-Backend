const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
        max : [250, 'Tweet cannot be more than 250 charaters']
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ],
    comments: [                            
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
                default: []                  
            }
    ],
    image: {
        type: String
    }
},{timestamps : true});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
