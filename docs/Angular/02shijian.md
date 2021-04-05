---
title: Angular
date: 2019-02-05
categories:
  -  Angular
tags:
  -  Angular
---
## Angular 中的事件
```html
<button (click)="run($event)"> 点击</button>
```
```js
run(e){
// e就是事件对象
// 这里的对象要指定类型比如
let a:any=e.target
}
```
## Angular 双向数据绑定--MVVM只是针对表单
1. 在app.module.ts引入 声明
```js
import {FormsModule} from '@angular/forms'
  imports: [
    /**配置当前模块运行依赖的其他模块 */ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
```
2. 直接使用
```html
<input type="text" [(ngModel)]="txt">
<button (click)="change()">双向数据绑定</button>
```
```js
pulic txt:any="这是默认的"
change(){
    this.txt="改变的值"
}
```
## 双向数据绑定之表单
```html
<h2>双向数据绑定之表单</h2>

<div class="peopele_list">
    <ul>
        <!-- 输入框 -->
        <li>姓名:<input class="ipt" type="text" id="username" [(ngModel)]="peopleInfo.username"></li>
    </ul>
     <ul>
         <!-- 单选按钮 -->
       <li>性别:<input type="radio" value="1" name="sex" id="sex1" [(ngModel)]="peopleInfo.radis"> 男
    <input type="radio" value="2" name="sex" id="sex2" [(ngModel)]="peopleInfo.radis">女
    </li>
     </ul>
    <button (click)="doSubmit()">获取表单的内容</button>
    <!-- 复选框 -->
    <select name="city" id="city" [(ngModel)]="peopleInfo.city">
        <option [value]="item" *ngFor="let item of peopleInfo.cityList">{{item}}</option>
    </select>
    <span *ngFor="let item of peopleInfo.lits;let key=index">
         <input type="checkbox" [id]="key" [(ngModel)]="item.checked"><label [for]="key"></label> {{item.title}}
    </span>
    <!-- 留言本 -->
   备注:<textarea name="mark" id="" cols="30" rows="10" [(ngModel)]="peopleInfo.mark"></textarea>
<pre>
    {{peopleInfo|json}}
</pre>
</div>
```
```js
 public peopleInfo: any = {
        username: '',
        radis: '',
        cityList: ['北京', '上海', '深圳'],
        city: '北京',
        lits: [{
            title: '吃饭',
            checked:false
        },
        {
            title: '睡觉',
            checked:false
        },{
            title: '打代码',
            checked:true
            }],
        mark:''
  };
```

## 双向数据绑定之 Todolist
```html
<h2>todolist</h2>
<div>
  <input type="text" [(ngModel)]="tolist.ipt" (keyup)="add($event)">
  <hr>
  <h6>未完成</h6>
  <ul>
    <li *ngFor="let item of tolist.now;let key=index" [hidden]="item.checked==1">
      <h4><input type="checkbox" [(ngModel)]="item.checked">{{item.title}}
        <button>
          删除
        </button></h4>
    </li>
  </ul>

  <h6>完成</h6>
   <ul>
     <li *ngFor="let item of tolist.now;let key=index" [hidden]="item.checked==0">
       <h4><input type="checkbox" [(ngModel)]="item.checked">{{item.title}}
         <button>
           删除
         </button></h4>
     </li>
   </ul>
</div>
```
```js
add(e) {
      if (e.keyCode === 13) {
          if (!this.todolistsIos(this.tolist.now, this.tolist.ipt)) {
              this.tolist.now.push({
                title: this.tolist.ipt,
                checked: 0,
              });
              this.tolist.ipt = '';
          } else {
              alert('该数据已经存在')
               this.tolist.ipt = '';
        }
      
     
    }
  }
    // todolist排除重复的  切记不要使用foreach 有异步
    todolistsIos(allList:any,oneList:any) {
        for (let i = 0; i < allList.length; i++){
            if (allList[i].title == oneList) {
              return true;
            }
        }
        return false
  }
```
