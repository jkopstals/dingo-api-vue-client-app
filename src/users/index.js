
import auth from '../auth'
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
  update (context, tokenparam) {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.post('users/' + context.user.id + '?' + tokenparam, context.user).then((response) => {
      if (response.json().data.id) {
        context.user_clean = JSON.parse(JSON.stringify(context.user))
        context.formErrorsUpdate = []
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      context.formErrorsUpdate = response.json().errors
    })
  },
  delete (context, tokenparam) {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.delete('users/' + context.user.id + '?' + tokenparam, context.user).then((response) => {
      if (response.status === 204) {
        auth.logout()
        context.$router.go('login')
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      console.log(response)
      context.error = response.json().message
    })
  },
  me (context, tokenparam = '') {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.get('users/me?' + tokenparam).then((response) => {
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
  show (context, id, tokenparam = '') {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.get('users/' + id).then((response) => {
      if (response.json().data) {
        context.user = response.json().data
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      console.log(response)
      context.error = response.json().message
    })
  },
  all (context, tokenparam = '', page = 1, limit = 10) {
    // context.error = '' + user.name + ', ' + user.email + ', ' + user.password + ', ' + user.passwordConfirmation + '.'
    context.$http.get('users?page=' + page + '&limit=' + limit + '&' + tokenparam).then((response) => {
      if (response.json().data) {
        context.users = response.json().data
        context.pagination = response.json().meta.pagination
      } else {
        context.error = 'Unknown error'
      }
    }, (response) => {
      console.log(response)
      context.error = response.json().message
    })
  }

}
