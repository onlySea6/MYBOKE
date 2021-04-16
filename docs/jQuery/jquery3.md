---
title: jQuery事件
date: 2019-04-15
categories:
  - jQuery
tags:
  - jQuery
---
## jQ 事件的绑定
eventName(fun)\on(enentName,fun)
jQuery主要支持以下事件：
```
　　.blur() 表单元素失去焦点。

　　.change() 表单元素的值发生变化

　　.click() 鼠标单击

　　.dblclick() 鼠标双击

　　.focus() 表单元素获得焦点

　　.focusin() 子元素获得焦点

　　.focusout() 子元素失去焦点

　　.hover() 同时为mouseenter和mouseleave事件指定处理函数

　　.keydown() 按下键盘（长时间按键，只返回一个事件）

　　.keypress() 按下键盘（长时间按键，将返回多个事件）

　　.keyup() 松开键盘

　　.load() 元素加载完毕

　　.mousedown() 按下鼠标

　　.mouseenter() 鼠标进入（进入子元素不触发）

　　.mouseleave() 鼠标离开（离开子元素不触发）

　　.mousemove() 鼠标在元素内部移动

　　.mouseout() 鼠标离开（离开子元素也触发）

　　.mouseover() 鼠标进入（进入子元素也触发）

　　.mouseup() 松开鼠标

　　.ready() DOM加载完成

　　.resize() 浏览器窗口的大小发生改变

　　.scroll() 滚动条的位置发生变化

　　.select() 用户选中文本框中的内容

　　.submit() 用户递交表单

　　.toggle() 根据鼠标点击的次数，依次运行多个函数

　　.unload() 用户离开页面
```
```html
 <script>
        $(function () {
            /*
            jQ 中有两种绑定事件的方式

            1. eventName(fun)
            编程效率高,部分事件 jq 没有封装

            2. on(enentName,fun)
            编程效率低,所有js事件都能实现
            3. 注意
            这两个方式,都可以添加多个相同或不同的事件,不会覆盖

            */
            // 事件绑定
            // 1.
            // $('button').click(function () {
            //     alert('ad')
            // });
            // $('button').click(function () {
            //     alert('ad123')
            // });
            // $('button').mouseleave(function () {
            //     alert('amouseleave')
            // });
            // $('button').mouseenter(function () {
            //     alert('mouseenter')
            // });

            // 2.
            $('button').on('click', function (params) {
                alert('1')
            })
            $('button').on('mouseleave', function (params) {
                alert('2')
            })
            $('button').on('mouseenter', function (params) {
                alert('3')
            })

        })
    </script>
***
<body>
    <button>按钮</button>
</body>
```
## jQ 事件的解绑
off()
```html
  <script>
        $(function () {
            /*
            jQ 事件的移除
            1.
            off()
            如果不传参数,移除所有事件

            2.
            off('click')
            如果传一个参数,移除所有指定类型的事件

            3.
            off('click', test1)
            穿两个参数,移除所有指定的具体事件
            */
            // 事件绑定
            function test1() {
                alert('ad')
            }
            function test2() {
                alert('ad123')
            }
            $('button').click(test1);

            $('button').click(test2);

            $('button').mouseleave(function () {
                alert('amouseleave')
            });
            $('button').mouseenter(function () {
                alert('mouseenter')
            });
            // 1.
            $('button').off()
            // 2.
            $('button').off('click')
            // 3.
            $('button').off('click', test1)
        })
    </script>
***
<body>
    <button>按钮</button>
</body>
```
## jQ 阻止冒泡和默认事件
```html
 <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            width: 200px;
            height: 200px;
            background: red;
        }

        .son {
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
            1. 什么是事件冒泡
                父与子都有事件是,执行子元素事件,父元素同样执行
            2. 如何阻止事件冒泡
                a 在子元素里 return false
                b 参数 event的 stopPropagation  // Propagationy意思是传播
            注:
            在一个事件触发时,会给事件的回调函数传递一个参数 event 对象 这个对象有一个stopPropagation方法

            3. 什么是默认行为
                事件默认的行为动作
            4. 如何阻止默认行为
                a return false
                b 参数 event.stopDefault
            */

            // 冒泡
            // $('.father').click(function () {
            //     alert('father')
            // });
            // $('.son').click(function (event) {
            //     alert('son')
            //     // 1. 在子元素里 return false
            //     // return false
            //     // 2. event.stopPropagation()
            //     event.stopPropagation()
            // });

            //默认事件
            $('a').click(function (ev) {
                alert('注册')
                // return false;
                ev.preventDefault()
            })
        })
    </script>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <a href="http://www.baidu.com">注册</a>
    <form action="http://www.taobao.com">
        <input type="text">
        <input type="submit">
    </form>
</body>
```
## jQ 自动执行事件和冒泡\默认
```html
<style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            width: 200px;
            height: 200px;
            background: red;
        }

        .son {
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
            1. 事件自动触发
                jq 提供了自动触发的两个方法
                .trigger('click')
                .triggerHandler('click')
            2. 区别
            trigger 自动触发事件,会触发事件冒泡,用 triggerHandler 不会触发事件冒泡
            */
            $('.son').click(function (event) {
                alert('son')
            });
            $('.father').click(function () {
                alert('father')
            });
            // 自动触发事件
            // $('.father').trigger('click')
            // $('.father').triggerHandler('click')
            // 如果用 trigger 自动触发事件,会触发事件冒泡
            // $('.son').trigger('click')
            // 如果用 triggerHandler 可以自动触发事件但不会触发事件冒泡
            // $('.son').triggerHandler('click');

            $("input[type='submit']").click(function () {
                alert('submit')
            });
            // trigger 如果用trigger自动触发事件,会触发默认行为
            // $("input[type='submit']").trigger('click')
            // trigger 如果用trigger自动触发事件,不会触发默认行为
            // $("input[type='submit']").triggerHandler('click')

            //
            // $('a').click(function () {
            //     alert('a')
            // })
            // 自动执行a 并阻止了a的默认事件
            // $('a').triggerHandler('click')

            // $('a').trigger('click')

            // 按常理讲,一下方法可以自动执行a并触发a的默认行为,但实际上不行,需要改造下a标签
            $('span').click(function () {
                alert('a')
            })
            $('span').trigger('click')
        })
    </script>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <a href="http://www.baidu.com"><span>注册</span></a>
    <form action="http://www.taobao.com">
        <input type="text">
        <input type="submit">
    </form>
</body>
```
## jQ 自定义事件
```html
 <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            width: 200px;
            height: 200px;
            background: red;
        }

        .son {
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
             自定义事件
             1. 事件必须时通过on绑定的

             2. 事件必须通过tirgger \ triggerHandler 触发
                  */
            // 1
            $('.son').on('myclick', function () {
                alert('son')
            })
            // 2
            $('.son').trigger('myclick');
        })
    </script>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <a href="http://www.baidu.com"><span>注册</span></a>
    <form action="http://www.taobao.com">
        <input type="text">
        <input type="submit">
    </form>
</body>
```
## jQ 事件命名空间
```html
<style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            width: 200px;
            height: 200px;
            background: red;
        }

        .son {
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
             事件命名空间
                想要事件的命名空间有效,必须满足两个条件
                1. 事件时通过on绑定的
                2. 通过trigger 触发的
                  */

            $('.son').on('click.zs', function () {
                alert('click1')
            })
            $('.son').on('click.ls', function () {
                alert('click2')
            })
            $('.son').trigger('click.zs')
        })
    </script>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <a href="http://www.baidu.com"><span>注册</span></a>
    <form action="http://www.taobao.com">
        <input type="text">
        <input type="submit">
    </form>
</body>
```
## jQ 命名空间 面试题
```js
 $(function () {
            /*
             事件命名空间面试题
                  */
            $('.father').on('click.ls', function () {
                alert('father click1')
            })
            $('.father').on('click', function () {
                alert('father click2')
            })
            $('.son').on('click.ls', function () {
                alert('son click1')
            })
            // 利用trigger 触发子元素命名空间的事件,那么父元素带相同命名空间的事件也会被触发
            // $('.son').trigger('click.ls')
            // 利用trigger 触发子元素不带命名空间的事件,那么子元素所有相同类型的事件和父元素所有相同类型的事件都会被触发
            $('.son').trigger('click')
       })
 ```
## jQ 事件委托
```html
<script>
        $(function () {
            /*
             事件委托
             1. 什么是事件委托
             请别人帮忙做事情,然后讲做完的结果反馈给我们

             2. delegate('a','click',fn)

             3.  jq 1.7 + 的新方法
               on('click','a',fn)
                  */
            $('button').click(function () {
                $('ul').append('<li>我是新增的li</li>')
            })
            // 1. 在jq中,如果通过核心函数找到的元素找到不止一个,那么在添加事件的时候,jq会遍历所有找到的元素,给所有找到的元素添加事件
            // $('ul>li').click(function () {
            //     console.log($(this).html());
            // })

            // 2. 新增的元素不能打印出来,delegate
            // $('ul').delegate('li', 'click', function () {
            //     console.log($(this).html());
            // })

            // 3. 新增用 on()
            $('ul').on('click', 'li', function () {
                console.log($(this).html());
            })
        })
    </script>
</head>
<body>
    <ul>
        <li>我是第1个li</li>
        <li>我是第2个li</li>
        <li>我是第3个li</li>
    </ul>
    <button>新增一个li</button>

</body>
```
## jQ 事件委托练习
```html
<style>
        * {
            margin: 0;
            padding: 0;
        }

        html.body {
            width: 100%;
            height: 100%;

        }

        .mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            left: 0;
            top: 0;
        }

        .login {
            width: 522px;
            height: 290px;
            margin: 100px auto;
            position: relative;

        }

        .login>span {
            width: 50px;
            height: 50px;
            background: red;
            position: absolute;
            right: 0;
            top: 0;
        }
    </style>
    <script src="./jquery-2.2.4.js"></script>
    <script>
        $(function () {
            $('a').click(function (ev) {
                // 通过核心函数插入代码片段,可以直接创建元素
                var $mask = $(`
                <div class="mask">
                    <div class="login">
                        <img src="./10257.png" alt="">
                        <span></span>
                    </div>
                </div>`)
                // append 添加
                $('body').append($mask)
                $('body').delegate('.login>span', 'click', function () {
                    // remove 移除
                    $mask.remove()
                })
                ev.preventDefault()
            })
        })
    </script>
</head>

<body>
    <a href="http://www.baidu.com">点击登录</a>
    <div>
        我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落
    </div>
</body>
```
## jQ 移入移出事件
```html
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            width: 200px;
            height: 200px;
            background: red;

        }

        .son {
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
    <script src="./jquery-2.2.4.js"></script>
    <script>
        /*
        1.
        mouseover\mouseout
        子元素被移入移出也会触发父元素的事件(触发了冒泡)

        mouseenter\mouseleave
        子元素里移入移出不会触发父元素的事件
        2. hover(fn,fn)
        jq中hover封装了 mouseenter \ mouseleave方法
        */
        $(function () {
            // 1. mouseover\mouseout

            // $('.father').mouseover(function () {
            //     console.log('father移入了');
            // })
            // $('.father').mouseout(function () {
            //     console.log('father移出了');
            // })

            // 2. mouseenter\mouseleave

            // $('.father').mouseenter(function () {
            //     console.log('father移入了');
            // })
            // $('.father').mouseleave(function () {
            //     console.log('father移出了');
            // })

            // 3. hover(fn,fn)
            // $('.father').hover(function () {
            //     console.log('我被移入了');
            // }, function () {
            //     console.log('我被移出了');
            // })

            // .hover(fn)一个参数
            $('.father').hover(function () {
                console.log('我被移入移出了');
            })
        })
    </script>
***
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>
```
## jQ 移入移出练习
```html
<style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            width: 300px;
            height: 450px;
            margin: 50px auto;
            border: 1px solid #000;

        }

        .box>h1 {
            font-size: 20px;
            line-height: 35px;
            color: deeppink;
            padding-left: 10px;
            border: 1px dashed #ccc;
        }

        ul>li {
            list-style: none;
            padding: 5px 10px;
            border: 1px dashed #ccc;
        }

        ul>li:nth-child(-n+3) span {
            background: deeppink;
        }

        ul>li>span {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: #ccc;
            text-align: center;
            line-height: 20px;
            margin-right: 10px;

        }

        .content {
            overflow: hidden;
            margin-top: 5px;
            display: none;
        }

        .content>img {
            width: 80px;
            height: 120px;
            float: left;
        }

        .content>p {
            width: 180px;
            height: 120px;
            font-size: 12px;
            line-height: 20px;
            float: right;
        }

        .current .content {
            display: block;
        }
    </style>
    <script src="./jquery-2.2.4.js"></script>
    <script>
        /*
        1.

        */
        $(function () {
            // 监听li的移入事件
            $('li').mouseover(function () {
                $(this).addClass('current')
            })
            // 监听li的移出事件
            $('li').mouseleave(function () {
                $(this).removeClass('current')
            })
        })
    </script>
</head>
```
```html
<body>
    <div class="box">
        <h1>电影排行榜</h1>
        <ul>
            <li><span>1</span>电影名称<div class="content">
                    <img src="#" alt="">
                    <p>电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称</p>
                </div>
            </li>
            <li><span>2</span>电影名称
                <div class="content">
                    <img src="#" alt="">
                    <p>电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称</p>
                </div>
            </li>
            <li><span>3</span>电影名称
                <div class="content">
                    <img src="#" alt="">
                    <p>电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称</p>
                </div>
            </li>
            <li><span>4</span>电影名称
                <div class="content">
                    <img src="#" alt="">
                    <p>电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称</p>
                </div>
            </li>
            <li><span>5</span>电影名称
                <div class="content">
                    <img src="#" alt="">
                    <p>电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称</p>
                </div>
            </li>
            <li><span>6</span>电影名称
                <div class="content">
                    <img src="#" alt="">
                    <p>电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称电影名称</p>
                </div>
            </li>
        </ul>

    </div>
</body>
```