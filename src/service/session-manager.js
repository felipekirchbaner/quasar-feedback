import { LocalStorage } from 'quasar'
import { post } from '../ws/api.js'

export default class SessionManager {
  static authenticate (credentials = {}) {
    this.logout()
    return post('/sessions', credentials)
      .then(({ data }) => {
        const user = {
          user: data.user,
          token: data.token
        }

        if (user.token) {
          this.setSession(user)
        }

        return user
      })
      .catch(e => {
        this.logout()
        throw e
      })
  }

  static logout () {
    const session = {
      user: null,
      token: null
    }

    this.setSession(session)

    return session
  }

  static setSession (user) {
    LocalStorage.set('user', user)
  }

  static getSession () {
    return LocalStorage.getItem('user')
  }

  static get isAuth () {
    const session = this.getSession()
    if (session) {
      return session.user !== null && session.token !== null
    }
    return false
  }
}
