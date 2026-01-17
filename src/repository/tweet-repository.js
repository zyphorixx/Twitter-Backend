const Tweet = require('../models/tweet');
const CrudRepository = require('./crud-repository');

class TweetRepository extends CrudRepository {

    constructor(){
        super(Tweet);
    }

    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } 
        catch (error) {
            throw error;
        }
    }

    async get(id){
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } 
        catch (error) {
            throw error;
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
            throw error;
        }
    }

    async getAll(offset, limit){
        try {
            const tweet = await Tweet.find().skip(offset).limit(limit); // to apply pagenation and offset
            return tweet;
        } 
        catch (error) {
            throw error;
        }
    }

    async update(id, data) {
       return Tweet.findByIdAndUpdate(id, data, { new: true });
    }
}

module.exports = TweetRepository;
