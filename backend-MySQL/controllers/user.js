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

// NO // TODO delete related posts with CASCADE FK ? A CASCADER en fs sur tous les fichiers images des posts !
exports.deleteUser = (req, res, next) => { 
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

exports.deletePost = (req, res, next) => {
    let sqlAllPostsImagesRelated = `SELECT img FROM posts WHERE (_id = '${req.params.id}')`;
    db.query(sqlAllPostsImagesRelated, (err, resultAllPostsImagesRelated) => {
        if (err || resultAllPostsImagesRelated.length == 0) { // si on ne trouve pas le post
            return res.status(401).json({ error: 'post non trouvé' });}
        
        foreach(img in AllPostsImagesRelated)
        const filename = resultUP[0].img.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            let sql = `DELETE FROM posts WHERE (_id = '${req.params.id}')`;
            db.query(sql, (err, result) => {
                if (err || resultUP.length == 0) { // si on ne trouve pas le post
                    return res.status(401).json({ error: 'post non trouvé' });}
                
                res.status(201).json(result)})})
    res.status(201).json({ message: 'post n° : ' + req.params.id + 'supprimé' })})
}