<template>

<div class="fav">
    
    <div class="fas-count-bind heart">
        <input type="checkbox" 
            :id="concatenate('fav_', post._id)"
            :value="loginUserId"
            v-model="usersFaved"/>
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
            usersLiked: [],
            usersDisliked: [],
            usersFaved: [],
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
        updateShowComment() {
            this.$store.commit("updateShowComments", this.post._id)
        },
        concatenate(likeDislikeFav, postId) {
            const inputId = likeDislikeFav + postId;
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
                        this.addReaction();
                    } else if (this.nbLikeDislike == 1) { // on reeapuye sur like = annulation
                        document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = false;
                        this.usersLiked.splice(this.usersLiked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addReaction();
                    } else if (this.nbLikeDislike == -1) { // on appuye sur like alors que le dislike était envoyé : il faut annuler le dislike (envoi d'un zero) et reappuyer le like
                        document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = false;
                        this.usersDisliked.splice(this.usersDisliked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addReaction();
                        this.checkLikeOrDislike(1);
                    }                         
                break;
                case -1:
                    if (this.nbLikeDislike == 0) { // c'est la première fois, ou relance du dislike
                        document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = true;
                        this.usersLiked.splice(this.usersLiked.indexOf(this.loginUserId), 1);
                        this.usersDisliked.push(this.loginUserId);
                        this.nbLikeDislike = -1;
                        this.addReaction();
                    } else if (this.nbLikeDislike == -1) { // on reeapuye sur dislike = annulation
                        document.getElementById(`${this.concatenate('dislike_', this.post._id)}`).checked = false;
                        this.usersDisliked.splice(this.usersDisliked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addReaction();
                    } else if (this.nbLikeDislike == 1) { // on appuye sur dislike alors que le like était envoyé : il faut annuler le like (envoi d'un zero) et reappuyer le dislike
                        document.getElementById(`${this.concatenate('like_', this.post._id)}`).checked = false;
                        this.usersDisliked.splice(this.usersDisliked.indexOf(this.loginUserId), 1);
                        this.nbLikeDislike = 0;
                        this.addReaction();
                        this.checkLikeOrDislike(-1);
                    }     
                break;
            }
        },
        addReaction() {
            const reactionData = {
                like: this.nbLikeDislike,
                userId: this.loginUserId,
            }
            this.sendReaction(reactionData);
        },
        sendReaction(reactionData) {
            axios
            .post('http://localhost:3000/api/posts/' + this.post._id + '/reaction', reactionData, { headers: { Authorization: "Bearer " + this.loginToken }} )
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
            this.usersLiked = this.post.usersLiked;
            this.usersDisliked = this.post.usersDisliked;
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

i:hover
    animation: echelle 0.8s infinite linear

@keyframes echelle
    50%
        transform: scale(1.1)
    100%
        transform: scale(1)
</style>