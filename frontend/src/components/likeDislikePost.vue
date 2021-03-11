<template>

<div class="like-dislike">

    <!-- LIKE -->
    <div v-bind:title="usersLiked.join('\r\n')" class="fas-count-bind tooltip thumbs-up">
        <input type="checkbox"
            :id="concatenate('like_', post._id)"
            v-on:change="checkLikeOrDislike(1)"/>
        <label :for="concatenate('like_', post._id)">
            <i class="fas fa-thumbs-up"></i>
        </label>
        <div :id="concatenate('nblike_', post._id)">{{ post.nbLike }}</div>
    </div>

    <!-- DISLIKE -->
    <div v-bind:title="usersDisliked.join('\r\n')" class="fas-count-bind tooltip thumbs-down">
        <input type="checkbox" 
            :id="concatenate('dislike_', post._id)"
            v-on:change="checkLikeOrDislike(-1)"/>
        <label :for="concatenate('dislike_', post._id)">
            <i class="fas fa-thumbs-down"></i>
        </label>
        <div :id="concatenate('nbdislike_', post._id)">{{ post.nbDislike }}</div>
    </div>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'likeDislikePost',
    data: () => {
        return {
            usersLiked: [],
            usersDisliked: [],
            nbLikeDislike: 0,
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    methods: {
        concatenate(likeDislike, postId) {
            const inputId = likeDislike + postId;
            return inputId
        },
        checkLikeOrDislike(key) {
            switch (key) {
                case 1: // on a appuyé sur like
                    if (this.nbLikeDislike == 0) { // c'est la première fois, ou relance du like
                        document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = true;
                        this.usersDisliked.splice(this.usersDisliked.indexOf(this.loginUserId), 1); // à la relance du like
                        this.usersLiked.push(this.loginUserId);
                        this.nbLikeDislike = 1;
                        this.addLikeDislike();
                    } else if (this.nbLikeDislike == 1) { // on reeapuye sur like = annulation
                        document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = false;
                        this.usersLiked.splice(this.usersLiked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addLikeDislike();
                    } else if (this.nbLikeDislike == -1) { // on appuye sur like alors que le dislike était envoyé : il faut annuler le dislike (envoi d'un zero) et reappuyer le like
                        document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = false;
                        this.usersDisliked.splice(this.usersDisliked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addLikeDislike();
                        this.checkLikeOrDislike(1);
                    }                         
                break;
                case -1:
                    if (this.nbLikeDislike == 0) { // c'est la première fois, ou relance du dislike
                        document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = true;
                        this.usersLiked.splice(this.usersLiked.indexOf(this.loginUserId), 1);
                        this.usersDisliked.push(this.loginUserId);
                        this.nbLikeDislike = -1;
                        this.addLikeDislike();
                    } else if (this.nbLikeDislike == -1) { // on reeapuye sur dislike = annulation
                        document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = false;
                        this.usersDisliked.splice(this.usersDisliked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addLikeDislike();
                    } else if (this.nbLikeDislike == 1) { // on appuye sur dislike alors que le like était envoyé : il faut annuler le like (envoi d'un zero) et reappuyer le dislike
                        document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = false;
                        this.usersDisliked.splice(this.usersDisliked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addLikeDislike();
                        this.checkLikeOrDislike(-1);
                    }     
                break;
            }
        },
        addLikeDislike() {
            const likeDislikeData = {
                like: this.nbLikeDislike,
                userId: this.loginUserId,
            }
            this.sendLikeDislike(likeDislikeData);
        },
        sendLikeDislike(likeDislikeData) {
            axios
            .post('http://localhost:3000/api/reactions/' + this.post._id + '/like', likeDislikeData, { headers: { Authorization: "Bearer " + this.loginToken }} )
                .then(console.log( this.nbLikeDislike + " envoyé !"))
                .catch((error) => console.log(error));
        },
        setChecked() {
            if ( this.post.usersLiked.includes(this.loginUserId) ) {
                document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = true;
            } else if ( this.post.usersDisliked.includes(this.loginUserId) ) {
                document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = true;
            }
        },
        setUserId() {
            const uLiked = this.post.usersLiked.replace(/ ,/g,'').replace(/, /g,'').split(",");
            uLiked[0] == " " ?
                this.usersLiked = [] :
                this.usersLiked = uLiked;
            const uDisliked = this.post.usersDisliked.replace(/ ,/g,'').replace(/, /g,'').split(",");
            uDisliked[0] == " " ?
                this.usersDisliked = [] :
                this.usersDisliked = uDisliked;
            this.usersLiked.includes(this.loginUserId) ?
                this.nbLikeDislike = 1 : 
                this.usersDisliked.includes(this.loginUserId) ?
                    this.nbLikeDislike = -1 :
                        this.nbLikeDislike = 0;
        }
    },
    beforeMount() {
        this.setUserId()
    },
    mounted() {
        this.setChecked()
    }
}
</script>

<style lang="sass" scoped>
.like-dislike
    width: 150px
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between

.fas-count-bind
    display: flex
    flex-direction: row
    div
        margin-left: 1rem

// logique likeDislikes icons

input
    opacity: 0
    z-index: 1
    position: absolute

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