<template>

<div id="loginUser">

    <form action="" method="get">
        
        <h2>Se connecter</h2>

        <input type="text" id="emailAddress" v-model="emailAddress" autocomplete="email" placeholder="Votre adresse électronique" minlength="5" maxlength="100">
        <label for="emailAddress">
        </label>

        <input type="password" id="password" v-model="password" autocomplete="current-password" placeholder="Votre mot de passe" minlength="8" maxlength="100">
        <label for="password">
        </label>

        <button v-on:click.prevent="createLogin" type="submit">
            Se connecter
        </button>

        <label for="stayConnected" class="stay-connected">
            <input id="stayConnected" type="checkbox" v-model="stayConnected" checked="true">
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
import router from '../router/index';

import { mapState } from 'vuex';

export default {
    name: 'loginUser',
    // title: 'Groupomania - connexion',
    components: {
    },
    data () {
        return {
            emailAddress: '',
            password: '',
            stayConnected: true,
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
                password: this.password, // TODO affichage en point noir
            }
            this.sendLogin(loginData)
        },
        sendLogin(loginData) {
            console.log("utilisateur sur le point d'être connecté");
            axios
            .post('http://localhost:3000/api/auth/login', loginData)
                .then((loginResponse) => this.login(loginResponse), // si connexion reussie, on store le token
                    console.log("utilisateur connecté"), 
                ) 
                .catch((error) => console.log(error));
            
        },
        login(loginResponse) {
            if (this.stayConnected) {
                console.log(loginResponse.data) // contient userId & token
                this.$store.commit('login', loginResponse.data) // on appelle la mutation VueX "login" à laquelle on donne l'objet loginResponse.data
                this.redirectToFeed() // connexion reussie & storage rempli : redirection vers le feed
            }
            // TODO : sessionStorage si stayConnected est false
        },
        redirectToFeed() {
            this.$router.push("feed");
            console.log("redirection vers feed")
        },
        ifRedirectedFromSignUp() {
            try { // si le signup était bien remplie
                if (this.userDataForLogin.email !== '' &&  typeof this.userDataForLogin.email !== 'undefined' ) {
                    this.emailAddress = this.userDataForLogin.email;
                    this.password = this.userDataForLogin.password;}
            } catch { // si ce n'était qu'un toggle entre sign up et login
                console.log("rien n'a été envoyé par le SignUp")
            }
        },
    },
    mounted () {
        this.ifRedirectedFromSignUp()
    },
    computed: 
        mapState({
            userId: state => state.account.userId
        }),
}
</script>

<style lang="sass" scoped>
#loginUser
    display: flex
    width: 320px

.stay-connected
    font-size: 0.8125rem

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