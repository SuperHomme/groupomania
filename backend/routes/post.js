const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.getAllPosts);
// router.get('/:id', postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.addPost);
router.put('/:id', auth, postCtrl.updatePost);
// router.delete('/:id', postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likeDislikePost);
router.post('/:id/fav', auth, postCtrl.favPost);
router.post('/:id/comment', auth, postCtrl.addComment);

// TODO 
// - like comment / modify comment / delete comment
// delete post

module.exports = router;