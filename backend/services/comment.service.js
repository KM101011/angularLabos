const CommentModel = require('../models/comment.model');

const CommentService = {

    getComments: async () => {
        const [rows] = await CommentModel.getAll();
        return rows;
    },

    addComment: async (comment) => {
        await CommentModel.create(comment);
    },

    updateComment: async (id, userId, content) => {
        await CommentModel.update(id, userId, content);
    },
    
    deleteComment: async (id, userId) => {
        await CommentModel.delete(id, userId);
    }
}

export default CommentService;