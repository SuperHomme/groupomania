const express = require('express');
const router = express.Router(); //const router = require('express').Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllPosts);
// router.get('/:id', postCtrl.getOnePost);
router.post('/', mutler, postCtrl.addPost);
// router.put('/:id', multer, postCtrl.updatePost);
// router.delete('/:id', postCtrl.deletePost);
// router.post('/:id/like', postCtrl.likeDislikeCancelPost);

module.exports = router;