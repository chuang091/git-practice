function fib(n) {
    if (n === 0) return 0; // base case
    if (n === 1) return 1; // base case
    return fib(n - 1) + fib(n - 2); // recursive case
  }
  
  console.log(fib(0)); // 0
  console.log(fib(1)); // 1
  console.log(fib(5)); // 5
  console.log(fib(10)); // 55
  