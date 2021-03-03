<template>
<div class="logout-user">
    
    <router-link to="/">
        <i @click="logout" class="fas fa-sign-out-alt"></i>
    </router-link>

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'logoutUser',
    data: () => {
        return {
        }
    },
    methods: {
        logout() {
            this.$store.commit('logout')
        },
    }
}
</script>

<style lang="sass" scoped>
</style>