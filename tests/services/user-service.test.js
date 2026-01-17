const UserService = require('../../src/services/user-service');
const UserRepository = require('../../src/repository/user-repository');

// UserRepository ko mock kar rahe hain taaki real DB call na ho
jest.mock('../../src/repository/user-repository');

describe('user service signup test', () => {

  test('should successfully create a user', async () => {

    // Fake user data
    const data = {
      email: 'a@b.com',
      password: '123456'
    };

    // UserRepository ke create method ko mock kar rahe hain
    // Jab bhi create call ho, ye fake data return kare
    UserRepository.prototype.create.mockReturnValue({
      ...data,
      createdAt: '2022-12-12',
      updatedAt: '2022-12-12'
    });

    // UserService ka object bana rahe hain
    const service = new UserService();

    // signup method call kar rahe hain (data pass karna zaroori hai)
    const response = await service.signup(data);

    // Check: email same hona chahiye
    expect(response.email).toBe(data.email);
  });

});

// Har test ke baad mocks reset ho jaayenge
afterEach(() => {
  jest.restoreAllMocks();
});
