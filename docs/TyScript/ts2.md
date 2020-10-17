---
title: 变量声明
date: 2019-10-05
sidebar: auto
categories:
  - TypeScript
tags:
  - TypeScript
---
## TypeScript 变量的命名规则：

- 变量名称可以包含数字和字母。

- 除了下划线 _ 和美元 $ 符号外，不能包含其他特殊字符，包括空格。

- 变量名不能以数字开头。
  
## 变量使用前必须先声明 四种声明变量的方式
1. 声明变量的类型及初始值： var [ 变量名] : [ 类型 ] = 值;
```ts
var uname:string = "Runoob";
```
2. 声明变量的类型，但没有初始值，变量值会设置为 undefined：var [ 变量名 ] : [ 类型 ];
```ts
var uname:string;
```
3. 声明变量并初始值，但不设置类型，该变量可以是任意类型：var [ 变量名 ] = 值;
```ts
var uname = "Runoob";
```
4. 声明变量没有设置类型和初始值，类型可以是任意类型，默认初始值为 undefined： var [ 变量名 ];
```ts
var uname;
```
* 变量不要使用 name 否则会与 DOM 中的全局 window 对象下的 name 属性出现了重名
* TypeScript 遵循强类型，如果将不同的类型赋值给变量会编译错误
```ts
let a:number="什么啊"
```

## 类型断言（Type Assertion）

- 类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。
- 语法格式：     <类型>值     或:   值 as 类型 
```ts
var str = '1' 
var str2:number = <number> <any> str   //str、str2 是 string 类型
console.log(str2)
```
### 类型推断
- 当类型没有给出时，TypeScript 编译器利用类型推断来推断类型。

- 如果由于缺乏声明而不能推断出类型，那么它的类型被视作默认的动态 any 类型。
```ts
var num = 2;    // 类型推断为 number
console.log("num 变量的值为 "+num); 
num = "12";    // 编译错误
console.log(num);
```

## TypeScript 作用域：
- 全局作用域 − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
```ts
var global_num = 12    
console.log("全局变量为: "+global_num)  
```
- 类作用域 − 这个变量也可以称为 字段。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
```ts
class Numbers { 
   num_val = 13;             // 实例变量
   static sval = 10;         // 静态变量
   
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log(Numbers.sval)   // 静态变量
```
- 局部作用域 − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。
```ts
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)
```