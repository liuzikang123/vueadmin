import { ElMessage, ElMessageBox } from 'element-plus'

type MessageType = 'success' | 'warning' | 'error' | 'info'
const message = (message = '', type: MessageType = 'success') => {
  ElMessage({
    message,
    type,
  })
}

export default message

export const confirm = (msg?: string, subMsg?: string) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(
      msg || '你确定要删除吗?',
      subMsg || '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(resolve)
    .catch(reject)
  })
}
