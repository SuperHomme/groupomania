const db = require('../dbconfig.js');

// OK
exports.likeDislikePost = (req, res, next) => {
    console.log(req.body)
    switch (req.body.like) {
        case 0:
            let sqlIfExists = `SELECT IF (EXISTS (SELECT * FROM reactions WHERE user_id='${req.body.user_id}' AND post_id='${req.params.id}' AND likes=1), '1', '0') UNION ALL SELECT IF (EXISTS (SELECT * FROM reactions WHERE user_id='${req.body.user_id}' AND post_id='${req.params.id}' AND dislikes=1), '1', '0')`;
            db.query(sqlIfExists, (err, result) => {
                let likesExist = parseInt(Object.values(result[0]))
                let dislikesExist = parseInt(Object.values(result[1]))

                switch (likesExist) {
                    case 0: // si le like n'existe pas
                        console.log("le like n'existe pas, on ne fait rien pour lui");
                    break;
                    case 1: // si le like existe
                        console.log("le like existe, on le supprime");
                        let sqlCancelLike = `UPDATE reactions SET likes=0, dateLike=NULL WHERE post_id='${req.params.id}' AND user_id='${req.body.user_id}'`;
                        db.query(sqlCancelLike, (err, result) => {
                            if (err || result.length == 0) {
                                return res.status(500).json(err.message);}
                            res.status(201).json({ message: 'like annulé !' })})
                    break;
                }

                switch (dislikesExist) {
                    case 0: // si le dislike n'existe pas
                        console.log("le dislike n'existe pas, on ne fait rien pour lui");
                    break;
                    case 1: // si le dislike existe
                        console.log("le dislike existe, on le supprime");
                        let sqlCancelDislike = `UPDATE reactions SET dislikes=0, dateDislike=NULL WHERE post_id='${req.params.id}' AND user_id='${req.body.user_id}'`;
                        db.query(sqlCancelDislike, (err, result) => {
                            if (err || result.length == 0) {
                                return res.status(500).json(err.message);}
                            res.status(201).json({ message: 'dislike annulé !' })})
                    break;
                }})
        break;
        case 1:
            let sqlLike = `INSERT INTO reactions (post_id, user_id, likes, dislikes, dateLike, dateDislike) VALUES ('${req.params.id}', '${req.body.user_id}', '${req.body.like}', '0', NOW(), NULL) ON DUPLICATE KEY UPDATE likes='${req.body.like}', dislikes=0, dateLike=NOW(), dateDislike=NULL`;
            db.query(sqlLike, (err, result) => {

                if (err || result.length == 0) {
                    return res.status(500).json(err.message);}
                
                console.log("on ajoute un like");    
                res.status(201).json({ message: 'post apprécié !' })})
        break;
        case -1:
            let sqlDislike = `INSERT INTO reactions (post_id, user_id, likes, dislikes, dateDislike) VALUES ('${req.params.id}', '${req.body.user_id}', '0', '1', NOW()) ON DUPLICATE KEY UPDATE likes=0, dislikes=1, dateDislike=NOW()`;
            db.query(sqlDislike, (err, result) => {

                if (err || result.length == 0) {
                    return res.status(501).json(err.message);}
                
                console.log("on ajoute un dislike");
                res.status(201).json({ message: 'post non apprécié !' })})
        break;
    }
};

// OK
exports.favPost = (req, res, next) => {
    console.log(req.body)
    let sql = `INSERT INTO reactions (post_id, user_id, favs, dateFav) VALUES ('${req.params.id}', '${req.body.user_id}', '${req.body.fav}', NOW()) ON DUPLICATE KEY UPDATE favs='${req.body.fav}', dateFav=IF('${req.body.fav}' = 1, NOW(), NULL)`;
    db.query(sql, (err, result) => {

        if (err || result.length == 0) {
            return res.status(500).json(err.message);}
        
        console.log("on édite le fav");    
        res.status(201).json({ message: 'fav mis à jour !' })})
};