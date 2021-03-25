const fs = require('fs');
const db = require('../dbconfig.js');

// OK
exports.getAllPosts = (req, res, next) => {
    let sql = `SELECT p._id, p.img, p.legend, p.user_id, p.date AS date_sql, DATE_FORMAT(p.date, 'le %e %M %Y à %kh%i') AS date, u.username, u.userpicture, COALESCE(SUM(r.likes), 0) AS nbLike, GROUP_CONCAT(IF(r.likes = 1, r.user_id, ' ')) AS usersLiked, GROUP_CONCAT(IF(r.likes = 1, m.username, ' ')) AS uLikedUsername, COALESCE(SUM(r.dislikes), 0) AS nbDislike, GROUP_CONCAT(IF(r.dislikes = 1, r.user_id, ' ')) AS usersDisliked, GROUP_CONCAT(IF(r.dislikes = 1, m.username, ' ')) AS uDislikedUsername, COALESCE(SUM(r.favs), 0) AS nbFav, GROUP_CONCAT(IF(r.favs = 1, r.user_id, ' ')) AS usersFaved, GROUP_CONCAT(IF(r.favs = 1, m.username, ' ')) AS uFavedUsername FROM posts p LEFT JOIN users u ON p.user_id = u._id LEFT JOIN reactions r ON r.post_id = p._id LEFT JOIN users m ON m._id = r.user_id GROUP BY p._id ORDER BY p.date DESC`;
    db.query(sql, (err, result) => {
        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
        console.log(result)
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
        res.status(201).json({ message: 'post ajouté !' })})
};

// OK
exports.updatePost = (req, res, next) => {
    // console.log(req.body.legend);
    let sql = `UPDATE posts SET legend = '${req.body.legend}' WHERE (_id = '${req.params.id}')`;
    db.query(sql, (err, result) => {

        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
            
        res.status(201).json({ message: 'légende du post mis à jour !' })})
};

// OK > cascade sur les commentaires (FK), les réactions(FK), le fichier image
exports.deletePost = (req, res, next) => {
    let sqlPoPi = `SELECT img FROM posts WHERE (_id = '${req.params.id}')`;
    db.query(sqlPoPi, (err, resultPoPi) => {
        if (err || resultPoPi.length == 0) { // si on ne trouve pas le post
            return res.status(401).json({ error: 'post non trouvé' });}

        const filename = resultPoPi[0].img.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            let sql = `DELETE FROM posts WHERE (_id = '${req.params.id}')`;
            db.query(sql, (err, result) => {
                if (err || resultPoPi.length == 0) { // si on ne trouve pas le post
                    return res.status(401).json({ error: 'post non trouvé' });}
                
                res.status(201).json({ message: 'post n° : ' + req.params.id + 'supprimé' })})})})
}