---
title: reacthook
date: 2019-10-05
categories:
  - react
tags:
  - react
---
## 16.8 以前函数组件是没有状态的  hooks是16.8版本以后新增的
1. useState  ```const [state,setState]=useState()```
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
2. useEffect ```useEffect(()=>{},[])```
- 数据获取、订阅、定时执⾏任务、⼿动修改ReactDOM这些⾏ 为都可以称为副作⽤。⽽useEffect就是为了处理这些副作⽤⽽⽣的
- useEffect也是componentDidMount、componentDidUpdate和componentWillUnmount这⼏个⽣命周期⽅法的统⼀

### useEffect(()=>{},[])  array(可选参数)：数组，⽤于控制useEffect的执⾏
1. 空数组，则只会执⾏⼀次（即初次渲染render）
2. ⾮空数组，useEffect会在数组发⽣改变后执⾏
3. 不填array这个数组，useEffect每次渲染都会执⾏

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
3. 上下文createContext(类组件和函数都可以用)  useContext(函数的hook)
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

