export default {
  user: {
    authenticated: false
  },
  login (context, credentials, redirect) {
    context.error = 'API validate: ' + credentials.email + ', ' + credentials.password
  },
  register (context, user, redirect) {
    context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
  },
  checkAuth () {
    var jwt = window.localStorage.getItem('token')
    if (jwt) {
      // do a check against API if it's still valid
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
  logout () {
    window.localStorage.removeItem('token')
    this.user.authenticated = false
  },
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    }
  }

}
