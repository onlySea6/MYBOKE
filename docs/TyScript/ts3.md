---
title: 运算符
date: 2019-10-05
sidebar: auto
categories:
  - TypeScript
tags:
  - TypeScript
---
## TypeScript 主要包含以下几种运算
- 算术运算符 +(加) -(减)  *(乘)  /(除) %(取模) --(自减)  ++(自加)
```ts
var num1:number = 10
var num2:number = 2
var res:number = 0
res = num1 + num2
```
- 关系运算符 ==(等于)  !=(不等) >(大于)  <(小于)  >=(大于等于)  <=(小于等于)
 ```ts
var num1:number = 5;
var num2:number = 9;
var res = num1>num2 
```
- 逻辑运算符 &&(and)  ||(or)  !(not)
```ts
var avg:number = 20; 
var percentage:number = 90; 
var res:boolean = ((avg>50)&&(percentage>80)); 
```
- 按位运算符 &(AND) |(OR)  ~(取反)  ^(异或)  <<(左移)   >>(右移)  >>>(无符号右移)
- 位操作是程序设计中对位模式按位或二进制数的一元和二元操作。
 ```ts
var a:number = 2;   // 二进制 10 
var b:number = 3;   // 二进制 11
var result; 
result = (a & b);  
(a & b) =>  2
(a | b) =>  3
(a ^ b) =>  1
(~b) =>  -4
(a << b) =>  16
(a >> b) =>  0
(a >>> 1) =>  1
```
- 赋值运算符 =(赋值)  +=(先加再赋值)  -=(先减再赋值)  *=(先乘再赋值)  /=(先除再赋值)
```ts
var a: number = 12 
var b:number = 10  
a = b;
a = b: 10
a+=b: 20
a-=b: 10
a*=b: 100
a/=b: 10
a%=b: 0
```
- 三元/条件运算符 三元运算有 3 个操作数，并且需要判断布尔表达式的值
```ts
var num = -2;
var result = num > 0 ? "大于 0" : "小于 0，或等于 0";
console.log(result);
```
- 字符串运算符 :typeof 运算符   instanceof
```ts
var num = 12;
console.log(typeof num);
```
- 类型运算符