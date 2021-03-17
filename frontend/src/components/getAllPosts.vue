<template>
<div class="get-all-posts">
    
    <div 
        v-for="post in posts" 
        :key="post._id">

            <onePost
                :post="post"/>

    </div>

</div>
</template>

<script>
const axios = require('axios')

import onePost from '@/components/onePost.vue'

export default {
    name: 'getAllPosts',
    components: {
        onePost
    },
    data: () => {
        return {
            posts: [],
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    methods: { // partie utilisé aux clic sur les boutons
        getAllPosts() {
            axios
                .get('http://localhost:3000/api/posts', { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(reponse => {
                        this.posts = reponse.data,
                        this.realoadNbPosts(reponse.data) 
                        } )
                    .catch((error) => console.log(error));
        },
        realoadNbPosts(nbPost) {
            this.$emit('reloadNbPosts', nbPost.length)
            console.log(nbPost.length + " posts");
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
</style>