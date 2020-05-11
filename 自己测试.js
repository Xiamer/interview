Function.prototype.bind = function (context, ...arg) {
  let self = this;
  if (typeof self !== 'function') {
    throw Error('Function.prototype.bind - what is trying to be bound not callaber');
  }
  let fNop = function () { };
  let fBound = function (...arg2) {
    self.apply(this instanceof fNop ? this : context, arg.concat(arg2));
  }
  if (this.prototype) {
    fNop.prototype = this.prototype;
  };
  fBound.prototype = new fNop();
  return fBound;
};

// new Suptype(2,3);

function newObject(fn, ...arg) {
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj, arg);
  return (typeof result === object && result !== null) ? result : obj;
};

// objcreate
function objCreate(obj) {
  let fn = function () { };
  fn.prototype = obj;
  return new fn();
};

// instanceof
function myInstanceof(left, right) {
  let leftVal = left.__proto__;
  let rightVal = right.prototype;
  while (true) {
    if (leftVal === null) return false;
    else if (leftVal === rightVal) return true;
    leftVal = leftVal.__proto__;
  }
};

// settimeout 实现 setInterval

function mySetInterVal(fn, time) {
  var excul = (fn, time) => {
    setTimeout(() => {
      fn();
      excul(fn, time);
    }, time);
  };
  excul(fn, time);
};


// feb
var finbna = (function () {
  let memo = [0, 1];
  let fib = function (n) {
    let result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
})();

// cury

function curry(fn, ...arg) {
  if (arg.length >= fn.length) {
    fn(...arg);
  }
  return function (...arg2) {
    curry(fn, ...arg, ...arg2);
  }
};

// deepcopy [object RegExp], [object Date]

// function deepCopy(obj) {
//   let toString = Object.prototype.toString.call;
//   let result;
//   if (toString(obj) === '[object, object]') {

//   } else if () {

//   } else {
//     return obj;
//   }
//   return result;
// }

Function.prototype._map = function (fn, context) {
  context = context || null;
  let result = [];
  this.reduce(function (pre, next, index, arr) {
    result.push(fn.call(context, next, index, arr));
  }, {});
  return result;
};

Function.prototype.map = function (fn, context) {
  let self = this;
  let result = [];
  for (let i = 0; i < self.length; i++) {
    result.push(fn.call(context, self[i], i, self));
  }
};

Function.prototype.reduce = function (fn, initialVal) {
  let previous = initialVal; k = 0;
  if (initialVal === undefined) {
    previous = this[0];
    k = 1;
  }
  for (; k < this.length; k++) {
    previous = fn(previous, this[k], k, this);
  }
  return previous;
}

// 函数扁平化

Array.prototype.myflat = function (deep) {
  return this.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) && deep > 1 ? next.myflat(deep - 1) : next);
  }, [])
}