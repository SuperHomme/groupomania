const Post = require('../models/Post');
// const fs = require('fs');

exports.addPost = (req, res, next) => {
    delete req.body._id;
    const post = new Post({
        ...req.body
    });
    post.save() // donne le nom "post" + un "s" à la collection, qui sera donc "posts"
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    Post.find() //utilise le schema de données Post
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};