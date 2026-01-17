const mockResponse = () => {
  const res = {};

  // res.json() ko mock kar rahe hain
  res.json = jest.fn().mockReturnValue(res);

  // res.status() ko mock kar rahe hain
  // chaining ke liye res return karte hain
  res.status = jest.fn().mockReturnValue(res);

  // res.send() ko mock kar rahe hain
  res.send = jest.fn().mockReturnValue(res);

  return res;
};

const mockRequest = () => {
  const req = {};

  // req.body ko object hona chahiye, function nahi
  req.body = {};

  // req.params ko object bana rahe hain
  req.params = {};

  // req.query ko object bana rahe hain
  req.query = {};

  return req;
};

module.exports = {
  mockRequest,
  mockResponse
};


