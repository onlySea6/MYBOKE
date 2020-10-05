---
title: Git
date: 2020-09-24
categories:
 - git
tags:
 - git
---

## 用git 上传GitHub和gitee必须先做的
## git线上和自己电脑生成ssh秘钥(上传项目必须做的)
1. 打开终端（git）进入.ssh目录
    - 输入 
    ```js
    cd ~/.ssh
    ```
2. 生成RSA密钥对 自己电脑的(自己看文件看id-rsa.pub用命令看)
```js
    - ssh-keygen -t rsa -C "你的邮箱@xxx.com"
    //如果不使用密码连输按3次回车
```
3. 查看自己的秘钥
```js
cat ~/.ssh/id_rsa.pub
```
4. 赋值公钥到git或者gitee 生成秘钥的地址
- 粘贴地址 :[https://gitee.com/profile/sshkeys](https://gitee.com/profile/sshkeys)
5. 添加公钥完成后进行测试公钥
```js
ssh -T git@gitee.com
```
- 当终端提示welcome to Gitee.com,yourname!表示链接成功