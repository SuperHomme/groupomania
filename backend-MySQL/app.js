const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet"); // pour éviter les injections et autres failles XSS
const expressSanitizer = require('express-sanitizer'); // pour éviter les failles XSS
const path = require('path');
require('dotenv').config(); // permet de cacher les données d'environnement dans un fichier .env, lui même lister dans un gitignore pour eviter qu'il soit envoyer sur GitHub
const mysql = require('mysql');
const db = require('./dbconfig.js');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
// const reactionRoutes = require('./routes/reaction');
const userRoutes = require('./routes/user');

db.connect((err) =>  {
    if(err) {
        console.log('>> NON... connexion à MySQL ratée...')
        throw err; }
    console.log('>> OUI ! connexion à MySQL réussie !')
});

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet()); // pour utiliser helmet sur toutes les requêtes
app.use(expressSanitizer()) // pour utiliser expressSanitizer sur toutes les requêtes

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
// app.use('/api/reactions', reactionRoutes);
app.use('/api/users', userRoutes);

module.exports = app;