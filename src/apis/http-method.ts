import instance from './http'

type headerType = {
  ['Content-Type']?: string,
}
export const httpPost = (url: string, isEncode = false, headers: headerType = {}) => {
  if (isEncode) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return (data = {}) => {
    return new Promise((resolve, reject) => {
      instance({
        url,
        method: 'POST',
        data,
        headers,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export const httpDelete = (url: string, headers: headerType = {}) => {
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return (data = {}) => {
    return new Promise((resolve, reject) => {
      instance({
        url,
        method: 'DELETE',
        data,
        headers,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export const httpGet = (url: string, headers = {}) => {
  return (params = {}) => {
    return new Promise((resolve, reject) => {
      instance({
        url,
        method: 'GET',
        params,
        headers,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}