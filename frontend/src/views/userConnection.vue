<template>

<div id="user-connection">

    <img src="../assets/img/logo_groupomania.svg" alt="logo" />

    <loginUser
        @toggle-login-signup="toggleLoginSignUp"
        v-show="notRegistered"/>

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
    components: {
        loginUser, signUpUser
    },
    data () {
        return {
            notRegistered: true,
        }
    },
    props: {
    },
    methods: {
        toggleLoginSignUp() {
            this.notRegistered = !this.notRegistered;
        }
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

img
    width: 250px
</style>