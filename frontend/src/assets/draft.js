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

exports.addPost = (req, res, next) => {
    console.log(req.body);
    const legend = req.body.legend; // prend le corps de la requete et le baptise postObject
    const date = new Date();
    const user = User.findOne({_id: req.body.userId})
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'utilisateur non trouvé' });}
            res.status(200).json({user})})
        .catch((error) => { res.status(400).json({ error: error, }); });
    async function asyncCall() {
        console.log("on est là");
        const user = await user();
        const post = new Post({ // constructeur Post
            username: user.username,
            userpicture: user.userpicture,
            legend,
            img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ",    " + date.getHours() + "h" + date.getMinutes()})
        post.save() // donne le nom "post" + un "s" à la collection, qui sera donc "posts"
            .then(() => res.status(201).json({ message: 'post ajouté !'}))
            .catch(error => res.status(400).json({ error }));
    }
}

switch (value) {
    case 1: // le clic a été envoyé avec une valeur de 1
        if ( !this.post.usersLiked.includes('1543322') ) { // si la BD n'inclut pas déjà le userId
        this.nbLikeDislike !== 1 ? // la valeur n'était pas déjà enregistrée > clic pour la 1ère fois
            (document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = false , // on retire le checked à l'input dislike par précaution
            this.disliked = [], 
            this.liked.push(this.post.userId),
            this.nbLikeDislike = 1) : // et on affecte la valeur
                (this.nbLikeDislike = 0 , // la valeur était enregistrée > clic pour la 2ème fois
                this.liked = [],
                this.correctionLike = 0) ;
        } else { // si le userId est déjà dans la BD
                (this.nbLikeDislike = 0 ,
                this.liked = [],
                this.correctionLike = -1) ;
        }
        break;
    case -1:
        if ( !this.post.usersDisliked.includes('1543322') ) { // si la BD n'inclut pas déjà le userId
        this.nbLikeDislike !== -1 ?
            (document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = false ,
            this.liked = [],
            this.disliked.push(this.post.userId),
            this.nbLikeDislike = -1) :
                (this.nbLikeDislike = 0 ,
                this.disliked = [],
                this.correctionDislike = 0) ;
        } else { // si le userId est déjà dans la BD
            (this.nbLikeDislike = 0 ,
            this.disliked = [],
            this.correctionDisLike = -1) ;
        }
        break;
}

// data test
export const postglobals = [
    {   id: 1,
        post: {
            userId: "28394",
            userpicture: 'Hector_Castor.jpg',
            username: "Hector Castor",
            date: "1 juil. 2020, 8h32",
            img: 'homer_simpson_bush.gif',
            nbLike: 24,
            nbDislike: 3,
            usersLiked: ["Edmond Faon", "Amélie Perdrix", "Chantal Chacal", "Quentin Chien"],
            usersDisliked: ["Edgar Renard", "Pablo Corbeau", "Félicie Pie", "Roger Le Très Grand Epervier"],
            nbComment: 8,
            nbFav: 3
        },
        comments:[
            {
                id: 1,
                userId: "283954",
                username: "Edouard Canard",
                userpicture : 'Edouard_Canard.jpeg',
                date: "2 juil. 2020, 10h43",
                content: "MDR Homer Simpson qui recule dans les buissons"
            },
            {
                id: 2,
                userId: "283694",
                username: "Charlotte Marmotte",
                userpicture : 'Charlotte_Marmotte.jpg',
                date: "2 juil. 2020, 10h51",
                content: "Edouard tu comptes décrire chaque post à chaque fois ?? Je te taquine... ahah.. ce GIF.. comme nos concurrents quand ils nous voient sur le salon tmtc ;)"
            }
        ]
    }
]

// data test
export const posts = [
    {   
        userId: "28394",
        userpicture: 'Hector_Castor.jpg',
        username: "Hector Castor",
        date: "1 juil. 2020, 8h32",
        img: 'homer_simpson_bush.gif',
        nbLike: 24,
        nbDislike: 3,
        usersLiked: ["Edmond Faon", "Amélie Perdrix", "Chantal Chacal", "Quentin Chien"],
        usersDisliked: ["Edgar Renard", "Pablo Corbeau", "Félicie Pie", "Roger Le Très Grand Epervier"],
        nbComment: 8,
        nbFav: 3,
        comments:[
            {
                id: 1,
                userId: "283954",
                username: "Edouard Canard",
                userpicture : 'Edouard_Canard.jpeg',
                date: "2 juil. 2020, 10h43",
                content: "MDR Homer Simpson qui recule dans les buissons"
            },
            {
                id: 2,
                userId: "283694",
                username: "Charlotte Marmotte",
                userpicture : 'Charlotte_Marmotte.jpg',
                date: "2 juil. 2020, 10h51",
                content: "Edouard tu comptes décrire chaque post à chaque fois ?? Je te taquine... ahah.. ce GIF.. comme nos concurrents quand ils nous voient sur le salon tmtc ;)"
            }
        ]
    }
]