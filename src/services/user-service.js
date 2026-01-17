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

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email})
            return user;
        } 
        catch(error) {
            throw error;
        }
    }

    async signin(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw {
                    message: 'no user found'
                };
            }
            if(!user.comparePassword(data.password)) {
                throw {
                    message: 'incorrect password',
                };
            }
            const token = user.genJWT();
            return token;
        } 
        catch(error) {
            throw error;
        }
    }
}

module.exports = UserService;
