---
title: reacthook
date: 2019-10-05
categories:
  - react
tags:
  - react
---
## 16.8 以前函数组件是没有状态的  hooks是16.8版本以后新增的
1. useState
- 函数组件独有
**使用**
```js
import React,{useState}  from 'react'
function Add(){
    const [state,setState]=useState(0) //state=0  setState(state){}
    //第一个参数state 是要设置状态的值
    //第二个参数setState是修改state的方法
    //useState（参数initstate）参数表示state的初始值,也可以是函数但必须要有返回值
    return <div>
    {state}
    <button onClick={()=>setState(state=>state+1)}>add</button>
    </div>
}
//useState和函数组件实现本地时间 自动更新
 function Time(){
    const [state,setState]=useState(new Date().toLocaleString())
    setInterval(()=>{
        setState(new Date().toLocaleString())
    },1000)
    return <div>
    当前时间是---{
        state
    }
</div>
```