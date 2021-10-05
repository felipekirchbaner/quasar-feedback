import { Notify } from 'quasar'
import SessionManager from '../../service/session-manager.js'
const login = ({ commit }, credentials) => {
  return SessionManager.authenticate(credentials)
    .then(data => data)
    .catch(e => {
      Notify.create({
        icon: 'warning',
        color: 'negative',
        message: 'Email ou senha inválidos'
      })
    })
    .finally(() => {
      commit('setSession', SessionManager.getSession())
    })
}

const logout = ({ commit }) => {
  const session = SessionManager.logout()
  commit('setSession', session)
}

export { login, logout }
