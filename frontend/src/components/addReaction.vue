<template>

<div class="reactions">
    <!-- remplacer le value des inputs, on veut le userId du localstorage, pas celui du post ! -->
    <!-- LIKE -->
    <div v-bind:title="post.usersLiked.join('\r\n')" class="fas-count-bind tooltip thumbs-up">
        <input type="checkbox"
            :id="concatenate('like_', post._id)"
            v-on:change="checkCheckbox(1)"/>
        <label :for="concatenate('like_', post._id)">
            <i class="fas fa-thumbs-up"></i>
        </label>
        <div :id="concatenate('nblike_', post._id)">{{ post.usersLiked.length + liked.length + correctionLike }}</div>
    </div>

    <!-- DISLIKE -->
    <div v-bind:title="post.usersDisliked.join('\r\n')" v-show="post.usersDisliked" class="fas-count-bind tooltip thumbs-down">
        <input type="checkbox" 
            :id="concatenate('dislike_', post._id)"
            v-on:change="checkCheckbox(-1)"/>
        <label for="a">
        <i class="fas fa-thumbs-down"></i>
        </label>
        <div :id="concatenate('nblike_', post._id)">{{ post.usersDisliked.length + disliked.length + correctionDislike }}</div>
    </div>

    <!-- v-on:click="$emit("showComment = !showComment")> -->
    <!-- COMMENTER -->
    <div class="fas-count-bind" v-on:click="updateShowComment">
        
        <i class="fas fa-comment"></i>
        <div>{{ post.comments.length }}</div>
    </div>

    <!-- FAV -->
    <div class="fas-count-bind heart">
        <input type="checkbox" 
            :id="concatenate('fav_', post._id)"
            :value="post.userId"
            v-model="faved"/>
        <label for="c">
            <i class="fas fa-heart"></i>
        </label>
        <div>{{ post.nbFav }}</div>
    </div>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'addReaction',
    data: () => {
        return {
            liked: [],
            disliked: [],
            correctionLike: 0,
            correctionDislike: 0,
            faved: [],
            nbLikeDislike: 0,
        }
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    methods: {
        updateShowComment() {
            this.$store.commit("updateShowComments", this.post._id)
        },
        concatenate(likeDislikeFav, postId) {
            const inputId = likeDislikeFav + postId;
            return inputId
        },
        checkCheckbox(value) {
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
            console.log("valeur de liked : " + this.liked);
            console.log("valeur de disliked : " + this.disliked);
            console.log("valeur like ou dislike envoyée au serveur : " + this.nbLikeDislike);
            console.log("array post.usersLiked : " + this.post.usersLiked);
            console.log("array post.usersDisLiked : " + this.post.usersDisLiked);
            this.addReaction()
        },
        addReaction() {
            const reactionData = {
                like: this.nbLikeDislike,
                fav: this.post.userId,
                userId: this.post.userId,
            }
            this.sendReaction(reactionData);
        },
        sendReaction(reactionData) {
            axios
            .post('http://localhost:3000/api/posts/' + this.post._id + '/reaction', reactionData)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        },
        setChecked() { // si la page est chargée
            console.log("dans la BD en like : " + this.post.usersLiked.includes('1543322') );
            console.log("dans la BD en dislike : " + this.post.usersDisliked.includes('1543322') );
            if ( this.post.usersLiked.includes('1543322') ) { // si les données sont déjà dans post.usersLiked
                document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = true;
            } else if ( this.post.usersDisliked.includes('1543322') ) {
                document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = true;
            }
        },
        RAZ() { // si la page est chargée
            if ( this.post.usersLiked.includes('1543322') ) { // si les données sont déjà dans post.usersLiked
                document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = true;
            } else if ( this.post.usersDisliked.includes('1543322') ) {
                document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = true;
            }
        }
    },
    computed: {
    },
    beforeMount() {
    },
    mounted() { // hook au montage de la page, permet rafraichir
        this.setChecked()
    }
}
</script>

<style lang="sass" scoped>
.reactions
    height: 50px
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-around

.fas-count-bind
    display: flex
    flex-direction: row
    div
        margin-left: 1rem

// logique reactions icons

input
    opacity: 0
    z-index: 1
    position: absolute

.heart input:checked + label i
    color: red

.thumbs-up input:checked + label i
    color: rgb(51, 204, 255)

.thumbs-down input:checked + label i
    color: rgb(51, 204, 255)

input:checked + label i
    animation: icon 0.9s forwards ease

@keyframes icon 
    0%
        filter: hue-rotate(0deg)
        transform: scale(1)
    50%
        filter: hue-rotate(-270deg)
        transform: scale(1.2)
    100%
        filter: hue-rotate(0deg)
        transform: scale(1)

.fa-heart:hover
    color: rgba(251, 38, 38, 0.5)

.fa-thumbs-up:hover
    color: rgb(51, 204, 255)

.fa-thumbs-down:hover
    color: rgb(0, 0, 153)

i:hover
    animation: echelle 0.8s infinite linear

@keyframes echelle
    50%
        transform: scale(1.1)
    100%
        transform: scale(1)

// bulle 
.tooltip
    white-space: pre-wrap
    position: relative

// bulle : extrait le nom des utilisateurs de la balise title
.tooltip:hover:after
    background: #333
    background: rgba(0,0,0,.8)
    border-radius: 5px
    bottom: 26px
    color: #fff
    content: attr(title)
    left: 30%
    padding: 8.5px 10px
    position: absolute
    z-index: 98
    width: 150px

// triangle sous la bulle quitte pointe sur le compteur
.tooltip:hover:before
    border: solid
    border-color: #333 transparent
    border-width: 6px 6px 0 6px
    bottom: 20px
    content: ""
    left: 70%
    position: absolute
    z-index: 99

// si le title est vide, on n'affiche rien
.tooltip[title=""]:hover::before, .tooltip:not([title]):hover::before
    content: none

.tooltip[title=""]:hover::after, .tooltip:not([title]):hover::after
    content: none
</style>