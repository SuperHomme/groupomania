const multer = require('multer');

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif"
};

// multer adds a body object and a file (or files) object to the request object
// check https://expressjs.com/en/resources/middleware/multer.html
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // indique la destination de l'image : emploi la route use 'images'
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // pour s'assurer qu'il n'y ai aucun whitespace, meme si mongosanitize l'effectue déjà
    const extension = MIME_TYPES[file.mimetype];
    const date = new Date();
    callback(null, name + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "-" + date.getHours() + "-" + date.getMinutes() + '.' + extension);
  }
});

module.exports = multer ({
  storage: storage, 
  limits: { fieldSize: 25 * 1024 * 1024 } // 25 x 1Mo, soit 25 Mo
}).single('image');