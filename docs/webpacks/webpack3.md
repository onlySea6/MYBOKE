---
title: webpack的使用
date: 2020-09-24
categories:
 - webpack
tags:
 - webpack
---
## 一个webpack例子
```js
// 五大组成部分
/*
入口entry
出口output
module-loader：装载机
插件plugins
模式mode
---
额外的配置: 开启本地服务--代理接口
内置的压缩配置
内置的代码分割配置
实时打包监听
开启调试map文件 bundle.js bundle.map.js
*/
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MniCssExtract = require('mini-css-extract-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');
const optimizeCssAassetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
// https://cdn.bootcss.com/jquery/3.4.1/jquery.js
//引入webpack设置全局第三方库
const webpack = require('webpack');
module.exports = {
    //development 开发模式--npm run dev
    //production生产模式 --npm run build
    //模式的出现为了让webpack在不同的环境中更好的工作
    mode: 'production', //模式是4.0v出现的
    //1.打包多入口文件
    entry: {
        main: './src/index.js',
        loader: './src/index2.js'
    }, //可以写成相对路径
    //2.出口
    output: {
        //hash占位符是每次打包的时候都会生成不同的值
        //目的是为了防止文件缓存
        filename: './js/[name][hash:6].js', //文件名字
        publicPath: './src/index.js' + '/cdn/'
    },
    //3.插件
    plugins: [
        //清空打包目录
        new CleanWebpackPlugin(),
        //编译html
        new HtmlWebpackPlugin({
            // jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js',
            //模板文件
            template: './src/index.html' //相对路径
        }),
        //抽离css的
        new MniCssExtract({
            //把抽离出来的css文件放到这个目录里，并且名字也该了
            filename: './style/index[hash:6].css'
        }),
        //插件提供者--设置全局插件依赖
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        //给打包后的文件添加描述
        new webpack.BannerPlugin('2020王杰创建'),
        //将doc.md文件考到dist目录
        new CopyPlugin([{ from: './笔记.md', to: './docs' }])
    ],
    //devServer:开启一个本地服务
    //webpack-dev-server安装
    devServer: {
        //监听的目录5555555555555555555555555555555555555555555555555555555
        // contentbase: './dist',
        // 启动后自动打开默认浏览器

        port: 8080, //#端口号
        contentBase: './dist', // #监听目录
        open: true, // #是否自动打开浏览器
        progress: true, // #显示进度条
        compress: true, // #是否开启gzip压缩
        proxy: {
            //代理es6-->proxy
            //nodejs帮我们去请求百度接口，然后将百度接口返回给我们前端的请求
            '/api': {
                target: 'http://www.websong.wang:3000',
                pathRewrite: { '^/api': '' }
            }
        }
    },
    //4.打包方案--装载机
    module: {
        rules: [
            //处理html里的图片的
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                //查找项目中所有图片
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        //limi单位字节当小于7kb变成base64
                        limit: 1024 * 7,
                        outputPath: 'imgs/',
                        name: '[name][hash:4].[ext]'
                    }
                }
            },
            //处理css和less
            {
                test: /\.(css|less)$/,
                use: [
                    //官方规定MniCssExtract和style-loader只能选一个
                    // 'style-loader',
                    {
                        loader: MniCssExtract.loader,
                        options: {
                            //在抽离出来的css代码里，所有url路径都加上../
                            publicPath: '../'
                        }
                    },
                    'css-loader',

                    {
                        //给css特性加兼容前缀
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    'less-loader'
                ]
            },

            //处理sass
            {
                test: /\.scss$/,
                use: ['sass-loader']
            },
            //处理字体
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // 打包后文件放的位置
                        outputPath: 'font/'
                    }
                }
            },
            {
                // babel-loader
                // @babel/core@
                // @babel/preset-env
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    //压缩css代码和拆分js模块
    optimization: {
        //配置压缩
        minimizer: [new terserWebpackPlugin({}), new optimizeCssAassetsWebpackPlugin({})],
        //代码分割只对多模块打包有用，多入口打包******
        splitChunks: {
            // 分割代码js模块
            cacheGroups: {
                // 缓存组
                common: {
                    // 公共模块
                    chunks: 'initial', // 从入口文件开始找公共文件
                    minSize: 0, //被抽离代码的大小，不为0字节的js文件
                    minChunks: 2 //引用再两次及以上就会被抽出来
                },
                //私有的被执行的逻辑js
                vendor: {
                    priority: 1, // 先执行这个，权重
                    test: /node_modules/, //【vue，jquery】 把依赖包这个抽离出来
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 //被引入的次数，如果一个js文件引入了一次node_modules里面的依赖包，就抽离出来
                }
            }
        }
    },
    //开启源码映射
    devtool: 'eval-source-map',
    //实时打包
    watch: true,
    //使用cdn
    // externals: {
    //     query: '$'
    // },
    // plugins: [
    //     new AddAssetHtmlCdnWebpackPlugin(true, {
    //         jquery: 'http://code.jquery.com/jquery-3.4.1.js'
    //     })
    // ]
};
```
## 另一个例子
```js
const webpack = require('webpack');
module.exports = {
    mode: 'production', //模式
    //入口
    entry: {
        main: './src/index.js',
        loader: './src/index2.js'
    },
    //2.出口
    output: {
        filename: './js/[name][hash:6].js', //文件名字
        publicPath: './src/index.js' + '/cdn/'
    },
    //热更新
    devServer: {
        port: 8080, //#端口号
        contentBase: './dist', // #监听目录
        open: true, // #是否自动打开浏览器
        progress: true, // #显示进度条
        compress: true, // #是否开启gzip压缩
    },
    module: {
        rules: [{
                //查找项目中所有图片
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        //limi单位字节当小于7kb变成base64
                        limit: 1024 * 7,
                        outputPath: 'imgs/',
                        name: '[name][hash:4].[ext]'
                    }
                }
            },
            //处理css和less
            {
                test: /\.(css|less)$/,
                use: [
                    //官方规定MniCssExtract和style-loader只能选一个
                    // 'style-loader',
                    {
                        loader: MniCssExtract.loader,
                        options: {
                            //在抽离出来的css代码里，所有url路径都加上../
                            publicPath: '../'
                        }
                    },
                    'css-loader',

                    {
                        //给css特性加兼容前缀
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    'less-loader'
                ]
            },
            //es6 转es5
            {
                // babel-loader
                // @babel/core@
                // @babel/preset-env
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
}
```