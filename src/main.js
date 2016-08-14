/* Couldn't get the bootstrap-loader to work - no output */
/* require('bootstrap-loader') */

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

Vue.use(VueResource)
Vue.use(VueRouter)

import auth from './auth'

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
