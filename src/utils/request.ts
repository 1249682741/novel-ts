import axios from 'axios'
import {Message} from 'element-ui'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 50000
})

service.interceptors.request.use(
  (config) => {
    return config
  }, 
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (response.config.responseType == "blob") {
      return res;
    }

    return res
  },
  (error) => {
    console.log('response err', error)
    Message({
      message: error.msg || '连接错误，请稍后再试！',
      type: 'error',
      duration: 5 *  1000
    })
  }
)

export interface RequestResult {
  code?: number;
  data: any;
  message?: string;
}

export default service