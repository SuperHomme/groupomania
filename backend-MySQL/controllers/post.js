const fs = require('fs');
const db = require('../dbconfig.js');

// OK
exports.getAllPosts = (req, res, next) => {
    let sql = 'SELECT p.*, u.username, u.userpicture FROM posts p LEFT JOIN users u ON p.user_id = u._id ORDER BY p.date DESC';
    db.query(sql, (err, result) => {
        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
        // console.log(result)
        res.status(200).json(result)})
};

// OK
exports.addPost = (req, res, next) => {
    // console.log(req.body);
    const img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const legend = req.body.legend
    const user_id = req.body.userId;
    let sql = 'INSERT INTO posts (img, legend, date, user_id) VALUES (?, ?, NOW(), ?)';
    let values = [img, legend, user_id];
    db.query(sql, values, (err, result) => {
        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
        // console.log(result)
        res.status(201).json({ message: 'post créé !' })})
};

// A VERFIER
exports.updatePost = (req, res, next) => {
    // console.log(req.body.legend);
    let sql = `UPDATE posts SET legend = '${req.body.legend}' WHERE (_id = '${req.params.id}')`;
    db.query(sql, (err, result) => {

        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
            
        res.status(201).json({ message: 'légende du post mis à jour !' })})
};

// A VERFIER + A CASCADER SUR LE FICHIER IMAGE, LES COMMENTAIRES ET LES REACTIONS
exports.deletePost = (req, res, next) => {
    // console.log(req);
    let sql = `DELETE FROM posts WHERE (_id = '${req.params.id}')`;
    db.query(sql, (err, result) => {

        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
        
        // suppression du fichier image // A VERIFIER
        const filename = result2.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            let sql2 = `SELECT img FROM posts WHERE (_id = '${req.params.id}')`;
            db.query(sql2, (err, result) => {
                if (err || result.length == 0) {
                    return res.status(500).json(err.message);}
            res.status(200).json(result2)})}); 

        res.status(201).json({ message: 'post n° : ' + req.params.id + 'supprimé' })})
};