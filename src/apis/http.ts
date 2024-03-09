import axios from 'axios'
import message from '@/utils/message'
import router from '@/router'


interface MatchingCodeType {
  code: number | null | undefined,
  msg: string | null,
  [propName: string]: unknown
}
const matchingCode = (data: MatchingCodeType) => {
  message(data.msg || '', 'error')
  switch(data.code) {
    case 401:
      window.localStorage.clear()
      router.push({
        name: 'login'
      })
      break
    default :
      return;
  }
}

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 12 * 1000,
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  const token = window.localStorage.getItem('token') || null
  config.headers['Authorization'] = `Bearer ${token}`
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  const { data } = response;
  if (data.code === 200) {
    return Promise.resolve(data)
  } else {
    matchingCode(data)
    return Promise.reject(data);
  }
}, (error) => {
  return Promise.reject(error);
});

export default instance