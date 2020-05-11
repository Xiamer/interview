var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;


function fn() {
  year++;
}

var a = { a: 1 };
setTimeout(() => {
  console.log('test', year);
  a.a = 2;
}, 1000);

export { firstName, lastName, year, fn };

// export default 1;

export default a;
