/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'
import Qs from 'qs'

export default (url = '', data = {}, method = '', param = {}, config) => {
  // GET请求约定格式 数组格式a[0]=1&a[1]=2
  if (method == 'GET') {
    return new Promise((resolve, reject) => {
      request.get(url, {
        params: data,
        // `paramsSerializer` 是一个负责 `params` 序列化的函数
        paramsSerializer: params => {
          return Qs.stringify(params)
        }
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
    // return request.get(url, {
    //   params: data
    // }).then(res => res.data)
    //   .catch(err => { throw err.data })
  }

  // POST请求约定格式 对象格式data.id=1
  if (method == 'POST') {
    return new Promise((resolve, reject) => {
      request.post(url, qs.stringify(data, { arrayFormat: 'indices', allowDots: true }), param, config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }


  if (method == 'PUT') {
    return new Promise((resolve, reject) => {
      request.put(url, qs.stringify(data, { arrayFormat: 'indices', allowDots: true }))
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }


  if (method == 'DELETE') {
    return new Promise((resolve, reject) => {
      request.delete(url, {
        params: data,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
        .then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
    })
  }
}
