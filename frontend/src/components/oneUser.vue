<template>
<div class="user">

    <form action="" method="get">

        <editUserPicture
            :user="user"
            v-if="user.userpicture"/>

        <h2>{{actualUsername}}</h2>

        <editUserInfos
            :user="user"
            v-if="user.username"/>

        <editUserPassword />

        <deleteUser />

    </form>

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

import editUserPicture from '@/components/editUserPicture.vue'
import editUserInfos from '@/components/editUserInfos.vue'
import editUserPassword from '@/components/editUserPassword.vue'
import deleteUser from '@/components/deleteUser.vue'

export default {
    name: 'oneUser',
    components: {
        editUserPicture, editUserInfos, editUserPassword, deleteUser
    },
    data: () => {
        return {
            user: {},
            actualUsername: '',
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    methods: {
        getOneUser() {
            axios
                .get('http://localhost:3000/api/users/' + this.loginUserId, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(user => {
                        this.user = user.data
                        this.actualUsername = user.data.username })
                    .catch((error) => console.log(error));
        },
    },
    beforeMount() { // hook juste avant le montage de la page, permet de gagner du temps
        this.getOneUser();
    },
}
</script>

<style lang="sass" scoped>
.user
    margin: auto
    margin-top: 6rem
    width: 500px
    height: 100%

form
    margin-top: 2rem
    padding: 1rem
    border-radius: 10px
    display: flex
    width: 100%
    flex-direction: column
    align-items: center
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)

</style>