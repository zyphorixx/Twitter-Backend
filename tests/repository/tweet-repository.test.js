const TweetRepository = require('../../src/repository/tweet-repository');
const Tweet = require('../../src/models/tweet');

// Tweet model ko mock kar rahe hain taaki real DB hit na ho
jest.mock('../../src/models/tweet');

describe('Create tweet tests', () => {

  test('should create a new tweet and return it', async () => {
    // Fake input data
    const data = {
      content: 'Testing tweet'
    };

    // Tweet.create method ko spy + mock kar rahe hain
    // taaki real DB call na ho
    const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
      return {
        ...data,
        createdAt: '2022-02-12',
        updatedAt: '2022-02-12'
      };
    });

    // Repository ka object bana rahe hain
    const tweetRepository = new TweetRepository();

    // create method call kar rahe hain
    const tweet = await tweetRepository.create(data);

    // Check: Tweet.create call hua ya nahi
    expect(spy).toHaveBeenCalled();

    // Check: content same hona chahiye
    expect(tweet.content).toBe(data.content);

    // Check: createdAt field exist karti hai
    expect(tweet.createdAt).toBeDefined();
  });


  test('should not create a tweet and throw exception', async () => {
    const data = {
      content: 'Testing tweet'
    };

    // Tweet.create ko error throw karne ke liye mock kar rahe hain
    jest.spyOn(Tweet, 'create').mockImplementation(() => {
      throw new Error('something went wrong');
    });

    const tweetRepository = new TweetRepository();

    // Expect kar rahe hain ki error throw ho
    await expect(tweetRepository.create(data)).rejects.toThrow('something went wrong');
  });

});

describe('Get all tweet tests', () => {

  test('testing limit for get all', async () => {
    const data = {
      content: 'Testing tweet'
    };

    // Fake tweets array bana rahe hain
    const tweetsArray = [
      { ...data, createdAt: '2022-02-12', updatedAt: '2022-02-12' },
      { ...data, createdAt: '2022-02-12', updatedAt: '2022-02-12' },
      { ...data, createdAt: '2022-02-12', updatedAt: '2022-02-12' }
    ];

    // find() ka fake response object
    const findResponse = { tweetsArray };

    // skip method ko mock kar rahe hain
    findResponse.skip = jest.fn(() => findResponse);

    // limit method ko mock kar rahe hain
    // sirf required number ke tweets return karega
    findResponse.limit = jest.fn((limit) =>
      findResponse.tweetsArray.slice(0, limit)
    );

    // Tweet.find ko mock kar rahe hain
    const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => {
      return findResponse;
    });

    const tweetRepository = new TweetRepository();

    // getAll method call kar rahe hain
    const tweets = await tweetRepository.getAll(0, 2);

    // Check: find call hua ya nahi
    expect(spy).toHaveBeenCalled();

    // Check: sirf 2 tweets hi aaye
    expect(tweets).toHaveLength(2);
  });

});


// Har test ke baad saare mocks clean ho jaayenge
afterEach(() => {
  jest.restoreAllMocks();
});
