import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { ERR_CODE } from '/@/enums'
import {RequestResult} from '/@/types/request'
import store from '/@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 50000
})

service.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      config.headers['Authorization'] = store.state.user.token
    }
    return config
  }, 
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) : AxiosResponse<RequestResult> => {
    const res = response.data 
    if (res.code == ERR_CODE.NOLOGIN){
      store.dispatch('user/logout')
    }
    if (response.config.responseType == "blob") {
      return res;
    }

    return res
  },
  (error) => {
    console.log('response err', error)
    ElMessage({
      message: error.msg || '连接错误，请稍后再试！',
      type: 'error',
      duration: 5 *  1000
    })
  }
)

export default service