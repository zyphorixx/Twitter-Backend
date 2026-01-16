const { TweetRepository, LikeRepository } = require('../repository/index');
const Tweet = require('../models/tweet');
const Comment = require('../models/comment');

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    // /api/v1/likes/toggle?id=modelId&type=Tweet
    async toggleLike(modelId, modelType, userId) { 
        let likeable;           

        if (modelType === 'Tweet') {
            likeable = await Tweet.findById(modelId).populate('likes');
        } 
        else if (modelType === 'Comment') {
            likeable = await Comment.findById(modelId).populate('likes');
        } 
        else {
            throw new Error('Unknown model type');
        }

        if (!likeable) {
            throw new Error('Likeable not found');
        }

        const existingLike = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            await likeable.save();
            await existingLike.deleteOne();

            return {
                liked: false,
                message: 'Like removed'
            };
        }

        const newLike = await this.likeRepository.create({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        likeable.likes.push(newLike._id);
        await likeable.save();

        return {
            liked: true,
            message: 'Like added'
        };
    }
}

module.exports = LikeService;
