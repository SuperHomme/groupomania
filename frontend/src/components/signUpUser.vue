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

        <input type="text" id="emailAddress" v-model="emailAddress" autocomplete="email" placeholder="Votre adresse électronique" minlength="5" maxlength="50">
        <label for="emailAddress">
        </label>

        <input type="password" id="password1" v-model="password1" autocomplete="current-password" placeholder="Votre mot de passe" minlength="8" maxlength="26">
        <label for="password1">
        </label>

        <input type="password" id="password2" v-model="password2" autocomplete="current-password" placeholder="Confirmez votre mot de passe" minlength="8" maxlength="26">
        <label for="password2">
        </label>

        <button v-on:click.prevent="checkUserData">
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
        checkUserData() {
            this.firstName == '' || this.lastName == '' ?
                alert("nom ou prénom incorrect") :
                this.password1 == '' || !(this.password1 == this.password2) || !this.password1.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) ?
                    alert("votre mot de passe doit comporter au moins 8 caractères, dont un chiffre, une majuscule et une minuscule") :
                    this.emailAddress == '' || !this.emailAddress.match("@") ?
                    alert("email incorrect") :
                        (console.log("toutes les données sont ok"),
                        this.createUser())
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
            axios
            .post('http://localhost:3000/api/auth/signup', userData)
                .then(
                    (data) => console.log(data),
                    console.log("utilisateur inscrit"),
                    this.redirectToLogin(userData), // on attend que l'utilisateur soit bien créé pour envoyer le préremplissage au login
                ) 
                .catch((error) => console.log(error));
        },
        // eslint-disable-next-line no-unused-vars
        redirectToLogin(userData) {
            console.log("redirectToLogin est appelé");
            console.log(userData.email);
            userData.email !== '' &&  typeof userData.email !== 'undefined' ? // si userData contient un email, cad si le est passée par CreateUser
                (console.log("contient un email"),
                this.$emit('toggle-login-signup', userData)) : // on envoi les données
                this.$emit('toggle-login-signup'); // sinon on envoi que l'évènement
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