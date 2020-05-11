// 22
function sleep(time) {
  return new promise((resolve, reject) => { setTimeout(resolve, time) })
}

// 2. debounce

function debounce(fn, time) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    else setTimeout(fn, time);
  }
}

window.addEventListener('scroll', debounce(sleep, 2000));


// 3. throttle

function throttle(fn, time) {
  let preDate = new Date().getTime();
  return function () {
    if (new Date().getTime - preDate > time) {
      fn.apply(this, arguments);
      preDate = new Date().getTime();
    }
  }
}

window.addEventListener('scroll', throttle(sleep, 2000));

// ( ( ))()((((()))))

var isValid = function (s) {
  var stack = []
  var map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (var char of s) {
    if (char in map) {
      stack.push(char)
    } else {
      if (!stack.length || char != map[stack.pop()]) {
        return false
      }
    }
  }

  // 如果最后stack 里没有元素了， 就一定是匹配的
  return !stack.length
};





function Foo() {
  this.getName = function () {
    console.log(3);
    return {
      getName: getName //这个就是第六问中涉及的构造函数的返回值问题
    }
  }; //这个就是第六问中涉及到的，JS构造函数公有方法和原型链方法的优先级
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(6);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}

Foo.getName(); // 2
getName(); // 4
console.log(Foo()) // undefined
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2 
new Foo().getName();// 3

new Foo().getName().getName(); // 3 1
new new Foo().getName(); // 3 


async function t1() {
  console.log(1)
  console.log(2)
  new Promise(function (resolve) {
    console.log('promise3')
    resolve();
  }).then(function () {
    // micro 1
    console.log('promise4')
  })
  await new Promise(function (resolve) {
    console.log('b')
    resolve();
  }).then(function () {
    // micro 2
    console.log('t1p')
  })

  console.log(3)
  console.log(4)
  new Promise(function (resolve) {
    console.log('promise5')
    resolve();
    // micro 5
  }).then(function () {
    console.log('promise6')
  })
}



setTimeout(function () {
  console.log('setTimeout')
}, 0)

async function t2() {
  console.log(5)
  console.log(6)
  // micro 4
  await Promise.resolve().then(() => console.log('t2p'))
  console.log(7)
  console.log(8)
}

t1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  // micro 3
}).then(function () {
  console.log('promise2')
})
t2()

console.log('end');





// 1, 2, promise3,b,promise1,

// 5,6,end
// promise4,t1p,3,4,promise5,promise2
// t2p 7 8 promise6 setTimeout


// 1,2, promise3,b,promise1,
// 5,6,end,

// promise4,t1p,promise2,t2p,3,4,promise5
// 7 8 promise6 setTimeout 




