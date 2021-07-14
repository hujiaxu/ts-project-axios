import { AxiosRequestConfig } from './types/index'
 
export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', headers = {} } = config

  const request = new XMLHttpRequest()

  request.open(method.toLocaleUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (data === null && name.toLocaleLowerCase() === 'content-type') {
      // 为什么 data 没有值的时候，设置请求头 ’content-type‘ 是没有意义的呢？
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}