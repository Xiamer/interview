setTimeout(function () { console.log(1) }, 0)

new Promise(function (resolve, reject) {
  resolve(2);
}).then(res => { console.log(res) })