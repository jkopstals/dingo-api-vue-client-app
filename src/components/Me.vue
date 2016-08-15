<template>
  <div class="form-update-container container">

    <form class="form-update" v-on:submit.prevent="attemptUpdate">
      <h2 class="form-update-heading">Profile info</h2>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <div class="form-group">
        <label for="inputName" class="sr-only">Name</label>
        <input type="text" id="inputName" class="form-control" placeholder="Name" v-model="user.name" required autofocus>
        <span v-if="formErrorsUpdate['name']" class="error text-danger">{{ formErrorsUpdate['name'] }}</span>
      </div>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.email" required>
        <span v-if="formErrorsUpdate['email']" class="error text-danger">{{ formErrorsUpdate['email'] }}</span>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password" required>
        <span v-if="formErrorsUpdate['password']" class="error text-danger">{{ formErrorsUpdate['password'] }}</span>
      </div>
      <div class="form-group">
        <label for="inputPasswordConfirm" class="sr-only">Password Confirmation</label>
        <input type="password" id="inputPasswordConfirm" class="form-control" placeholder="Password Confirmation" v-model="user.password_confirmation" required>
        <span v-if="formErrorsUpdate['password_confirmation']" class="error text-danger">{{ formErrorsUpdate['password_confirmation'] }}</span>
      </div>
      <div class="form-group">
        <button class="btn btn-lg btn-primary btn-block" v-bind:class="{'disabled' :!isDirty}" type="submit">Update</button>
      </div>
    </form>
    <hr />
    <a class="btn btn-lg btn-primary btn-block btn-register btn-success" @click="attemptDelete" type="button">Delete my user</a>
    <!--<pre>DEBUG: {{ $data | json}}</pre>-->

  </div>
</template>

<script>
import auth from '../auth'
import users from '../users'
export default {
  data () {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      user_clean: {},
      formErrorsUpdate: {},
      error: ''
    }
  },
  computed: {
    isDirty: function () {
      return !(this.user.name === this.user_clean.name &&
        this.user.email === this.user_clean.email &&
        this.user.password === this.user_clean.password &&
        this.user.password_confirmation === this.user_clean.password_confirmation)
        // TODO: optimize
    }
  },
  methods: {
    attemptUpdate () {
      users.update(this, auth.getTokenQueryParam())
    },
    attemptDelete () {
      users.delete(this, auth.getTokenQueryParam())
    }
  },
  route: {
    canActivate (transition) {
      if (auth.user.authenticated) {
        transition.next()
      } else {
        transition.abort()
      }
    },
    activate ({ next }) {
      users.me(this, auth.getTokenQueryParam())
      next()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-update-container {
  max-width: 400px;
}
</style>
