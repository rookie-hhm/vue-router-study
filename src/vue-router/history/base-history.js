export const createRoute = (record, location) => {
  let matched = []
  if (record) {
    while (record) {
      matched.unshift(record)
      record = record.parentRoute
    }
  }
  return {
    ...location,
    matched
  }
}

function runQueue (queue, iterator, complete) {
  function next (index) {
    if (index >= queue.length) {
      return complete && complete()
    }
    let hook = queue[index]
    iterator(hook, () => { next(index + 1) })
  }
  next(0)
}
export default class History {
  constructor (router) {
    this.router = router

    // 当前路径对应的记录
    this.current = createRoute(null, {
      path: '/'
    })
    console.log(this.current, 'current')

  }
  transitionTo (location, callback) {
    // 获取当前路径匹配对应的记录
    // 通过路径拿到对应的记录，有了记录就可以找到对应的匹配
    let currentRoute = this.router.match(location)
    let { matched: currentMatched } = currentRoute
    if (location === this.current.path && this.current.matched.length && currentMatched.length) {
      return
    }

    let queue = this.router.beforeHooks
    const iterator = (hook, next) => {
      hook(currentRoute, this.current, next)
    }
    runQueue(queue, iterator, complete)
    function complete () {
      console.log('complete')
      this.current = currentRoute
      // 改变_route 从而更新视图
      this.cb && this.cb(currentRoute)
      this.router.afterHooks.forEach(hook => {
        hook && hook(currentRoute, this.current)
      })
      callback && callback()
    }
    
  }

  listen (cb) {
    this.cb = cb
  }
}