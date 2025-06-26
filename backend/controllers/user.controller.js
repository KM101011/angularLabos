import { Router } from "express";

const router = Router();

router.get("/api/users/:id", () => async (req, res) => {

    const id = parseInt(req.params.id);
    const { userId, content } = req.body;
    try {
        await CommentService.updateComment(id, userId, content);
        res.json({ message: 'Comment updated' });
    } catch (error) {
         res.status(500).json({ message: 'Failed to update comment' });
    }
})

export default router;

