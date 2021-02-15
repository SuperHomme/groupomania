const Post = require('../models/Post');
// const fs = require('fs');

exports.addPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id; // on supprime l'id ajoute par defaut
    const post = new Post({ // constructeur post auquel on appique le schema
        ...postObject, // on prend tout le reste
        img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // on ne modifie que l'image, son url
    });
    post.save() // donne le nom "post" + un "s" à la collection, qui sera donc "posts"
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    Post.find() // utilise le schema de données Post
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};