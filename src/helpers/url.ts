import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
            .replace(/%40/g, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params: any) {

  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const value = params[key]

    if (value == null) { // 或者写成 value === null || typeof value === 'undefined'
      return 
    }

    let values: string[]

    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else { // 如果不是数组，则将value包成数组，进而下面的forEach同一遍历
      values = [value]
    }

    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }

      parts.push(`${encode(key)}=${encode(value)}`)
    })


    // 遍历完key时，则params的分支部分的每一部分连接起来
    let serializedParams = parts.join('&')

    if (serializedParams) {
      const markIndex = url.indexOf('#')

      // 如果url是hash路径，则去掉 # 后面的
      if (markIndex !== -1) {
        url = url.slice(0, markIndex)
      }

      // param参数，连接在url上是以？开头的。
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  })

  return url
}