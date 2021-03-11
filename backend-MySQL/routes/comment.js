// app.use('/api/comments', commentRoutes);
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/comment', auth, commentCtrl.getAllComments);
router.post('/:id/comment', auth, commentCtrl.addComment);
router.put('/:id/comment/:id', auth, commentCtrl.updateComment);
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment);

// TODO like comment / modify comment / delete comment

module.exports = router;