---
title: API
date: 2019-12-30
sidebar: auto
categories:
  - email
tags:
  - 验证码
---

# 登录注册的验证码的实现

## 使用163邮箱进行 验证码操作
1. 注册登录163邮箱

2. 登录之后再网易邮箱设置中 将IMAP/SMTP服务 开启得到一个秘钥
* 一定要将秘钥保存 因为这个秘钥只出现一次

3. 将秘钥赋值到下面的代码中 到这你就明白了
```js
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({ //邮件传输
  host: "smtp.163.com", //网易云 smtp服务器地址
  secureConnection: false, //是否使用安全连接，对https协议的
  port: 465, //服务所占用的端口
  auth: {
    user: "wj1320908356@163.com", //开启SMTP的邮箱，有用发送邮件
    pass: "xxxxxxx" //这就是网易给你的秘钥 授权码
  }
});

// 全局变量存储正在注册的用户
let user = [];

// 设置一个定时器,每2分钟清空一次指定的全局变量
let clearUser = (email) => {
  let time = setTimeout(() => {
    user.map((item,index) => {
      if (item.email === email) {
        // 清除指定邮箱
        user.splice(index,1);
        // 清除定时器
        clearTimeout(time);
      }
    })
  },120000);
}

let code = (app) => {
  app.post('/code',(req,res) => {
      let {email}=req.body
    // 先判断是否已经获取过验证码
    let isCode = user.find(item => item.email === email);
    if (isCode) {
      res.json({code:301,msg:'您获取验证码太频繁，请稍后再试'})
      return;
    }
    let codeId = Math.ceil(Math.random()*1000000);
    let mailOption = {
      from: "wj1320908356@163.com",
      to:email, //收件人
      subject: "W3cSchool", //纯文本
      html: "<h1>您的验证码为<span style='color:red'>" + codeId + "</span>请不要把验证码泄露给其他人。如非本人操作，可不用理会！</h1>"
    };

    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        res.json({code:404,msg:'验证码发送失败'})
        return;
      } else {
        // 存储账号和验证码到全局变量里面
        user.push({email:req.body.email,code:codeId})
        // 调用定时器定点清除指定邮箱
        clearUser(req.body.email)
        res.json({code:200,msg:"验证码发送成功"})
        return;
      }
    })
  })

  // 验证验证码是否正确的
  app.post('/testCode',(req,res) => {
    let { email,code } = req.body;
    let isCode = user.find(item => item.email === email);
    if (isCode) {
      // 有值就先判断值
      if (code === String(isCode.code)) {
        res.json({code:200,msg:'验证码正确'})
        return;
      }else{
        res.json({code:301,msg:'验证码错误'})
        return;
      }
    }else{
      res.json({code:301,msg:'请先获取验证码或验证码已过期'})
      return;
    }
  })
}
module.exports=code

```