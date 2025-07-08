const db = require('../db.config')

const AuthModel = {
    login: async (username) => {
         return await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    },

    register: (username, password, email, name) => {
        return db.execute('INSERT INTO users (username, password, email, name) VALUES (?, ?, ?, ?)', [username, password, email, name]);
    }
}

module.exports = AuthModel;