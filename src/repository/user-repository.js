const User = require('../models/user');
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getByEmail(email) {
        return this.model.findOne({ email });
    }
}

module.exports = UserRepository;
