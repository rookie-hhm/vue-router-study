export default {
  name: 'router-view',
  functional: true, // 没有this,没有生命周期
  render (h, context) {
    let { parent, data } = context
    let route = parent.$route
    let depth = 0
    data.routerView = true // 标识当前组件是routerview
    
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    let record = route.matched[depth] // 取到路由记录

    if (!record) {
      return h() // 渲染空元素
    }
    
    return h(record.component, data)
  }
}