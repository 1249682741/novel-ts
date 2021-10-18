import { RouteRecord } from "vue-router"

/**
 * 没权限访问的路由
 * @param routes 
 */
export const filterRoutes = (routes: RouteRecord[]) => {
  if (routes.length == 0) return []
  let newRoutes = []
  for(let route of routes) {
    if ('children' in route) {
      let children = filterRoutes((route.children as RouteRecord[]))
      children?.length && ( route.children = children)
    }
    newRoutes.push(route)
  }
  return newRoutes
}