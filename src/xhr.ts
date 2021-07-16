import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types/index'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'
 
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {

    const { data = null, url, method = 'get', headers = {}, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (timeout) {
      request.timeout = timeout
    }
  
    request.open(method.toLocaleUpperCase(), url, true)

    request.onerror = function handleError() {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(
        `Timeout of ${config.timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      ))
    }
    request.onreadystatechange = function handleLoad() {

      // request.readyState === 0 unsent
      // request.readyState === 1 opened
      // request.readyState === 2 headers_received
      // request.readyState === 3 loading
      // request.readyState === 4 done
      if (request.readyState !== 4) {
        return
      }
      // Before the request completes, the value of status is 0. 
      // Browsers also report a status of 0 in case of XMLHttpRequest errors.
      // 当出现网络错误或者超市错误的时候，request.status的值都为0
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 进一步的错误处理，对于状态码在 200 ~ 300 之外的相应做错误处理
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
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