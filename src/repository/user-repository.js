const User = require('../models/user');
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getByEmail(email) {
        return this.model.findOne({ email });
    }

    async findBy(data) {
        try {
            const response = await User.findOne(data);
            return response;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = UserRepository;
