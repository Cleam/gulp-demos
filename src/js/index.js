var DfttModule = (function (dm) {
  var Index = {
    name: 'Index',
    init: function () {
      console.log('Index init...')
    },
    getName: function () {
      return name
    },
    // 私有方法以下划线开头（约定外部不调用）
    _privateFunc: function () {}
  }

  // 给模块单独定义一个命名空间
  dm[Index.name] = Index
  // 存储一系列初始化方法
  dm.inits = dm.inits || []
  dm.inits.push(Index.init)
  return dm
})(DfttModule || {})

document.ready = function (callback) {
  // 兼容FF,Google
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', arguments.callee, false)
      callback()
    }, false)
  } else if (document.attachEvent) { // 兼容IE
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == 'complete') {
        document.detachEvent('onreadystatechange', arguments.callee)
        callback()
      }
    })
  } else if (document.lastChild == document.body) {
    callback()
  }
}

document.ready(function () {
  DfttModule.inits.forEach(function (fn) {
    if (typeof fn === 'function') {
      fn()
    } else {
      console.error(fn + ' is not a function!')
    }
  }, this)
})
