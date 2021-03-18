<template>

<form action="" method="get" class="write-comment" >
    <div class="comment-zone">
        <label for="comment"></label>
        <input type="text" name="comment" placeholder="   Tapez ici votre commentaire" minlength="1" maxlength="250" v-model="commentPending" required>
    </div>

    <button v-on:click.prevent="createComment" @keyup.enter="createComment" type="submit">
        <i class="fas fa-paper-plane"></i>
    </button>

</form>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'addComment',
    data: () => {
        return {
            commentPending: "",
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    props: {
        showComment: {
            type: Boolean
        },
        post: {
            type: Object,
            required: true,
        }
    },
    methods: {
        createComment() {
            const commentData = {
                content : this.commentPending,
                user_id: this.loginUserId,
            }
            this.sendComment(commentData);
        },
        concatenate(comment, postId) {
            const inputId = comment + postId;
            return inputId
        },
        sendComment(commentData) {
            console.log("commentaire : " + this.commentPending);
            axios.post('http://localhost:3000/api/comments/' + this.post._id, commentData, { headers: { Authorization: "Bearer " + this.loginToken }} )
                .then(
                    this.reloadGetAllComments(),
                    console.log("nouveau commentaire envoyé"),
                    this.commentPending = "", // RAZ de l'input
                )
                .catch((error) => console.log(error));
        },
        reloadGetAllComments() {
            console.log("on est là " + this.concatenate('comment_', this.post._id));
            this.$root.$emit(this.concatenate('comment_', this.post._id), this.concatenate('comment_', this.post._id))
        }
    }
}
</script>

<style lang="sass" scoped>
.write-comment
    height: 30px
    display: flex
    flex-direction: row
    align-items: center
    padding-top: 1rem
    padding-bottom: 2rem

.comment-zone
    margin-left: 2rem
    margin-right: 1rem
    width: 100%
    input
        width: 100%
        border-radius: 10px
        border-style: solid
        border-color: #cdcdcd
        border-width: 0.1px

i
    margin-left: auto
    margin-right: 4rem

button
    border: none
    background: none
    outline: none
    cursor: pointer
</style>