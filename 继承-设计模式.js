// 构造函数-原型链 混合模式

function SuperType(name) {
  this.name = name;
};

SuperType.prototype.hi = function () {
  console.log(this.name);
}

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.say = function () {
  console.log(this.age);
}

// 构造 混合寄生模式
function SuperType(name) {
  this.name = name;
};

SuperType.prototype.hi = function () {
  console.log(this.name);
}

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
};

SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;

function create(obj) {
  let fn = function () { };
  fn.prototype = obj;
  return new fn();
}

SubType.prototype.say = function () {
  console.log(this.age);
}

// es6 继承
class Super {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.age);
  }
}

class Suber extends Super {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  hi() {
    console.log(this.name);
    // console.log(super.say());
  }
}


// https://juejin.im/post/5c984610e51d45656702a785
// 单例
function Single(name) {
  this.name = name;
  this.instance = null;
}

Single.prototype.getName = function () {
  console.log(this.name);
}

Single.getInstance = function (name) {
  if (!this.instance) this.instance = new Single(name);
  return this.instance;
}

var a = Singleon.getInstance('seven1');
var b = Singleon.getInstance('seven2');

var createElement = (function () {
  var dom;
  return function () {
    if (!dom) dom = document.createElement('div');
    return dom;
  }
})();

var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

// 工厂模式
// 某个需要创建的具体对象
class Product {
  constructor(name) {
    this.name = name;
  }
  init() { }
}
// 工厂对象
class Creator {
  create(name) {
    return new Product(name);
  }
}
const creator = new Creator();
const p = creator.create(); // 通过工厂对象创建出来的具体对象

