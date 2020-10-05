---
title: jQuery样式和类名
date: 2019-04-15
categories:
  - jQuery
tags:
  - jQuery
---
## jQ CSS 类名的操作
- addClass添加、removeClass删除、toggleClass切换类
```js
    <script>
        $(function () {
            /*
            1. addClass(class|fn)
            作用：添加一个类
            如果要添加多个类，多个类名之间用空格隔开即可

            2. removeClass([class|fn])
            作用：删除一个类
            如果要删除多个类，多个类名之间用空格隔开即可

            3. toggleClass(class|fn[,sw])
            作用：切换类
            有就删除，没有就添加

            */

            var btns = document.getElementsByTagName('button')
            btns[0].onclick = function () {
                $('div').addClass('class1 class2')
            }
            btns[1].onclick = function () {
                $('div').removeClass('class1 class2')
            }
            btns[2].onclick = function () {
                $('div').toggleClass('class1 class2')
            }

        })

    </script>
···
<body>
    <button>添加类</button>
    <button>删除类</button>
    <button>切换类</button>
    <div></div>
</body>
```
## jQury 添加样式
```html
 <script>

        $(function () {
            /*
            1. css(name|pro|[,val|fn])1.9*
            作用：设置和获取 CSS 样式
            */
            //    设置
            // a. 逐个添加
            $('div').css('width', '100px')
            $('div').css('height', '100px')
            $('div').css('background', 'red')


            // b. 链式设置
            $('div').css('width', '100px').css('height', '100px').css('background', 'blue')
            // c. 批量设置(常用)
            $('div').css(
                {
                    height: '100px',
                    width: "100px",
                    background: 'yellow'
                }
            )
            // d. 获取css样式值
            console.log($('div').css('width'));
        })
    </script>
···
<body>
    <div></div>
</body>
```
## jQ 获取和设置元素位置和尺寸
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
            border: 50px solid #000;
            margin-left: 50px;
            position: relative;
        }

        .son {
            width: 100px;
            height: 100px;
            background: blue;
            position: absolute;
            left: 50px;
            top: 50px;
        }
    </style>
    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
        1.
            height([val|fn])
            width([val|fn])
            作用:
            获取元素宽 $('.father').width()
            获取元素高 $('.father').height()
            设置元素宽 $('.father').width('500px')
            设置元素高 $('.father').height('500px')
        2.
            innerHeight()
            innerWidth()
            作用:
            获取第一个匹配元素内部区域高、宽度（包括补白、不包括边框）
        3.
            outerHeight([options])
            outerWidth([options])
            作用:
            获取第一个匹配元素外部高、宽度（默认包括补白和边框）
        4.
            offset([coordinates])
            作用:获取元素距离窗口的偏移位
        5.
            position()
            作用:获取元素距离定位元素的偏移位
            注意:只能获取,不能设置
            */

            var btns = document.getElementsByTagName('button');
            btns[0].onclick = function () {
                // 获取第一个匹配元素内部区域高、宽度
                // console.log($('.father').innerWidth());

                // 获取子元素和浏览器左边的距离
                // console.log($('.son').offset().left);

                // 获取元素距离定位元素的偏移位
                // console.log($('.son').position().left);

            }
            btns[1].onclick = function () {
                // 设置第一个匹配元素外部高、宽度
                // console.log($('.father').innerWidth('500px'));

                // 设置子元素和浏览器左边的距离
                // console.log($('.son').offset({
                // left: 10
                // }));

                // 不能设置元素距离定位元素的偏移位
                console.log($('.son').position(
                    { left: 10 }
                ));
                //  可以用.css 设置元素距离定位元素的偏移
                $('.son').css({
                    left: 10
                });
            }
        })
    </script>
***
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <button>获取</button>
    <button>设置</button>
</body>
```
## jQ 设置scrollTop\scrollLeft
```html
<style>
        * {
            margin: 0;
            padding: 0;
        }

        .scroll {
            width: 100px;
            height: 200px;
            border: 1px solid #000;
            overflow: auto;
        }
    </style>
    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
            scrollTop([val])
            获取\设置垂直的滚动偏移位
            scrollLeft([val])
            获取\设置水平的滚动偏移位
            */
            var btns = document.getElementsByTagName('button');
            btns[0].onclick = function () {
                // 获取滚动的偏移位
                // console.log($('.scroll').scrollTop());
                // 获取网页(html)滚动的偏移位
                // console.log($('html').scrollTop());
                // 为了保证浏览器的兼容,IE 里用body获取网页的偏移
                console.log($('body').scrollTop() + $('html').scrollTop());
            };
            btns[1].onclick = function () {
                // 设置滚动的偏移位
                // console.log($('.scroll').scrollTop(300));
                // 设置滚动的偏移位
                $('html').scrollTop(300);
                // 为了保证浏览器的兼容,IE 里用body获取网页的偏移
                $('body,html').scrollTop(300);
            }
        })
    </script>
</head>

<body>
    <div class="scroll">
        <!-- 内容和换行多加一些 -->
        我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是
    </div>
    <button>获取</button>
    <button>设置</button>
    <br>
    <br>
    <br>
    <br>
</body>
```
## 其他
获取元素宽度
```js
// 常规方法
var width =window.getComputedStyle(img).width;
```