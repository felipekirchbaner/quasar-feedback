import { get } from '../../ws/api'

const getUsers = async ({ commit }) => {
  await get('/users').then(({ data }) => {
    commit('setUsers', data)
  })
}

export {
  getUsers
}
