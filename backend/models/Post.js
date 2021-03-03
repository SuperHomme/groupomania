const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userpicture: { type: String, required: true }, // TODO suppimer une fois jointures opérationnelles
    username: { type: String, required: true }, // TODO suppimer une fois jointures opérationnelles
    date: { type: String, required: true },
    img: { type: String, required: true },
    legend : { type: String, required: true },
    nbLike: { type: Number, default: 0 },
    nbDislike: { type: Number, default: 0 },
    usersLiked: { type: Array },
    usersDisliked: { type: Array },
    nbComment: { type: Number, default: 0 },
    nbFav: { type: Number, default: 0 },
    usersFaved: { type: Array },
    comments: { type: Array },
});

module.exports = mongoose.model('Post', postSchema);