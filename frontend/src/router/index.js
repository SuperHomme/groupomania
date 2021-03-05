import Vue from 'vue'
import VueRouter from 'vue-router'
import feed from '../views/feed.vue'
import userSettings from '../views/userSettings.vue'
import userFavorites from '../views/userFavorites.vue'
import userInbox from '../views/userInbox.vue'
import userConnection from '../views/userConnection.vue'

Vue.use(VueRouter)

const isAllowed = (to, from, next) => {
  // eslint-disable-next-line no-constant-condition
  if (true) { // verfication connexion
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
    name: 'userSettings'
  },
  {
    path: '/user-favorites',
    component: userFavorites,
    name: 'userFavorites'
  },
  {
    path: '/user-inbox',
    component: userInbox,
    name: 'userInbox'
  },
  {
    path: '/',
    component: userConnection,
    name: 'userConnection'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router