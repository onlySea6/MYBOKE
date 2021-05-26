---
title: 支付宝支付接入
date: 2019-04-01
sidebar: auto
categories:
  - 支付宝支付接入
tags:
  - 支付宝支付接入
---

## 基于springboot对接支付宝支付接口开发步骤实现

1. 支付宝扫码登录支付宝开放平台[](https://open.alipay.com/platform/home.htm) 
- 点击管理中心，进入研发服务
![](https://pic4.zhimg.com/80/v2-a1fc0d96c1af39eec34a157331f17cf7_720w.jpg)
- 点击左侧沙箱环境，进入沙箱应用
2. 配置密钥
-[具体步骤参考](https://opendocs.alipay.com/open/291/105971)

- 密钥工具下载链接
 * [win](https://ideservice.alipay.com/ide/getPluginUrl.htm?clientType=assistant&platform=win&channelType=WEB)
 * [mac](https://ideservice.alipay.com/ide/getPluginUrl.htm?clientType=assistant&platform=mac&channelType=WEB)
![](https://pic1.zhimg.com/v2-3d3d3a2b1cb4bcc46c9f25684bdebc24_r.jpg)
- 查看沙箱账号
![](https://pic2.zhimg.com/80/v2-b19cfeb00954d4ea61ce3c45ab1141e9_720w.jpg)

- 支付宝接口调用支付流程
![](https://pic1.zhimg.com/80/v2-704584db34e38dbb196ec84b9446a1b8_720w.jpg)

3. 搭建springboot项目
导入maven依赖
```js
// 支付宝支付 
<dependency>
    <groupId>com.alipay.sdk</groupId>
    <artifactId>alipay-sdk-java</artifactId>
    <version>3.0.0</version>
</dependency>

//  lang3工具类，可省略 
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
</dependency>
```
4. 创建一个AppPayConfig 类，配置支付信息
```js
public class AlipayConfig {

    // 应用ID,您的APPID,收款账号既是您的APPID对应支付宝账号,开发时使用沙箱提供的APPID，生产环境改成自己的APPID
    public static String APP_ID = "您的APPID";

    // 商户私钥，
    public static String APP_PRIVATE_KEY = "您的PKCS8格式RSA2私钥";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥
    public static String ALIPAY_PUBLIC_KEY = "您的支付宝公钥";

    // 服务器异步通知页面路径,需http://格式的完整路径，不能加自定义参数，必须外网可以正常访问
    public static String notify_url = "";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能自定义参数，支付成功后返回的页面
    public static String return_url = "http://localhost:8080/returnUrl";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String CHARSET = "utf-8";

    // 支付宝网关，这是沙箱的网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    // public static String log_path = "https://openapi.alipay.com/gateway.do";
}
```
5. 编写控制器，支付信息传入进来，调用支付宝接口进行一系列支付操作
- 无需返回值，支付完成后支付宝会默认跳转到之前配置的return_url
```js
@RequestMapping("/alipay")
@ResponseBody
public void payController(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // 获得初始化的AlipayClient
    AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.APP_ID, AlipayConfig.APP_PRIVATE_KEY, "json", AlipayConfig.CHARSET, AlipayConfig.ALIPAY_PUBLIC_KEY, AlipayConfig.sign_type);

    // 设置请求参数
    AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
    alipayRequest.setReturnUrl(AlipayConfig.return_url);
    alipayRequest.setNotifyUrl(AlipayConfig.notify_url);

    // 商户订单号，商户网站订单系统中唯一订单号，必填
    String out_trade_no = request.getParameter("out_trade_no");
    // 付款金额，必填
    String total_amount = request.getParameter("total_amount");
    // 订单名称，必填
    String subject = request.getParameter("subject");
    // 商品描述，可空
    String body = request.getParameter("body");

    alipayRequest.setBizContent("{\"out_trade_no\":\"" + out_trade_no + "\","
            + "\"total_amount\":\"" + total_amount + "\","
            + "\"subject\":\"" + subject + "\","
            + "\"body\":\"" + body + "\","
            + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");

    // 请求
    String form = "";
    try {
        form = alipayClient.pageExecute(alipayRequest).getBody(); // 调用SDK生成表单
        System.out.println("form==>" + form);
    } catch (AlipayApiException e) {
        e.printStackTrace();
    }
    response.setContentType("text/html;charset=" + AlipayConfig.CHARSET);
    response.getWriter().write(form);// 直接将完整的表单html输出到页面
    response.getWriter().flush();
    response.getWriter().close();
}
```
7. 编写页面进行测试
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <form action="/alipay" method="post">
            订单号：<input type="text" name="out_trade_no" required><br/>
            订单名称：<input type="text" name="subject" required><br/>
            付款金额：<input type="text" name="total_amount" required><br/>
            body：<input type="text" name="body"><br/>
            <input type="submit" value="下单"> <input type="reset" value="重置">
        </form>
    </body>
</html>
```
8. 开启服务，浏览器访问页面控制器

- 输入订单号、订单名称、付款金额、body信息
- 订单号、订单名称、body：一般由后台生成们这里做测试，直接输入即可
- 点击下单，跳转到alipay控制器，调用哪个支付宝接口进行支付操作
[](https://mobile.alipay.com/index.htm?cid=wap_dc)
![](https://pic2.zhimg.com/80/v2-b1f0fccd91e3b34c9558fc7d4cf499a1_720w.jpg)

9. 确认付款后支付宝返回响应数据
```js
{
    charset=utf-8,
    out_trade_no=20201023175607443239,
    method=alipay.trade.page.pay.return,
    total_amount=1800.00,
    sign=xxx,
    trade_no=2020102322001474620501446389,
    auth_app_id=2016102700767778,
    version=1.0,
    app_id=2016102700767778,
    sign_type=RSA2,
    seller_id=2088102181203923,
    timestamp=2020-10-23 17:56:32
}
```
10. 编写returnUrl控制器接收支付宝响应信息并进行解析处理
```js
@RequestMapping("/returnCall")
public String returnCall(HttpServletRequest request, HttpSession session, Model model) throws Exception {
    // 获取支付宝GET过来反馈信息
    Map<String, String> params = new HashMap<String, String>();
    Map<String, String[]> requestParams = request.getParameterMap();
    for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
        String name = (String) iter.next();
        String[] values = (String[]) requestParams.get(name);
        String valueStr = "";
        for (int i = 0; i < values.length; i++) {
            valueStr = (i == values.length - 1) ? valueStr + values[i]
                    : valueStr + values[i] + ",";
        }
            //乱码解决，这段代码在出现乱码时使用
        valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
        params.put(name, valueStr);
    }

    System.out.println("\n验签开始.....\n");

    boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.ALIPAY_PUBLIC_KEY, AlipayConfig.CHARSET, AlipayConfig.sign_type); //调用SDK验证签名

    if (signVerified) {
        // 交易编号
        String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");
        Map<String, Object> outTradeNoMap = new HashMap();
        outTradeNoMap.put("out_trade_no", out_trade_no);

        String result = HttpClientUtils.doPost(Constants.ALIPAY_TRADE_QUERY_URL, outTradeNoMap);

        System.out.println("验签输出==>" + result);

        Map<String, Object> resultMap = (Map<String, Object>) JSONObject.parse(result);

        if (ObjectUtils.isNotEmpty(resultMap)) {

            Map<String, String> alipayTradeQueryResponse = (Map<String, String>) resultMap.get("alipay_trade_query_response");

            // ObjectUtils为lang3工具类，可自行导入相关依赖
            if (ObjectUtils.isNotEmpty(alipayTradeQueryResponse)) {
                String code = alipayTradeQueryResponse.get("code");
                String msg = alipayTradeQueryResponse.get("msg");
                    /**
                     * 判断支付状态
                     * WAIT_BUYER_PAY，等待买家付款
                     * TRADE_CLOSED，支付超时，关闭订单
                     * TRADE_FINISHED，交易结束
                     * TRADE_SUCCESS，支付成功
                     */
                } else {
                    throw new RuntimeException("网络异常");
                }
            }
        }
        return "";
    }
```