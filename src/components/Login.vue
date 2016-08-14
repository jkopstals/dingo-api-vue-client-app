<template>
  <div class="form-signin-container container">

    <form class="form-signin" v-on:submit.prevent="attemptLogin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
      </div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="credentials.email" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="credentials.password" required>
      <br />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <hr />
    <a class="btn btn-lg btn-primary btn-block btn-register btn-success" v-link="'register'" type="button">Register</a>
    <pre>DEBUG: {{ $data | json}}</pre>


  </div>
</template>

<script>
import auth from '../auth'
export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    attemptLogin () {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }
      auth.login(this, credentials, 'me')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-signin-container {
  max-width: 400px;
}
.btn-register {
  margin-top: 12px;
}
</style>
