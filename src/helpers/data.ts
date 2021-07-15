import { isPlainObject } from './util'

export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data
}

export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        // 这里为什么要使用 try catch 呢，为了捕获什么错误 ？
        try {
            data = JSON.parse(data)
        } catch (error) {
            // do nothing
        }
    }
    return data
}