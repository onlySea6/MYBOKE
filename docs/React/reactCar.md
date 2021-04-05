---
title: react基础小例子
date: 2019-10-11
sidebar: auto
categories:
  - react
tags:
  - react
---
## 类组件和函数组件实现购物车
1. 类组件实现购物车
```js
import React, { Component } from 'react';
import { render } from 'react-dom';
class App extends Component {
  constructor() {
    super();
    this.state = {
      carlist: [
        { name: '苹果', num: 3, price: 4, checked: false },
        { name: '香蕉', num: 5, price: 8.8, checked: false },
        { name: '菠萝', num: 9, price: 10.8, checked: false },
      ],
      checkAll: false, //定义全选的状态
      total:0 //定义价格总和  
    };
  }
  //计算价格总和 
  sumPrice=()=>{
    let  list = [...this.state.carlist]
    //只计算选中的商品的价格  
    let buylist  = list.filter(item=>item.checked==true)
     let total = buylist.reduce((prev,next)=>{
      return prev +next.num*next.price
    },0)
    this.setState({
      total
    })
  }
  //单选事件 先改自己的选中状态 在自己改变过后看是否需要改变全选状态
  handleOne = (index) => {
    let list = [...this.state.carlist];
    list[index].checked = !list[index].checked;
    //改全选的状态 只要有一个没选中的就不是全选
    let all = list.every((item) => item.checked == true);
    this.setState({
      carlist: list,
      checkAll: all,
    });
    this.sumPrice()
  };
  //全选事件
  changeAll = () => {
    let list = [...this.state.carlist];
    let all = this.state.checkAll;
    all = !all;
    //循环保证单选的每一项和点击全选的时候一致 
    for(let i=0;i<list.length;i++){
      list[i].checked = all
    }
    this.setState({
      checkAll: all,
    });
    this.sumPrice()
  };
  render() {
    return (
      <div>
        全选{' '}
        <input
          checked={this.state.checkAll}
          type="checkbox"
          onChange={this.changeAll}
        />
        {this.state.carlist.map((item, index) => {
          return (
            <li key={index}>
              <input
                checked={item.checked}
                type="checkbox"
                onChange={() => {
                  this.handleOne(index);
                }}
              />
              <br />
              名称：{item.name}
              数量：{item.num}
              价格：{item.price}元
            </li>
          );
        })}
        总价 {this.state.total}
      </div>
    );
  }
}

render(<App />, window.root);
```
2. 函数组件
```js
//函数组件
import { func } from 'prop-types'
import React, { useState } from 'react'
import { render } from 'react-dom'
function My() {
	const [state, setState] = useState({
		list: [
			{ name: '苹果', number: 5, price: 6, checks: false },
			{ name: '橘子', number: 8, price: 8, checks: false },
			{ name: '香蕉', number: 2, price: 3, checks: false },
			{ name: '菠萝', number: 5, price: 10, checks: false },
			{ name: '甘蔗', number: 4, price: 2, checks: false },
			{ name: '柚子', number: 8, price: 15, checks: false },
			{ name: '柠檬', number: 11, price: 5, checks: false },
		],
		isAllChecked: false,
		allPrice: 0,
	})
	function quan(e) {
		let alls = e.target.checked
		let lits = state.list
		lits.map((item, index) => {
			item.checks = alls
		})
		setState({
            list: lits,
            allPrice: 0,
        })
        z()
	}
	function dan(index) {
       
		let lists = state.list
        lists[index].checks = !lists[index].checks
		let os = lists.every((item, index) => item.checks === true)  
		setState({
			list: lists,
            isAllChecked: os,
            allPrice: 0,
        })
        z()
    }
    function jian(index){
        let lits=state.list
        if(  lits[index].number!=0){
            lits[index].number= lits[index].number -1
            setState({
                list:lits,
            })
        }
        z()
    }
    function jia(index){
        let lits=state.list
        lits[index].number= lits[index].number +1
        setState({
            list:lits
        })
        z()
    }
  function z(){
       let a=0
       let lts=state.list
       let os = lts.every((item, index) => item.checks === true)
       lts.map((item,index)=>{
           if(item.checks===true){
               a += parseFloat(item.number)* parseFloat(item.price)
           }
           setState({
               list:lts,
               allPrice:a,
               isAllChecked: os,
        })
       })
   }
	return (
		<div>
			<input
				type="checkbox"
				checked={state.isAllChecked}
				onChange={quan}
				value=""
			/>{' '}
			全选
			{state.list.map((item, index) => {
				return (
					<div key={index}>
						<input
							checked={item.checks}
							type="checkbox"
							onChange={() => dan(index)}
							value=""
						/>
						名字:{item.name}
						<button onClick={()=>jian(index)}>-</button>
						数量：{item.number}
						<button onClick={()=>jia(index)}>+</button>
						价格:{item.price}
					</div>
				)
			})}
			总价:{state.allPrice}
		</div>
	)
}
render(<My> </My>, document.getElementById('root'))
```
## 函数组件实现ToDolist
```js
//Todolist代办事项
// import './todo.css'
import React,{useState,useRef,useEffect,forwardRef} from 'react'
import { render } from 'react-dom'
function  Todolist(){
    //todo列表
    let [newlist,setnewlist]=useState([1,2])
    //定义已经完成的列表
    let [dolist,setdolist]=useState([3])
    //定义清空输入框的
    let [nuall,setState]=useState(false)
    function change(s,ss){
        setnewlist(newlist=>s)
        setdolist(dolist=>dolist.concat(ss))
    }
    function adds(t,tt){
        setdolist(dolist=>t)
        setnewlist(newlist=>newlist.concat(tt))
    }
    function tj(c){
        // console.log(typeof(c) )
        let arr=[]
        arr.push(c)
        setnewlist(newlist=>newlist.concat(arr))
    }
    const Text=forwardRef(Headers)
    let iptRef = useRef()
    useEffect(()=>{
        //清空输入框
        iptRef.current.value=''
    },[newlist])
        return <>
        <Text tj={tj}  ref={iptRef}/>
       <List newlist={newlist} change={change}/>
       <Footer dolist={dolist} adds={adds}/>
        </>
}
function Headers ({nuall,setState,tj},Pref){
    // const doVal=useRef()
    //头部
  function add(props){
   let Val= Pref.current.value
   if(Val){
    tj(Val)
   }
}
   return <div className='header'>
       <span>Todolist</span>
       <span className='span'>
       <input placeholder='输入代办事项' value={nuall}  ref={Pref} />
       <button onClick={add}>添加</button>
       </span>
   </div>
}
//list列表
function List({newlist,setnewlist,change}){
    function del(a){
        let newArr=[]
        let newArr2=[]//这是多的
      newlist.map((item,index,arr)=>{
           if(index!==a){
               newArr.push(arr[index])
           }else{
            newArr2.push(arr[index])
           }
        })
        change(newArr,newArr2)
    }
return <div className='do'>
     <p>正在进行</p>
 {newlist.map((item,index)=>{
    return <li key={index}>
    <input type='checkbox' onChange={()=>del(index)}/>
        {item}
    </li>
 })}
</div>
}
//底部
function Footer({dolist,setdolist,adds}){
    function add(b){
        //拿到点击的
      let newArr=[]
      let newArr2=[]
      dolist.map((item,index,arr)=>{
          if(index!==b){
            newArr.push(arr[index])
          }else{
            newArr2.push(arr[index])
          }
      })
      adds(newArr,newArr2)
    }
    return<div className='do'>
    <p>已经完成</p>
{dolist.map((item,index)=>{
   return <li key={index}>
   <input type='checkbox' checked={true} onChange={()=>add(index)} />
       {item}
   </li>
})}
</div>
    }


render(<Todolist></Todolist>, document.getElementById('root'))
```
## 类组件实现todolist

```js
import React, {Component ,createRef} from 'react'
import { render } from 'react-dom'
class My extends Component{
    //input
    constructor(){
        super()
        this.state={
           over:['3'],
           list:['1','2'],
        }
       this.refA=createRef()
    }

    // 添加代办事项
    add=()=>{
        let val= this.refA.current.value
      let abs=this.state.list
      abs.push(val)
        this.setState({
            list:abs
        })
    }
    componentDidUpdate(){
        //更新之后清空这个输入框
        this.refA.current.value=''
    }
    updata=(oldArr,newArr)=>{
        // oldArr要留下的
      let a=  this.state.over.concat(newArr)
        this.setState({
          over:a,
          list:oldArr
        })
    }
    updatas=(oldArr,newArr)=>{
        // oldArr这是要留下的
        let a=  this.state.list.concat(newArr)
        this.setState({
          over:oldArr,
          list:a
        })
    }
  render(){
      return<>
          <input ref={this.refA}/> 
          <button onClick={this.add}>添加事件</button>
          <List value={this.state.list} updata={this.updata} />
          <Foot value={this.state.over} updata={this.updatas} />
      </>
  }
}
class List extends Component{
    // 代办事项
    constructor(props){
        super()
        // console.log(props)
    }
    add=(index)=>{
        let pushArr=[]//这是要删除的
        let newArr=[] //这是要保留的
    let a= this.props.value[index]  
    this.props.value.map((item,index)=>{
        if(item===a){
            pushArr.push(item)
        }else{
            newArr.push(item)
        }
    })
    this.props.updata(newArr,pushArr)
    }
  render(){
      return<div>
        代办的事项
            {
                this.props.value.map((item,index)=>{
                    return <div key={index}>
                        <input type='checkbox' onChange={()=>this.add(index)}/>
                            {item}
                    </div>
                })
            }
      </div>
  }
}
class Foot extends Component{
    // 完成的事项
    constructor(props){
        super(props)
    }
    to=(index)=>{
        let pushArr=[]//这是要删除的
        let newArr=[] //这是要保留的
    let a= this.props.value[index]  
    this.props.value.map((item,index)=>{
        if(item===a){
            pushArr.push(item)
        }else{
            newArr.push(item)
        }
    })
    this.props.updata(newArr,pushArr)
    }
  render(){
      return<>
          完成的事项
          {
              this.props.value.map((item,index)=>{
                  return <div key={index}>
                        <input type='checkbox' onChange={()=>this.to(index)}/>
                            {item}
                    </div>
              })
          }
      </>
  }
}
render(<My> </My>, document.getElementById('root'))
```

## 使用上下文使按钮变色

1. 函数组件
```js
import React, {createContext,useContext,useState } from 'react'
import { render } from 'react-dom'
let themes = {
    light: {
      color: 'white',
      background: 'blue',
    },
    dark: {
      color: '#ffffff',
      background: '#222222',
    },
  }
  //定义上下文对象
  let theme=createContext()
  function Child(){
      let context=useContext(theme)
    //   console.log(context)
      return<>
          <button style={{color:context.color,background:context.background}}>颜色</button>
      </>
  }
function My(){   
    let [state,setState]=useState(themes.dark)
    function tag(){
        let a= state ===themes.dark?themes.light:themes.dark
        setState(a)
    }
        return<theme.Provider value={state}>
            <Child/>
            <button onClick={tag}>点击</button>
        </theme.Provider>
    
 
}
render(<My> </My>, document.getElementById('root'))
```
2. 类组件
```js

import React,{Component, createContext} from 'react'
import {render} from 'react-dom'
let themes = {
    light: {
      color: 'white',
      background: 'blue',
    },
    dark: {
      color: '#ffffff',
      background: '#222222',
    },
  }
let thenms=createContext()
class My extends Component{
    constructor(){
        super()
        this.state={
            colors:themes.light
        }
    }
    tag=()=>{
     let a=   this.state.colors==themes.light?themes.dark:themes.light
     console.log(a)
     this.setState({
        colors:a
     })
    }
    render(){
        return<thenms.Provider value={this.state.colors}>
            <button onClick={this.tag}>点击变色</button>
            <Btn/>
        </thenms.Provider>
    }
}
class Btn extends Component{
    static contextType=thenms
    constructor(props){
        super()
      
    }
    render(){
        // console.log(this.context)
        return<>
            <button style={{color:this.context.color,background:this.context.background}}>按钮</button>
        </>
    }
}
render(<My></My>,document.getElementById('root'))
```

## 函数组件实现全选 
```js
import React,{useState,createRef} from 'react'
import './style/index.scss'
export default function Home () {
    const [state, setState] = useState([])
    const [wc,setWc]=useState(0)
    const add = (e) => {
        if (e.keyCode == 13) {
            state.push({ val: e.target.value ,check:false})
            e.target.value=''
            setState([...state])
             ALL()
        }
    }
    // 点击完成
    const ipts=createRef()
    const adds = (e) => {
        let val= e.target.checked
        let index=e.target.attributes.aaaaaaaaaaaaa.value
        state[index].check = val
        setState([...state])
        ALL()
    }
    // 判断全选的函数
    const ALL = () => {
         let allval = state.every((item) => {
				return item.check === true
			})
			// 全选按钮
        ipts.current.checked = allval
        // 判断个数的
         let n = 0
			state.map((item) => {
				if (item.check == true) {
					n = n + 1
				}
			})
			setWc(n)
    }
    // 删除
    const sc = (index) => {
        state.splice(index, 1)
        setState([...state])
        ALL()
    }
    // 全选
    const all = (e) => {
        let val = e.target.checked
        state.map((item) => {
            item.check=val
        })
        setState([...state])
        ALL()
    }
    return (
		<>
			<div className='header'>
				<input type='text' placeholder='输入事件' onKeyUp={add} />
			</div>
			<h6>未完成</h6>
			{state?.map((item, index) => {
				return (
					<div className='list' key={index}>
						<input
							type='checkbox'
							aaaaaaaaaaaaa={index}
							checked={item.check}
							onChange={adds}
						/>
						<p>{item.val}</p>
						<span onClick={() => sc(index)}>x</span>
					</div>
				)
			})}
			<h6>
				全选 <input type='checkbox' ref={ipts} onChange={all} />
			</h6>
			<h6>
				已经完成：{wc}全部:{state.length}{' '}
			</h6>
		</>
	)
}

```