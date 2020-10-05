---
title: 数组方法解析
date: 2019-03-01
categories:
  - Array
tags:
  - Array
---
## 数组方法
1. filter
```js
arr =[1,2,3,4]
Array.prototype.myFilter=function(cb){
let newArr=[]
for(let i=0;i<this.length;i++>){
    if(cb(this[i],i)){
        newArr.push(this[i])
    }
}
}
let a=arr.map(item=>item!=2)
console.log(a)
```
2. map
```js
arr=[1,2,3,4]
Array.prototype.myMap=function(cb){
let newArr=[]
for(let i=0;i<this.length;i++>){
    newArr.push(cb(this[i]))
}
return newArr
}
let b=arr.map(item=>item*2)
console.log(b)
```
3. reduce
```js
arr=[1,2,3,4,5]
Array.prototype.fakeReduce = function (fn, base) {

    let newArr = this;//原数组
    let arr = newArr.concat(); //数组合并

    if (base) arr.unshift(base);
    let index, newValue;
  
    while (arr.length > 1) {
      index = newArr.length - arr.length + 1;
      newValue = fn.call(null, arr[0], arr[1], index, newArr);
  
      arr.splice(0, 2, newValue); // 直接用 splice 实现替换
    }
  
    return newValue;
  };
  console.log(arr.fakeReduce((item,next,index)=>{
      return item*next
  },0))
```