// clone
function deepCopy(obj) {
  var result;
  var toString = Object.prototype.toString
  if (toString.call(obj) === '[object Array]') {
    result = []
    for (var i = 0; i < obj.length; i++) {
      result[i] = deepCopy(obj[i])
    }
  } else if (toString.call(obj) === '[object Object]') {
    result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepCopy(obj[key])
      }
    }
  } else {
    return obj
  }
  return result
}

Promise.prototype.all = function (arr) {
  return new Promise(function (resolve, reject) {
    let result = [];
    let count = 0;
    for (const i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i]).then(res => {
        count++;
        result[i] = res;
        if (arr.length === count) {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      })

    }
  })
}


arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 正向数组
function getSumNum(arr, sum) {
  let i = 0;
  let k = arr.length - 1;
  for (; i < k;) {
    if (arr[i] + arr[k] === sum) {
      return [i, k];
    } else if (arr[i] + arr[k] < sum) {
      i++;
    } else {
      k--;
    }
  }
  return [];
}

// 无序数组
function func(arr, target) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (obj[item] === undefined) {
      var x = target - item;
      obj[x] = i;
    } else {
      return [obj[item], i];
    }
  }
  return null;
}


// int getSumNum(int *arr,int Sum)，   //arr为数组，Sum为和 
// {
// 	int i,j;
// 	for(i = 0, j = n-1; i < j ; )
// 	{
// 		if(arr[i] + arr[j] == Sum)
// 			return ( i , j );
// 		else if(arr[i] + arr[j] < Sum)
// 			i++;
// 		else
// 			j--;
// 	}
// 	return ( -1 , -1 );

var mySetInterval = function (fn, time) {
  // 定义一个递归函数，持续调用定时器
  var execute = function (fn, time) {
    setTimeout(function () {
      fn();
      execute(fn, time);
    }, time)
  }
  execute(fn, time);
}