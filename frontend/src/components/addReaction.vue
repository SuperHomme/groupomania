<template>

<div class="reactions">
    
    <likeDislikePost
        :post="post"/>

    <!-- COMMENTER -->
    <div class="fas-count-bind" v-on:click.prevent="updateShowComment(), showCommentState()">
        <i class="fas fa-comment"></i>
        <div>{{ nbComments }}</div>
    </div>

    <favPost
        :post="post"/>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

import { mapState } from 'vuex'
import likeDislikePost from '@/components/likeDislikePost.vue'
import favPost from '@/components/favPost.vue'

export default {
    name: 'addReaction',
    components: {
        likeDislikePost, favPost
    },
    data: () => {
        return {
            nbComments: '',
        }
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    methods: {
        concatenate(comment, postId) {
            const inputId = comment + postId;
            return inputId
        },
        updateShowComment() {
            this.$store.commit("updateShowComments", this.post._id)
        },
        showCommentState() {
            if (this.showComments.includes(this.post._id)) {
                this.$root.$emit(this.concatenate('comment_', this.post._id), this.concatenate('comment_', this.post._id))}
        }
    },
    mounted() {
        this.$root.$on(this.concatenate('nb-comment_', this.post._id), nbComments => { this.nbComments = nbComments});
    },
    computed: { // VueX
        ...mapState(['showComments'])
    },
    beforeMount() {
        this.nbComments = this.post.nbComment
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