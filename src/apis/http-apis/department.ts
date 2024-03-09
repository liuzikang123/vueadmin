import { httpPost, httpGet } from '../http-method'

export default {
  list: httpPost('/department/getPage', true),
  add: httpPost('/department/add'),
  edit: httpPost('/department/edit'),
  detail: httpGet('/department/detail'),
}