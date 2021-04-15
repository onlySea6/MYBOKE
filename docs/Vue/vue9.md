---
title: Vue项目打包为桌面应用
date: 2020-09-24
categories:
 - vue2.0
tags:
 - vue2.0
---

## 将Vue项目打包为桌面应用（.exe）

### 第一步 将官方的例子克隆下来

```
git clone https://github.com/electron/electron-quick-start 
```
### 第二步 安装官方项目的依赖
```
cd electron-quick-start->npm install->npm start   //到这就能运行demo了 
```

### 第三步  进入我们自己的项目进行打包

### 第四步 放入自己项目
- 将自己项目打包好的dist文件中的index.html和其他文件放入electron-quick-start（根目录）文件夹中，重新start一下

### 第五步安装插件
```
npm install electron-packager --save-dev 
```

### 第六步在package.json中增加以下代码命令：
```
"pack":"electron-packager . testexe --platform=win32 --arch=x64  --out=./out --asar --app-version=0.0.1"
```
- testexe是打包生成的exe文件名字
- ./out是输出路径
- app-version=0.0.1 是版本号

### 运行命令打包成功
```
npm run pack 
```

### 隐藏菜单栏  在main.js配置
```js
const {app, BrowserWindow,Menu} = require('electron') 

function createWindow () { 
  //隐藏菜单 
  Menu.setApplicationMenu(null) 
}
```
## 注意在electron中进行网络请求时，因为本身项目使用了反向代理，打包后请求路径前面会增加本地路径“file:e/”，解决方式：在项目中添加请求地址全路径，可以根据自己需求修改
- ![解决](https://www.hualigs.cn/image/6073c1211ab93.jpg)

### 此次打包的exe 为安装后的 如果 想打包成安装程序 还需使用软件之一的 Inno Setup
- [Inno Setup](https://www.cnblogs.com/benpaodejiandan/p/7081011.html)

### 常用的配置项
```
在main.js 当中通过配置 BrowserWindow 来改变外观 
 
width Integer - 窗口宽度,单位像素. 默认是 800 . 
 
height Integer - 窗口高度,单位像素. 默认是 600 . 
 
x Integer - 窗口相对于屏幕的左偏移位置.默认居中. y Integer - 窗口相对于屏幕的顶部偏移位置.默认居中. useContentSize Boolean - width 和 height 使用web网页size, 这意味着实际窗口的size应该包括窗口框架的 size，稍微会大一点，默认为 false . center 
 
Boolean - 窗口屏幕居中. minWidth Integer - 窗口最小宽度，默认为 0 . 
 
minHeight Integer - 窗口最小高度，默认为 0 . 
 
maxWidth Integer - 窗口最大宽度，默认无限制. 
 
maxHeight Integer - 窗口最大高度，默认无限制. 
 
resizable Boolean - 是否可以改变窗口size，默认为 true . 
 
movable Boolean - 窗口是否可以拖动. 在 Linux 上无效. 默认为 true . 
 
minimizable Boolean - 窗口是否可以最小化. 在 Linux 上无效. 默认为 true . 
 
maximizable Boolean - 窗口是否可以最大化. 在 Linux 上无效. 默认为 true . 
 
closable Boolean - 窗口是否可以关闭. 在 Linux上无效. 默认为 true . 
 
alwaysOnTop Boolean - 窗口是否总是显示在其他窗口之前. 在 Linux上无效. 默认为 false . 
 
fullscreen Boolean - 窗口是否可以全屏幕. 当明确设置值为When false ，全屏化按钮将会隐藏，在 macOS 将禁用. 默认 false . 
 
fullscreenable Boolean - 在 macOS 上，全屏化按钮是否可用，默认为 true . skipTaskbar Boolean - 是否在任务栏中显示窗口. 默认是 false . 
 
kiosk Boolean - kiosk 方式. 默认为 false . title String - 窗口默认title. 默认 "Electron" . 
 
icon NativeImage - 窗口图标, 如果不设置，窗口将使用可用的默认图标. 
 
show Boolean - 窗口创建的时候是否显示. 默认为 true . 
 
frame Boolean - 指定 false 来创建一个 Frameless Window. 默认为 true . 
 
acceptFirstMouse Boolean - 是否允许单击web view来激活窗口 . 默认为 false . 
 
disableAutoHideCursor Boolean - 当 typing 时是否隐藏鼠标.默认 false . 
 
autoHideMenuBar Boolean - 除非点击 Alt ，否则隐藏菜单栏.默认为 false . 
 
enableLargerThanScreen Boolean - 是否允许允许改变窗口大小大于屏幕. 默认是 false . 
 
backgroundColor String -窗口的 background color 值为十六进制,如 #66CD00 或 #FFF 或 #80FFFFFF (支持透明 度). 默认为在 Linux和 Windows 上为 #000 (黑色) , Mac上为 #FFF (或透明). 
 
hasShadow Boolean - 窗口是否有阴影. 只在 macOS 上有效. 默认为 true . 
 
darkTheme Boolean - 为窗口使用 dark 主题, 只在一些拥有 GTK+3 桌面环境上有效. 默认为 false . 
 
transparent Boolean - 窗口 透明. 默认为 false . 
 
type String - 窗口type, 默认普通窗口. 下面查看更多. titleBarStyle String - 窗口标题栏样式. 下面查看更多. 
 
webPreferences Object - 设置界面特性. 下面查看更多. 
```

