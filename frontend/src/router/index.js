import Vue from 'vue'
import VueRouter from 'vue-router'
import feed from '../views/feed.vue'
import userSettings from '../views/userSettings.vue'
import userFavorites from '../views/userFavorites.vue'
import userInbox from '../views/userInbox.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: feed,
    name: 'feed'
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router