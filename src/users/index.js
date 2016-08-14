
export default {

  store (context, user, redirect) {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.post('users', user).then((response) => {
      if (response.json().data.id) {
        if (redirect) {
          context.$router.go(redirect)
        }
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      console.log(response)
      context.error = response.json().errors
    })
  },
  update (context) {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.post('users/' + context.user.id, context.user).then((response) => {
      if (response.json().data.id) {
        context.user_clean = JSON.parse(JSON.stringify(context.user))
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      console.log(response)
      context.error = response.json().errors
    })
  },
  me (context, token) {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.get('users/me?token=' + token).then((response) => {
      if (response.json().data.id) {
        context.user = response.json().data
        context.user_clean = JSON.parse(JSON.stringify(context.user))
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      console.log(response)
      context.error = response.json().message
    })
  },
  show (context, id, data) {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.get('users/' + id).then((response) => {
      if (response.json().data) {
        data = response.json().data
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      console.log(response)
      context.error = response.json().message
    })
  }

}
