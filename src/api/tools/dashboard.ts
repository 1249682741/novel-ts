import request from '@/utils/request'

// 报到率统计
export function registerRateData(data: object = {}){
  return request({
    url: '/newstudent/registration/rate',
    method: 'post',
    data
  })
} 


// 报到人数统计
export function registerTotalData(data: object = {}){
  return request({
    url: '/newstudent/registration/statistic',
    method: 'post',
    data
  })
} 

// 其他数据统计
export function otherData(data: object = {}){
  return request({
    url: '/newstudent/otherData/ratio',
    method: 'post',
    data
  })
} 


// 学院报到人数统计
export function collegeRegisterTotalData(data: object = {}){
  return request({
    url: '/newstudent/college/registration/statistic',
    method: 'post',
    data
  })
} 


// 生源地贷款人数、校园地贷款人数、缓缴申请人数统计（后台）
export function greenData(data: object = {}){
  return request({
    url: '/greenChannel/statistic',
    method: 'post',
    data
  })
} 
