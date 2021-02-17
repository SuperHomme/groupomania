<template>

<div :id="post._id">
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
        v-show="showComment"/>
</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

import addComment from '@/components/addComment.vue'
import addReaction from '@/components/addReaction.vue'

export default {
    name: 'onePost',
    components: {
        addComment, addReaction
    },
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