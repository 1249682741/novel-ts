import request from '/@/utils/request'

export function list(data: object){
  return request({
    url: '/menu/list',
    method: 'post',
    data
  })
}
export function add(data: object){
  return request({
    url: '/menu/add',
    method: 'post',
    data
  })
}
export function del(id: string){
  return request({
    url: `/menu/del/${id}`,
    method: 'delete',
  })
}
export function edit(data: object){
  return request({
    url: '/menu/edit',
    method: 'put',
    data
  })
}
export function detail(id: string){
  return request({
    url: `/menu/detail/${id}`,
    method: 'post',
  })
}