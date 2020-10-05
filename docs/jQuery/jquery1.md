---
title: jQuery对象和属性
date: 2019-04-15
categories:
  - jQuery
tags:
  - jQuery
---
## jq对象和dom对象

1. DOM对象：使用JavaScript中的方法获取页面中的元素返回的对象就是dom对象;

2. jQuery对象：jquery对象就是使用jquery的方法获取页面中的元素返回的对象就是jQuery对象;

3. jQuery对象其实就是DOM对象的包装集包装了DOM对象的集合（伪数组）;

4. DOM对象与jQuery对象的方法不能混用。

## DOM对象转换成jQuery对象
```js
var $obj = $(domObj);
// $(document).ready(function(){});就是典型的DOM对象转jQuery对象
jQuery 对象转换成 DOM 对象：
```
```js
var $li = $("li");
//第一种方法（推荐使用）
$li[0]
//第二种方法
$li.get(0)
```
## jQuery选择器
- 基本选择器

名称|用法|描述
:-:|:-|-:
ID选择器 | $(“#id”)| 获取指定ID的元素
类选择器| $(“.class”)| 获取同一类class的元素
标签选择器| $(“div”)| 获取同一类标签的所有元素
并集选择器| $(“div,p,li”)|使用逗号分隔，只要符合条件之一就可。
交集选择器| $(“div.redClass”)|获取class为redClass的div元素
- 
备注：	跟css的选择器用法一模一样	

- 层级选择器

名称	| 用法 | 描述
:-:|:- |-:
子代选择器| 	$(“ul>li”) | 使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素
后代选择器| 	$(“ul li”) | 使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等

- 过滤选择器

名称| 	用法| 	描述
:-:|:- |-:
:eq（index）| 	$(“li:eq(2)”).css(“color”, ”red”) | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始。
:odd| 	$(“li:odd”).css(“color”, ”red”) | 	获取到的li元素中，选择索引号为奇数的元素
:even| 	$(“li:even”).css(“color”, ”red”)| 	获取到的li元素中，选择索引号为偶数的元素

- 筛选选择器(方法)

名称|	用法|	描述
:-:|:- |-:
children(selector)  |	$(“ul”).children(“li”) |	相当于$(“ul>li”)，子类选择器
find(selector)|	$(“ul”).find(“li”)  |	相当于$(“ul li”),后代选择器
siblings(selector)  |	$(“#first”).siblings(“li”)|	查找兄弟节点，不包括自己本身。
parent()  |	$(“#first”).parent() |	查找父亲
eq(index) |	$(“li”).eq(2)  |	相当于$(“li:eq(2)”),index从0开始
next() |	$(“li”).next() |	找下一个兄弟
prev() |  $(“li”).prev()   |	找上一次兄弟

- :empty、:parent、:contains(text)、:has(selector) 详解
```js
<script>
        $(function () {
            // :empty
            // 作用：找到内容为空的元素（既没有文本，又没有子元素的项）
            var $div1 = $('div:empty')
            console.log($div1);
            // :parent
            // 作用：找到有文本内容或有子元素的指定元素
            var $div2 = $('div:parent')
            console.log($div2);

            // :contains(text)
            // 作用：找到包含指定文本内容的所有指定元素
            var $div3 = $("div:contains('我是div')")
            console.log($div3);

            // :has(selector)
            // 作用：找到包含指定元素的所有指定项
            var $div4 = $("div:has('span')")
            console.log($div4);
        })
    </script>
</head>
```
```html
<body>
    <div></div>
    <div>我是div</div>
    <div>他们我是div123</div>
    <div><span></span></div>
    <div>
        <p></p>
    </div>
</body>
```
## jQ 属性
属性和属性节点的方法

- 属性和属性节点的介绍和使用
```js
<script>
        $(function () {
            /*
            1. 什么是属性
                对象身上保存的变量就是属性
            */
            function Person() { }
            var p = new Person();
            // p.name = 'guang'
            // console.log(p.name);
            /*
            2. 如果操作属性

                添加属性：
                对象.属性名称=值
                对象['属性名称']=值

                获取属性：
                对象.属性名称
                对象['属性名称']
             */
            // p['name'] = 'guang'
            // console.log(p.name);
            /*
            3. 什么是属性节点
                <span name="it"></span>

                a 在编写HTML代码时，在HTML标签中添加的属性就是属性节点

                b 在浏览器中找到 span 这个DOM元素后，展开看到的都是属性在 attributes 属性中保持的所有内容都是属性节点

                c 只有 DOM 元素有属性节点

            4. 如何操作属性节点
                设置
                DOM元素.setAttribute('属性名称', '值')
                获取
                DOM元素.getAttribute('属性名称')
            */
            var span = document.getElementsByTagName('span')[0]
            // 设置属性节点
            span.setAttribute('name', 'lnj')
            // 获取属性节点
            var gets = span.getAttribute('name')
            console.log(gets);
            /*
            5. 属性和属性节点有什么区别
            任何对象都有属性，但是只有DOM属性才有属性节点
            */
        })
    </script>
···
<body>
    <span name="it"></span>
</body>
```
- attr方法 和 removeAttr
```js
 <script>
        $(function () {
            /*
            1. attr(name|pro|key,val|fn)
            作用：获取或设置属性节点的值
            可以传递一个参数，也可以传递两个参数
            如果传递一个参数，代表获取属性节点的值
            如果传递两个参数，代表设置属性节点的值

            注意：
            如果是获取：无论找到多少个元素，都只会返回第一个元素指定的属性节点的值
            如果是设置：找到多少个元素就设置多少个元素
            如果是设置：设置的属性节点不存在，找到的所有元素，就会自定添加一个属性节点
            */
            // $('span').attr('class', 'box')
            // $('span').attr('abc', '123')
            // console.log($('span').attr('abc', '123'));
            /*
            2. removeAttr(name)
            删除属性节点

            注意：
            会删除所有找到元素的指定的属性节点
            */
            $('span').removeAttr('class') //删除一个属性节点
            $('span').removeAttr('class name') //删除多个属性节点
        })
    </script>
···
<body>
    <span class="span1" name="it"></span>
    <span class="span2" name="zgj"></span>
</body>
```
- prop 和removeProp 方法
```js
<script>
        $(function () {
            /*
            1. prop(n|p|k,v|f)
            特点和arrt一样
            */
            //设置
            $('span').eq(0).prop('demo', 'it11111')
            $('span').eq(1).prop('demo', 'zgj')
            console.log($('span').prop('demo'));
            /*
            2. removeProp(name)
            特点和removeArrt一样
            */
            $('span').removeProp('demo')

            /*
            注意：
            prop方法不仅能操作属性，还能操作属性节点

            */
            // console.log($('span').prop('class'));
            // $('span').prop('class', 'box')

            // 关于何时使用 prop 和 attr
            console.log($('input').prop('checked')); //true
            console.log($('input').attr('checked')); //checked
        })
    </script>
···
<body>
    <span class="span1" name="it"></span>
    <span class="span2" name="zgj"></span>
    <input type="checkbox">
</body>
```
例：点击按钮切换输入框内的图片地址
```html
<script>
        $(function () {
            // 1. 给按钮添加点击事件
            var btn = document.getElementsByTagName("button")[0]
            btn.onclick = function () {
                // 2. 获取输入框输入的内容
                var input = document.getElementsByTagName("input")[0];
                var text = input.value;
                // 3. 修改img的src属性节点的值
                $('img').attr('src', text);
                // src 的返回值不是true或false 建议用attr
                // $('img').prop('src', text)
            }
        })
    </script>
···
<body>
    <input type="text">
    <button>切换</button>
    <br>
    <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="">
</body>
```
---
attr 和 prop 区别

官方推荐在操作属性节点时，具有 true 和 false 两个属性的属性节点，如 checked ，selected 或者disabled 使用 prop()，其他使用 arrt()
---
- 属性里的 HTML代码/文本/值 操作
html([val|fn])、text([val|fn])、val([val|fn|arr])
```html
<style>
        * {
            margin: 0;
            padding: 0;
        }
        div {
            width: 100px;
            height: 100px;
            border: 1px solid #000;
        }
    </style>
    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
            HTML代码/文本/值
                1. html([val|fn])
                和原生js的 innerHTML 一模一样

                2. text([val|fn])
                和原生js的 innerText 一模一样

                3. val([val|fn|arr])
                获取，设置 value 值
            */
            var btns = document.getElementsByTagName('button');
            btns[0].onclick = function () {
                $('div').html('<p>我段落<span>我是span</span></p>')
            }
            btns[1].onclick = function () {
                console.log($('div').html());
            }
            btns[2].onclick = function () {
                $('div').text('<p>我段落<span>我是span</span></p>')
            }
            btns[3].onclick = function () {
                console.log($('div').text());
            }
            btns[4].onclick = function () {
                $('input').val('请输入')
            }
            btns[5].onclick = function () {
                console.log($('input').val());
            }
        })

    </script>
···
<body>
    <button>设置html</button>
    <button>获取html</button>
    <button>设置text</button>
    <button>获取text</button>
    <button>设置value</button>
    <button>获取value</button>
    <div></div>
    <input type="text">
</body>
```