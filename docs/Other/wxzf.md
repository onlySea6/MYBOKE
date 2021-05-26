---
title: 微信支付接入
date: 2019-04-01
sidebar: auto
categories:
  - 微信支付接入
tags:
  - 微信支付接入
---

##  针对后台springboot，前端为vue项目 接入微信支付的

### 技术栈
- vue
- vue-cli
- weixin-js-sdk (微信jsSdk)

### 因为openid不需要我们来获取，就简单了很多了 需要后台提供的参数有

![](https://www.hualigs.cn/image/60ae31ac196d1.jpg)

- 支付的代码
```js
payOrder(type){
      Toast.loading
      pay({orderNo: this.orderNo}).then(res => {
          let data = res.data;
          let prepay_data = JSON.stringify({
            appId: data.appId,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: 'MD5',
            paySign: data.paySign
          });
          setLocalStorage({prepay_data: prepay_data });
​
          if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
              document.addEventListener(
                'WeixinJSBridgeReady',
                this.onBridgeReady,
                false
              );
            } else if (document.attachEvent) {
              document.attachEvent(
                'WeixinJSBridgeReady',
                this.onBridgeReady
              );
              document.attachEvent(
                'onWeixinJSBridgeReady',
                this.onBridgeReady
              );
            }
          } else {
            this.onBridgeReady();
          }
        })
    },
    onBridgeReady() {
      let that = this;
      let data = getLocalStorage('prepay_data');
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        JSON.parse(data.prepay_data),
        function(res) {
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            //支付成功 
            // this.$router.push({ path: '/order' })
            window.location.href='http://www.shiyuanlive.com/shiyuanmall/#/order'
          } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            //支付取消
            // this.$router.push({ path: '/order' })
            window.location.href='http://www.shiyuanlive.com/shiyuanmall/#/order'
          } else if(res.err_msg == "get_brand_wcpay_request:fail"){
                //支付失败
                // console.log('支付失败');
                WeixinJSBridge.call('closeWindow');
             } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
        }
      );
    }
 }
```

- 一个工具local-storage.js

```js
export const getLocalStorage = (...args) => {
  const storage = {};
  args.forEach(arg => {
    storage[arg] = window.localStorage.getItem(arg) || null;
  });
  return storage;
};
​
export const setLocalStorage = data => {
  Object.keys(data).forEach(prop => {
    const el = data[prop];
    window.localStorage.setItem(prop, el);
  });
};
​
export const removeLocalStorage = (...args) => {
  args.forEach(arg => {
    window.localStorage.removeItem(arg);
  });
};
```