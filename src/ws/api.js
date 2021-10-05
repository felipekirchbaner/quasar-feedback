import axios from 'axios'
import SessionManager from '../service/session-manager'

axios.interceptors.request.use(
  function (config) {
    const session = SessionManager.getSession()
    config.baseURL = process.env.API_URL
    config.headers.Authorization = `Bearer ${session.token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * @todo Vuex plugin
 * Quando a API responder com 401
 * Efetua o logout do usuário no app
 */
const VuexStatusPlugin = () => {
  return store => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          store.dispatch('app/logout')
        }
        return Promise.reject(error)
      }
    )
  }
}

const get = async (path, params) => {
  return axios.get(path, { params })
}

const post = async (path, params) => {
  return axios.post(path, params)
}

const put = async (path, params) => {
  return axios.put(path, params)
}

const del = async path => {
  return axios.delete(path)
}

export { axios, get, post, put, del, VuexStatusPlugin }
