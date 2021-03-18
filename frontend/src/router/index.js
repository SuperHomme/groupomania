import Vue from 'vue'
import VueRouter from 'vue-router'
import feed from '../views/feed.vue'
import userSettings from '../views/userSettings.vue'
import userFavorites from '../views/userFavorites.vue'
import userInbox from '../views/userInbox.vue'
import userConnection from '../views/userConnection.vue'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

const isAllowed = (to, from, next) => {
  // eslint-disable-next-line no-constant-condition
  if (JSON.parse(localStorage.getItem("vuex")).account.userId) { // verfication connexion
    next(); return;
  }
  next('/')
}

const routes = [
  {
    path: '/feed',
    component: feed,
    name: 'feed',
    beforeEnter: isAllowed
  },
  {
    path: '/user-settings',
    component: userSettings, 
    name: 'userSettings',
    beforeEnter: isAllowed
  },
  {
    path: '/user-favorites',
    component: userFavorites,
    name: 'userFavorites',
    beforeEnter: isAllowed
  },
  {
    path: '/user-inbox',
    component: userInbox,
    name: 'userInbox',
    beforeEnter: isAllowed
  },
  {
    path: '/',
    component: userConnection,
    name: 'userConnection'
  },
  {
    path: '/logout',
    name: 'logout',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router