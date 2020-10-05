---
title: react基础小例子
date: 2019-10-11
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
import React,{useState,useRef} from 'react'
import { render } from 'react-dom'
function Nav(){ 
    const [state,setState]=useState([
        { name: '苹果', number: 5, price: 6, checks: false },
        { name: '橘子', number: 8, price: 8, checks: false },
        { name: '香蕉', number: 2, price: 3, checks: false },
        { name: '菠萝', number: 5, price: 10, checks: false },
        { name: '甘蔗', number: 4, price: 2, checks: false },
        { name: '柚子', number: 8, price: 15, checks: false },
        { name: '柠檬', number: 11, price: 5, checks: false },
    ])
    //全选按钮
    function add(e){
   let as= e.target.checked
        let abs=[...state]
                for(let i=0;i<abs.length;i++ ){
                    abs[i].checks=as
            }
        setState(state=>abs)
       }
       const couterRef = useRef();
       const all = useRef();
    //单选按钮
    function handOne(index,checks){
        let abc=state
       for(let i=0;i<abc.length;i++){
           abc[index].checks=!checks
       }
       //全选之后为true
    let qx=  abc.every((item)=>item.checks===true)
    couterRef.current.checked=qx
       setState(state=>abc)
    }
    //加数量
    function jia(index){
        let lt=state
        lt[index].number= lt[index].number+1 
         setState(state=>lt)
    }
    //减数量
    function jian(index){
        let lt=state
        if(lt[index].number!=0){
            lt[index].number= lt[index].number-1 
        }
        setState(state=>lt)
         
    }
    //计算价格总和
    function MoneyAll(){
        let sumAll=0
        let mon=state
    for(var i=0;i<mon.length;i++){
        if(mon[i].checks===true){
            // console.log(1)
            sumAll += mon[i].number * mon[i].price
        }
    }
    all.current.value=sumAll
    }
    //删除商品
    function del(indexs){
        let abd=state
    let a=[]
     let c=   abd.map((item,index,arr)=>{
         if(index!=indexs) {
             a.push(arr[index])
         } 
        })
        setState(state=>a)
    }
    return <div>
        <input type='checkbox' ref={couterRef}  onChange={(e)=>add(e)} value=''/>全选
        {
            state.map((item,index)=>{
            return <div key={index}>
                <input type='checkbox' checked={item.checks}  onChange={()=>handOne(index,item.checks)} value=''/>
               名称： {item.name} 
               数量： <button onClick={()=>jian(index)}>-</button>{item.number}<button onClick={()=>jia(index)}>+</button> 
               价格： {item.price}
               <button onClick={()=>del(index)}>删除商品</button>
            </div> 
            })
        }
        价格总和:<input ref={all}/> <br/>
        <button onClick={MoneyAll}>结算</button>
    </div>
}
render(<Nav></Nav>, document.getElementById('root'))

```
## 函数组件实现ToDolist
```js
//Todolist代办事项
import './todo.css'
import React,{useState,useRef} from 'react'
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
    function tj(c,d){
        // console.log(typeof(c) )
        let arr=[]
        arr.push(c)
        setnewlist(newlist=>newlist.concat(arr))
        setState(nuall=>d)
    }
        return <>
        <Headers tj={tj}/>
       <List newlist={newlist} change={change}/>
       <Footer dolist={dolist} adds={adds}/>
        </>
}
function Headers ({nuall,setState,tj}){
    const doVal=useRef()
    //头部
  function add(props){
   let Val= doVal.current.value
   let c=''
    tj(Val,c)
}
   return <div className='header'>
       <span>Todolist</span>
       <span className='span'>
       <input placeholder='输入代办事项' value={nuall}  ref={doVal} />
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