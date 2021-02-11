const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userpicture: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: true },
    legend : { type: String, required: true },
    nbLike: { type: Number, required: true, default: 0 },
    nbDislike: { type: Number, required: true, default: 0 },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true },
    nbComment: { type: Number, required: true, default: 0 },
    nbFav: { type: Number, required: true, default: 0 },
    comments: { type: Array, required: true },
});

module.exports = mongoose.model('Post', postSchema);