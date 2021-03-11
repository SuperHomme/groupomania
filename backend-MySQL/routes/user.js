// app.use('/api/users', userRoutes);
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id/infos', auth, userCtrl.updateUserInfos);
router.put('/:id/picture', auth, multer, userCtrl.updateUserPicture);
router.put('/:id/password', auth, userCtrl.updateUserPassword);
router.delete('/:id', auth, userCtrl.deleteUser); // TODO delete related posts

module.exports = router;