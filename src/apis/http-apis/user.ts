import { httpPost, httpGet } from '../http-method'

export default {
  list: httpPost('/user/getPage', true),
  add: httpPost('/user/add'),
  edit: httpPost('/user/edit'),
  detail: httpGet('/user/detail'),
  config: httpGet('/user/config'),
}