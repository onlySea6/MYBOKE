---
title: package.json详情
date: 2019-04-15
categories:
  - node
tags:
  - node
---
## package.json 详情
```json
{
    "name": "mypulgin", //插件、依赖包的名字 要小写
    "version": "1.0.0", //包的版本号。如"1.0.0"
    //name和version是package.json中最重要的两个字段，也是发布到NPM平台上的> 唯一标识，如果没有正确设置这两个字段，包就不能发布和被下载     "description": "My New Project description.",
    //description:包的描述信息，将会在npm search的返回结果中显示，以帮助用户> 选择合适的包
    "main": "index.js",
    //main:包的入口文件。
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    //scripts:通过设置这个可以使NPM调用一些命令脚本，封装一些功能。
    "keywords": [
        "guangju-test-video"
    ],
    //keywords:包的关键词信息，是一个字符串数组，同上也将显示在npm search的> 结果中
    "author": {
        "name": "Your Name",
        "email": "you@mail.com"
    },
    //author:包的作者
    "dist-tags": {
        "latest": "1.0.0"
    },
    "maintainers": [{
        "name": "Your Name",
        "email": "you@mail.com"
    }],
    //maintainers:包的贡献者，是一个数组。
    "time": {
        "modified": "2020-06-26T10:03:30+00:00",
        "created": "2020-06-26T10:03:30+00:00",
        "1.0.0": "2020-06-26T10:03:30+00:00"
    },
    //创建、更新时间，版本信息
    "homepage": "https://my-new-project-website.com/",
    //homepage:包的主页地址
    "repository": {
        "url": "https://example.com/your-username/my-new-project",
        "type": "git"
    },
    //repository:包的仓库地址
    "contributors": [{
            "name": "Your Friend",
            "email": "their-email@mail.com",
            "url": "http://their-website.com"
        },
        {
            "name": "Another Friend",
            "email": "another-email@mail.com",
            "url": "https://another-website.org"
        }
    ],
    //contributors:包的贡献者，是一个数组
    "bugs": {
        "url": "https://github.com/you/my-new-project/issues"
    },
    //bugs:包的bug跟踪主页地址
    "license": "MIT",
    //license:包的开源协议名称
    "readmeFilename": "README.md",
    //自述文件的名字
    "files": ["index.js", "lib/*.js", "bin/*.js"],
    //files(较少用):包所包含的所有文件，可以取值为文件夹。通常我们还是用.> npmignore来去除不想包含到包里的文件。
    "bin": {
        "my-new-project-cli": "bin/my-new-project-cli.js"
    },
    //bin(较少用):如果你的包里包含可执行文件，通过设置这个字段可以将它们包含> 到系统的PATH中，这样直接就可以运行，很方便。
    "dist": {
        "shasum": "908bc9a06fa4421e96ceda243c1ee1789b0dc763",
        "tarball": "https://registry.npmjs.org/my-new-project/-/> my-new-project-1.0.0.tgz"
    },
    "directories": {}
    //directories(较少用):CommonJS包所要求的目录结构信息，展示项目的目录结构> 信息。字段可以是：lib, bin, man, doc, example。值都是字符串
 }
```
### 其他参数：
- man(较少用):
 - 为系统的man命令提供帮助文档。帮助文件的文件名必须以数字结尾，如果是压缩的，需> 要以.gz结尾

- config:
 - 添加一些设置，可以供scripts读取用，同时这里的值也会被添加到系统的环境变量中

- dependencies:（生产环境）
  -指定依赖的其它包，这些依赖是指包发布后正常执行时所需要的，也就是线上需要的包。 使用下面的命令来安装：
```js
 npm install --save packageName
```
如果是开发中依赖的包，可以在devDependencies设置。

- devDependencies:（开发环境）:
这些依赖只有在开发时候才需要。使用下面的命令来安装：
```js
npm install --save-dev packageName
```
- peerDependencies:
包相关的依赖，如果你的包是插件，而用户在使用你的包时候，通常也会需要这些依赖（插件），那么可以将依赖列到这里。
--- 
如karma, 它的package.json中有设置，依赖下面这些插件：
```json
"peerDependencies": {
  "karma-jasmine": "~0.1.0",
  "karma-requirejs": "~0.2.0",
  "karma-coffee-preprocessor": "~0.1.0",
  "karma-html2js-preprocessor": "~0.1.0",
  "karma-chrome-launcher": "~0.1.0",
  "karma-firefox-launcher": "~0.1.0",
  "karma-phantomjs-launcher": "~0.1.0",
  "karma-script-launcher": "~0.1.0"
}
```
- bundledDependencies:
绑定的依赖包，发布的时候这些绑定包也会被一同发布。

- optionalDependencies（较少用）:
即使这些依赖没有，也可以正常安装使用。

- engines（较少用）: 指定包运行的环境。
```json
"engines": {
  "node": ">=0.10.3 < 0.12",
  "npm": "~1.0.20"
}
```
- os（较少用）:
指定你的包可以在哪些系统平台下运行。
```json
"os": [ "darwin", "linux", "!win32" ]
```
- cpu（较少用）:
可以指定包运行的cpu架构。

- private:
设为true这个包将不会发布到NPM平台下。

- publishConfig（较少用）:
这个字段用于设置发布时候的一些设定。尤其方便你希望发布前设定指定的tag或> registry。
## 关于安装依赖包的版本问题
当我们查看package.json中已安装的库的时候，会发现他们的版本号之前都会加一个符号，有的是插入符号（^），有的是波浪符号（~）。那么他们到底有什么区别呢
```json
"dependencies": {
    "bluebird": "^3.3.4",
    "body-parser": "~1.15.2"
  }
```
当我们使用最新的Node运行npm instal --save xxx，的时候，会优先考虑使用插入符号（^）而不是波浪符号（~）

- 波浪符号（~）： 他会更新到当前minor version（也就是中间的那位数字）中最新的版本。放到我们的例子中就是：body-parser:~1.15.2，这个库会去匹配更新到1.15.x的最新版本，如果出了一个新的版本为1.16.0，则不会自动升级。波浪符号是曾经npm安装时候的默认符号，现在已经变为了插入符号。

- 插入符号（^）： 这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。放到我们的例子中就是：bluebird:^3.3.4，这个库会去匹配3.x.x中最新的版本，但是他不会自动更新到4.0.0。

- 最后解释下之前提到的minor verision和major version：

1.15.2对应就是MAJOR,MINOR.PATCH：1是marjor version；15是minor version；2是patch version。

- MAJOR：这个版本号变化了表示有了一个不可以和上个版本兼容的大更改。

- MINOR：这个版本号变化了表示有了增加了新的功能，并且可以向后兼容。

- PATCH：这个版本号变化了表示修复了bug，并且可以向后兼容。

因为major version变化表示可能会影响之前版本的兼容性，所以无论是波浪符号还是插入符号都不会自动去修改major version，因为这可能导致程序crush，可能需要手动修改代码