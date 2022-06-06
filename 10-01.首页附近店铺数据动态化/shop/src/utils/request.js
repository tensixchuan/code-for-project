import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/399fa18dcb16395f9f4bd9ba42f75cb1/shop',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(response => {
      console.log('resolve')
      resolve(response.data)
    }, err => {
      console.log('reject')
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(response => {
      console.log('resolve')
      resolve(response.data)
    }, err => {
      console.log('reject')
      reject(err)
    })
  })
}
