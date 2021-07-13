const toString = Object.prototype.toString

export function isDate(val: any): val is Date /* 谓词保护，断定val是Date类型 */ {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}