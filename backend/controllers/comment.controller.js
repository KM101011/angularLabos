const express = require('express');
const router = express.Router();
const CommentService = require("../services/comment.service");

router.get('/api/comments', async (req, res) => {
    try {
        const comments = await CommentService.getComments();
        res.json(comments);   
    } catch (error) {
        res.status(500).json({ message: 'Failed to catch comments.' });
    }
})

router.post('/api/comments', async (req, res) => {
    const comment = req.body;
    try {
        await CommentService.addComment(comment);
        res.status(201).json({ message: 'Comment added' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment.' });
    }
})

router.put('/api/comments/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { userId, content } = req.body;
    try {
        await CommentService.updateComment(id, userId, content);
        res.json({ message: 'Comment updated' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update comment' });
    }
})

router.delete('/api/comments/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { userId } = req.body;
    try {
        await CommentService.deleteComment(id, userId);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment' });
    }
})

module.exports = router;