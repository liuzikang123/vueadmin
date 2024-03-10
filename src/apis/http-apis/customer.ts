import { httpPost, httpGet, httpDelete } from '../http-method'

export default {
  list: httpPost('/customer/getPage', true),
  add: httpPost('/customer/add'),
  edit: httpPost('/customer/edit'),
  detail: httpGet('/customer/detail'),
  delete: httpDelete('/customer/delete'),
}