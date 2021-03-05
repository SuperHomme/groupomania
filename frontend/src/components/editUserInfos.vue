<template>
<div>

    <div class="user__infos">

        <input type="text" :id="user._id" v-model="actualUsername" placeholder="Votre prénom et nom" maxlength="26">
        <label for="username">
        </label>

        <input type="text" :id="user._id" v-model="actualEmail" placeholder="Votre adresse électronique" minlength="5" maxlength="50">
        <label for="email">
        </label>

    </div>

    <button v-on:click.prevent="createUpdatedUserInfos">
        Enregistrer les changements
    </button>

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'editUserInfos',
    data: () => {
        return {
            actualUsername: '',
            actualEmail: '',
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    methods: {
        // TODO : check user input + notification
        createUpdatedUserInfos() {
            const updatedUserInfos = {
                username: this.actualUsername,
                email: this.actualEmail,
            }
            this.sendUpdatedUserInfos(updatedUserInfos)
        },
        sendUpdatedUserInfos(updatedUserInfos) {
            axios
                .put('http://localhost:3000/api/users/' + this.loginUserId + '/infos', updatedUserInfos, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(console.log("user infos modifiées !"), console.log( updatedUserInfos ))
                    .catch((error) => console.log(error));
        },
    setUserInfos() {
        this.actualUsername = this.user.username,
        this.actualEmail = this.user.email
        }
    },
    beforeMount() {
        this.setUserInfos()
    },
}
</script>

<style lang="sass" scoped>
.user
    margin: auto
    margin-top: 6rem
    width: 500px
    height: 100%
    &__infos
        display: flex
        flex-direction: column
        align-items: center
        margin-top: 1rem
        margin-bottom: 1rem

button
    margin-bottom: 1rem
    padding: 0.25rem
    border: thin solid grey
    background: rgb(242, 242, 242)
    outline: none
    cursor: pointer

input
    width: 250px
    margin-bottom: 0.5rem

</style>