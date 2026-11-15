export const stackContent = {
  id: "stack",
  title: "Stack Data Structure",
  subtitle: "Last In, First Out (LIFO). Elements enter and exit exclusively from the top in O(1) time.",
  overview: {
    heading: "What is a Stack?",
    description:
      "A Stack is a linear data structure adhering to the LIFO (Last In, First Out) principle. The last element pushed is the first to be popped. By maintaining a direct top pointer index into pre-allocated memory, all operations run in strict O(1) constant time without array shifting.",
  },
  takeaways: [
    "Operates strictly on the element at the top pointer index.",
    "Direct index writes and pointer increments guarantee true O(1) push and pop.",
    "Eliminates the O(n) overhead of arbitrary insertions and deletions.",
    "Essential for function call stacks, undo/redo mechanisms, and parsing syntax.",
  ],
  operations: [
    { name: "Push(x)", complexity: "O(1)", desc: "Increments top pointer and writes x at buffer[top] in O(1) time." },
    { name: "Pop()", complexity: "O(1)", desc: "Reads buffer[top], clears slot, and decrements top pointer in O(1) time." },
    { name: "Peek()", complexity: "O(1)", desc: "Inspects buffer[top] in O(1) time without modifying the top pointer." },
    { name: "isEmpty()", complexity: "O(1)", desc: "Checks whether top === -1 in O(1) time." },
  ],
  applications: [
    "Call stack management in programming language runtimes",
    "Undo/Redo operations in text editors and creative tools",
    "Balanced parentheses and expression evaluation (infix to postfix)",
    "Backtracking algorithms (Depth-First Search, maze solving)",
  ],
};
