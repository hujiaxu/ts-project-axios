export type Method = 
      'get' | 'GET' 
      | 'post' | 'POST' 
      | 'put' | 'PUT' 
      | 'options' | 'OPTIONS' 
      | 'patch' | 'PATCH' 
      | 'head' | 'HEAD'
      | 'delete' | 'Delete'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}