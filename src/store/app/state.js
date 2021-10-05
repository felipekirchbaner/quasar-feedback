import SessionManager from '../../service/session-manager'

export default function () {
  return {
    loading: false,
    session: SessionManager.getSession()
  }
}
