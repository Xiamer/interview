function Promise(executor) {
  self = this;
  self.status = 'pedding';
  self.data = undefined;
  self.onResolvedCb = [];
  self.onRejectedCb = [];

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.status === 'pedding') {
        self.status = 'resolved';
        self.data = value;
        self.onResolvedCb.forEach(val => {
          val(value);
        });
      }
    }, 0);

  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === 'pedding') {
        self.status = 'rejected';
        self.data = reason;
        self.onRejectedCb.forEach(val => {
          val(value);
        });
      }
    }, 0);
  }


  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  let resolvedOrRejected = false;
  let then;
  if (promise2 === x) {
    return new TypeError('xxx xxxx');
  }
  if (x instanceof Promise) {
    if (x.status === 'pedding') {
      x.then(res => {
        resolvePromise(promise2, res, resolve, reject);
      }, err => {
        reject(err);
      })
    } else {
      x.then(resolve, reject);
    }
    return;
  }

  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(x, function resolvePromise(y) {
          if (resolvedOrRejected) return;
          resolvedOrRejected = true;
          resolvePromise(promise2, y, resolve, reject);
        }, function rejectPromise(err) {
          if (resolvedOrRejected) return;
          resolvedOrRejected = true;
          reject(err);
        });
      } else {
        resolve(x);
      }
    } catch (error) {
      if (resolvedOrRejected) return;
      resolvedOrRejected = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}


Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  let promise2;
  if (self.status === 'resolved') {
    return promise2 = function (resolve, reject) {
      try {
        setTimeout(() => {
          x = onResolved(self.data);
          resolvePromise(promise2, x, resolve, reject);
        }, 0);
      } catch (error) {
        reject(error);
      }
    }

  }

  if (self.status === 'rejected') {
    return promise2 = function (resolve, reject) {
      setTimeout(() => {
        try {
          x = onRejected(self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);

    }
  }

  if (self.status === 'pedding') {
    return promise2 = function (resolve, reject) {
      self.onResolvedCb.push(function (value) {
        try {
          x = onResolved(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });

      self.onRejectedCb.push(function (value) {
        try {
          x = onResolved(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }
  }
}

Promise.prototype.resolve = function (value) {
  return new Promise(function (resolve, reject) {
    resolve(value);
  })
}

Promise.prototype.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason);
  })
}


Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.race = function (list) {
  return new Promise(function (resolve, reject) {
    list.forEach(v => {
      v.then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  })
}

Promise.prototype.all = function (list) {
  let count = 0,
    len = list.length;
  let arr = [];
  return new Promise(function (resolve, reject) {
    for (let i = 0, len = arr.length; i < len; i++) {
      const promise = array[i];
      Promise.resolve(promise).then(res => {
        count++;
        arr[i] = res;
        if (count === len) {
          resolve(arr);
        }
      }).catch(err => {
        reject(err);
      })
    }
  })
}




