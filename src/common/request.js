/** 使用 Promise 二次封装的 uni 请求 */

const BASE_URL = 'http://www.example.com:8090' // 接口请求根域名

export const request = (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      url: (options.baseUrl || BASE_URL) + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success: (res) => {
        if (res.data.status === 401 || res.data.status === 403) {
          uni.removeStorageSync('token')
          uni.removeStorageSync('phone')
        } else {
          if (res.data.status === 200) {
            resolve(res.data.data)
          } else {
            reject(res.data)
          }
        }
      },
      fail: (err) => {
        reject(err)
      }
    }
    if (uni.getStorageSync('token')) {
      params.header = { token: uni.getStorageSync('token') }
    }
    uni.request(params)
  })
}
