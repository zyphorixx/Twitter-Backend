const Tweet = require('../models/tweet');

class TweetRepository {
    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async destroy(id){
        try {
            const response = await Tweet.findByIdAndRemove(id);
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async get(id){
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async getWithComments(id){
        try {
            // populate : when we want comment's body and not object id...
            // we use path here, because we have an array of comments
            const tweet = await Tweet.findById(id).populate({path : 'comments'}); 
            return tweet;
        } 
        catch (error) {
            console.log(error);
        }
    }
    async update(id, data){
        try {
            // {new : true} se latest data milta hai console me
            const tweet = await Tweet.findByIdAndUpdate(id, data, {new : true});
            return tweet;
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = TweetRepository;