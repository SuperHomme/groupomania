<template>
    <div id="showPost">
        <div class="show-post">
            <button v-on:click="showPost()">Mettre à jour</button>
            <div v-for="post in posts" :key="post._id" class="post-global">
                <div class="post">
                    <div class="post__header">
                        <div class="user-picture"><img v-bind:src="require(`@/assets/img/tests/${post.userpicture}`)"></div>
                        <div class="user-name">{{ post.username }}</div>
                        <div class="date">{{ post.date }}</div>
                    </div>
                    <div class="post__content"><img v-bind:src="require(`@/assets/img/tests/${post.img}`)"></div>
                    <div class="post__reactions">
                        <div v-bind:title="post.usersLiked.join('\r\n')" class="fas-count-bind tooltip"><i class="fas fa-thumbs-up"></i><div>{{ post.nbLike }}</div></div>
                        <div v-bind:title="post.usersDisliked.join('\r\n')" class="fas-count-bind tooltip"><i class="fas fa-thumbs-down"></i><div>{{ post.nbDislike }}</div></div>
                        <div class="fas-count-bind" v-on:click="showComment = !showComment"><i class="fas fa-comment"></i><div>{{ post.comments.length }}</div></div>
                        <div class="fas-count-bind heart"><input type="checkbox" name="checkbox" v-bind:id="post._id"/><label v-bind:for="post._id"><i class="fas fa-heart"></i></label><div>{{ post.nbFav }}</div></div>
                    </div>
                    <form action="" method="get" class="post__comment-area" v-show="showComment">
                        <div class="comment-area">
                            <label for="comment"></label>
                            <input type="text" name="comment" id="comment" required>
                        </div>
                        <i class="fas fa-paper-plane"></i>
                    </form>
                </div>
                <div v-for="comment in post.comments" :key="comment.id" class="comment" v-show="showComment">
                    <div class="user-picture comment__user-picture"><img v-bind:src="require(`@/assets/img/tests/${comment.userpicture}`)"></div>
                    <div class="comment__body">
                        <div class="comment__infos">
                            <div class="user-name comment__user-name">{{ comment.username }}</div>
                            <div class="date comment__date">{{ comment.date }}</div>
                        </div>
                        <div class="comment__content">{{ comment.content }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: 'showPost',
    data: () => {
        return {
            posts: [],
            showComment: false
        }
    },
    computed: { // 
    // showPost(){
    //             axios
    //             .get('http://localhost:3000/api/posts')
    //                 .then(reponse => this.posts = reponse.data)
    //                 .catch((error) => console.log(error));
    //         }
    },
    methods: { // partie utilisé aux clic sur les boutons
        showPost(){
            axios
            .get('http://localhost:3000/api/posts')
                .then(reponse => this.posts = reponse.data)
                .catch((error) => console.log(error));
        }
    }
}

</script>

<style lang="sass" scoped>
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

.post-global
    margin-bottom: 2rem

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