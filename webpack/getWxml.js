// const glob = require('glob');
// const aFilePath = glob.sync('**/*.wxml', {});
// console.log('z', aFilePath);
// module.exports = aFilePath.map(val => './' + val);

const path = require('path');
console.log('z', path.resolve('/foo/bar/', 'tmp/file/'));


function curry(fn, ...arg) {
  if (fn.length >= arg.length) return fn(arg);
  return function (...arg2) {
    return currry(fn, ...arg, ...arg2);
  }
};