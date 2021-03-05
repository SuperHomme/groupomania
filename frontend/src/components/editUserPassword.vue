<template>
<div>

    <button
        @click.prevent="wantChangePassword = true"
        v-if="!wantChangePassword">
        Changer le mot de passe
    </button>

    <div
        class="user__password"
        v-if="wantChangePassword">

        <input type="text" id="oldPassword" v-model="oldPassword" placeholder="mot de passe actuel" minlength="8" maxlength="26">
        <label for="oldPassword">
        </label>

        <input type="text" id="newPassword" v-model="newPassword" placeholder="votre nouveau mot de passe" minlength="8" maxlength="26">
        <label for="newPassword">
        </label>

        <input type="text" id="newConfirmedPassword" v-model="newConfirmedPassword" placeholder="confirmez votre nouveau mot de passe" minlength="8" maxlength="26">
        <label for="newConfirmedPassword">
        </label>

    </div>

    <ul class="warning">
            <li v-if="errorPassword !== ''">{{errorPassword}}</li>
    </ul>

    <button
        v-if="wantChangePassword && errorPassword == ''"
        v-on:click.prevent="createUpdatedPassword, wantChangePassword = false">
        Confirmez le nouveau mot de passe
    </button>

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios')

export default {
    name: 'editUserPassword',
    data: () => {
        return {
            oldPassword: '', // TODO affichage en point noir
            newPassword: '',
            newConfirmedPassword: '',
            errorPassword: '',
            wantChangePassword: false,
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    methods: {
        // TODO : check user input + notification
        checkUpdatedPassword() {
            if (this.newPassword === this.oldPassword && this.newPassword === this.newConfirmedPassword) {
                this.createUpdatedUserInfos()
            } else {
                this.errorPassword = "Les mots de passe de ne correspondent pas";
            }
        },
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
        // TODO : check user input + notification
        createUpdatedPassword() {

        },
    },
}
</script>

<style lang="sass" scoped>
.user
    &__password
        display: flex
        flex-direction: column
        align-items: center
        margin-bottom: 1rem
        ul
            padding-left: 3rem
            padding-right: 2rem
            list-style: square
            background-color: pink

button
    margin-bottom: 1rem
    padding: 0.25rem
    border: thin solid grey
    background: rgb(242, 242, 242)
    outline: none
    cursor: pointer

</style>