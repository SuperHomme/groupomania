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

        <input type="text" id="emailAddress" v-model="emailAddress" placeholder="Votre adresse électronique" minlength="5" maxlength="50">
        <label for="emailAddress">
        </label>

        <input type="text" id="password1" v-model="password1" placeholder="Votre mot de passe" minlength="8" maxlength="26">
        <label for="password1">
        </label>

        <input type="text" id="password2" v-model="password2" placeholder="Confirmez votre mot de passe" minlength="8" maxlength="26">
        <label for="password2">
        </label>

        <button v-on:click.prevent="createUser">
            S'inscrire
        </button>

        <button v-on:click.prevent="redirectToLogin">
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
    // title: 'Groupomania - inscription',
    components: {
    },
    data () {
        return {
            firstName: 'Ugo',
            lastName: 'deFéligonde',
            emailAddress: 'ugo.defeli@gmail.com',
            password1: 'mdptireauhazard',
            password2: 'mdptireauhazard',
        }
    },
    props: {
    },
    methods: {
        // eslint-disable-next-line no-unused-vars
        redirectToLogin(userData) {
            console.log("redirectToLogin est appelé");
            console.log(userData.email);
            userData.email !== '' &&  typeof userData.email !== 'undefined' ? // si userData contient un email, cad si le est passée par CreateUser
                (console.log("contient un email"),
                this.$emit('toggle-login-signup', userData)) : // on envoi les données
                this.$emit('toggle-login-signup'); // sinon on envoi que l'évènement
        },
        checkUserData() {
            if (
                this.firstName != '' &&
                this.lastName != '' &&
                this.email != '' &&
                this.password1 != '' // TODO validEmail & validPassword & pssword1 = password 2
            ) {
                console.log("toutes les données sont ok");
                this.createUser();
            }
                console.log("pb sur les données");

        },
        createUser() {
            const userData = {
                username: this.firstName + ' ' + this.lastName,
                email: this.emailAddress,
                password: this.password1,
            }
            this.sendUser(userData)
        },
        sendUser(userData) {
            console.log("utilisateur sur le point d'être inscrit");
            axios
            .post('http://localhost:3000/api/auth/signup', userData)
                .then(
                    (data) => console.log(data),
                    console.log("utilisateur inscrit"),
                    this.redirectToLogin(userData), // on attend que l'utilisateur soit bien créé pour envoyer le préremplissage au login
                ) 
                .catch((error) => console.log(error));
        },
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