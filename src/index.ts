import { AxiosRequestConfig } from './types/index'
import { buildURL } from './helpers/url'
import xhr from './xhr'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig) {
  transformConfig(config)
  xhr(config)
}

function transformConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}


export default axios