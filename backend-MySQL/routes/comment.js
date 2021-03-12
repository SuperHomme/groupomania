// app.use('/api/comments', commentRoutes);
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:id', auth, commentCtrl.getAllComments);
router.post('/:id', auth, commentCtrl.addComment);
// router.put('/:id/comment/:id', auth, commentCtrl.updateComment);  TODO
// router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment); TODO

module.exports = router;