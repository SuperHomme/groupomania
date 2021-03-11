<template>

<div class="fav">
    
    <div class="fas-count-bind heart">
        <input type="checkbox" 
            :id="concatenate('fav_', post._id)"
            v-on:change.prevent="checkFav"/>
        <label :for="concatenate('fav_', post._id)">
            <i class="fas fa-heart"></i>
        </label>
        <div>{{ nbFav }}</div>
    </div>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'favPost',
    data: () => {
        return {
            nbFav: 0,
            usersFaved: [],
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
        concatenate(fav, postId) {
            const inputId = fav + postId;
            return inputId
        },
        checkFav() {
            if (this.nbFav === 1) {
                document.getElementById(`${this.concatenate('fav_', this.post._id)}`).checked = false;
                this.usersFaved.splice(this.usersFaved.indexOf(this.loginUserId), 1);
                this.nbFav = 0;
            } else {
                document.getElementById(`${this.concatenate('fav_', this.post._id)}`).checked = true;
                this.usersFaved.push(this.loginUserId);
                this.nbFav = 1;
            }
            this.addFav();
        },
        addFav() {
            const favData = {
                fav: this.nbFav,
                userId: this.loginUserId,
            }
            this.sendFav(favData);
        },
        sendFav(favData) {
            axios
            .post('http://localhost:3000/api/reactions/' + this.post._id + '/fav', favData, { headers: { Authorization: "Bearer " + this.loginToken }} )
                .then(console.log( this.nbFav + " envoyé !"))
                .catch((error) => console.log(error));
        },
        setChecked() {
            if ( this.post.usersFaved.includes(this.loginUserId) ) {
                document.getElementById(`${this.concatenate('fav_', this.post._id)}`).checked = true;
                this.nbFav = 1;
            }
        },
    },
    beforeMount() {
        const uFaved = this.post.usersFaved.replace(/ ,/g,'').replace(/, /g,'').split(",");
        uFaved[0] == " " ?
            this.usersFaved = [] :
            this.usersFaved = uFaved;
    },
    mounted() {
        this.setChecked();
    }
}
</script>

<style lang="sass" scoped>

.fas-count-bind
    display: flex
    flex-direction: row
    div
        margin-left: 1rem

// logique icons

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