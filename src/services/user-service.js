const { UserRepository } = require('../repository/index');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(data){
    
        const existingUser = await this.userRepository.getByEmail(data.email);

        if(existingUser){
            throw new Error({
                statusCode : 409,
                message : 'User already exists'
            });
        }
        return this.userRepository.create(data);
    }

    async signup(data) {
        const existingUser = await this.userRepository.getByEmail(data.email);

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        return this.userRepository.create(data);
    }
}

module.exports = UserService;
