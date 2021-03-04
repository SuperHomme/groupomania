<template>
<div class="edit-profile">

    <form action="" method="get">

        <div class="user-picture"><img v-bind:src="user.userpicture"></div>

        <h2>{{user.username}}</h2>

        <input type="text" :id="user._id" v-model="user.username" placeholder="Votre prénom" maxlength="26">
        <label for="username">
        </label>

        <input type="text" :id="user._id" v-model="user.email" placeholder="Votre adresse électronique" minlength="5" maxlength="50">
        <label for="email">
        </label>

        <button @click.prevent="wantChangePassword = true">
            Changer de mot de passe
        </button>

        <div v-if="wantChangePassword">

            <input type="text" id="password1" v-model="password1" placeholder="Votre mot de passe" minlength="8" maxlength="26">
            <label for="password1">
            </label>

            <input type="text" id="password2" v-model="password2" placeholder="Confirmez votre mot de passe" minlength="8" maxlength="26">
            <label for="password2">
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
.edit-profile
    margin: auto
    margin-top: 6rem
    width: 500px
    height: 100%

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

.user-picture
    margin: 1rem
    height: 250px
    img
        width: 250px
        border-radius: 50%
</style>