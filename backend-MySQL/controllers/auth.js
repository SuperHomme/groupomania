const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rot13Cipher = require('../middleware/rot13-cipher');
require('dotenv').config(); // utilisation des variables cachées
const db = require('../dbconfig.js');

exports.signup = (req, res, next) => {
    console.log(req.body);
    emailBody = req.body.email.split("@");
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
                const email = rot13Cipher(emailBody[0]) + "@" + emailBody[1];
                const password = hash;
                const userpicture = "http://localhost:3000/images/neutral-avatar.png";
                const username = req.body.username;
                let sql = 'INSERT INTO users (email, password, userpicture, username) VALUES (?, ?, ?, ?)';
                let values = [email, password, userpicture, username];
            db.query(sql, values, (err, result) => {
                if (err) {
                    return res.status(500).json(err.message);}
                res.status(201).json({ message: 'utilisateur créé !' })})})
        .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    let sql = 'SELECT _id, password FROM users WHERE email = ?';
    let emailBody = req.body.email.split("@");
    let emailCipher = rot13Cipher(emailBody[0]) + "@" + emailBody[1];
    db.query(sql, [emailCipher], (err, result) => {
        if (err || result.length == 0) {
            return res.status(401).json({ error: 'utilisateur non trouvé' });}
        bcrypt
            .compare(req.body.password, result[0].password) // bcrypt compare les hash des 2 mdp
            .then(valid => {
                if (!valid) { // si valid est false
                    return res.status(401).json({ error: 'mot de passe incorrect' });}
                res.status(200).json({  // si valid est true
                    userId: result[0]._id, // dans la réponse on envoie un userId, et un token qui contient le JWT
                    token:
                        jwt.sign(
                            { userId: result[0]._id },
                            `${process.env.TOKEN}`,
                            { expiresIn: '24h' })
                });})
            .catch(error => res.status(500).json({ error }));});
}