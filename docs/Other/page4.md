---
title: webpack
date: 2020-09-24
categories:
 - webpack
tags:
 - webpack
---
## 安装
- 安装 ```webpack``` 建议根据项目安装而不是全局安装，可以使用以下命令：
```sh
npm install webpack webpack-cli --save-dev
# 或
yarn add webpack webpack-cli --dev
```
- 这个时候执行 ```webpack -v`` 是查不到版本号的，因为 ```nodejs``` 默认是去全局找 ``` webpack```，这个时候是找不到的，nodejs还提供了 ```npx webpack -v``` 这个方法。
## 运行
如果不生成配置文件，webpack会按照默认配置去打包，如果我们想自定义配置文件可以在项目根目录添加 webpack.config.js 
来自定义配置信息，配置文件的名字也可以自定义：
```sh
# 默认配置或者默认配置文件
npx webpack

# 自定义配置并且修改默认配置名字
npx webpack --config my-webpack-config.js

# npm scripts 中配置 "build": "webpack"
npm run build
```
## loader
1. file-loader----处理文件模块的 webpack loader。
```js
 module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader',
          options: {
            // 设置输出文件名
            name: '[name]_[hash].[ext]',
            // 设置输出文件夹
            outputPath: 'images/',
            // 指定目标文件的自定义公共路径
            publicPath: 'assets/'
          }
        }
      }
    ]
  }
  ```
2. url-loader--- file-loader 的增强版，除了上述功能，还可以将文件转换为 base64 URI。
```js
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            // 设置输出文件名
            name: '[name]_[hash].[ext]',
            // 设置需要转换base64的文件大小（太大的文件转换后需要更大的请求压力）
            limit: 2048
          }
        }
      }
    ]
  }
```
3. style-loader 和 css-loader
- css-loader：加入 a.css 中引入了 b.css 和 c.css，css-loader 会将其合并成一个css文件
- style-loader：将合并后的 css 文件挂载到 head 标签内
```js
 module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
```
4. sass-loader
- 如果使用 scss、less、stylus 等 css 预处理器。例如，我们要使用 sass 预处理器，首先要安装 sass-loader 和 node-sass。
```js
 module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
```
```js
<font color="red" size="5">loader的加载顺序是从右到左、从下到上，所以处理 scss 文件时，将 sass-loader放在最后</font>
```
5. postcss-loader
- 通过 postcss-loader 来给新属性添加厂商前缀。
```js
 module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
  ```
  ```js
  // postcss.config.js
// 首先安装 autoprefixer

module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
- 如果 a.css 中引入了 b.css 和 c.css，当读到 @import('./b.css') 时就会略过 postcss-loader 和 sass-loader，直接从 css-loader 直接运行，可以通过 importLoaders 配置来改善。
```js
 module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
```
6. css模块化
- 在 index.js 通过import './index.css' 引入样式会全局有效，如果想在某个模块有效，如何去做呢？
```js
 module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
  ```
  7. 字体
  - 字体文件只需要通过 file-loader 将字体文件转移到打包文件夹内即可。
```js
 module: {
    rules: [
      {
        test: /\.(eot|ttf|svg|woff)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      }
    ]
  }
```
## plugin可以在webpack运行到某个时刻的时候，做一些事情。
1. html-webpack-plugin
- 会在打包之后，自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中。
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    //需要在 index.html 中写一些默认代码，比如 meta，这时就可以按照某个模板来生成这个 index.html。
    // template: 'src/index.html'
  })]
}
```
2. clean-webpack-plugin
- 会在打包前先清空打包目标文件夹的文件。
```js
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
```
## 多个输出文件
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
- 如果我们的打包后的文件中，index.html 需要给后台做配置文件，assets 文件夹需要放在 cdn 上，
这样的话我们的就需要在 output 中设置 publicPath：
```js
 output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
```
## sourceMap
- 如果运行打包后的文件，某个地方有错误，控制台会显示打包后的文件的某个位置有错误，如果我们想知道错误来自于源文件的所在位置，那么就需要借助 sourceMap 了。所以 sourceMap 其实就是一种映射，它知道 dist 目录 main.js 文件的某个错误，实际对应的是 src 目录下 index.js 文件的第一行
- ourceMap 通过配置中的 devtool 去配置，参数的含义大概有以下几种情况：

devtool|	作用
:-:|:-
source-map|	生成 map 文件，错误精确到行和列
inline-source-map|	inline，不生成 map 文件，以 base64 形式嵌入js中，错误精确到行和列
cheap-source-map|	cheap，错误只精确到行，且只针对业务代码，不包括第三方模块
cheap-module-source-map|	cheap-module，错误只精确到行，且只针对业务代码，包括第三方模块
eval-source-map	|eval，不生成 map 文件，在 js 中以 eval 方法的形式出现，但是复杂项目的提示是不全的
- 最佳实践
1. develop：cheap-module-eval-source-map，提示比较全，打包速度快
2. production：cheap-module-source-map，提示更全面，打包稍微慢

## 监听变动 webpack --watch
- 监听文件的变动，自动进行打包。
```js
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  }
}
```