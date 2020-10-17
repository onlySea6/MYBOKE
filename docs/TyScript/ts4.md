---
title: 条件语句与循环
date: 2019-10-05
sidebar: auto
categories:
  - TypeScript
tags:
  - TypeScript
---
## 在 TypeScript 中，可使用的条件语句

- if 语句 - 只有当指定条件为 true 时，使用该语句来执行代码
```ts
var  num:number = 5
if (num > 0) { 
   console.log("数字是正数") 
}
```
- if...else 语句 - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
```ts
var num:number = 12; 
if (num % 2==0) { 
    console.log("偶数"); 
} else {
    console.log("奇数"); 
}
```
- if...else if....else 语句- 使用该语句来选择多个代码块之一来执行
```ts
var num:number = 2 
if(num > 0) { 
    console.log(num+" 是正数") 
} else if(num < 0) { 
    console.log(num+" 是负数") 
} else { 
    console.log(num+" 不是正数也不是负数") 
}
```
- switch 语句 - 使用该语句来选择多个代码块之一来执行
```ts
switch(expression){
    case constant-expression  :
       statement(s);
       break; /* 可选的 */
    case constant-expression  :
       statement(s);
       break; /* 可选的 */
  
    /* 您可以有任意数量的 case 语句 */
    default : /* 可选的 */
       statement(s);
}
```
## 循环
- for 循环
```ts
var num:number = 5; 
var i:number; 
var factorial = 1; 
 
for(i = num;i>=1;i--) {
   factorial *= i;
}
console.log(factorial)
```
- for...in 循环
```ts
var j:any; 
var n:any = "a b c" 
 
for(j in n) {
    console.log(n[j])  
}
```
- for…of 、forEach、every 和 some 循环
```ts
let someArray = [1, "string", false];
for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}

let list = [4, 5, 6];
list.forEach((val, idx, array) => {
    // val: 当前值
    // idx：当前index
    // array: Array
});

let list = [4, 5, 6];
list.every((val, idx, array) => {
    // val: 当前值
    // idx：当前index
    // array: Array
    return true; // Continues
    // Return false will quit the iteration
});
```
- while 循环

  while 语句在给定条件为 true 时，重复执行语句或语句组
```ts
var num:number = 5; 
var factorial:number = 1; 
 
while(num >=1) { 
    factorial = factorial * num; 
    num--; 
} 
console.log("5 的阶乘为："+factorial);
```
- do...while 循环

不像 for 和 while 循环，它们是在循环头部测试循环条件。do...while 循环是在循环的尾部检查它的条件
```ts
var n:number = 10;
do { 
    console.log(n); 
    n--; 
} while(n>=0);
```
- break 语句 有两种用法：
1. 当 break 语句出现在一个循环内时，循环会立即终止，且程序流将继续执行紧接着循环的下一条语句。
2. 它可用于终止 switch 语句中的一个 case。
```ts
var i:number = 1 
while(i<=10) { 
    if (i % 5 == 0) {   
        console.log ("在 1~10 之间第一个被 5 整除的数为 : "+i) 
        break     // 找到一个后退出循环
    } 
    i++ 
}  
```
- continue 语句

continue 语句有点像 break 语句。但它不是强制终止，continue 会跳过当前循环中的代码，强迫开始下一次循环。
```ts
var num:number = 0
var count:number = 0;
 
for(num=0;num<=20;num++) {
    if (num % 2==0) {
        continue
    }
    count++
}
console.log ("0 ~20 之间的奇数个数为: "+count)    //输出10个偶数
```
- 无限循环
```ts
// for 创建无限循环语法格式：
for(;;) { 
   // 语句
}

// while 创建无限循环语法格式：
while(true) { 
   // 语句
} 
```

