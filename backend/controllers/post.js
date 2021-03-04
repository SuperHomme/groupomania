const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => { res.status(200).json(posts); })
        .catch((error) => { res.status(400).json({ error: error, }); });
};

exports.addPost = (req, res, next) => {
    console.log(req.body);
    const postObject = req.body; // prend le corps de la requete, et le parse, et le baptise postObject
    const date = new Date();
    const post = new Post({ // constructeur post auquel on applique le schema
        ...postObject, // on prend tout le reste
        img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // on ne modifie que l'image, son url
        date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ",    " + date.getHours() + "h" + date.getMinutes(), // format français
    });
    post.save() // donne le nom "post" + un "s" à la collection, qui sera donc "posts"
        .then(() => res.status(201).json({ message: 'post ajouté !'}))
        .catch(error => res.status(400).json({ error }));
};

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

exports.addComment = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            const commentObject = req.body;
            const date = new Date();
            console.log(commentObject);
            commentObject._id = post.comments.length.toString();
            commentObject.date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ",    " + date.getHours() + "h" + date.getMinutes(); // format français
            Post.updateOne({ _id: req.params.id }, { $push: { comments: commentObject }, _id: req.params.id })
                .then(() => res.status(201).json({ message: "post commenté" }))
                .catch((error) => {res.status(400).json({ error: error });});})
        .catch((error) => {res.status(404).json({error: error,});});
};

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

exports.updatePost = (req, res, next) => {
    console.log(req.body.legend);
    Post.updateOne({ _id: req.params.id }, { $set: { legend: req.body.legend}, _id: req.params.id })
        .then(sauce => res.status(200).json({ message: 'sauce mise à jour'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    console.log("on est arrivé là au moins")
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const filename = post.img.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(post => res.status(200).json({ message: 'post supprimé'}))
                    .catch(error => res.status(400).json({ error }));});
        })
        .catch(error => res.status(500).json({ error }));
};