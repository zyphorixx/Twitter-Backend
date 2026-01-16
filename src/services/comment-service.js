const { CommentRepository, TweetRepository } = require('../repository');

class CommentService {
    constructor() {
        this.commentRepo = new CommentRepository(); 
        this.tweetRepo = new TweetRepository();   
    }

    async createComment(modelId, modelType, userId, content) {
        let commentable;

        if (modelType === 'Tweet') {
            commentable = await this.tweetRepo.get(modelId);
        } else if (modelType === 'Comment') {
            commentable = await this.commentRepo.get(modelId);
        } else {
            throw new Error('Unknown model type');
        }

        const comment = await this.commentRepo.create({
            content,
            userId,
            onModel: modelType,
            commentable: modelId
        });

        commentable.comments.push(comment._id); // ✅ push ID
        await commentable.save();

        return comment;
    }
}

module.exports = CommentService;
