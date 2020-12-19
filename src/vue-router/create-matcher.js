import createRouteMap from './create-route-map'
import { createRoute } from './history/base-history'
export function createMatcher (routes) {

  // 创建路由映射表
  let { pathList, pathMap } = createRouteMap(routes)

  // 1.匹配路由
  function match (location) {
    let matchedRecord = pathMap[location]
    return createRoute(matchedRecord, {
      path: location
    })
  }
  // 动态添加路由
  function addRoutes (routes) {
    // 递归调用
    createRouteMap(routes, pathList, pathMap)
  }
  return {
    match,
    addRoutes
  }
}