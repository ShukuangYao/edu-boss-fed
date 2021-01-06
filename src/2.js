/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
const deleteDuplicates = function (head) {
  let node = new ListNode(-1);
  const resNode = new ListNode(-1);
  node.next = head;
  resNode.next = node;
  if (!head) return null;
  while (node.next) {
    if (!node.next.next) break;
    if (node.next.next && node.next.next.val === node.next.val) {
      let temp = node.next;
      while (temp && temp.val === node.next.val) {
        temp = temp.next;
      }
      node.next = temp;
    } else {
      node = node.next;
    }
  }
  return resNode.next.next;
};
