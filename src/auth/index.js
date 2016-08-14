
export default {
  user: {
    authenticated: false,
    token: ''
  },
  login (context, credentials, redirect) {
    context.$http.post('auth', credentials).then((response) => {
      this.user.authenticated = true
      this.user.token = response.json().token
      window.localStorage.setItem('token', response.json().token)

      if (redirect) {
        context.$router.go(redirect) // for some reason auth headers are not attached immediately
      }
    }, (response) => {
      // console.log(response)
      context.error = response.json().message
    })
    // context.error = 'API validate: ' + credentials.email + ', ' + credentials.password
  },
  checkAuth () {
    var jwt = window.localStorage.getItem('token')
    if (jwt || this.user.token) {
      // do a check against API if it's still valid
      this.user.authenticated = true
    } else {
      this.logout()
    }
  },
  logout () {
    window.localStorage.removeItem('token')
    this.user.token = false
    this.user.authenticated = false
  },
  getAuthHeader () {
    return 'Bearer ' + this.getToken()
  },
  getToken () {
    if (this.user.token) {
      return this.user.token
    } else if (window.localStorage.getItem('token')) {
      return window.localStorage.getItem('token')
    }
  }

}
