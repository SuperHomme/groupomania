<template>

<div class="post__reactions">

    <!-- LIKE -->
    <div v-bind:title="post.usersLiked.join('\r\n')" class="fas-count-bind tooltip">
        <i class="fas fa-thumbs-up"></i>
        <div>{{ post.nbLike }}</div>
    </div>

    <!-- DISLIKE -->
    <div v-bind:title="post.usersDisliked.join('\r\n')" class="fas-count-bind tooltip">
        <i class="fas fa-thumbs-down"></i>
        <div>{{ post.nbDislike }}</div>
    </div>

    <!-- COMMENTER -->
    <div class="fas-count-bind" v-on:click="showComment = !showComment">
        <i class="fas fa-comment"></i>
        <div>{{ post.comments.length }}</div>
    </div>

    <!-- FAV -->
    <div class="fas-count-bind heart">
        <input type="checkbox" name="checkbox" v-bind:id="post._id"/>
            <label v-bind:for="post._id">
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
            showComment: false,
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
.post
    &__reactions
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

// logique reactions icon coeur
.heart input
    display: none

.heart input:checked + label i
    color: #fb2626
    animation: heart 0.9s forwards ease

@keyframes heart 
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