const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const Post = require('../models/Post');
const User = require('../models/User');
const rot13Cipher = require('../middleware/rot13-cipher');
require('dotenv').config(); // utilisation des variables cachées

exports.signup = (req, res, next) => {
    console.log(req.body);
    emailBody = req.body.email.split("@");
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: rot13Cipher(emailBody[0]) + "@" + emailBody[1],
                password: hash,
                userpicture: "http://localhost:3000/images/neutral-avatar.png",
                username: req.body.username });
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));})
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    emailBody = req.body.email.split("@");
    User.findOne({ email: rot13Cipher(emailBody[0]) + "@" + emailBody[1] })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'utilisateur non trouvé' });}
            bcrypt
                .compare(req.body.password, user.password) // bcrypt compare les hash des 2 mdp
                .then(valid => {
                    if (!valid) { // si valid est false
                        return res.status(401).json({ error: 'mot de passe incorrect' });}
                    res.status(200).json({  // si valid est true
                        userId: user._id, // dans la réponse on envoie un userId, et un token qui contient le JWT
                        token:
                            jwt.sign(
                                { userId: user._id },
                                `${process.env.TOKEN}`,
                                { expiresIn: '24h' })
                    });})
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) { // si on ne trouve pas l'utilisateur
                return res.status(401).json({ error: 'utilisateur non trouvé' });}
            res.status(200).json({  // si on trouve l'utilisateur
                userpicture: user.userpicture,
                username: user.username,
                email: rot13Cipher(user.email.split("@")[0]) + "@" + user.email.split("@")[1]
            })})
        .catch(error => res.status(500).json({ error }));
};

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

exports.updateUserPicture = (req, res, next) => {
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