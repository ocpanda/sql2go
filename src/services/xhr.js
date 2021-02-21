import axios from 'axios'

export function xhr({
  url,
  data,
  params,
  method,
}) {
  new Promise((resolve, reject) => {
    const options = {
      url,
      data,
      params,
      method,
    }
    
    return axios(options).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}