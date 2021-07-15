import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    // 转换书写header的大小写格式，这里转换成首字母大写形式
    if (name !== normalizeName && name.toLocaleLowerCase() === normalizeName.toLocaleLowerCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any):any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 解析 headers
export function parseHeaders(headers: string): any {
  const parse = Object.create(null)
  if (!headers) {
    return parse
  }

  headers.split('\r\n').forEach(line => {
    let [ key, val ] = line.split(':')

    if (!key) {
      return
    }

    if (val) {
      val = val.trim()
    }
    parse[key] = val

  })
  return parse
}