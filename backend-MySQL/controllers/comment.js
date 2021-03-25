const db = require('../dbconfig.js');

// OK
exports.getAllComments = (req, res, next) => {
    let sql = `SELECT c.*, c.date AS date_sql, DATE_FORMAT(c.date, 'le %e %M %Y à %kh%i') AS date, u.username, u.userpicture FROM comments c LEFT JOIN users u ON u._id = c.user_id WHERE (c.post_id = '${req.params.id}')`;
    db.query(sql, (err, result) => {
        if (err || result.length == 0) {
            return res.status(404).json({ error: 'aucun commentaire trouvé' });}

        res.status(200).json(result)})
};

// OK
exports.addComment = (req, res, next) => {
    let checkedContent = req.body.content.replace("'", "\\'");
    let sqlAddComment = `INSERT INTO comments (post_id, user_id, date, content) VALUES ('${parseInt(req.params.id)}', '${parseInt(req.body.user_id)}', NOW(), '${checkedContent}')`;
    db.query(sqlAddComment, (err, result) => {
        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
        // console.log(result)
        res.status(201).json({ message: 'commentaire ajouté !' })})
};
