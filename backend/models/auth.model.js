const db = require('../server')

const AuthModel = {
    checkLogin: (username) => {
         return db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    }

    //nedovr
}

export default AuthModel;