import axios from 'axios'

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      baseURL: 'https://www.fastmock.site/mock/399fa18dcb16395f9f4bd9ba42f75cb1/shop',
      headers: {
        'Conntent-Type': 'application/json'
      }
    }).then(response => {
      console.log('resolve')
      resolve(response.data)
    }, err => {
      console.log('reject')
      reject(err)
    })
  })
}
