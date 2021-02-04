// data + test
const postglobals = [
    {   id: 1,
        post: {
            userpicture: 'assets/img/tests/Hector_Castor.jpg',
            username: "Hector Castor",
            img: 'assets/img/tests/homer_simpson_bush.gif',
            like: 24,
            dislike: 3,
            comment: 8,
            fav: 3
        },
        comments: [{
            id: 122,
            username: "Edouard Canard",
            userpicture : 'assets/img/tests/Edouard_Canard.jpg',
            comment: "MDR Simpson qui recule dans buisson"
        }]
    }
]

const feed = {
    template: '#feed',
    name: 'feed',
    data: () => {
        return {
        postglobals,
        }
    }
}
const userSettings = {
    template: '<h1>mon compte utilisateur, mes paramètres</h1>',
    name: 'userSettings'
}
const userFavorites = {
    template: '<h1>mes favoris</h1>',
    name: 'userFavorites'
}
const userInbox = {
    template: '<h1>ma messagerie (ou notifications ?)</h1>',
    name: 'userInbox'
}

// router
const router = new VueRouter({
    routes: [
        { path: '/', component: feed, name: 'feed' },
        { path: '/user-settings', component: userSettings, name: 'userSettings' },
        { path: '/user-favorites', component: userFavorites, name: 'userFavorites' },
        { path: '/user-inbox', component: userInbox, name: 'userInbox' },
    ]
})

const vue = new Vue({
    router
}).$mount('#app');