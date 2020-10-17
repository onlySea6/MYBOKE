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

## 高阶组件(HOC)
- 组件作为函数的参数或者返回值  
- 封装公用逻辑  一般不超过两层
---
注意：封装高级组件的时候props别忘记传，以及定义的高级组件使用的时候要在原组件的下面调用，否则调用不到
---
```js
import React, { Component } from 'react'
import { render } from 'react-dom'
//高阶组件用于封装重复的代码 
function Logger(OldCom) {
	//参数是老的组件(My/My1)  返回一个新的组件 但是渲染还是老的组件
	return class  extends Component{
        constructor(){
            super()
            this.state = {
                tim: Date.now(),
            }
        }
        componentDidMount(){
            console.log(Date.now() - this.state.tim + 'ms')
        }
        render(){
            return <OldCom {...this.props}></OldCom>
        }
    }
}
class App extends Component {
	constructor() {
		super()
	}
	render() {
		return <></>
	}
}
let Loger=Logger(App)
class My1 extends Component {
	constructor() {
		super()
	}
	render() {
		return <></>
	}
}
render(
	<>
    <Loger></Loger>
		 <My1 />
	</>,
	document.getElementById('root')
)
```