import axios from 'axios'
import { Notify } from 'vant'
// import store from '@/store'
// import { getToken } from '@utils'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(store.getters);
    // if (store.getters.token && config.url != '/authentication-server/oauth/token') {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    //   config.headers['Authorization'] = 'Bearer ' + getToken()
    // config.headers['token'] = `${getToken()}`;
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截 错误时
function resInterceptors(err) {
  const error = err.response
  console.log(err)
  if (error.status) {
    switch (error.status) {
      // 401: 未登录
      case 401:
        Notify('未登录，请先登录')
        setTimeout(() => {
          location.href = '/' // 登录页
        }, 2000)
        // }
        break
      // 403 token过期
      case 403:
        Notify('登录过期，请重新登录')
        setTimeout(() => {
          location.href = '/'
        }, 2000)
        break
      // 其他错误，直接抛出错误提示
      case 406:
        Notify('权限不足')
        break
      case 500:
        Notify('服务器错误')
        break
      case 503:
        Notify('服务器繁忙')
        break
      default:
        Notify(
          error.data.mesg == '无效授权'
            ? '账号或密码错误!'
            : error.data.mesg || error.data.msg
        )
        console.log('[response error] ' + error)
    }
    // console.log(error)
    return Promise.reject(error)
  }
  // 处理 response 时发生异常（包括请求超时，但不包括服务端正常返回的 非2xx 响应）
  // console.log(error)
  return Promise.reject(error)
}

// 在响应之前拦截它们
service.interceptors.response.use(function(response) {
  if (response.data.code === '0000') {
    return response.data
  }
  if (response.data.code === '0001') {
    Notify(response.data.msg)
    return Promise.reject(response.data.msg)
  }
  if (response.data.code === '-1') {
    Notify(response.data.mesg)
    return Promise.reject(response.data.msg)
  }
  if (response.data.code === '9999') {
    Notify('服务器异常')
    return Promise.reject('服务器异常')
  }
}, resInterceptors)

/**
 * @desc download
 * @ params {  }
 */
const download = (url, params = {}, filename, onProgress) => {
  axios
    .request({
      url: process.env.VUE_APP_BASE_API + url,
      method: 'get',
      params,
      //   headers: { Authorization: 'Bearer ' + getToken() },
      responseType: 'blob',
      onDownloadProgress: onProgress
    })
    .then(res => {
      if (!(res.data instanceof Blob)) {
        Notify('下载失败')
      } else {
        const blob = res.data
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, file.fileName)
        } else {
          const aEle = document.createElement('a')
          aEle.href = window.URL.createObjectURL(blob)
          if (!filename) {
            // 没传文件名，就用后台的filename， 后台也没有传就。。。。
            const res_header = res.headers['content-disposition']
            if (res_header.indexOf('fileName=') !== -1) {
              filename = res_header.split('fileName=')[1]
            } else {
              filename = res_header.split('fileName=')[1]
            }
            filename = decodeURIComponent(filename || '')
          }
          aEle.download = filename
          aEle.click()
          window.URL.revokeObjectURL(aEle.href)
        }
      }
    })
}

/**
 * upload 方式：POST Content-Type: mutipart/form-data
 * @param {*} url
 * @param {*} data
 */
const upload = (url, data, config) => {
  return new Promise(function(resolve, reject) {
    axios
      .post(url, data, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

service.downLoad = download
service.upload = upload
export default service
