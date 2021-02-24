<template>

<div id="loginUser">

    <form action="" method="get">
        
        <h2>Se connecter</h2>

        <input type="text" name="emailAddress" id="emailAddress" v-model="emailAddress" placeholder="Votre adresse électronique" minlength="5" maxlength="26">
        <label for="comment">
        </label>

        <input type="text" name="password" id="password" v-model="password" placeholder="Votre mot de passe" minlength="8" maxlength="26">
        <label for="comment">
        </label>

        <button v-on:click.prevent="redirectToFeed" type="submit">
            Se connecter
        </button>

        <button v-on:click.prevent="redirectToSignUp">
            Je n'ai pas encore de compte
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
    name: 'loginUser',
    title: 'Groupomania - connexion',
    components: {
    },
    data () {
        return {
            emailAddress: '',
            password: '',
        }
    },
    props: {
    },
    mounted () {
    },
    methods: {
        redirectToSignUp() {
            this.$emit('toggle-login-signup')
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
        redirectToFeed() {
            // $router
            console.log("redirection vers feed")
        },
    }
}
</script>

<style lang="sass" scoped>
#loginUser
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