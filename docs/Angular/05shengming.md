---
title: Angular组件通信
date: 2019-02-05
categories:
  -  Angular
tags:
  -  Angular
---
## angular中的生命周期

### angular生命周期函数
- Angular 会按以下顺序执行钩子方法

1. constructor
- 构造函数中除了使用简单的值对局部变量进行初始化之外，什么都不应该做（非生命周期函数）

2. ngOnChanges()
- 当 Angular 设置或重新设置数据绑定的输入属性时响应。 该方法接受当前和上一属性值的 SimpleChanges 对象
- 注意，这发生的非常频繁，所以你在这里执行的任何操作都会显著影响性能
* 在 ngOnInit() 之前以及所绑定的一个或多个输入属性的值发生变化时都会调用。
* 注意，如果你的组件没有输入，或者你使用它时没有提供任何输入，那么框架就不会调用 ngOnChanges()
  
3. ngOnInit()
- 在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。
* 在第一轮 ngOnChanges() 完成之后调用，只调用一次。
  
4. ngDoCheck()
- 检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。
* 紧跟在每次执行变更检测时的 ngOnChanges() 和 首次执行变更检测时的 ngOnInit() 后调用。

5. ngAfterContentInit()
- 当 Angular 把外部内容投影进组件视图或指令所在的视图之后调用。
* 第一次 ngDoCheck() 之后调用，只调用一次。

6. ngAfterContentChecked()
- 每当 Angular 检查完被投影到组件或指令中的内容之后调用。
* ngAfterContentInit() 和每次 ngDoCheck() 之后调用

7. ngAfterViewInit()
- 当 Angular 初始化完组件视图及其子视图或包含该指令的视图之后调用。
* 第一次 ngAfterContentChecked() 之后调用，只调用一次。

8. ngAfterViewChecked()
- 每当 Angular 做完组件视图和子视图或包含该指令的视图的变更检测之后调用。
* ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用。

9. ngOnDestroy()
- 每当 Angular 每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。
* 在 Angular 销毁指令或组件之前立即调用。