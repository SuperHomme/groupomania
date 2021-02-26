const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// TODO 
// - ajouter une photo de profil
// - modifier profil
// - supprimer compte

module.exports = router;