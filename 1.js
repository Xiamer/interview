/**
 * call apply https://github.com/mqyqingfeng/Blog/issues/11
 * bind https://github.com/mqyqingfeng/Blog/issues/12
 * new https://github.com/mqyqingfeng/Blog/issues/13
 *  
 */
// 



// 节流 防抖动 https://github.com/lishengzxc/bblog/issues/7
// 2 - 1. 函数防抖 debounce 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次.


const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

function fn() {
  console.log('debounce');
}

window.addEventListener('scroll', debounce(fn, time));

// 2 - 2. 函数节流 throttle 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。

function throttle(fn, threshhold) {
  // 记录上次执行的时间
  var last
  // 定时器
  var timer
  // 默认间隔为 250ms
  threshhold || (threshhold = 250)
  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments
    var now = +new Date()
    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)
      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}


const throttle = (fn, delay = 500) => {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};


function handle() {
  console.log(Date.now(), arguments);
}

window.addEventListener('scroll', throttle(handle, 5000));


// 冒泡 比较两者 大的往后放

function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr;
}

function bubble(arr) {
  let len = arr.length;
  let sortBorder = len - 1;
  let lastExchange = 0;
  for (let i = 0; i < len; i++) {
    let isSorted = true;
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        isSorted = false;
        lastExchange = j;
      }
    }
    sortBorder = lastExchange;
    if (isSorted) break;
  }
  return arr;
}

function quickSort(arr) {
  if (arr.length < 2) return arr;
  let midIndex = Math.floor(arr.length / 2);
  let midVal = arr.splice(midIndex, 1)[0];
  let len = arr.length;
  let leftArr = [];
  let rightArr = [];
  for (let i = 0; i < len; i++) {
    if (arr[i] < midVal) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  return quickSort(leftArr).concat(midVal, quickSort(rightArr));
}


// 选择排序 找到最小index
function selectionSort(arr) {
  let len = arr.length;
  let minIndex;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    for (let j = i + 1; j < len - 1; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

function selectSort(arr) {
  let len = arr.length;
  for (let i = 0, len = arr.length; i < len; i++) {
    let minIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}




// 插入排序 扑克牌 拿当前的比较前者
function insertionSort(array) {
  for (var i = 1; i < array.length; i++) {
    var key = array[i];
    var j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  return array;
}


insertionSort([1, 3, 4, 5, 6, 2]);


//  快排
function quickSort(arr) {
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};


// call 

// 第三版
Function.prototype.call2 = function (context) {
  var context = context || window; // window 对应 null 参数
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')');

  delete context.fn
  return result;
}

// 测试一下
var value = 2;

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }


// apply

Function.prototype.apply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    // args 会调用 Array.toString()
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}


// bind 
Function.prototype.bind2 = function (context) {

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () { };

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}



// new , objectFactory(Otaku, 'Kevin', '18')

function objectFactory() {

  var obj = new Object(),

    Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  var ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
};


//求n的算术平方根，参数n不能为负数 牛顿迭代法（JavaScript）
function sqrt(n) {
  //当n>=1时，从n开始迭代；
  //当n<1时，从1开始迭代
  let res = n >= 1 ? n : 1;
  while (res * res - n > 1e-8)
    res = 0.5 * (res + n / res);
  return res;
}


var a = 'aaabbbbcccdd';

function a(str) {
  let o = {};
  for (const key, value in str) {
    if (o[key]) {
      o[key] = value++;
    } else {
      o[key] = 1;
    }
  }
  let max = 0;
  for (const key in o) {
    if (o.hasOwnProperty(key)) {

    }
  }
};

findMost = arr => {
  let maxEle;
  let maxNum = 0;
  let obj = arr.reduce((p, item) => {
    p[item] ? p[item]++ : p[item] = 1;
    console.log('p', p);
    if (p[item] > maxNum) {
      maxEle = item;
      maxNum++;
    }

    return p;
  }, {});
  return `出现次数最多的元素为：${maxEle},出现次数为：${maxNum}`;
}

findMost([1, 2, 3, 3, 3, 2, 2, 2])


// promisify 的实现
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    })
  }
}


// https://github.com/zhufengzhufeng/promise1-12/blob/master/1.generator.js

function co(it) {
  return new Promise((resolve, reject) => {
    // 异步迭代 需要next函数
    function next(r) {
      let { value, done } = it.next(r);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(data => {
          next(data);
        }, reject)
      }
    }
    next();
  })
}


//1. mySetInterval(fn, a, b)，持续运行。setInterval(fn, a+n*b)

//2. [ [1,2,3,4], [2,3,4], [5,6,7,9,11], ... ]，有序子数组。实现一个有序大数组。时间复杂度：O（M*（logN）)

// 控制数量
function handleFetchQueue(urls, max, callback) {
  const urlLen = urls.length;
  const requestsQueue = [];
  const results = [];
  let i = 0;
  const handleRequest = (url) => {
    const req = fetch(url).then(res => {
      console.log('当前并发： ' + requestsQueue);
      const len = results.push(res);

      // 没执行完 && 
      if (len < urlLen && i + 1 < urlLen) {
        // 执行完出栈
        requestsQueue.shift();
        handleRequest(urls[++i])
        // 执行完的数量 === 总共数
      } else if (len === urlLen) {
        'function' === typeof callback && callback(results)
      }
    }).catch(e => {
      results.push(e)
    });
    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i])
    }
  };
  handleRequest(urls[i])
};



function handleFetchQueue(urls, max, callback) {
  let result = [];
  let len = urls.length;
  let i = 0;
  let queueNum = 0;
  const request = function (url, i) {
    queueNum++;
    let req = fetch(url).then(res => {
      queueNum--;
      result.push(res);
      if (i < len) {
        request(urls[++i], i);
      }

    }).catch(err => {
      queueNum--;
      result.push(res);
      if (i < len) {
        request(urls[++i], i);
      }
    });

    if (queueNum < max) {
      request(urls[++i], i);
    }
  };
  request(urls[i], i);
}


function subType() {

}

function supType() {
  subType.call(this);
};

supType.prototype = Object.create(subType.prototype);
supType.prototype.Constructor = supType;

supType.prototype.sayHi = function () {

};


class A {
  constructor(x) {
    this.x = x;
  }
  say() {
    console.log(x);
  }
}

class B extends A {
  constructor(x, y) {
    super(x);
    this.y = y;
  }
  fn() {
    console.log(y);
  }
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true