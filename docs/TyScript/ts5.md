---
title: 函数
date: 2019-10-05
sidebar: auto
categories:
  - TypeScript
tags:
  - TypeScript
---
## 函数
- 函数是一组一起执行一个任务的语句。
- 函数声明告诉编译器函数的名称、返回类型和参数。函数定义提供了函数的实际主体。

## 函数定义
- 函数就是包裹在花括号中的代码块，前面使用了关键词 function：
```ts
function function_name()
{
    // 执行代码
}
//函数只有通过调用才可以执行函数内的代码。
function_name()
```

## 函数返回值
```ts
function function_name():return_type   { 
    // 语句
    return value; 
}
// return_type 是返回值的类型。
// return 关键词后跟着要返回的结果。
// 一个函数只能有一个 return 语句。
// 返回值的类型需要与函数定义的返回类型(return_type)一致。
```

## 带参数函数
```ts
function func_name( param1 [:datatype], param2 [:datatype]) {   
  // param1、param2 为参数名。
  // datatype 为参数类型
}

function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))
```
## 可选参数和默认参数
- 在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？
```ts
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
let result1 = buildName("Bob");                  // 错误，缺少参数
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");    
```

## 匿名函数
- 匿名函数是一个没有函数名的函数。
- 匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。
- 我们可以将匿名函数赋值给一个变量，这种表达式就成为函数表达式。
```ts
var res = function( [arguments] ) { ... }

var msg = function() { 
    return "hello world";  
} 
console.log(msg())
```
## 匿名函数自调用
- 匿名函数自调用在函数后使用 () 即可：
```ts
(function () { 
    var x = "Hello!!";   
    console.log(x)     
 })()
```

## 构造函数
- TypeScript 也支持使用 JavaScript 内置的构造函数 Function() 来定义函数：
```ts
var res = new Function ([arg1[, arg2[, ...argN]],] functionBody)
// arg1, arg2, ... argN：参数列表。
// functionBody：一个含有包括函数定义的 JavaScript 语句的字符串。
var myFunction = new Function("a", "b", "return a * b"); 
var x = myFunction(4, 3); 
console.log(x);
```

## 递归函数
- 递归函数即在函数内调用函数本身。
```ts
function factorial(number) {
    if (number <= 0) {         // 停止执行
        return 1; 
    } else {     
        return (number * factorial(number - 1));     // 调用自身
    } 
}; 
console.log(factorial(6));  
```

## Lambda 函数
- Lambda 函数也称之为箭头函数。
```ts
( [param1, parma2,…param n] )=>statement;

var foo = (x:number)=>10 + x 
console.log(foo(100))      //输出结果为 110
```

## 函数重载
- 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
- 每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。

参数类型不同：
```ts
function disp(string):void; 
function disp(number):void;
```
参数数量不同：
```ts
function disp(n1:number):void; 
function disp(x:number,y:number):void;
```
参数类型顺序不同：
```ts
function disp(n1:number,s1:string):void; 
function disp(s:string,n:number):void;
```

如果参数类型不同，则参数类型应设置为 any。
参数数量不同你可以将不同的参数设置为可选。实例
```ts
//实例
function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 
function disp(x:any,y?:any):void { 
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");

```