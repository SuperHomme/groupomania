const db = require('../dbconfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const rot13Cipher = require('../middleware/rot13-cipher');

// OK
exports.getOneUser = (req, res, next) => {
    let sql = `SELECT users.userpicture, users.username, users.email FROM users WHERE (_id = '${req.params.id}')`;
    db.query(sql, (err, result) => {

        if (err || result.length == 0) { // si on ne trouve pas l'utilisateur
            return res.status(401).json({ error: 'utilisateur non trouvé' });}
            
            console.log(result)
            res.status(200).json({ // si on trouve l'utilisateur
                userpicture: result[0].userpicture,
                username: result[0].username,
                email: rot13Cipher(result[0].email.split("@")[0]) + "@" + result[0].email.split("@")[1],
            })})
};

// NO
exports.updateUserInfos = (req, res, next) => {
    console.log(req.body);
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) { // si on ne trouve pas l'utilisateur
                return res.status(401).json({ error: 'utilisateur non trouvé' });}
            User.updateOne( { _id: req.params.id }, {
                    $set: { email: rot13Cipher(req.body.email.split("@")[0]) + "@" + req.body.email.split("@")[1], username: req.body.username },
                    _id: req.params.id })
                .then(user => res.status(200).json({ message: 'infos user mises à jour'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// NO
exports.updateUserPicture = (req, res, next) => { // TODO ne pas supprimer l'avater par défaut de la DB
    console.log(req.file);
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) { // si on ne trouve pas l'utilisateur
                console.log('utilisateur non trouvé');
                return res.status(401).json({ error: 'utilisateur non trouvé' });}
            const filename = user.userpicture.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                User.updateOne( { _id: req.params.id }, { $set: { userpicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }, _id: req.params.id })
                    .then(user => res.status(200).json({ message: 'avatar mis à jour'}))
                    .catch(error => res.status(400).json({ error }));});
        })
        .catch(error => res.status(500).json({ error }));
};

// NO
exports.updateUserPassword = (req, res, next) => {
    console.log(req.body.password);
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) { // si on ne trouve pas l'utilisateur
                console.log('utilisateur non trouvé');
                return res.status(401).json({ error: 'utilisateur non trouvé' });}
            bcrypt
                .compare(req.body.password, user.password) // bcrypt compare les hash des 2 mdp
                .then(valid => {
                    if (!valid) { // si valid est false
                        return res.status(401).json({ error: 'mot de passe incorrect' });}
                    res.status(200).json({  // si valid est true
                        userId: user._id, // dans la réponse on envoie un userId, et un token qui contient le JWT
                    });})
                .catch(error => res.status(500).json({ error }));})
        .catch(error => res.status(500).json({ error }));
};

// NO
exports.deleteUser = (req, res, next) => { // TODO delete related posts
    console.log("user n° : " + req.params.id + "supprimé");
    User.findOne({ _id: req.params.id })
        .then(user => {
            const filename = user.userpicture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                User.deleteOne({ _id: req.params.id })
                    .then(user => res.status(200).json({ message: 'user supprimé'}))
                    .catch(error => res.status(400).json({ error }));});
        })
        .catch(error => res.status(500).json({ error }));
};