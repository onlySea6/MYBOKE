---
title: reacthook
date: 2019-10-05
sidebar: auto
categories:
  - react
tags:
  - react
---
### 16.8 以前函数组件是没有状态的  hooks是16.8版本以后新增的
##  useState  ```const [state,setState]=useState()```
- 每次渲染都是独立的闭包
- 函数式跟新 保证每次拿到的状态是上一次的状态
- 惰性初始 state    state只会初始一次
- 跳过state跟新 会通过Object.is来比较算法 浅比较state决定是否从新渲染

**使用**
```js
import React,{useState}  from 'react'
function Add(){
    const [state,setState]=useState(()=>{
        console.log('初始化')
        return 0
    }) //state=0  setState(state){}
   
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
##  useEffect ```useEffect(()=>{},[])```
- 数据获取、订阅、定时执⾏任务、⼿动修改ReactDOM这些⾏ 为都可以称为副作⽤。⽽useEffect就是为了处理这些副作⽤⽽⽣的
- useEffect也是componentDidMount、componentDidUpdate和componentWillUnmount这⼏个⽣命周期⽅法的统⼀

###  useEffect(()=>{},[])  array(可选参数)：数组，⽤于控制useEffect的执⾏
1. 空数组，则只会执⾏⼀次（即初次渲染render）
2. ⾮空数组，useEffect会在数组发⽣改变后执⾏
3. 不填array这个数组，useEffect每次渲染都会执⾏

useEffect会捕获props和state。所以即便在回调函数里，你拿到的还是初始的props和state。如果你想得到“最新”的值，你可以使用ref。
```js
import React, { useState,useEffect } from 'react'
function My(){
    let [cout,setcout]=useState(0)
    useEffect(()=>{
        document.title=`你点击了 ${cout} 次`
 //副作⽤逻辑
  return ()=>{//componentWillUnmount
 //清理副作⽤需要清理的内容
  //组件渲染和组件 卸载前执⾏的代码
 }
    },[cout])
    return<>
        <button onClick={()=>setcout(cout+1)}>点击{cout}</button>
    </>
}
```
##  useContext
- 上下文createContext(类组件和函数都可以用)  useContext(函数的hook)
- context上下文解决props多层传递 跨层级组件传值
- Context提供了两个组件  Provider(提供者) Consumer(消费者)

- 类组件使用createContext
```js
import React ,{Component,createContext} from 'react'
 //1. 创建上下文对象
let themContext=createContext()
---
//传递的方法
    conm=(money)=>{
        this.setState({
            num:this.state.num-money
        })
    }
    render(){
        return (
            //2. 父级把传递数据的组件用  定义的上下文对象.Provider包裹 并用value进行值传递
            <themContext.Provider value={{num:this.state.num,conm:this.conm}}>
                 <div>
                 {this.state.num}
            <Grandc/>
        </div>
            </themContext.Provider>
       )
    }
------
class Grandc extends Component{
    // 3.定义一个静态属性：  static contextType(固定的) =定义的上下文对象
    //上下文对象会挂载到this.context上面
    static contextType=themContext
    constructor(){
        super()
    }
    render(){
        console.log(this.context)
        return <>
        我是孙子组件
        {this.context.num}
        <button onClick={()=>this.context.conm(10)}>花</button>
        </>
    }
}
```
- 函数组件使用createContext 并且配合useContext ```let value=useContext(上下文对象) ```

```js
//1.定义上下文
import {createContext} from 'react'
//createContext第一个参数表示上下文的默认值
let themContext=createContext({
    num:0
})
//displayName的值是个字符串 
//React Devtools 使用该字符串来确定context要显示的内容
themContext.displayName='themContext'//开发时候 组件名字显示在开发端
export default themContext //1.1将定义的上下文导出去

//2.使用引入
//相当于类组件的 static contextType=上下文对象
import themContext from './contextex'
import React,{useContext} from 'react'
import {render} from 'react-dom'

function My(){
//3. 上下文的默认值只有在没有provider包装的情况下才生效
//如果有provider包裹 将undefined传递给Provider的value时  消费组件的默认值不会生效
    return<themContext.Provider value={{num:100}}>
        父亲  
        大儿子 <Child/>
       二儿子 <Chid2/>
    </themContext.Provider>
}
function Child(){
    return <>
        <themContext.Consumer>
            {
                 //value即为上下文传过来的对象
              value=>{return <div>{value.num}</div>
              }
            }
        </themContext.Consumer>
    </>
}
function Chid2(){
    //这里使用useContext 使用这个不用consumer包裹
    // 相当于类组件的 static contextType=(上下文对象)
    let context=useContext(themContext)
    return <div>
        {context.num}
    </div>
}
render(
    <My> </My>,
      document.getElementById('root')
    );
```
- createContext和useContext小例子
```js
//1.
//用来放置上下文
import {createContext} from 'react'
//定义两种按钮 颜色(一亮一暗)
export  let themes = {
    light: {
      color: 'white',
      background: 'blue',
    },
    dark: {
      color: '#ffffff',
      background: '#222222',
    },
  }
  //定义上下文 默认值
  let themeContext=createContext(themes.light)
   export default themeContext
//
//上下文案例
import themeContext,{themes} from './them'
import React,{useContext, useState} from 'react'
import {render} from 'react-dom'
//定义按钮组件 
function Btn(){
    //拿到上文对象
    let context=useContext(themeContext)
    return<button style={{color:context.color,backgroundColor:context.background}}> 按钮</button>
}
function My(){
    let [color,setColor]=useState(themes.dark)
    function change(){
     let them= color==themes.dark?themes.light:themes.dark
        setColor(them)
    }
    return<themeContext.Provider value={color}>
        <Btn/>
        <button onClick={change}>点击切换主题</button>
        点前主题{color.color}
    </themeContext.Provider>
}
render(
    <My> </My>,
      document.getElementById('root')
    );
    
```
##  useReducer ->useState的替代方案
###  const [state, dispatch] = useReducer(reducer, initialArg, init);
- state初始状态  dispatch派发
- initialArg是一个初始化的状态
 ```js
 let initialArg = {
	num: 0,
	//初始化状态
}
function My() {
	const [state, dispatch] = useReducer(reducer, initialArg,init)
	return (
		<div>                                           
        {/* payload传递add动作的参数 */}
			<button onClick={() => dispatch({ type: 'add',payload:5 })}>加</button>
			{state.num}
			<button onClick={() => dispatch({ type: 'del' })}>减</button>
		</div>
	)
}
 ```
- reducer是一个函数接收派发过来的动作并返回新的state
```js
function reducer(state, action) {
//reducer管理员 用来进行状态管理
//参数 state    action->dispatch传过来的对象 可以根据type属性判断传递过来的动作是什么
//如果传递参数使用payload进行传递 在action里面
	switch (action.type) {
		//...state 防止原来的状态改变
		case 'add':
			return { ...state, num: state.num + action.payload }
		case 'del':
			return { ...state, num: state.num - 1 }
		default:
			return state
	}
}
```
- init 如果传递了第三个参数 将初始的state初始化
```js
//初始化一个状态
//为啥用init？这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利
function init(initialArg){
    return initialArg //这样做更省性能
    // {...initialArg,num:initialArg.num+1}
}
```
### react优化->减少不必要的渲染 
---
1. 函数组件和类组件 React.memo  ---->都是浅比较
```js
let MeCHild = memo(Child)
//父组件里
<MeCHild/>
```
2. 类组件有直接的PureComponent 自己进行浅比较
```js
class Name extends PureComponent{}
```
3. 函数组件，如果子组件依赖父组件的数据可以使用useMemo
4. 子组件依赖父组件的事件 用useCallback
---

##  useMemo
- 使用备忘录
- 基本用法: useMemo(()=>{return {cout}},[cout(依赖项)])  没依赖项还是会执行
- 第一个参数是回调函数->子组件依赖的参数  用来返回定义的状态
- 第二个参数是一个数组表示依赖项 用法和useEffect用法完全相同

##  useCallback
- useCallback  useCallback(setCout((cout) => cout + 1),[cout(依赖项)])
- 第一个参数是子组件依赖的函数 减少更新
- 第二个参数是一个数组表示依赖项 用法和useEffect用法完全相同 相当于useMemo(callback,[deps])

```js
function My() {
	const [name, setName] = useState('what')
	const [cout, setCout] = useState(0)
	let data = useMemo(() => {
		return { cout }
	}, [cout])
	//    const add=()=>{
	//         setCout(cout=>cout+1)
    //     }
	const add = useCallback(() => {
		setCout((cout) => cout + 1)
	}, [cout])
	return (
		<>
			<input value={name} onChange={(e) => setName(e.target.value)} />
			{name}
			<MeCHild data={data} onButton={add} />
		</>
	)
}
let MeCHild = memo(Child)
function Child(props) {
	console.log(props)
	return (
		<>
			{props.data.cout}
			<button onClick={props.onButton}>点击</button>
		</>
	)
}

```
##  useRef(只能在函数组件使用) ---createRef(这不是函数hook) 但都能在函数组件和类组件使用
- 返回的都是一个不可变的对象 通过current拿到当前dom
```js
    let inpot = useRef()
    inpot.current.focus()
```
### useRef配合forwardRef获取子组件dom
```js
let Text = forwardRef(TextInput)
function Father() {
    //父组件
	let iptRef = useRef()
	function getF() {
		iptRef.current.focus()
		iptRef.current.value = 100
	}
	return (
		<>
			<Text ref={iptRef} />
			<button onClick={getF}>点击获取焦点</button>
		</>
	)
}
function TextInput(props, Pref){
    //父组件的ref作为子组件的第二个实参Pref
    return (
		<div>
			<input ref={Pref} />
		</div>
}
```
## useImperativeHandle 使用命令式代码 配合forwardRef一起使用
- useImperativeHandle(Pref, () => { 暴露给父组件的实例值 使用自己定义的ref})
    - 第一个参数是传进来的ref Pref
    - 第二个参数是回调函数
```js
function TextInput(props, Pref) {
	let inpot = useRef()
	//我想暴露给父组件的ref通过命令式来控制
    // useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
    //在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
	useImperativeHandle(Pref, () => {
		return {
            //暴露给父组件的实例值
            //使用自己定义的ref
			focus() {
				return inpot.current.focus()
			},
		}
	})
	return (
		<div>
			<input ref={inpot} />
		</div>
	)
}
let Text = forwardRef(TextInput)
function Father() {
	let iptRef = useRef()
	function getF() {
		iptRef.current.focus()
		iptRef.current.value = 100
	}
	return (
		<>
			<Text ref={iptRef} />
			<button onClick={getF}>点击获取焦点</button>
		</>
	)
}
```
## useLayoutEffect useLayoutEffect(()=>{},[])使用的方法和useEffect一样
```js
// useEffect 在浏览器渲染完成后执行
//useLayoutEffect  浏览器渲染前执行 阻塞dom渲染 不影响布局才使用
//建议用usEffect
```
## 自定义hook
- 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook
```js
import React,{useEffect,useState} from 'react'
import axios from 'axios'
// 响应拦截器   处理响应回来的数据 把数据进行简化处理
axios.interceptors.response.use((res)=>{
    return res.data
},err=>{
    Promise.reject(err)
})
export default function useAjax(url) {
    const [data,setData]=useState(null)
    useEffect(()=>{
       async function fetDat(){
         datas= await axios.get(url)
         setData(datas)
       }
       fetDat()
    },[url])
    return data
}
```
- 使用
```js
import useAjax from './useAjax'
const data=useAjax()
```