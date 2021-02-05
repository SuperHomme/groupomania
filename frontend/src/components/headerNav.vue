<template>
    <div id="headerNav">
        <nav>
            <div class="nav-container">
            <div id="logo">
                <router-link to="/">
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
                    <i class="fas fa-heart"></i>
                </router-link>
                <span id="nav-notif"></span>
                </li>
                <li>
                <router-link to="/user-inbox">
                    <i class="fas fa-inbox"></i>
                </router-link>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'headerNav'
}
</script>