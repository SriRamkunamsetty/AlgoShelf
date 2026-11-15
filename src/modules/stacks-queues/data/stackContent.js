export const stackContent = {
  id: "stack",
  title: "Stack Data Structure",
  subtitle: "Last In, First Out (LIFO). Elements enter and exit from the top.",
  overview: {
    heading: "What is a Stack?",
    description:
      "A Stack is a linear data structure that adheres to the LIFO (Last In, First Out) principle. The last element added to the stack is the first one to be removed, much like a stack of plates in a cafeteria.",
  },
  takeaways: [
    "Operates strictly on the top element via push(), pop(), and peek().",
    "All primary operations (push, pop, peek) run in O(1) constant time.",
    "Essential for function call stacks, undo mechanisms, and syntax parsing.",
  ],
  operations: [
    { name: "Push(x)", complexity: "O(1)", desc: "Adds an element x to the top of the stack." },
    { name: "Pop()", complexity: "O(1)", desc: "Removes and returns the top element from the stack." },
    { name: "Peek()", complexity: "O(1)", desc: "Inspects the top element without removing it." },
    { name: "isEmpty()", complexity: "O(1)", desc: "Checks whether the stack contains any elements." },
  ],
  applications: [
    "Call stack management in programming language runtimes",
    "Undo/Redo operations in text editors and creative tools",
    "Balanced parentheses and expression evaluation (infix to postfix)",
    "Backtracking algorithms (Depth-First Search, maze solving)",
  ],
};
