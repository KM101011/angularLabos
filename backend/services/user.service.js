const UserModel = require("../models/user.model");

const UserService = {
    getUserById: async (id) => {
        const rows = await UserModel.getUserById(id);
        return rows;
    }
}

module.exports =  UserService;