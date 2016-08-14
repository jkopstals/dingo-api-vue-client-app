/* require('bootstrap-loader') */
/* Couldn't get the bootstrap-loader to work - no output */

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

/* components */
import Login from './components/Login'
import Me from './components/Me'
import Users from './components/Users'
import Import from './components/Import'
import Register from './components/Register'

import auth from './auth'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = 'http://localhost:8000/api'
// Vue.http.headers.common['Authorization'] = auth.getAuthHeader()
// doesn't seem to work correctly - is cached
// solved in auth module by updating this.$http.headers programmatically

auth.checkAuth()

/* eslint-disable no-new */
export var router = new VueRouter()

router.map({
  'login': {
    component: Login
  },
  'me': {
    component: Me
  },
  'users': {
    component: Users
  },
  'import': {
    component: Import
  },
  'register': {
    component: Register
  }
})

router.redirect({
  '*': 'login'
})

router.start(App, 'body')
