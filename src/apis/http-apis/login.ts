import { httpPost } from '../http-method'

export default {
  login: httpPost('/api/user/login')
}