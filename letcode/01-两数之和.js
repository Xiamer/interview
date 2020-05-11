
// [1,3,4,5] target = 7; => [3,4];
// [3,1,2,6,5,5,6,7,8,9]; target = 9 即 a[0] + a[3] = 9 输出 [0,3] 

function sum(nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    let findNum = target - nums[i];
    if (map[findNum] !== undefined) {
      return [map[findNum], i];
    } else {
      map[nums[i]] = i;
    }
  }

};
a = sum([1, 2, 3], 3);
console.log('a', a);