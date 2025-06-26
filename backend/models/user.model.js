const db = require('../server');

const UserModel = {
    getUserById: (id) => {
        return db.promise().query('SELECT id, username, email, name FROM users WHERE id = ?', [id]);
    }
}

export default UserModel;