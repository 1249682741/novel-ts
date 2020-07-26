import request from '@/utils/request'

export function getBookList() {
  return request({
    url: 'book/list',
    method: 'get'
  }) 
} 

export function updataBookList() {
  return request({
    url: 'book/update',
    method: 'get'
  }) 
}

export function delBook(id: string) {
  return request({
    url: `book/del/${id}`,
    method: 'delete'
  }) 
}

export function addBook(data: object) {
  return request({
    url: 'book/add',
    method: 'post',
    data
  }) 
}
