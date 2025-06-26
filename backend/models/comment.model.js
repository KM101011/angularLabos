const db = require('../server');

const CommentModel = {

    getAll: () => {
        return db.promise().query('SELECT * FROM comments ORDER BY timestamp DESC');
    },

    create: (comment) => {
        const { user_id, username, content } = comment;
        return db.promise().query('INSERT INTO comments (user_id, username, content) VALUES (?, ?, ?)', [user_id, username, content]);
    },

    update: (id, userId, content) => {
        return db.promise().query('UPDATE comments SET content = ? WHERE id = ? AND user_id = ?', [content, id, userId]);
    },

    delete: (id, userId) => {
        return db.promise().query('DELETE FROM comments WHERE id = ? AND user_id = ?', [id, userId]);
    }
}

export default CommentModel;