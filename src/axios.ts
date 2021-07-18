import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()

  // 为什么会有这一步呢？
  // 防止 调用 request 的this 发生变化吗？
  // instance 本身是 request函数，
  const instance = Axios.prototype.request.bind(context)

  // 这个操作 让instance变为一个拥有 Axios所有属性函数的对象
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
