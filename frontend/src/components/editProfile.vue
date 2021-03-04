<template>
<div class="user">

    <form action="" method="get">

        <div class="user__picture">
            <img v-bind:src="user.userpicture">
            <i class="fas fa-plus-square"></i>
        </div>

        <h2>{{actualUsername}}</h2>

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

        <button
            @click.prevent="wantChangePassword = true"
            v-if="!wantChangePassword">
            Changer le mot de passe
        </button>

        <button
            v-if="wantChangePassword"
            v-on:click.prevent="createUpdatedPassword">
            Confirmez le nouveau mot de passe
        </button>

        <div
            class="user__password"
            v-if="wantChangePassword">

            <input type="text" id="password1" v-model="password1" placeholder="mot de passe actuel" minlength="8" maxlength="26">
            <label for="password1">
            </label>

            <input type="text" id="password2" v-model="password2" placeholder="votre nouveau mot de passe" minlength="8" maxlength="26">
            <label for="password2">
            </label>

            <input type="text" id="password3" v-model="password3" placeholder="confirmez votre nouveau mot de passe" minlength="8" maxlength="26">
            <label for="password3">
            </label>

        </div>

        <button
            class="button--red"
            v-on:click.prevent="deleteUser">
            Supprimez votre compte
        </button>

    </form>

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'editProfile',
    data: () => {
        return {
            user: {},
            actualUsername: '',
            actualEmail: '',
            wantChangePassword: false,
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    methods: {
        getOneUser() {
            axios
                .get('http://localhost:3000/api/users/' + this.loginUserId, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(user => {
                        this.user = user.data,
                        this.actualUsername = this.user.username,
                        this.actualEmail = this.user.email })
                    .catch((error) => console.log(error));
        },
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
        // TODO : check user input + notification
        createUpdatedPassword() {

        },
        confirmDeletePost() {
            if (confirm('êtes vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                this.deleteUser();
                console.log('suppression user confirmée');
            } else {
                console.log('suppression user annulée');
            }
        },
        deleteUser() {
            
        },
    },
    computed: {
    },
    beforeMount() { // hook juste avant le montage de la page, permet de gagner du temps
        this.getOneUser();
    },
    mounted () {
        // this.actualUsername = this.user.username;
        // this.actualEmail = this.user.email;
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
    &__picture
        margin: 1rem
        height: 250px
        position: relative
        font-size: 24px
        img
            width: 250px
            border-radius: 50%
        i
            position: absolute
            right: 0
            bottom: 0
    &__password
        display: flex
        flex-direction: column
        align-items: center
        margin-bottom: 1rem

form
    margin-top: 2rem
    padding: 1rem
    border-radius: 10px
    display: flex
    width: 100%
    flex-direction: column
    align-items: center
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
    input
        width: 250px
        margin-bottom: 0.5rem

button
    margin-bottom: 1rem
    padding: 0.25rem
    border: thin solid grey
    background: rgb(242, 242, 242)
    outline: none
    cursor: pointer

.button--red
    background-color: rgb(255, 204, 204)
    color: rgb(255, 77, 77)
    border: thin solid rgb(255, 77, 77)

</style>