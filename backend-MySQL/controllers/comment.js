const db = require('../dbconfig.js');

// NO
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
