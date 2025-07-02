const db = require('../db.config');

const CommentModel = {

    getAll: async () => {
        return await db.execute('SELECT * FROM comments ORDER BY timestamp DESC');
    },

    create: async (comment) => {
        const { user_id, username, content } = comment;
        return await db.execute('INSERT INTO comments (user_id, username, content) VALUES (?, ?, ?)', [user_id, username, content]);
    },

    update: async (id, userId, content) => {
       return await db.execute('UPDATE comments SET content = ? WHERE id = ? AND user_id = ?', [content, id, userId]);
    },

    delete: async (id, userId) => {
        return await db.execute('DELETE FROM comments WHERE id = ? AND user_id = ?', [id, userId]);
    }
}

module.exports =  CommentModel;