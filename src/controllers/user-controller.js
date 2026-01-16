const UserService = require('../services/user-service');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
       const response = await userService.createUser(req.body);
       return res.status(200).json({
        data : response,
        message : 'User created successfully',
        success : true,
        err : {}
       });
    } 
    catch (error) {
        return res.status(500).json({
        data : {},
        message : 'Something went wrong',
        success : false,
        err : error
       });
    }
}

module.exports = {
    createUser
}
