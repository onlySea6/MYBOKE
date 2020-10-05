---
title: react受控组件和ref
date: 2019-10-11
categories:
  - react
tags:
  - react
---
## 受控组件
1. 什么是受控组件
- dom元素的值受 react状态控制 针对表单元素
- 受控组件input值 想改变有两种方式 
```js
// 1.defaultValue  <input defaultValue={this.state.text} /> 
// 2.使用onChange事件  <input value={this.state.text} onChange={this.add} />    
add=(event)=>{
        this.setState({
            text:event.target.value
        })
    }
// 3. 如果是只读属性可以直接使用readOnly <input value={this.state.text} readOnly />
```
2. 非受控组件不受状态的影响

## ref
- ref可以是dom元素的引用也可以是组件的引用
- 我们需要的元素会挂载到ref的current属性上
1. 类组件使用
```js
//createRef 和 useRef功能用法一样 但是useRef更省性能
import React,{createRef}  from 'react'
class Sum extends React.Component{
    constructor(){
        super()
        //初始化ref  createRef使用
        this.refA=createRef()
        this.refB=createRef()
        this.refC=createRef()
    }
    add=()=>{
        let a=this.refA.current.value
        let b=this.refB.current.value
        this.refC.current.value=parseFloat(a)+parseFloat(b)
    }
    render(){
        return <>
           <input ref={this.refA}/>+
           <input ref={this.refB}/>
           <button onClick={this.add}>=</button>
           <input ref={this.refC}/>
        </>
    }
}
```
2. 类组件ref和props配合使用
```js
//父组件
import React,{createRef}  from 'react'
class Father extends React.Component{
    constructor(){
        super()
        this.a=createRef()
        this.state={
            a:0
        }
    }
    //1. 父组件定义子组件访问的方法
    change=()=>{
      this.setState({
          a:this.state.a+1
      })
    }
    add=()=>{
        //这样就可以获取到子组件的input
        this.a.current.b.current
    }
    render(){
         //2. 将父组件自定义的事件传给子组件
        return <>
        <Son ref={this.a} change={this.change}/>
        <button onClick={this.add}></button>
        </>
    }
}

//子组件
class Son extends React.Component{
    constructor(){
        super()
        this.b=createRef()
    }
    //3. 子组件触发父组件的事件
    cf=()=>{
    //触发事件通过this.props触发
        this.props.change()
    }
     render(){
        return <>
        <input ref={this.b}/>
        <button onClick={this.cf}></button>
        </>
    }
}
```
## 函数组件ref
- forwardRef 访问子函数组件用的
```js
import React,{createRef,forwardRef,useRef}  from 'react'
```
- 当函数作为子组件要想访问函数 内部的dom React转发ref的方法 forwardRef
1. 父组件定义父级访问子级的ref
```js
 this.refB=createRef()
  < Child ref={this.refB}/>
```
2. 子组件定义forwardRef方法并把 子组件名字作为参数
```js
let ForwardRef=forwardRef(Child)
```
3. 子组件接收参数 第二个参数才是ref名字自定义
```js
function Child (props,pref){
    return <>
        <input ref={pref}/>
    </>
}
```
4. 将父组件里的子组件用
```js
 <ForwardRef Child ref={chid}/>
```
5. 用的话直接
```js
chid.current  //直接访问到子组件的input
```
