import { ElMessage } from 'element-plus'

type MessageType = 'success' | 'warning' | 'error' | 'info'
const message = (message = '', type: MessageType = 'success') => {
  ElMessage({
    message,
    type,
  })
}

export default message