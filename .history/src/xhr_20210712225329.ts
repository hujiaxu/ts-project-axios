import { AxiosRequestConfig } from './types/index'
 
export default function xhr(config: AxiosRequestConfig) {
  const { data = {}, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toLocaleUpperCase(), url, true)

  request.send(data)
}