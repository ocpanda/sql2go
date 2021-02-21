import axios from 'axios'
import { app } from '@/main.js'
import { convertCase } from '@/helper'

export const xhr = async ({
  url,
  data,
  params,
  method,
}) => {
  const options = {
    url,
    data,
    params,
    method,
  }
  
  const response = axios(options)
  .then(res => [convertCase(res.data.Result)])
  .catch(err => {
    app.config.globalProperties.$message.error('Something went wrong!!!')
    return ([undefined, err])
  })
  .then(([res, err]) => [res, err])

  return response
}