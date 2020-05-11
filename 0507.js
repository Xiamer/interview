// 继承1 - 构造函数继承
// a. 父类方法不能复用 b.子类方法每次都是单独创建
function SuperType(name) {
  this.name = name;
}
SuperType.prototype.say = function (word) {
  console.log(this.name);
}
function SubType(name, age) {
  SubType.call(this, name);
  this.age = age;
}

// 继承2 - 原型链继承
// a.父级引用类型数据被实例共享 b. 不能传递数据
function SuperType(name) {
  this.name = name;
}
SuperType.prototype.say = function (word) {
  console.log(this.name);
}
function SubType(age) {
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

// 继承3 - 组合继承
// 实例化2遍
function SuperType(name) {
  this.name = name;
}
SuperType.prototype.say = function (word) {
  console.log(this.name);
}
function SubType(name, age) {
  SubType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

// 继承4 - 原型式继承

// 继承6 - 寄生组合继承
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;
SubType.prototype.hi = function () { };


// 防抖 节流
// 防抖 当持续触发事件时，一定时间段内没有再触发事件。
const debounce = function (fn, delay) {
  let timer = null;
  return (...arg) => {
    if (timer) clearTimeout(timer);
    setTimeout(() => {
      fn.apply(this, arg);
    }, delay)
  }
};

// 节流 
const throttle = function (fn, time) {
  let flag = true;
  return (...arg) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arg);
      flag = true;
    }, time)
  }
}


// EventEmit
class EventEmit {
  constructor() {
    this._eventPool = {};
  }

  on(type, cb) {
    if (this._eventPool[type]) { this._eventPool.push(cb) }
    else this._eventPool[type] = [cb];
  }

  emit(type, ...arg) {
    if (this._eventPool[type]) {
      this._eventPool[type].forEach(cb => {
        cb(...arg);
      });
    }
  }

  off(type) {
    if (this._eventPool[type]) {
      delete this._eventPool[type];
    }
  }

  once(type, cb) {
    this.on(type, (...arg) => {
      cb(...arg);
      this.off(type);
    })
  }

}

// sleep
function sleep(fn, time) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(fn());
    }, time)
  })
};

// 斐波那契函数 0 1 1 2 3 5 
var fobi = (function () {
  var memo = [0, 1];
  var fib = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 2) + fib(n - 1);
      memo[n] = result;
    }
    return result;
  };
  return fib;
})()

// deepClone
function deepClone(obj) {
  let toString = Object.prototype.toString;
  let result = null;
  if (toString.call(obj) === '[object Array]') {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepClone(obj[i]);
    }
  } else if (toString.call(obj) === '[object Object]') {
    result = {};
    for (const key in obj) {
      if (object.hasOwnProperty(key)) {
        result[i] = deepClone(obj[key]);
      }
    }
  } else {
    return obj;
  }
  return result;
}

Function.prototype.bind = function (context, ...arg) {
  let self = this;
  if (typeof self !== 'function') {
    throw new Error('not a Function');
  }
  let fNop = function () { };
  let fBound = function (...arg2) {
    self.apply(this instanceof fNop ? this : context, arg.concat(arg2));
  }
  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
}

// Object.create
function create(obj) {
  let fn = function () { };
  fn.prototype = obj;
  return new fn();
}
// new  new Fn(x1, x2);
function _new(fn, ...arg) {
  let context = Object.create(fn.prototype);
  let result = fn.apply(context, arg);
  return (typeof result === 'object' && result !== null) ? result : context;
}

// instanseof 
function myInstanseof(left, right) {
  let leftVal = left.__proto__;
  let rightVal = right.prototype;
  while (true) {
    if (leftValue === null) return false;
    else if (leftVal === rightVal) return true;
    else leftVal = leftVal.__proto__;
  }
}

// settimeout实现setInterval
function timer(time, fn) {
  setTimeout(() => {
    fn();
    timer(time, fn);
  }, time)
}


// 排序1 - 冒泡
function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}

// 排序1 - 冒泡2
function bubbleSort(arr) {
  let len = arr.length;
  let lastChange = 0;
  let sortBorder = arr.length - 1;
  for (let i = 0; i < len; i++) {
    let flag = true;
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = false;
        lastChange = j;
      }
    }
    sortBorder = lastChange;
    if (flag) break;
  }
  return arr;
}

// 排序2 - 快排
function quickSort(arr) {
  if (arr.length < 2) return arr;
  let midIndex = Math.floor(arr.length / 2);
  let midVal = arr.splice(midIndex, 1)[0];
  let left = [],
    right = [];
  arr.forEach((val, index) => {
    if (val < midVal) left.push(val);
    else right.push(val);
  });
  return quickSort(left).concat(midVal, quickSort(right));
}

// 排序 - 选择排序
function selectSort(arr) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i; j < array.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = i;
      }
    }
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
  }
}

// [1,2,3,5,4] target 9;
function target(arr, target) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (typeof obj[item] === 'undefined') {
      let x = target - item;
      obj[x] = i;
    } else {
      return [obj[item], i];
    }
  }
  return [];
}