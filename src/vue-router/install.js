import RouterLink from './components/router-link'
import RouterView from './components/router-view'
let Vue 
export default function (_Vue) {
  Vue = _Vue
  // 每个自组建获取到router属性
  Vue.mixin({
    beforeCreate () { // 执行顺序是先父后子
       if (this.$options.router) { // 说明是根实例
         this._routerRoot = this
         this._router = this.$options.router
         this._router.init(this) // this 指向最外层的app
        // 路径切换更新视图
         Vue.util.defineReactive(this, '_route', this._router.history.current)
       } else { // 子组建
          // 如果父级有，就直接使用父级的，
          // 这里的this._routerRoot 其实就是根Vue的实例
         this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
       }
    }
  })
  Object.defineProperty(Vue.prototype, '$route', { // 存放的path，matched
    get () {
      return this._routerRoot._route
    }
  })
  Object.defineProperty(Vue.prototype, '$router', { // 存放的path，matched
    get () {
      return this._routerRoot._router
    }
  })
  // 安装全局组建
  installComponent(Vue)
}

function installComponent (Vue) {
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
}