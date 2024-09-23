// main.js
import Stack from './stack.js';

// 建立一個 stack 實例
let stack = new Stack();
stack.print(); // 預期輸出：空陣列 []

// 測試 push 功能
stack.push(5);
stack.push(8);
stack.print(); // 預期輸出：5,8

// 測試 pop 功能
console.log(stack.pop()); // 預期輸出：8
stack.print(); // 預期輸出：5

// 測試 peek 功能
console.log(stack.peek()); // 預期輸出：5
stack.print(); // 預期輸出：5（未移除）

// 測試 isEmpty 功能
console.log(stack.isEmpty()); // 預期輸出：false

// 測試 size 功能
console.log(stack.size()); // 預期輸出：1

// 測試 clear 功能
stack.clear();
stack.print(); // 預期輸出：空陣列 []
console.log(stack.isEmpty()); // 預期輸出：true
console.log(stack.size()); // 預期輸出：0
