<template>

<div id="loginUser">

    <form action="" method="get">
        
        <h2>Se connecter</h2>

        <input type="text" id="emailAddress" v-model="emailAddress" placeholder="Votre adresse électronique" minlength="5" maxlength="26">
        <label for="emailAddress">
        </label>

        <input type="text" id="password" v-model="password" placeholder="Votre mot de passe" minlength="8" maxlength="26">
        <label for="password">
        </label>

        <button v-on:click.prevent="createLogin" type="submit">
            Se connecter
        </button>

        
        <label for="password">
            <input type="checkbox" v-model="stayConnected">
            Je veux rester connecté
        </label>

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
    // title: 'Groupomania - connexion',
    components: {
    },
    data () {
        return {
            emailAddress: 'ugo.defeli@gmail.com',
            password: 'mdptireauhazard',
            stayConnected: false,
        }
    },
    props: {
        userDataForLogin: Object
    },
    methods: {
        redirectToSignUp() {
            this.$emit('toggle-login-signup')
        },
        createLogin() {
            const loginData = {
                email: this.emailAddress,
                password: this.password,
            }
            this.sendLogin(loginData)
        },
        sendLogin(loginData) {
            console.log("utilisateur sur le point d'être connecté");
            axios
            .post('http://localhost:3000/api/auth/login', loginData)
                .then((data) => console.log(data),
                    console.log("utilisateur connecté"),
                    // this.redirectToFeed(), // si connexion reussie : redirection vers le feed
                ) 
                .catch((error) => console.log(error));
            
        },
        redirectToFeed() {
            this.$router.push("feed");
            console.log("redirection vers feed")
        },
        ifRedirectedFromSignUp() {
            try {
                if (this.userDataForLogin.email !== '' &&  typeof this.userDataForLogin.email !== 'undefined' ) { // si contient un email
                    this.emailAddress = this.userDataForLogin.email;
                    this.password = this.userDataForLogin.password;}
            } catch {
                console.log("rien n'a été envoyé par le SignUp")
            }
        }
    },
    mounted () {
        this.ifRedirectedFromSignUp()
    },
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