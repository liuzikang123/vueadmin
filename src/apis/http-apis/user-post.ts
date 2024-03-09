import { httpPost, httpGet } from '../http-method'

export default {
  list: httpPost('/userPost/getPage', true),
  add: httpPost('/userPost/add'),
  edit: httpPost('/userPost/edit'),
  detail: httpGet('/userPost/detail'),
}