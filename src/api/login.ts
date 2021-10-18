import request from '/@/utils/request'

export const login = (data: object) => request({
  url: '/user/login',
  method: 'post',
  data
})