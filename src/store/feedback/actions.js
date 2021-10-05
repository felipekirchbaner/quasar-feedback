import { del, get, post, put } from '../../ws/api'
import { Notify } from 'quasar'

const getFeedbacks = async ({ commit, state }, params) => {
  await get('/feedbacks').then(({ data }) => {
    commit('setFeedbacks', data)
  })
}

const deleteFeedback = async ({ commit, state }, feedbackId) => {
  await del(`/feedbacks/${feedbackId}`)

  Notify.create({
    color: 'positive',
    message: 'Feedback excluido com sucesso'
  })
}

const storeFeedback = async ({ commit, state }, params) => {
  await post('/feedbacks', params).then(({ data }) => {
    Notify.create({
      color: 'positive',
      message: 'Feedback cadastrado com sucesso'
    })
  })
}

const showFeedback = async ({ commit }, feedbackId) => {
  await get(`/feedbacks/${feedbackId}`).then(({ data }) => {
    commit('setFeedback', data)
  })
}

const updateFeedback = async ({ commit }, params) => {
  await put(`/feedbacks/${params.id}`, params).then(({ data }) => {
    Notify.create({
      color: 'positive',
      message: 'Feedback atualizado com sucesso'
    })
  })
}

export {
  getFeedbacks,
  deleteFeedback,
  storeFeedback,
  showFeedback,
  updateFeedback
}
