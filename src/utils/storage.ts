export const TokenKey = 'token'
export const SliderBarKey = 'sliderBar'
export const VisitedViewsKey = 'visitedViews'
export const CachedViewsKey = 'CachedViewsKey'


export const Storage = {
  get (key: string, def = '') {
    try{
      return JSON.parse(sessionStorage.getItem(key) || def)
    } catch(err){
      return sessionStorage.getItem(key)
    }
  },
  set(key: string, val:any) {
    sessionStorage.setItem(key, isObject(val) ? JSON.stringify(val) : val)
  },
  removeItem(key: string) {
    sessionStorage.removeItem(key)
  },
  clear() {
    sessionStorage.clear()
  }
}

function isObject(val: any){
  return val !== null && Array.prototype.toString.call(val).slice(8, -1) === 'object'
}