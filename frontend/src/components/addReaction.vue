<template>

<div class="reactions">
    
    <likeDislikePost
        :post="post"/>

    <!-- COMMENTER -->
    <div class="fas-count-bind" v-on:click.prevent="updateShowComment">
        <i class="fas fa-comment"></i>
        <div>{{ post.comments.length }}</div>
    </div>

    <favPost
        :post="post"/>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

import likeDislikePost from '@/components/likeDislikePost.vue'
import favPost from '@/components/favPost.vue'

export default {
    name: 'addReaction',
    components: {
        likeDislikePost, favPost
    },
    data: () => {
        return {
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
</style>