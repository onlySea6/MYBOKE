---
title: ES6解构赋值
date: 2019-09-30
categories:
 - ES6
tags:
 - ES6
---
## 解构赋值：es6允许按照某种模式从数组或者对象中提取值，提取的值对变量进行赋值，这个过程称为结构辅助
1. 数组的结构赋值
- 数组一一对应，这是一个有序的对应关系，如果解构不成功值为undefined可以写默认值
在解构的时候如果有值就会使用，如果没有值会找默认值，没有默认值，就是undefined
```js
let newArray = [1, 2, 3];
let x, y, z;
[x, y, z] = newArray;
 //简写
 let [a, b, c] = [1, 2, 3];
```
2. 对象的结构赋值
- 对象根据属性名和变量名一一对应没有次序影响，如果解构不到，值为undefined可以写默认值
```js
let object = {name : "John", age : 23};
let name, age;
({name, age} = object);
//object destructuring assignment syntax对象解构赋值的左侧为解构赋值表达式，
//右侧为对应要分配赋值的对象。解构语句的两边千万不要遗漏左右括号（），否则会报错。
```
3. 字符串的结构赋值
- 字符串在解构时会把他转化成一个伪数组
- null和undefined不能被解构
4. 函数参数的结构赋值
- 传进去的参数在传入函数内部就会被解析成这个函数的变量
- 默认值：在函数的定义的括号中变量名字后面用=链接
```js
function myFunction({name = 'Eden', age = 23, profession ="Designer"} = {}){
    console.log(name, age, profession); // Outputs "John 23 Designer"
}
myFunction({name: "John", age: 23});
//传递一个空对象作为默认参数值，如果将undefined作为函数参数传递，变量将使用默认值。
```
## 结构赋值的用途
1. 交换变量
2. 可以提取JSON数据：对象的结构赋值
3. 函数返回多个值
4. 给函数参数默认值，防止报错或者找不到数据
## 解构赋值的其他用途
- 解构 Math 对象的方法
```js
let {floor,pow}=Math;//把Math里的方法提取出来变成一个变量
let a=1.1;
console.log(floor(a));//1
console.log(pow(2,3));//8
```
- 获取字符串的长度
```js
var {length}='lxy';
console.log(length);//3
```
- 拆分字符串
```js
var [a,b,c,d]='前端达人';
console.log(a,b,c,d) // 输出：前 端 达 人
```
- 交换变量
```js
let x = 1;
let y = 2;
[x, y] = [y, x];
```
- 遍历 Map 结构
```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
    console.log(key + " is " + value);
}
```
- 加载指定模块的方法
```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```
## 常用场景介绍
- 与后端 API 接口做数据交互，我们需要处理返回的 JSON 对象
```js
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]
```