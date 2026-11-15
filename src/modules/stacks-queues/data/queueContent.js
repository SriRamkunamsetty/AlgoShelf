export const queueContent = {
  id: "queue",
  title: "Circular Queue Data Structure",
  subtitle: "First In, First Out (FIFO). Elements enter at the rear and exit from the front in O(1) time via circular array pointers.",
  overview: {
    heading: "What is a Circular Queue?",
    description:
      "A Queue is a linear data structure adhering to the FIFO (First In, First Out) principle. To achieve true O(1) time complexity without expensive O(n) array element shifts, AlgoShelf implements a Circular Array (Ring Buffer) where front and rear pointers wrap around using modulo arithmetic.",
  },
  takeaways: [
    "Elements are enqueued at the rear pointer and dequeued from the front pointer.",
    "Using modulo wrapping ((ptr + 1) % capacity) ensures true O(1) constant time without shifting elements.",
    "Eliminates the O(n) array reallocation and shift penalties of naive linear implementations.",
    "Fundamental for OS CPU task scheduling, ring buffers, and Breadth-First Search (BFS).",
  ],
  operations: [
    { name: "Enqueue(x)", complexity: "O(1)", desc: "Places element x at buffer[rear] and advances rear = (rear + 1) % capacity in O(1) time." },
    { name: "Dequeue()", complexity: "O(1)", desc: "Removes buffer[front] and advances front = (front + 1) % capacity in O(1) time." },
    { name: "Front()", complexity: "O(1)", desc: "Inspects buffer[front] in O(1) time without modifying pointers." },
    { name: "Rear()", complexity: "O(1)", desc: "Inspects the most recently enqueued element in O(1) time." },
  ],
  applications: [
    "CPU task scheduling and asynchronous job queues",
    "Breadth-First Search (BFS) in trees and graphs",
    "Printer spooling and network packet ring buffering",
    "Real-time event loop queues in runtime systems",
  ],
};
