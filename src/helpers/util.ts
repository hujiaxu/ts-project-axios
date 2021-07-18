const toString = Object.prototype.toString

export function isDate(val: any): val is Date /* 谓词保护，断定val是Date类型 */ {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}