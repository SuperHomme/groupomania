<template>

<div :id="post._id" class="post-and-comments">

    <div class="post">

        <div class="post__header">
            <div class="user-picture"><img v-bind:src="require(`@/assets/img/tests/${post.userpicture}`)"></div>
            <div class="user-name">{{ post.username }}</div>
            <div class="date">{{ post.date }}</div>
        </div>

        <div class="post__content">
            <img v-bind:src="post.img">
            <div class="post__legend">{{post.legend}}</div>
        </div>
        
        <addReaction
            :post="post"/>

        <addComment
            :post="post"
            v-show="showComments.includes(post._id)"/>
    
    </div>

    <getAllComments 
        v-for="comment in post.comments"
        v-show="showComments.includes(post._id)"
        :key="comment._id"
        :comment="comment"/>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

import { mapState } from 'vuex'
import addComment from '@/components/addComment.vue'
import addReaction from '@/components/addReaction.vue'
import getAllComments from '@/components/getAllComments.vue'

export default {
    name: 'onePost',
    components: {
        addComment, addReaction, getAllComments
    },
    data: () => {
        return {
            showComment: true
        }
    },
    computed: { // VueX
        ...mapState(['showComments'])
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
.post-and-comments
    margin-bottom: 2rem

.post
    border-radius: 10px
    flex-direction: column
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
    &__header
        height: 50px
        display: flex
        flex-direction: row
        align-items: center
    &__content
        position: relative
        text-align: center
        img
            width: 500px
    &__legend
        position: absolute
        background-color: white
        bottom: 16px
        left: 16px
</style>

<style lang="sass">
.user-picture
    margin-left: 1rem
    height: 30px
    img
        width: 30px
        border-radius: 50%

.user-name
    margin-left: 1rem
    color: black
    font-weight: bold

.date
    color: #cdcdcd
    font-size: 10px
    margin-left: auto
    margin-right: 1rem
</style>