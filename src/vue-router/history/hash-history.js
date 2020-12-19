import History from './base-history'

const setHash = () => {
  if (!window.location.hash) {
    window.location.hash = '/'
  }
}

export default class HashHistory extends History {
  constructor (router) {
    super(router)
    setHash()
  }
  getCurrentLocation () {
    return window.location.hash.slice(1)
  }
  setupListener () {
    window.addEventListener('hashchange', () => {
      // 再次执行匹配操作
      this.transitionTo(this.getCurrentLocation())
    })
  }
}