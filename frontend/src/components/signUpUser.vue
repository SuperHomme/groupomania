<template>

<div id="signUpUser">

    <form action="" method="get">

        <h2>S'inscrire</h2>

        <input type="text" id="firstName" v-model="firstName" placeholder="Votre prénom" maxlength="26">
        <label for="firstName">
        </label>

        <input type="text" id="lastName" v-model="lastName" placeholder="Votre nom" maxlength="26">
        <label for="lastName">
        </label>

        <input type="text" id="emailAddress" v-model="emailAddress" placeholder="Votre adresse électronique" minlength="5" maxlength="26">
        <label for="emailAddress">
        </label>

        <input type="text" id="password1" v-model="password1" placeholder="Votre mot de passe" minlength="8" maxlength="26">
        <label for="password1">
        </label>

        <input type="text" id="password2" v-model="password1" placeholder="Confirmez votre mot de passe" minlength="8" maxlength="26">
        <label for="password2">
        </label>

        <button>
            S'inscrire
        </button>

        <button v-on:click="redirectToLogin">
            J'ai déjà un compte
        </button>

    </form>
    
</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
import router from '../router/index'

export default {
    name: 'signUpUser',
    title: 'Groupomania - inscription',
    components: {
    },
    data () {
        return {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password1: '',
            password2: '',
        }
    },
    props: {
    },
    methods: {
        redirectToLogin() {
            this.$emit('toggle-login-signup')
        },
    },
    createUser() {
        const userData = {
            username: this.firstName + ' ' + this.lastName,
            email: this.emailAddress,
            password: this.password1,
        }
        this.sendComment(userData);
    },
    sendUser(userData) {
            console.log("utilisateur sur le point d'être conecté");
            axios
            .post('http://localhost:3000/api/posts', userData)
                .then(  
                    console.log("utilisateur connecté"),
                ) 
                .catch((error) => console.log(error));
            // this.redirectToFeed()
    },
    mounted () {
    },
}
</script>

<style lang="sass" scoped>
#signUpUser
    display: flex
    width: 320px

form
    margin-top: 2rem
    padding: 1rem
    border-radius: 10px
    display: flex
    width: 100%
    flex-direction: column
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
</style>