export const queueContent = {
  id: "queue",
  title: "Queue Data Structure",
  subtitle: "First In, First Out (FIFO). Elements enter at the rear and exit from the front.",
  overview: {
    heading: "What is a Queue?",
    description:
      "A Queue is a linear data structure that adheres to the FIFO (First In, First Out) principle. The first element added to the queue is the first one to be removed, identical to a line of people waiting at a ticket counter.",
  },
  takeaways: [
    "Elements are enqueued at the rear and dequeued from the front.",
    "Enqueuing and dequeuing both run in O(1) constant time with array pointers.",
    "Fundamental for task scheduling, buffering, and Breadth-First Search (BFS).",
  ],
  operations: [
    { name: "Enqueue(x)", complexity: "O(1)", desc: "Inserts an element x at the rear of the queue." },
    { name: "Dequeue()", complexity: "O(1)", desc: "Removes and returns the front element from the queue." },
    { name: "Front()", complexity: "O(1)", desc: "Inspects the front element without removing it." },
    { name: "Rear()", complexity: "O(1)", desc: "Inspects the most recently added element at the rear." },
  ],
  applications: [
    "CPU task scheduling and asynchronous job queues",
    "Breadth-First Search (BFS) in trees and graphs",
    "Printer spooling and network packet buffering",
    "Real-time event handling in web servers",
  ],
};
