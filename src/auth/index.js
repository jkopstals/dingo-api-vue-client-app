
export default {
  user: {
    authenticated: false,
    token: ''
  },
  login (context, credentials, redirect) {
    context.$http.post('auth', credentials).then((response) => {
      this.user.authenticated = true
      this.user.token = response.json().token
      window.localStorage.setItem('token', this.user.token)
      // context.$http.headers['Authorization'] = this.getAuthHeader() // hooray

      if (redirect) {
        context.$router.go(redirect)
      }
    }, (response) => {
      context.error = response.json().message
    })
  },
  checkAuth () {
    var jwt = window.localStorage.getItem('token')
    if (jwt || this.user.token) {
      // TODO: do a check against API if it's still valid
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
    // can't get this to work correctly for some reason
    return 'Bearer ' + this.getToken()
  },
  getToken () {
    if (this.user.token) {
      return this.user.token
    } else if (window.localStorage.getItem('token')) {
      return window.localStorage.getItem('token')
    }
  },
  getTokenQueryParam () {
    return 'token=' + this.getToken()
  }

}
