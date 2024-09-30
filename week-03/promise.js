function doJob(job, time, cb) {
    setTimeout(() => {
        // 只有在這裡，才能知道這個非同步的 setTimeout 已經做完事情了
        let now = new Date();
        cb(`完成工作 ${job} at ${now.toISOString()}`);
    }, time);
}
//[進階] 怎麼用 Promise 來改善？ /week-03/promise.js
function doJobPromise(job, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let now = new Date();
            resolve(`完成工作 ${job} at ${now.toISOString()}`);
        }, time);
    });
}

let job1 = doJobPromise('刷牙', 1000);
let job2 = () => doJobPromise('吃早餐', 3000);
let job3 = () => doJobPromise('寫功課', 1000);
let job4 = () => doJobPromise('吃午餐', 2000);

// 這是什麼寫法
// 這是 Promise chaining 的寫法，可以讓非同步的程式碼變得更好閱讀，也更好維護，不會有 callback hell 的問題，也可以很方便的處理錯誤。

// 如果沒有 （）＝＞ 會怎樣？
// 會造成錯誤，因為 job2, job3, job4 都是函式，如果沒有 () => ，就會直接執行，而不是回傳一個 Promise 物件。

// 什麼事callback hell
// callback hell 是指 callback 函式過多，導致程式碼難以閱讀，也難以維護的情況。

// 謝謝copilot

// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec
let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);

job1.then((data) => {
    console.log(data);
    return job2();
}).then((data) => {
    console.log(data);
    return job3();
}).then((data) => {
    console.log(data);
    return job4();
}).then((data) => {
    console.log(data);
});