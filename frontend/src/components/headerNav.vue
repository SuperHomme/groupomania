<template>
    <div id="headerNav">
        <nav>
            <div class="nav-container">
            <div id="logo">
                <router-link to="/feed">
                <img src="../assets/img/logo_groupomania.svg" alt="logo" />
                </router-link>
            </div>

            <ul id="icons">
                <li>
                <router-link to="/user-settings">
                    <i class="fas fa-user"></i>
                </router-link>
                </li>
                <li>
                <router-link to="/user-favorites">
                    <i class="fas fa-bell"></i>
                </router-link>
                <span id="nav-notif"></span>
                </li>
                <li>
                <router-link to="/user-inbox">
                    <i class="fas fa-inbox"></i>
                </router-link>
                </li>
                <li>
                    <logoutUser/>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import logoutUser from '@/components/logoutUser.vue'

export default {
    name: 'headerNav',
    components: {
        logoutUser
    }
}
</script>

<style lang="sass">
nav
    padding: 0.8rem 2.4rem
    background: rgba(255, 255, 255, 0.97)
    position: fixed
    width: 100%
    z-index: 2
    box-shadow: 0 2px 4px -3px rgba(51, 51, 51, 0.2)
    
nav .nav-container
    display: flex
    justify-content: space-between
    align-items: center
    max-width: 1050px
    margin: 0 auto
    @media screen and (max-width: 768px) // TODO mixins
        flex-direction: column
        margin: auto

nav .nav-container #logo
    height: 32px
    width: 66%
    @media screen and (max-width: 768px) // TODO mixins
        margin: auto
        margin-bottom: 1rem

nav .nav-container #logo img
    height: 100%

nav .nav-container #icons
    display: flex
    font-size: 24px
    width: 34%
    justify-content: flex-end
    @media screen and (max-width: 768px) // TODO mixins
        justify-content: space-around

nav .nav-container #icons li
    margin-left: calc(35% + 8px)
    list-style: none

nav .nav-container #icons li a
    position: relative

nav .nav-container #icons #nav-notif
    height: 8px
    width: 8px
    border-radius: 50%
    background: #ff2929
    position: absolute
    visibility: hidden
    opacity: 0
    transition: 0.6s
    transform: translate(-4px, -1px)

nav .nav-container #icons i
    transition: 0.25s
    cursor: pointer

nav .nav-container #icons i:hover
    color: rgba(34, 34, 34, 0.65)
</style>