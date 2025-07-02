const express = require('express');
const router = express.Router();
const UserService = require("../services/user.service");


router.get('/api/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const [result] = await UserService.getUserById(id);
        res.status(200).json({message: 'got user', data: result[0]});
    } catch (error) {
         res.status(500).json({ message: 'Failed to update comment' });
    }
})


module.exports = router;
