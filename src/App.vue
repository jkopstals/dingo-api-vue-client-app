<template>
<body>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><a v-link="'auth'" v-if="!user.authenticated">Login</a></li>
          <li><a v-link="'register'" v-if="!user.authenticated">Register</a></li>
          <li><a v-link="'me'" v-if="user.authenticated">My Profile</a></li>
          <li><a v-link="'users'" v-if="user.authenticated">All users</a></li>
          <li><a v-link="'import'" v-if="user.authenticated">Import users</a></li>
          <li><a v-link="'login'" v-if="user.authenticated" @click="logout()">Log Out</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</body>
</template>

<script>
import auth from './auth'
export default {
  replace: true,
  data () {
    return {
      user: auth.user
    }
  },
  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
