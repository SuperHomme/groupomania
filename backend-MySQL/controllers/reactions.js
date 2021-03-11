const db = require('../dbconfig.js');

// NO
exports.likeDislikePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            console.log(req.body)
            switch (req.body.like) {
            case 1:
                if (!post.usersLiked.includes(req.body.userId)) { // s'il n'y a pas déjà de like de l'utilisateur, alors...
                    Post.updateOne({ _id: req.params.id }, { $inc: { nbLike: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
                        .then(() => res.status(201).json({ message: "post appréciée" }))
                        .catch((error) => { res.status(400).json({ error }); });
                }
            break;
            case -1:
                if (!post.usersDisliked.includes(req.body.userId)) { // s'il n'y a pas déjà de dislike de l'utilisateur, alors...
                    Post.updateOne({ _id: req.params.id }, { $inc: { nbDislike: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
                        .then(() => res.status(201).json({ message: "post non appréciée" }))
                        .catch((error) => { res.status(400).json({ error }); });
                }
            break;
            case 0:
                if (post.usersLiked.includes(req.body.userId)) { // s'il y a déjà un like, alors on annule ce like
                    Post.updateOne({ _id: req.params.id }, { $inc: { nbLike: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id })
                        .then(() => res.status(201).json({ message: "like annulé" }))
                        .catch((error) => { res.status(400).json({ error }); });
                } else { // s'il n'y pas déjà un like, mais un dislike, alors on annule ce dislike
                    Post.updateOne({ _id: req.params.id }, { $inc: { nbDislike: -1 }, $pull: { usersDisliked: req.body.userId }, _id: req.params.id })
                        .then(() => res.status(201).json({ message: "dislike annulé" }))
                        .catch((error) => { res.status(400).json({ error }); });
                }
            break;
            }
        })
        .catch((error) => { res.status(400).json({ error: error, });});
};

// NO
exports.favPost = (req, res, next) => {
    console.log(req.body);
    Post.findOne({_id: req.params.id})
        .then((post) => {
            switch (req.body.fav) {
                case 1:
                    if (!post.usersFaved.includes(req.body.userId)) { // s'il n'y a pas déjà de favori de l'utilisateur, alors...
                        Post.updateOne({ _id: req.params.id }, { $inc: { nbFav: 1 }, $push: { usersFaved: req.body.userId }, _id: req.params.id })
                        .then(() => res.status(201).json({ message: "post favori" }))
                        .catch((error) => { res.status(400).json({ error }); });
                    }
                break;
                case 0:
                    if (post.usersFaved.includes(req.body.userId)) { // s'il y a déjà un favori, alors on annule ce favori
                        Post.updateOne({ _id: req.params.id }, { $inc: { nbFav: -1 }, $pull: { usersFaved: req.body.userId }, _id: req.params.id })
                            .then(() => res.status(201).json({ message: "favori annulé" }))
                            .catch((error) => { res.status(400).json({ error }); });
                    }
                break;
            }})
        .catch((error) => { res.status(400).json({ error })});
};