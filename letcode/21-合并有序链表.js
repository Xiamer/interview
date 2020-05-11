function ListNode(val) {
  this.val = val;
  this.next = null;
}


mergeTwoLists = (l1, l2) => {
  let nodeList = new ListNode(null);
  let temp = nodeList;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      temp.next = l1;
      l1 = l1.next;
    } else {
      temp.next = l2;
      l2 = l2.next;
    }
    temp = temp.next;
  }

  temp.next = l1 || l2;

  return nodeList.next;
}

let l1 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 5,
      next: null
    }
  }
};

let l2 = {
  val: 2,
  next: {
    val: 4,
    next: {
      val: 6,
      next: null
    }
  }
};

console.log(JSON.stringify(mergeTwoLists(l1, l2)));







// var a = {
//   val: 1,
//   next: {
//     val: 2,
//     next: {
//       val: 3,
//       next: null
//     }
//   }
// }

// function NodeList(val) {
//   this.val = val;
//   this.next = null;
// }