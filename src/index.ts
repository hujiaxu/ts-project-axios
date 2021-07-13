import { AxiosRequestConfig } from './types/index'
import { buildURL } from './helpers/url'
import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  transformConfig(config)
  xhr(config)
}

function transformConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}


export default axios