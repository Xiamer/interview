/**
 * async await， 都会先执行await里的同步去代码
 * 
 * 若不是promise, await会阻塞后面的代码,先执行async外面的同步代码,同步代码执行完毕后,在回到async内部,把await后面代码加到异步队列。
 * 若是promise，await也会阻塞后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果，然后再将后面代码加入异步队伍队里。

 * 如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果。
 */

// ! 若promise 后面then 先加入到异步队列中，后面的代码等then后面的代码之前完后，再加入异步队列尾部。
// ！若prose 后面没有then 直接将后面的代码加入到异步队列之中。
// demo 1 && demo 2 很好的对比。s

// demo 1
new Promise(function (resolve, reject) {
  console.log(111);
  resolve(2);
}).then(res => {
  // v1
  console.log(444);
});

async function fn() {
  // v2
  await fn1().then(res => { console.log('555') });

  // v4
  console.log(777);
};
function fn1() {
  return new Promise(function (resolve, reject) {
    console.log(222);
    resolve(2);
  })
};


fn();

new Promise(function (resolve, reject) {
  console.log(333);
  resolve(2);
}).then(res => {
  // v3
  console.log(666);
});

// 111 222 333 444 555 666 777


// demo 2
new Promise(function (resolve, reject) {
  console.log('111');
  resolve(2);
}).then(res => {
  // v1
  console.log('444');
});

async function fn() {
  // v2
  await fn1()

  // v4
  console.log(777);
};
function fn1() {
  return new Promise(function (resolve, reject) {
    console.log('222');
    resolve(2);
  })
};


fn();

new Promise(function (resolve, reject) {
  console.log('333');
  resolve(2);
}).then(res => {
  // v3
  console.log('666');
});


// 111 222 333 444 777 666

async function async1() {
  console.log('async1 start')
  await async2()
  // v1
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1')
  resolve();
}).then(function () {
  // v2
  console.log('promise2')
})
console.log('script end');


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// settimeout 



async function t1() {
  console.log(1);
  console.log(2);

  new Promise(function (resolve) {
    console.log('promise3')
    resolve();
  }).then(function () {
    // v1
    console.log('promise4')
  })

  await new Promise(function (resolve) {
    console.log('b')
    resolve();
  }).then(function () {
    // v2
    console.log('t1p')
  })

  // v5
  console.log(3)
  console.log(4)
  new Promise(function (resolve) {
    console.log('promise5')
    resolve();
  }).then(function () {
    // v7
    console.log('promise6')
  })

}

// 宏任务1
setTimeout(function () {
  console.log('setTimeout')
}, 0)

async function t2() {
  console.log(5)
  console.log(6)
  // v4
  await Promise.resolve().then(() => console.log('t2p'))

  // v6
  console.log(7)
  console.log(8)
}

t1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve();
}).then(function () {
  // v3
  console.log('promise2')
})
t2()

console.log('end');


// 1
// 2
// promise3
// b

// promise1
// 5 
// 6
// end

// promise4
// t1p
// promise2
// t2p
// 3
// 4
// promise5
// 7
// 8
// promise6
// setTimeout
