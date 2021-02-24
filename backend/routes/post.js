const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllPosts);
// router.get('/:id', postCtrl.getOnePost);
router.post('/', multer, postCtrl.addPost);
// router.put('/:id', multer, postCtrl.updatePost);
// router.delete('/:id', postCtrl.deletePost);
router.post('/:id/reaction', postCtrl.likeDislikeFavPost);
router.post('/:id/comment', postCtrl.addComment);

module.exports = router;