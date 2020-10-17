---
title: 数据类型
date: 2019-10-05
sidebar: auto
categories:
  - TypeScript
tags:
  - TypeScript
---
# TypeScript数据类型

## 基础类型
1. any 任意类型  声明为 any 的变量可以赋予任意类型的值。 它常用于以下三种情况。
  - 变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查
  ```ts
  let x: any = 1;    // 数字类型
  x = 'I am who I am';    // 字符串类型
  x = false;    // 布尔类型
  ```
  - 改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查
  ```ts
  let x: any = 4;
  x.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
  x.toFixed();    // 正确
  ```
  - 定义存储各种类型数据的数组时，示例代码如下：
  ```ts
  let arrayList: any[] = [1, false, 'fine'];
  arrayList[1] = 100;
  ```
2. 数字类型	number	 双精度 64 位浮点值。它可以用来表示整数和分数。
```ts
let binaryLiteral: number = 0b1010;
```
3. 字符串类型	string	使用单引号（'）或双引号（"）来表示字符串类型。反引号（`）来定义多行文本和内嵌表达式
```ts
let a:string='您好，今年是 ${ name } 发布 ${ years + 1} 周年'
```
4. 布尔类型	boolean	 表示逻辑值：true 和 false。
```ts
let flag: boolean = true;
```
5. 数组类型	无	声明变量为数组。
```ts
// 在元素类型后面加上[]
let arr: number[] = [1, 2];

// 或者使用数组泛型
let arr: Array<number> = [1, 2];
```
6. 元组	无	元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。
```ts
let x: [string, number];
x = ['Runoob', 1];    // 运行正常
x = [1, 'Runoob'];    // 报错
console.log(x[0]);    // 输出 Runoob
```
7. 枚举	enum	枚举类型用于定义数值集合。
```ts
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c);    // 输出 2
```
8. void	void	用于标识方法返回值的类型，表示该方法没有返回值。
```ts
function hello(): void {
    alert("Hello Runoob");
}
```
9. null	null	 表示对象值缺失。
10. undefined	undefined	用于初始化变量为一个未定义的值
```ts
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
```

11. never	never	 never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。
  never 类型的变量只能被 never 类型所赋值  在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）
```ts
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```