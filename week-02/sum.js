// for loop
function sumWithForLoop(ary) {
    let total = 0;
    // 逐一將每個元素加到 total
    for (let i = 0; i < ary.length; i++) {
        total += ary[i];
    }
    return total;
}

console.log(sumWithForLoop([1, 5, 3, 2])); // 11

// while loop
function sumWithWhileLoop(ary) {
    let total = 0;
    let i = 0;
    // 逐一將每個元素加到 total
    while (i < ary.length) {
        total += ary[i];
        i++;
    }
    return total;
}

console.log(sumWithWhileLoop([1, 5, 3, 2])); // 11

//reduce
function sumWithReduce(ary) {
    return ary.reduce((total, num) => total + num, 0);
}

console.log(sumWithReduce([1, 5, 3, 2])); // 11

//(optional) 挑戰題: 如果 sum 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？
function sum(n) {
    return n * (n + 1) / 2;
}

console.log(sum(10)); // 55

//recursive 1 to n
function sumWithRecursive(n) {
    if (n === 1) return 1;
    return n + sumWithRecursive(n - 1);
}

console.log(sumWithRecursive(10)); // 55