<template>
<div class="edit-post">
    
    <div class="edit__title">
        éditer le post
    </div>

    <div class="edit__menu">
        <button
            v-show="!toggleEdit"
            v-on:click.prevent="toggleEdit = true, $root.$emit('edit-one-post', concatenate('legend_', post._id))">
            EDIT.
        </button>
        <button
            v-show="toggleEdit"
            @click.prevent="$emit('hide-edit-menu'), $root.$emit('legend-is-edited', concatenate('legend_', post._id))">
            OK
        </button>
        <button
            v-show="!toggleEdit"
            v-on:click.prevent="deletePost">
            SUPPR.
        </button>
        <button
            @click="$emit('hide-edit-menu')">
            <i class="fas fa-times-circle"></i>
        </button>
    </div>

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'editPost',
    data: () => {
        return {
            toggleEdit: false,
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
    methods: {
        concatenate(legend, postId) {
            const inputId = legend + postId;
            return inputId
        },
        createUpdatedLegend(editedLegend) {
            const updatedLegend = {
                legend: editedLegend,
            }
            this.sendUpdatedLegend(updatedLegend)
        },
        sendUpdatedLegend(updatedLegend) {
            axios
            .put('http://localhost:3000/api/posts/' + this.post._id, updatedLegend, { headers: { Authorization: "Bearer " + this.loginToken }} )
                .then(console.log( this.editedLegend+ " (new legend envoyée !"))
                .catch((error) => console.log(error));
        },
        deletePost() {
            axios
            .delete('http://localhost:3000/api/posts/' + this.post._id, { headers: { Authorization: "Bearer " + this.loginToken }} )
                .then((response) => {
                    if (response) {
                        document.getElementById(this.post._id).style.display = "none";
                        console.log( this.post._id + " post supprimé !")}})
                .catch((error) => console.log(error));
        }
    },
    mounted() {
        this.$root.$on('edited-legend', editedLegend => {
            this.createUpdatedLegend(editedLegend);
        });
    },
}
</script>

<style lang="sass" scoped>
.edit-post
    background-color: rgba(0, 204, 255, .1)
    border-radius: 10px 10px 0px 0px
    color: rgba(0, 204, 255, .5)
    font-style: italic
    display: flex
    justify-content: space-between
    padding: 1rem
    &__menu
        display: flex
        justify-content: space-between
        align-items: center
    button
        color: rgb(0, 204, 255)
        font-weight: bold
        margin-left: 1rem
        border: none
        background: none
        outline: none
        cursor: pointer
</style>