import request from '/@/utils/request'

export function list(data: object){
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}
export function add(data: object){
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
export function del(id: string){
  return request({
    url: `/user/del/${id}`,
    method: 'delete',
  })
}
export function edit(data: object){
  return request({
    url: '/user/edit',
    method: 'put',
    data
  })
}
export function detail(id: string){
  return request({
    url: `/user/detail/${id}`,
    method: 'post',
  })
}