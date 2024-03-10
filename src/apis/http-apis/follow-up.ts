import { httpPost, httpGet, httpDelete } from '../http-method'

export default {
  list: httpPost('/followUp/getPage', true),
  add: httpPost('/followUp/add'),
  edit: httpPost('/followUp/edit'),
  detail: httpGet('/followUp/detail'),
  delete: httpDelete('/followUp/delete'),
}
