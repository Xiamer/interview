/**
 * Created by admin on 2018/7/31.
 */
/**给出一个区间的集合，请合并所有重叠的区间。
 *
 * 示例 1:
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 * 示例 2:
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 */

function merge(intervals) {
  // 头 尾排序
  intervals.sort(function (a, b) {
    if (a[0] !== b[0])
      return a[0] - b[0];
    return a[1] - b[1];
  });
  // 定义返回数组和开始值和最大值
  var len = intervals.length,
    ans = [],
    start, end;

  for (var i = 0; i < len; i++) {
    var s = intervals[i][0],
      e = intervals[i][1];
    // 第一次赋值
    if (start === undefined) {
      start = s, end = e;
    }
    // 当前项的左边值和上一项的右边值比较
    else if (s <= end) {
      end = Math.max(e, end);
    } else {
      var part = [start, end];
      ans.push(part);
      start = s;
      end = e;
    }
  }

  // 最后一项push进去
  if (start !== undefined) {
    var part = [start, end];
    ans.push(part);
  }
  return ans;
};