<template>

<div class="get-all-posts">

    <div class="post-global"
        v-for="post in posts" 
        :key="post._id">

        <onePost class="post"
            :post="post"/>

        <getAllComments 
            v-for="comment in post.comments"
            v-show="showComments.includes(post._id)"
            :key="comment._id"
            :comment="comment"/>

    </div>
    
</div>

</template>

<script>
const axios = require('axios')

import { mapState } from 'vuex'

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
    computed: { // VueX
        ...mapState(['showComments'])
    },
    methods: { // partie utilisé aux clic sur les boutons
        getAllPosts() {
            axios
                .get('http://localhost:3000/api/posts')
                    .then(reponse => this.posts = reponse.data.reverse()) // on met reverse pour avoir les derniers posts en premier
                    .catch((error) => console.log(error));
        }
    },
    beforeMount() { // hook juste avant le montage de la page, permet de gagner du temps
        this.getAllPosts();

        this.$root.$on('reloadGetAllPosts', data => { this.getAllPosts(data), console.log("on reload le getAllPosts pour voir les derniers post") });
    },
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