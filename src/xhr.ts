import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types/index'
 
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {

    const { data = null, url, method = 'get', headers = {}, responseType } = config

    const request = new XMLHttpRequest()
  
    request.open(method.toLocaleUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
  
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        // 为什么 data 没有值的时候，设置请求头 ’content-type‘ 是没有意义的呢？
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
  
    request.send(data)
  })
}