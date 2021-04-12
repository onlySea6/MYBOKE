---
title: Angular路由
date: 2019-02-05
categories:
  -  Angular
tags:
  -  Angular
---
## 配置路由

### 一、生成路由文件
1. 有一个独立模块来配置相关路由，这个模块类的名字叫做AppRoutingModule,位于src/app下的app-routing.module.ts文件中。
使用CLI生成它。
```
ng generate module app-routing --flat --module=app
```
2. 然后查看src/app目录下是否生成成功
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
```
- 通常不会在路由模块中声明组件，所以可以删除@NgModule.declarations 并删除对 CommonModule 的引用。
### 二、导出 RouterModule
- 此刻的AppRoutingModule是这样的：
```
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```
### 三、添加路由定义
- 典型的Angular路由（Route）有两个属性：

1. path：一个用于匹配浏览器地址栏中URL的字符串。

2. component：当导航到此路由时，路由应该创建哪个组件。

如果说你希望当URL为http://localhost:4200/homePage时，首先要导入HomePageComponent；以便在Route中引用它。
如下：
```
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "../home-page/home-page.component";

const routes: Routes = [
  { path: 'homePage', component: HomePageComponent }
];
@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
- RouterModule.forRoot()
初始化路由器，并让它开始监听浏览器的地址变化。（添加到 @NgModule.imports 数组中）
```
imports: [ RouterModule.forRoot(routes) ],
```
- 注意：查看app.module.ts文件中是否有引入AppRoutingModule。
```
import { AppRoutingModule } from './app-routing/app-routing.module';
```
```
imports: [
    AppRoutingModule
  ],
```
### 四、添加路由出口
- 打开AppComponent的模板，把<router-outlet>添加进去，<router-outlet>会告诉路由器要在哪里显示路由的试图。
```
<router-outlet></router-outlet>   // src/app/app.component.html
```
### 五、运行项目
- 查看项目页面，注意你的CLI命令行是否仍在运行：
```
ng serve
```
- 地址栏输入http://localhost:4200，这个时候你会看到地址栏显示着项目的标题，但是并没有显示HomePageComponent中的内容。

### 六、添加默认路由
1. 方法一：当启动项目时，浏览器的地址栏指向的是网站的根路径。它没有匹配到任何现存路由，因此路由器也不会导航到任何地方。
- 要让应用自动导航到这个仪表盘，请把下列路由添加到AppRoutingModule.routes数组中。
```
{ path: '', redirectTo: '/homePage', pathMatch: 'full' },
```
- 现在再次访问项目，你会发现地址栏默认会把一个空路径重定向到'/homePage'的路由；并且首页也加载了HomePageComponent。
2. 方法二：
```
{ path: '**', component:DashboardComponent}
```
- 意思就是当路由URL等于’’时，会去加载DashboardComponent组件；所以你运行你的服务端口号：localhost:4200首先加载的就会是这个组件；
- 路径是一个通配符，表示除了以上几种path,任何的路径都会加载DashboardComponent组件，这个记得写在路由配置最后。

### 七、添加路由链接(routerLink)
- 不应该让用户只能把路由的 URL 粘贴到地址栏中。他们还应该能通过点击链接进行导航。

- 添加一个``` <nav>``` 元素，并在其中放一个链接 ```<a>```元素，当点击它时，就会触发一个到 DetailsComponent 的导航。
```
<div>
  home-page works!
  <nav>
    <a routerLink="/details">点击查看详情</a>
  </nav>
</div>
```
- 同时需要把DetailsComponent引入到AppRoutingModule中。
- 点击查看详情这个链接。地址栏变成了/details，并且页面跳转到详情页。

### 八、添加详情视图（HTML传参）
- 现在假设我们首页展示的是一个文章列表，然后我们需要点击每一遍文章查看详情；如果说我们要导航到id为11的文章详情视图，类似于http://localhost:4200/heroes/11的URL。
1. 首先打开AppRoutingModule并导入HeroesComponent。
```
import {HeroesComponent} from "./heroes/heroes.component";
```
2. 然后把一个参数化路由添加到 AppRoutingModule.routes 数组中，它要匹配指向文章详情视图的路径。
```
{ path: 'heroes/:id', component: HeroesComponent }
```
- path 中的冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id。
- 此刻，路由就准备就绪了。
- 然后，我们需要修改HTML页面中的文章列表跳转链接，让它们能够通过参数化的路由进行导航到文章详情页面。
```
<nav>
    <a routerLink="/heroes/{{id}}">点击查看文章详情</a>
    <!--数组格式传参-->
    <a [routerLink]="['/heroes', num]">点击查看文章详情</a>
</nav>
```
### 九、js页面跳转（传参）
- 在AppRoutingModule导入了HeroesComponent，并且把一个参数化路由添加到 AppRoutingModule.routes 数组中。
1. 先添加下列导入语句：
```
import { Router } from '@angular/router';//引入
```
然后把 ActivatedRoute注入到构造函数中，将它们的值保存到私有变量里：
```
constructor( private router: Router) { }//注入到构造函数
```
2. 传递路由参数

单参传递

- navigate()该方法支持的参数类型和routerLink指令一样，所以它们的作用也是一样的：
```
this.router.navigate(['heroes', id]);
```
或者：
```
this.router.navigate(['heroes']);
```
多参传递
```
this.router.navigate(['heroDetail'], {queryParams: {productId: '1',title: 'moon'}
```
3. 我们注意到还有一个：navigateByUrl（），这个叫做绝对路由；
```
this.router.navigateByUrl('home');
```
区别：navigateByUrl（）和navigate（）的区别点是：navigateByUrl不是根据参数来确定路由地址的。

### 十、从路由参数中提取id
1. 先添加下列导入语句：
```
import { ActivatedRoute } from '@angular/router';
```
然后把 ActivatedRoute注入到构造函数中，将它们的值保存到私有变量里：
```
constructor(
  private route: ActivatedRoute,
) {}
```
ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。 这个组件对从 URL 中提取的路由参数感兴趣。 其中的 id 参数就是要显示的英雄的 id。

2. 获取路由参数

- 方法一：
```
 this.route.queryParams.subscribe(queryParams => {
        let productId = queryParams.productId;
        let title = queryParams.title;
    });
```
- 方法二：

 代码如下：
```
  public params;  //公有变量
  ngOnInit() {
    this.getData();
  }
  getData() {
     this.route.params.subscribe(
       params => {
          this.params = params;
          console.log(this.params);
       }
    );
  }
```
这样获取的是一个对象，直接获取id就可以了。

- 方法三：

代码如下：
```
ngOnInit(): void {
  this.getData();
}

getData(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  console.log(id);
}
```
### 十一、回到原路
1. 先添加下列导入语句：
```
import { Location } from '@angular/common';
```
然后把 Location 服务注入到构造函数中，将它们的值保存到私有变量里：
```
constructor(
  private location: Location
) {}
```
location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。

2. 点击返回页面：

通过点击浏览器的后退按钮，可以回到上一个也买你进入的页面。

把一个后退按钮添加到组件模板的底部，并且把它绑定到组件的 goBack() 方法。
```
<button (click)="goBack()">go back</button>
```
在组件类中添加一个 goBack() 方法，利用注入的Location 服务在浏览器的历史栈中后退一步。
```
goBack(): void {
  this.location.back();
}
```