const AuthModel = require("../models/auth.model");

const AuthService = {

    register: async (username, password, email, name) => {
        const rows = await AuthModel.register(username, password, email, name);
        return rows;
    },

    login: async (username) => {
        const rows = await AuthModel.login(username);
        return rows;
    }
}

module.exports =  AuthService;