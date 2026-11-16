export const linkedListContent = {
  id: "linked-list",
  title: "Linked Lists & Sequential Pointers",
  bookNumber: "Book II",
  subtitle:
    "Linear collections of data elements whose order is determined not by physical memory placement, but by explicit pointers.",
  quote:
    "“An array demands contiguous real estate; a linked list wanders freely through memory, tethered only by references.”",
  overview: {
    heading: "What is a Singly Linked List?",
    description:
      "A Singly Linked List is a linear data structure where elements (called nodes) are stored independently across memory. Each node consists of two parts: the data payload, and a `next` pointer referencing the subsequent node in the sequence. The first node is designated as the Head, and the final node's pointer terminates at NULL.",
  },
  takeaways: [
    "Dynamic Size: Can expand or contract in real-time with zero reallocation or resizing cost.",
    "Efficient Head Insertion/Deletion: Operates in O(1) constant time without shifting existing elements.",
    "Arbitrary Position Access: Requires O(n) sequential pointer traversals since random indexing is unsupported.",
    "Pointer Overhead: Every node incurs extra memory overhead to store the reference address.",
  ],
  operations: [
    {
      name: "Insert at Beginning (Head)",
      complexity: "O(1)",
      desc: "Allocates a new node, sets its `next` pointer to the current Head, and updates Head to the new node.",
      pseudocode:
        "function insertHead(val):\n  newNode = new Node(val)\n  newNode.next = head\n  head = newNode",
    },
    {
      name: "Insert at End (Tail)",
      complexity: "O(n)",
      desc: "Traverses to the final node whose `next` is null, and attaches the new node to it.",
      pseudocode:
        "function insertTail(val):\n  newNode = new Node(val)\n  if head is null:\n    head = newNode; return\n  curr = head\n  while curr.next != null:\n    curr = curr.next\n  curr.next = newNode",
    },
    {
      name: "Insert at Position (k)",
      complexity: "O(n)",
      desc: "Traverses to index k - 1, links `newNode.next = curr.next`, and updates `curr.next = newNode`.",
      pseudocode:
        "function insertAt(val, k):\n  if k == 0: insertHead(val); return\n  curr = head\n  for i in 0..(k - 2):\n    curr = curr.next\n  newNode.next = curr.next\n  curr.next = newNode",
    },
    {
      name: "Delete from Beginning (Head)",
      complexity: "O(1)",
      desc: "Advances the Head pointer to `head.next`. The original head node is detached and garbage collected.",
      pseudocode:
        "function deleteHead():\n  if head is null: return error\n  head = head.next",
    },
    {
      name: "Delete from End (Tail)",
      complexity: "O(n)",
      desc: "Traverses to the second-to-last node and reassigns its `next` pointer to null.",
      pseudocode:
        "function deleteTail():\n  if head is null: return error\n  if head.next is null:\n    head = null; return\n  curr = head\n  while curr.next.next != null:\n    curr = curr.next\n  curr.next = null",
    },
    {
      name: "Delete from Position (k)",
      complexity: "O(n)",
      desc: "Traverses to node at position k - 1 and skips target: `curr.next = curr.next.next`.",
      pseudocode:
        "function deleteAt(k):\n  if k == 0: deleteHead(); return\n  curr = head\n  for i in 0..(k - 2):\n    curr = curr.next\n  curr.next = curr.next.next",
    },
  ],
};
