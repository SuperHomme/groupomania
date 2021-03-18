<template>

    <button
        class="button--red"
        v-on:click.prevent="confirmDeletePost">
        Supprimez votre compte
    </button>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'deleteUser',
    data: () => {
        return {
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    methods: {
        confirmDeletePost() {
            if (confirm('êtes vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                console.log('suppression user confirmée');
                this.deleteUser();
            } else {
                console.log('suppression user annulée');
            }
        },
        deleteUser() {
            axios
                .delete('http://localhost:3000/api/users/' + this.loginUserId, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then((response) => console.log(response),
                        this.logout(), console.log("utilisateur supprimé !")
                        // TODO response.data.message à mettre en notif
                        )
                    .catch((error) => console.log(error));
        },
        logout() {
            this.$store.commit('logout');
            this.$router.push('logout');
        },
    },
}
</script>

<style lang="sass" scoped>

button
    margin-bottom: 1rem
    padding: 0.25rem
    background: rgb(242, 242, 242)
    outline: none
    cursor: pointer

.button--red
    background-color: rgb(255, 204, 204)
    color: rgb(255, 77, 77)
    border: thin solid rgb(255, 77, 77)

</style>