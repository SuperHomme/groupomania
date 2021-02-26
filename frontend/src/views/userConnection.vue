<template>

<div id="user-connection">

    <img src="../assets/img/logo_groupomania.svg" alt="logo" />

    <h1>{{loginOrSignUp}}</h1>

    <loginUser
        @toggle-login-signup="toggleLoginSignUp"
        v-if="notRegistered"
        :userDataForLogin="userDataForLogin"/>

    <signUpUser
        @toggle-login-signup="toggleLoginSignUp"
        v-if="!notRegistered"/>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
import router from '../router/index'

import loginUser from '@/components/loginUser.vue'
import signUpUser from '@/components/signUpUser.vue'

export default {
    name: 'userConnection',
    title () {
        return `Groupomania — ${this.loginOrSignUp}`
    },
    components: {
        loginUser, signUpUser
    },
    data () {
        return {
            notRegistered: true,
            userDataForLogin: {},
        }
    },
    computed: {
        loginOrSignUp() {
            return this.notRegistered ? "connexion" : "inscription";
        }
    },
    props: {
    },
    methods: {
        toggleLoginSignUp(userData) {
            this.notRegistered = !this.notRegistered;
            this.userDataForLogin = userData;
        },
    },
    mounted () {
    },
}
</script>

<style lang="sass" scoped>
#user-connection
    margin-top: 6rem
    display: flex
    flex-direction: column
    align-items: center

h1
    margin-top: 2rem
    margin-bottom: 0
    font-size: 1rem

img
    width: 250px
</style>