const TweetService = require('../services/tweet-service');

const tweetService = new TweetService();

const createTweet = async (req, res) => {
    try {
       const response = await tweetService.create(req.body);
       res.status(201).json({
        success : true,
        message : 'Successfully created the tweet',
        data : response,
        err : {}
       });
    } 
    catch (error) {
        res.status(500).json({
        success : false,
        message : 'Something went wrong',
        data : {},
        err : error
       });
    }
}

const getTweet = async (req, res) => {
    try {
       const response = await tweetService.get(req.params.id); 
       res.status(200).json({
        success : true,
        message : 'Successfully fetched the tweet',
        data : response,
        err : {}
       });
    } 
    catch (error) {
        res.status(500).json({
        success : false,
        message : 'Unable to fetch the tweet',
        data : {},
        err : error
       });
    }
};

module.exports = {
    createTweet,
    getTweet
}
