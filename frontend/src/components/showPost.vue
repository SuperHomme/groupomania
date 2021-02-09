<template>
    <div id="showpost">
        <div class="show-post">
            <div v-for="postglobal in postglobals" :key="postglobal.id" class="post-global">
                <div class="post">
                    <div class="post__header">
                        <div class="user-picture"><img v-bind:src="require(`@/assets/img/tests/${postglobal.post.userpicture}`)"></div>
                        <div class="user-name">{{ postglobal.post.username }}</div>
                        <div class="date">{{ postglobal.post.date }}</div>
                    </div>
                    <div class="post__content"><img v-bind:src="require(`@/assets/img/tests/${postglobal.post.img}`)"></div>
                    <div class="post__reactions">
                        <div v-bind:title="postglobal.post.usersLike.join('\r\n')" class="fas-count-bind tooltip"><i class="fas fa-thumbs-up"></i><div>{{ postglobal.post.like }}</div></div>
                        <div v-bind:title="postglobal.post.usersDislike.join('\r\n')" class="fas-count-bind tooltip"><i class="fas fa-thumbs-down"></i><div>{{ postglobal.post.dislike }}</div></div>
                        <div class="fas-count-bind" @click="showComment = !showComment"><i class="fas fa-comment"></i><div>{{ postglobal.comments.length }}</div></div>
                        <div class="fas-count-bind"><i class="fas fa-heart"></i><div>{{ postglobal.post.fav }}</div></div>
                    </div>
                    <form action="" method="get" class="post__comment-area" v-show="showComment">
                        <div class="comment-area">
                            <label for="comment"></label>
                            <input type="text" name="comment" id="comment" required>
                        </div>
                        <i class="fas fa-paper-plane"></i>
                    </form>
                </div>
                <div v-for="comment in postglobal.comments" :key="comment.id" class="comment" v-show="showComment">
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
import {postglobals} from '../assets/data.js';

export default {
    name: 'showPost',
    data: () => {
        return {
            postglobals,
            showComment: false
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
</style>