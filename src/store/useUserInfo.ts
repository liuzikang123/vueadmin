import { defineStore } from 'pinia'
import { reactive, computed, onMounted} from 'vue'

interface InfoType {
  username: string,
  status: string
}
interface UserInfoType {
  token: string,
  userInfo: InfoType
}

interface InfoType2 {
  token: string,
  info: InfoType
}

export const useUserInfo = defineStore('userInfo', () => {
  const useInfo = reactive<InfoType2>({
    token: '',
    info: {
      username: '',
      status: '',
    },
  })

  const updateUseInfo = (val: UserInfoType) => {
    useInfo.info = val.userInfo
    useInfo.token = val.token
    window.localStorage.clear()
    window.localStorage.setItem('token', val.token)
    window.localStorage.setItem('userInfo', JSON.stringify(useInfo.info))
  }

  const getUserName = computed(() => {
    return useInfo?.info?.username as string
  })

  onMounted(() => {
    useInfo.token = window.localStorage.getItem('token') || ''
    useInfo.info = JSON.parse(window.localStorage.getItem('userInfo') as string) || {}
  })

  return {
    useInfo,
    updateUseInfo,
    getUserName,
  }
})