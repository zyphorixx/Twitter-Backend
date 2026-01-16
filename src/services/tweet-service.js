const { TweetRepository, HashtagRepository } = require('../repository/index');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;

        // 1. Extract hashtag names
        let tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags ? tags.map(tag => tag.substring(1)).map(tag => tag.toLowerCase()) : [];

        // 2. Create Tweet WITHOUT hashtags
        const tweet = await this.tweetRepository.create(data);

        // 3. Find already existing hashtags
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        const titleOfPresentTags = alreadyPresentTags.map(tag => tag.title);

        // 4. Find new hashtags
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));

        // 5. Create new hashtags linked with tweet
        newTags = newTags.map(tag => {
            return { title: tag, tweets: [tweet._id] };
        });

        const createdTags = await this.hashtagRepository.bulkCreate(newTags);

        // 6. Add tweet id to existing hashtags
        for (const tag of alreadyPresentTags) {
            await this.hashtagRepository.addTweetToHashtag(tag._id, tweet._id);
        }

        // 7. Collect ALL hashtag ids (new + old)
        const hashtagIds = [
            ...alreadyPresentTags.map(tag => tag._id),
            ...createdTags.map(tag => tag._id)
        ];

        // 8. Update tweet with hashtag ObjectIds
        await this.tweetRepository.update(tweet._id, {
            hashtags: hashtagIds
        });

        return tweet;
    }

    async get(tweetId){
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

module.exports = TweetService;
