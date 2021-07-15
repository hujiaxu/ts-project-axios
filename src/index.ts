import { AxiosRequestConfig } from './types/index'
import { buildURL } from './helpers/url'
import xhr from './xhr'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig) {
  transformConfig(config)
  return xhr(config)
}

function transformConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
}

function transformRequestHeaders(config: AxiosRequestConfig) {
  const { headers, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}


export default axios