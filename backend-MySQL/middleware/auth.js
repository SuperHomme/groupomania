const jwt = require('jsonwebtoken');
require('dotenv').config(); // utilisation des variables cachées

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // sépare le header du token
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // check si le token correspond
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};