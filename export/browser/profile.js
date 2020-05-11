import o, { firstName, lastName, year, fn } from './test2.js';

console.log('fff', lastName, firstName, year, o);
fn();
setTimeout(() => {
  console.log('fff', lastName, firstName, year, o);
}, 2000);


