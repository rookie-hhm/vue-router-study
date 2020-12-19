export default function createRouteMap (routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || []
  let pathMap = oldPathMap || {}

  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })

  return {
    pathList,
    pathMap
  }
}

function addRouteRecord (route, pathList, pathMap, parentRoute) {
  let record = Object.assign({}, route)
  // 如果有父级，则把两个路径拼接生成新路径
  record.path = parentRoute ? `${parentRoute.path}/${record.path}` : record.path
  record.parentRoute = parentRoute // 保存当前路由记录的父级路由记录
  
  let path = record.path
  if (!pathMap[route]) {
    pathMap[path] = record
    pathList.push(path)
  }
  if (record.children && record.children.length) {
    record.children.forEach(route => {
      addRouteRecord(route, pathList, pathMap, record)
    })
  }
}