const db = require('../db.config');

const UserModel = {
    getUserById: async (id) => {
        return await db.execute("SELECT id, username, email, name FROM users WHERE id = ?", [id]);
    }
}

module.exports =  UserModel;