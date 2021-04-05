---
title: API
date: 2019-12-30
sidebar: auto
categories:
  - uni-app
tags:
  - 框架
---
## uni-app 个人认为就是 微信小程序和vue的结合体 但是因为个别兼容问题需要看文档

## 遇到的问题
1. 组件传递数据出现接收 [Objec , Object]的问题 解决：
-  传的时候 lists= encodeURIComponent(JSON.stringify(lists))	
-  接收的时候let lits=JSON.parse(decodeURIComponent(options.lists));
2. 请求异步的问题 解决:async awit
```js
async read(){
			let _this=this
			let names=this.imgPicList[0].txtUrl
			var abs=''
			let a = await uni.request({
				url:'http://81.70.159.19:8081/getNovel',
				method:'POST',
				data:{novelText:names}
			}).then(doc => {
				let urls=doc[1].data.novelAll[0].novelHref;
				return urls;
      })
      // 这里的let a  就是请求的结果 这样写会拿到a 这样才能把a传递给下面的组件
			uni.navigateTo({
				url:'/pages/Catalog/index?url='+a
			})
			}
```
## 取消默认的原生导航栏
```js
<!-- 在pages.json -->
"navigationStyle": "custom" //
```
## 分享的方法
```js
 // 分享图文到微信聊天界面
        uni.share({
        provider: "weixin", // 服务商
        scene: "WXSceneSession", // 场景 微信好友WXSceneSession  朋友圈WXSceneTimeLine
        type: 0, // 图文0 文字1 图片2
        href:audioContext.src , // 分享h5地址
        title: "你好啊",
        summary: "看啥！", // 描述
        imageUrl: "https://58d.oss-cn-hangzhou.aliyuncs.com/category/2020-09-02/1599009402796.jpg",
        success: function (res) {
            console.log("success:" + JSON.stringify(res));
        },
        fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
        }
        });
```