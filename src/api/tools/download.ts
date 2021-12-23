import request from '/@/utils/request'

export function downloadFragment(data = {}, headers = {}){
  return request({
    url: `/download/downloadFragment`,
    method: 'post',
    data,
    headers,
  })
}