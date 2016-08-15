<template>
  <div class="form-register-container container">

    <form class="form-register" v-on:submit.prevent="attemptRegister">
      <h2 class="form-register-heading">Please enter new user info</h2>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <label for="inputName" class="sr-only">Name</label>
      <input type="text" id="inputName" class="form-control" placeholder="Name" v-model="user.name" required autofocus>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.email" required>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password" required>
      <label for="inputPasswordConfirm" class="sr-only">Password Confirmation</label>
      <input type="password" id="inputPasswordConfirm" class="form-control" placeholder="Password Confirmation" v-model="user.password_confirmation" required>
      <br />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
    </form>
    <hr />
    <a class="btn btn-lg btn-primary btn-block btn-login btn-success" v-link="'login'" type="button">Already registered</a>
    <!--<pre>DEBUG: {{ $data | json}}</pre>-->

  </div>
</template>

<script>
// import auth from '../auth'
import users from '../users'
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      error: ''
    }
  },
  methods: {
    attemptRegister () {
      var user = this.user
      users.store(this, user, 'login')
      this.user = user
      this.user_clean = JSON.parse(JSON.stringify(user))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-register-container {
  max-width: 400px;
}
.btn-login {
  margin-top: 12px;
}
</style>
