// stack.js
export default class Stack {
    // # 開頭的私有變數，外部無法存取
    #items;
  
    constructor() {
      this.#items = [];
    }
  
    // 在 stack 頂部加入元素
    push(element) {
      this.#items.push(element);
    }
  
    // 移除並回傳 stack 頂部的元素
    pop() {
      return this.#items.pop();
    }
  
    // 回傳 stack 頂部的元素，但不移除它
    peek() {
      return this.#items[this.#items.length - 1];
    }
  
    // 檢查 stack 是否為空
    isEmpty() {
      return this.#items.length === 0;
    }
  
    // 回傳 stack 中元素的個數
    size() {
      return this.#items.length;
    }
  
    // 清空 stack
    clear() {
      this.#items = [];
    }
  
    // 印出 stack 內容
    print() {
      console.log(this.#items.toString());
    }
  }
  