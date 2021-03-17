const db = require('../dbconfig.js');

// OK
exports.getAllComments = (req, res, next) => {
    console.log(req.body);
    let sql = `SELECT c.*, u.username, u.userpicture FROM comments c LEFT JOIN users u ON u._id = c.user_id WHERE (c.post_id = '${req.params.id}')`;
    db.query(sql, (err, result) => {
        if (err || result.length == 0) {
            return res.status(500).json({ error: 'aucun commentaire trouvé' });}

        res.status(200).json(result)})
};

// OK
exports.addComment = (req, res, next) => {
    console.log(req.body);
    let sql = `INSERT INTO comments (content, user_id, date, post_id) VALUES ('${req.body.content}', '${req.body.userId}', NOW(), '${req.params.id}')`;
    db.query(sql, (err, result) => {
        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
        // console.log(result)
        res.status(201).json({ message: 'commentaire ajouté !' })})
};
