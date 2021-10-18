/**
 * 将数据从数组转化成对象映射
 * @param arr 数组必传
 * @param key 必传
 * @param value 非必传。 若传空字符传或null则将整个项作为val， 
 */
export function getObjFromArr(arr: any[], key: string = 'value', value:string = 'label'){
  if (!key) {
    console.warn('funciton `optArr2Obj` need to receive `key` params');
    return 
  }
  let obj:any = {}
  arr.forEach((v) => {
    obj[v[key]] = value ? v[value] : value
  })
  return obj
}