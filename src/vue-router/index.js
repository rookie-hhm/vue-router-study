import install from './install'
import { createMatcher } from './create-matcher'
import HashHistory from './history/hash-history'
import BrowserHistory from './history/browser-history'

class VueRouter {
  constructor (options) {
    let { routes = [], mode = 'hash' } = options
    this.routes = routes || []
    this.mode = mode

    // 创建匹配器
    this.matcher = createMatcher.call(this, routes)

    this.history = mode === 'hash'
      ? new HashHistory(this)
      : new BrowserHistory(this)

    this.beforeHooks = [] // 全局前置路由守卫
    this.afterHooks = [] // 全局后置路由守卫
  }
  match (location) {
    return this.matcher.match(location)
  }
  init (app) {
    // 根据用户配置作出映射表 
    // 根据当前路径 实现页面跳转的逻辑
    const history = this.history
    // 跳转路径 进行匹配操作 根据路径获取对应的记录
    let location = history.getCurrentLocation()

    history.transitionTo(location, () => history.setupListener)

    // 路径发生变化
    history.listen(route => {
      app._route = route // 修改当前路由信息
    })
  }

  push (location) {
    window.location.hash = location
  }

  beforeEach (fn) {
    this.registerHook(this.beforeHooks, fn)
  }
  afterEach (fn) {
    this.registerHook(this.afterHooks, fn)
  }
  registerHook (list, fn) {
    list.push(fn)
  }
}


VueRouter.install = install

export default VueRouter
