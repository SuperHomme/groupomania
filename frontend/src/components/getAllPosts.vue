<template>

<div class="get-all-posts">

    <div class="post-global"
        v-for="post in posts" 
        :key="post._id">

        <onePost class="post"
            :post="post"/>
        <getAllComments 
            v-for="comment in post.comments"
            :key="comment._id"
            :comment="comment"
            v-show="showComment"/>

    </div>
</div>

</template>

<script>
const axios = require('axios');

import onePost from '@/components/onePost.vue'
import getAllComments from '@/components/getAllComments.vue'

export default {
    name: 'getAllPosts',
    components: {
        getAllComments, onePost
    },
    data: () => {
        return {
            posts: [],
        }
    },
    computed: { // cf vuex
    },
    methods: { // partie utilisé aux clic sur les boutons
    },
    mounted() {
        console.log("coucou");
        axios
            .get('http://localhost:3000/api/posts')
                .then(reponse => this.posts = reponse.data)
                .catch((error) => console.log(error));
    }
}
</script>

<style lang="sass" scoped>
.get-all-posts
    margin-top: 6rem
    width: 500px
    height: 100%

.post-global
    margin-bottom: 2rem
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