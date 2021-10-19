import request from '/@/utils/request'

export function uploadFragment(data: object){
  return request({
    url: '/upload/uploadFragment',
    method: 'post',
    data,
  })
}

export function merge(data: object){
  return request({
    url: '/upload/merge',
    method: 'post',
    data
  })
}