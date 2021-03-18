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
            
            res.status(200).json({ // si on trouve l'utilisateur
                userpicture: result[0].userpicture,
                username: result[0].username,
                email: rot13Cipher(result[0].email.split("@")[0]) + "@" + result[0].email.split("@")[1],
            })})
};

// OK
exports.updateUserInfos = (req, res, next) => {
    // console.log(req.body);
    let emailBody = req.body.email.split("@");
    let emailCipher = rot13Cipher(emailBody[0]) + "@" + emailBody[1];
    let sql = `UPDATE users SET email = '${emailCipher}', username = '${req.body.username}' WHERE (_id = '${req.params.id}')`;
    db.query(sql, (err, result) => {

        if (err || result.length == 0) { // si on ne trouve pas l'utilisateur
            return res.status(401).json({ error: 'utilisateur non trouvé' });}
            
        res.status(201).json({ message: 'infos utilisateur mises à jour !' })})
};

// OK
exports.updateUserPicture = (req, res, next) => {
    console.log(req.file);

    let sqlUP = `SELECT userpicture FROM users WHERE (_id = '${req.params.id}')`;
    db.query(sqlUP, (err, resultUP) => {
        if (err || resultUP.length == 0) { // si on ne trouve pas l'utilisateur
            return res.status(500).json(err.message);}

        let sql = `UPDATE users SET userpicture = '${req.protocol}://${req.get('host')}/images/${req.file.filename}' WHERE (_id = '${req.params.id}')`;
        db.query(sql, (err, result) => {

            if (err || result.length == 0) { // si on ne trouve pas l'utilisateur
                return res.status(401).json({ error: 'utilisateur non trouvé' });}

            const filename = resultUP[0].userpicture.split('/images/')[1];
            if (filename != 'neutral-avatar.png') { // si l'avatar précédent n'était pas l'avatar par défaut
                fs.unlink(`images/${filename}`, () => {})} // on supprime le précédent fichier image
                
            res.status(201).json({ message: 'avatar utilisateur mis à jour !' })})});
};

// OK
exports.updateUserPassword = (req, res, next) => {
    console.log(req.body.newPassword);
    let sql = `SELECT password FROM users WHERE (_id = '${req.params.id}')`;
    db.query(sql, (err, oldPassword) => {

        if (err || oldPassword.length == 0) { // pb
                return res.status(401).json({ error: 'utilisateur non trouvé' });}

        bcrypt
            .compare(req.body.oldPassword, oldPassword[0].password) // bcrypt compare les hash des 2 mdp
            .then(valid => {
                if (!valid) { // si valid est false
                    return res.status(401).json({ error: 'mot de passe incorrect' });}
                
                bcrypt
                    .hash(req.body.newPassword, 10)
                    .then(hash => {
                        let sqlUpdatePassword = `UPDATE users SET password = '${hash}' WHERE (_id = '${req.params.id}')`;
                        db.query(sqlUpdatePassword, (err, result) => {

                        if (err || result.length == 0) { // pb
                                return res.status(401).json({ error: 'pb' });}
                        
                        res.status(201).json({ message: 'mot de passe mis à jour !' })})})
                    .catch(error => res.status(501).json({ error }))
            })
            .catch(error => res.status(502).json({ error }))})
};

// OK
exports.deleteUser = (req, res, next) => {
    let sqlAllImagesRelated = `SELECT img FROM posts WHERE (user_id = '${req.params.id}') UNION ALL SELECT userpicture FROM users WHERE (_id = '${req.params.id}')`;
    db.query(sqlAllImagesRelated, (err, resultAllImagesRelated) => {
        if (err || resultAllImagesRelated.length == 0) { // si erreur
            return res.status(402).json({ error: 'aucun post trouvé' });}
        
        let sql = `DELETE FROM users WHERE (_id = '${req.params.id}')`;
        db.query(sql, (err, result) => {
            if (err || result.length == 0) { // si on ne trouve pas l'utilisateur
                return res.status(401).json({ error: 'post non trouvé' });}
            
            console.log(resultAllImagesRelated);
            
            for (const imgRelated of resultAllImagesRelated) { // suppression des images
                const filename = imgRelated.img.split('/images/')[1];
                if (filename != 'neutral-avatar.png') { // si l'avatar du user n'était pas l'avatar par défaut
                fs.unlink(`images/${filename}`, () => { console.log("image " + filename + " supprimée !") })}}

            res.status(201).json({ message: 'user n° : ' + req.params.id + 'supprimé' })})})
}