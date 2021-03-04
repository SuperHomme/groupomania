<template>
<div class="user">

    <form action="" method="get">

        <div class="user__picture"><img v-bind:src="user.userpicture"></div>

        <h2>{{user.username}}</h2>

        <div class="user__infos">

            <input type="text" :id="user._id" v-model="user.username" placeholder="Votre prénom" maxlength="26">
            <label for="username">
            </label>

            <input type="text" :id="user._id" v-model="user.email" placeholder="Votre adresse électronique" minlength="5" maxlength="50">
            <label for="email">
            </label>

        </div>

        <button @click.prevent="wantChangePassword = true">
            Changer de mot de passe
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

        <button v-on:click.prevent="createUser">
            Enregistrer les changements
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
            user: [],
            wantChangePassword: false,
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    methods: {
        getOneUser() {
            axios
                .get('http://localhost:3000/api/users/' + this.loginUserId, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(user => { this.user = user.data, console.log(user.data) })
                    .catch((error) => console.log(error));
            console.log(this.user)
        },
    },
    beforeMount() { // hook juste avant le montage de la page, permet de gagner du temps
        this.getOneUser();
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
        img
            width: 250px
            border-radius: 50%
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

button
    margin-bottom: 1rem

</style>