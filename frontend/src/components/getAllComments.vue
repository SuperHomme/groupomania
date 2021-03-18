<template>

<div class="get-all-comments">
    
    <div 
        v-for="comment in comments" 
        :key="comment._id">

            <oneComment
                :comment="comment"/>

    </div>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

import oneComment from '@/components/oneComment.vue'

export default {
    name: 'getAllComments',
    components: {
        oneComment
    },
    data: () => {
        return {
            comments: [],
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    methods: { // partie utilisé aux clic sur les boutons
        concatenate(comment, postId) {
            const inputId = comment + postId;
            return inputId
        },
        getAllComments(postId) {
            console.log(postId)
            postId = postId.split("_").[1];
            axios
                .get('http://localhost:3000/api/comments/' + postId, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(reponse => {
                        this.comments = reponse.data,
                        this.reloadNbComments(reponse.data)
                        console.log(reponse.data) })
                    .catch((error) => console.log(error));
        },
        reloadNbComments(nbComments) {
            this.$root.$emit(this.concatenate('nb-comment_', this.post._id), nbComments.length)
        }
    },
    mounted() {
        this.$root.$on(this.concatenate('comment_', this.post._id), postId => { this.getAllComments(postId) });
    },
    beforeMount() { // hook juste avant le montage de la page, permet de gagner du temps
    },
}
</script>

<style lang="sass" scoped>
</style>