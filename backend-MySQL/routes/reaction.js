// app.use('/api/reactions', reactionRoutes);
const express = require('express');
const router = express.Router();

const reactionCtrl = require('../controllers/reaction');
const auth = require('../middleware/auth');

router.post('/:id/like', auth, reactionCtrl.likeDislikePost);
router.post('/:id/fav', auth, reactionCtrl.favPost);

module.exports = router;