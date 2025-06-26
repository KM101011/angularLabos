const UserModel = require('../models/user.model')

const UserService = {
    getUserById: async (id) => {
        const users = await UserModel.getUserById(id);
    }
}

export default UserService;