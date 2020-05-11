try {
  module.exports = Promise
} catch (e) { }

function Promise(executor) {
  var self = this

  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function () { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function () { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false
  // 2.3.1 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  // 2.3.2 如果 x 为 Promise ，则使 promise 接受 x 的状态
  if (x instanceof Promise) {
    // 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    if (x.status === 'pending') { //because x could resolved by a Promise Object
      x.then(function (v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
      // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
      // 2.3.3.3 如果 x 处于拒绝态，用相同的据因拒绝 promise
    } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
      // new Promise(function(resolve, reject){
      //   return Promise.resolve(2);
      // }); // 相当于第一个resolve 取 resolved(2);
      x.then(resolve, reject)
    }
    return
  }

  // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用

  // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
  // 否则以 e 为据因拒绝 promise
  // 如果一个 promise 被一个循环的 thenable 链中的对象解决，而 [[Resolve]](promise, thenable) 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为据因来拒绝 promise 注6。

  // 2.3.3 如果 x 为对象或者函数
  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      // 2.3.3.1 把 x.then 赋值给 then
      then = x.then //because x.then could be a getter
      // 2.3.3.3 如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
      if (typeof then === 'function') {
        //  2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
        then.call(x, function resolvePromise(y) {
          if (thenCalledOrThrow) return  // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rejectPromise(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          return reject(r)
        })
      } else {
        // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x)
      }
    } catch (e) { // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) {
    return v
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) {
    throw r
  }

  if (self.status === 'resolved') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () { // 异步执行onResolved
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () { // 异步执行onRejected
        try {
          var x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'pending') {
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })
    })
  }
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

/**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部进入FulFilled状态的时候，才会resolve。
 */
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let values = []
    let count = 0
    promises.forEach((promise, index) => {
      promise.then(value => {
        console.log('value:', value, 'index:', index)
        values[index] = value
        count++
        if (count === promises.length) {
          resolve(values)
        }
      }, reject)
    })
  })
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject);
    });
  });
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
Promise.prototype.catch = function (onReject) {
  return this.then(null, onReject)
}

// 返回一个fulfilled状态的promise对象
Promise.resolve = function (value) {
  return new Promise(function (resolve, reject) { resolve(value) })
}

// 返回一个rejected状态的promise对象
Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) { reject(reason) })
}

Promise.deferred = Promise.defer = function () {
  var defer = {}
  defer.promise = new Promise(function (resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

try {
  module.exports = Promise
} catch (e) {
}

// // Promise核心内容完整测试方法
// let promisesAplusTests = require("promises-aplus-tests")
// promisesAplusTests(Promise, function (err) {
//   console.log('err:', err);
//   //全部完成;输出在控制台中。或者检查`err`表示失败次数。 
// })

// promise
// .finally(() => {
//     «statements»
// });

// promise
// .then(
//     result => {
//         «statements»
//         return result;
//     },
//     error => {
//         «statements»
//         throw error;
//     }
// );


Promise.prototype.finally = function (cb) {
  return this.then(
    value => Promise.resolve(cb()).then(() => value),
    reason => Promise.resolve(cb()).then(() => { throw reason })
  );
}


var exrp = '{{a}} {} {{b}}';
exrp.replace(/\{\{([^}]+)}\}/g, function (a, b, c) {
  console.log(a, b, c);
})