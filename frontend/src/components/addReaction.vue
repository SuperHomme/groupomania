<template>

<div class="reactions">

    <!-- LIKE -->
    <div v-bind:title="post.usersLiked.join('\r\n')" class="fas-count-bind tooltip thumbs-up">
        <input type="checkbox" name="checkbox"
            id="b"
            :value="post._id"
            :v-model="liked"/>
        <label for="b">
            <i class="fas fa-thumbs-up"></i>
        </label>
        <div>{{ post.nbLike }}</div>
    </div>

    <!-- DISLIKE -->
    <div v-bind:title="post.usersDisliked.join('\r\n')" class="fas-count-bind tooltip thumbs-down">
        <input type="checkbox" name="checkbox"
            id="a"
            :value="post._id"
            :v-model="disliked"/>
        <label for="a">
        <i class="fas fa-thumbs-down"></i>
        </label>
        <div>{{ post.nbDislike }}</div>
    </div>

    <!-- v-on:click="$emit("showComment = !showComment")> -->
    <!-- COMMENTER -->
    <div class="fas-count-bind" v-on:click="showComment = !showComment">
        
        <i class="fas fa-comment"></i>
        <div>{{ post.comments.length }}</div>
    </div>

    <!-- FAV -->
    <div class="fas-count-bind heart">
        <input type="checkbox" name="checkbox"
            id="c"
            :value="post._id"
            :v-model="faved"/>
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
            showComment: true,
            liked: [],
            disliked: [],
            faved: [],
        }
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
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
    color: rgb(0, 0, 153)

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
</style>