const TweetService = require('../services/tweet-service');

const upload = require('../config/file-upload-s3-config.js');

const singleUploader = upload.single('image');

const tweetService = new TweetService();

const createTweet = async (req, res) => {
    try {      
        singleUploader(req, res, async function (err, data) {
            if(err) {
                return res.status(500).json({error: err});
            }
            console.log('Image url is', req.file);
            const payload = {...req.body};
            payload.image = req.file.location;
            const response = await tweetService.create(payload);
            return res.status(201).json({
                success: true,
                message: 'Successfully created a new tweet',
                data: response,
                err: {}
            });
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
