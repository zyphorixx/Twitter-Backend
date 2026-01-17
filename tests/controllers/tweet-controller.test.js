const { getTweet } = require('../../src/controllers/tweet-controller');
const TweetService = require('../../src/services/tweet-service');
const { mockRequest, mockResponse } = require('../mocker');

// TweetService ko mock kar rahe hain taaki real service call na ho
jest.mock('../../src/services/tweet-service');

test('should return tweets', async () => {

  // Fake req aur res objects bana rahe hain
  const req = mockRequest();
  const res = mockResponse();

  // Fake service response
  const response = [
    { content: 'Tweet 1' },
    { content: 'Tweet 2' }
  ];

  // TweetService ke get method ko mock kar rahe hain
  // Jab controller call karega, ye data return hoga
  TweetService.prototype.get.mockReturnValue(response);

  // Controller function call kar rahe hain
  await getTweet(req, res);

  // Check: res.json correct payload ke saath call hua ya nahi
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: 'Successfully fetched the tweet',
    data: response,
    err: {}
  });
});


// Har test ke baad mocks clean ho jaayenge
afterEach(() => {
  jest.restoreAllMocks();
});
