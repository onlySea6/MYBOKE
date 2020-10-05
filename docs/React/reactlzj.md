---
title: react类组件
date: 2019-10-05
categories:
  - react
tags:
  - react
---

## React 类组件
1. 引入组件
```js
import React ,{Component} from 'react'
```
2.创建类组件
```js
//(组件名大写)
class Name extends Component{
    constructor{
        super()
    }
    render(){
        return <>这是jsx</>
        //React.Fragment 简写 <></>
    }
}
```
3. 用的时候绑定
```js
render(
   <Name/>,
    document.getElementById('root')
  );
```
## 修改类组件状态
1. 定义state 初始化状态
    -在constructor{super() this.state={a:'b'}}  定义
    -或者在组件内定义 state={a:'b'}
2. 定义事件 ``` <button onClick={this.HandleClick}>点击改变</button> ```
3. 组件内防止this丢失使用箭头函数 HandleClick=(prop)=>{} (推荐使用的)
  - 或者通过bind防止this丢失 ``` <button onClick={this.HandleClick.bind(this)}>点击改变</button> ```
4. react类组件状态修改 必须通过this.setState方法
5. ```   {/* <button  onClick={()=>this.add()}>点击</button>  这样写可以add(){} */}```
```js
    this.setState({
      a:'new b',
    })
```
## this.setState异步语法
```js
// this.setState是异步的所以这里的number 总是state初始化状态
        this.setState({
            number:this.state.number+1
        })
```
- 可以用this.forceUpdate()强制更新 不管数据有没有改变
##  如果想拿到上次状态的值 setState里写出回调函数
```js
   this.setState(prevstate=>(
            //参数prevstate表示上一次状态
            { number:prevstate.number + 1}
        ))
```
## props传值（只能父传子）-不仅能传属性还能传递父组件方法
1. 类组件里面
```js
//子类组件
class son extends React.Component{
 constructor(props){
        super(props)
        //props这里就是父传子的值(旧版) 
    } 
    cf=()=>{
        //触发父组件的事件通过props
        this.props.change()
    }
    // 新版props直接用 不用传props参数
     render(){
        return <>
      姓名-{this.props.name},
      年龄-{this.props.age}岁
      性别-{this.props.sex},
      <button onClick={this.cf}>触发父组件事件</button>
        </>
    }
}
//父类组件
let na={name:'小明', age:'15', sex:'男'}
class Father extends React.Component{
     constructor(){
        super()
        this.state={
            a:1
        }
    }
    // 定义改变父组件的方法
    change=()=>{
        this.setState({
            a:this.state.a +1
        })
    }
     render(){
        return <>
     <son {...na} change={this.change}/>
     <son  name='小王' age='16' sex='男'/>
        </>
    }
}
```
2. 函数组件里面
```js
//子
function St({...rog}){
    return (<>
        <div>我是函数组件</div>
        姓名-{rog.name},
      年龄-{rog.age}岁
      性别-{rog.sex},
    </>)
}
//父
<St  name='小宝' age='16' sex='男' />
```
## 条件渲染 循环渲染
1. 条件渲染 通过判断来决定事件是否渲染（写三元表达式）
 - 函数组件
 ```js
const A=1
function My(){
return A&&<div>是</div> 或者 A?<div>是</div>:'否
}
 ```
 - 类组件
 ```js
const A=1
class Xr extends React.Component{
    render(){
        return A?<div>是</div>:'否'
    }
}
 ```
2. 循环渲染
 - 函数组件
```js
//循环渲染
let list=[{name:'appel',price:'4'},{ name:'banana',price:'8'},{name:'orange',price:'10'},{name:'pink',price:'6',}]
//一般不要使用索引作为key 一般采用id作为key 为了domdiff
function Car(){
    return list.map((item,index)=>{
        return <div key={index}>
            <p>名称{item.name}</p>
            <p>价格{item.price}</p>
        </div>
    })
}
```
- 类组件
```js
let list=[{name:'appel',price:'4'},{ name:'banana',price:'8'},{name:'orange',price:'10'},{name:'pink',price:'6',}]
class Xh extends React.Component{
    render(){
        return list.map((item,index)=>{
        return <div key={index}>
            <p>水果：{item.name}</p>
            <p>价格：{item.price}</p>
           </div>})
    }
}
```