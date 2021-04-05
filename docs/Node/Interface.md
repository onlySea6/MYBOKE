---
title: node
date: 1999-99-99
categories:
  - Interface
tags:
  - Interface
---
# Interface

- 以下接口皆为网上寻找，制作个人测试用，如用作商业或别的用途，皆与本人无关！

## Hitokoto one言
-  `https://v1.alapi.cn/api/hitokoto`
-   请求方式： get post
  
参数名称|	是否必选|	参数类型	
:-:|:-|-:
type|	否|	string	
format|	否|	string

- 参数	说明
- a	动画- b	漫画- c	游戏- d	文学- e	原创- f	来自网络- g	其他- h	影视- i	诗词- j	网易云- k	哲学- l	抖机灵

## 毒鸡汤
- 接口地址： https://v1.alapi.cn/api/soul
- 请求方式： get post

## 土味情话
- 接口地址： https://v1.alapi.cn/api/qinghua
- 请求方式： get post

## 舔狗日记
- 接口地址： https://v1.alapi.cn/api/dog
- 请求方式： get post

## 名人名言
接口参数：typeid  不选填 参数类型int

- 接口地址： https://v1.alapi.cn/api/mingyan
- 请求方式： get post
- 1——爱情 2——道德 3——青春 4——愿望 5——集体 6——理想 7——志向 8——人才 9——谦虚 10——人格 11——天才 12——青年 13——社会 14——国家 15——财富 16——智慧 17——修养 18——工作 19——妇女 20——儿童 21——思想 22——理智 23——学习 24——科学 25——信仰 26——诚信 27——读书 28——成败 29——奉献 30——劳动 31——节约 32——教育 33——企业 34——事业 35——时间 36——勤奋 37——民族 38——真理 39——友谊 40——自由 41——心理 42——心灵 43——人生 44——幸福 45——团结 

## 名人名言
- 接口地址： https://v1.alapi.cn/api/shici
- 请求方式： get post
- 参数名称 type 不选填
- type 参数值说明 all-所有类型shuqing-抒情 siji-四季 shanshui-山水 tianqi-天气 renwu-人物 shenghuo-生活 jieri-节日 dongwu-动物
zhiwu-植物 shiwu-食物

## ACG图片
- 接口地址： https://v1.alapi.cn/api/acg
- 请求方式： GET POST
- 获取的图片可以缩放图片大小
- 图片地址后面加上 `!/both/500x200`

## 必应美图--每日一图
- 接口地址： https://v1.alapi.cn/api/bing
- 请求方式： GET POST
- 图片地址后面加上 !/both/500x200  缩放

## ip查询 根据 ip 查询 位置 ，和 网络
- 接口地址： https://v1.alapi.cn/api/ip
- 请求方式： GET POST
- 参数名称 ip  必填
- 测试参数：ip=114.114.114.114&format=json

## 微博热搜榜
- 接口地址： https://v1.alapi.cn/api/new/wbtop
- 请求方式： GET POST
- 参数名称 num  不选填 新闻数据条数，默认50

## 域名备案查询接口
- 接口地址： https://v1.alapi.cn/api/icp
- 请求方式： get post
- 参数名称  domain  必填 域名

## 翻译接口
- 接口地址： https://v1.alapi.cn/api/fanyi
- 请求方式： get post
- 参数名称	`q`必填-string-要查询的文本字符串 `from` 不必填-string-要翻译文本的语种 `to`必填-string-要翻译成的语种
- auto自动检测-zh中文-en英语-yue粤语-wyw文言文-jp日语-kor韩语-fra法语-spa西班牙语-th泰语-ara阿拉伯语-ru俄语-pt葡萄牙语-de德语-it意大利语-el希腊语-nl荷兰语-pl波兰语-bul保加利亚语-est爱沙尼亚语-dan丹麦语-fin芬兰语-cs捷克语-rom罗马尼亚语-slo斯洛文尼亚语-swe瑞典语-hu匈牙利语-cht繁体中文-vie越南语

## 内容加解密
- 内容加密接口,支持 md5 sha1 sha256 sha512 urlencode urldecode base64_encode,base64_decode。接口不会储存数据。
- 接口地址： https://v1.alapi.cn/api/encrypt
- 请求方式： get post
- content	必填	类型string	如www.alapi.net	要加密的内容
- type	 不必填     类型string	md5	加密的 type, 默认 md5
- type 类型	说明 `md5-md5 加密`  `sha1-sha1加密` `sha256-sha256 加密` `sha512-sha512加密` `urlencode-urlencode 加密` `urldecode-urldecode 解码` `debase64-base64_decode 解码` `enbase64-base64_encode加密`

## 垃圾分类接口
- 查询垃圾属于什么垃圾，有害，可回收...
- 接口地址： https://v1.alapi.cn/api/lajifenlei
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- name	是	string	大白菜	垃圾名称
- page	否	int	1	页码，默认1
- num	否	int	10	数量，默认10

## 历史上的今天
- 查询历史上的今天
- 接口地址： https://v1.alapi.cn/api/eventHitory
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- monthday	否	        int	      1014	月份和日期，如 1014,不填默认获取今天的事件

## 笑话
- 获取每日笑话，数据来自互联网
- 接口地址： https://v1.alapi.cn/api/joke
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- num	否	int	10	获取笑话的数量，默认 10 条
- page	否	int	1	获取页码数,默认 1

## 图片上传
- 图片上传接口，可以通过接口将图片上传到 阿里云，搜狗，Vimcn ,掘金，网易，小米等等...
- 接口地址： https://v1.alapi.cn/api/image
- 请求方式： post
- 参数名称	是否必选	参数类型	示例	说明
- image	  是	  image		要上传的图片
- type	 否   	int	Ali	上传接口类型
- type 为你图片要上传的地方，支持以下参数( 区分大小写 )，同时上传到多个图库，请使用英文逗号分割
- type 参数值	说明
- ali	阿里云
- sogou	搜狗
- alapi    	Alapi
- qihoo	360奇虎
- toutiao	头条
- xiaomi	小米
- imgTg	imt.tg

## 农历查询
- 根据输入的阳历日期查询相应的农历信息。农历 干支 五行 生肖 节气 等等
- 接口地址： https://v1.alapi.cn/api/lunar
- 请求方式： get post
- date	不选填	string	2020-03-23-12	

## 短视频解析 （聚合接口)
- 短视频无水印解析(聚合接口)，支持：抖音、快手、小红书、微视、火山小视频、秒拍、西瓜视频、今日头条、陌陌视频、映客视频、小咖秀、皮皮搞笑、开眼、全民小视频、全民K歌、最右、小影、微博、美拍、皮皮虾等平台的短视频去水印解析
- 接口地址： https://v1.alapi.cn/api/video/url
- 请求方式： get post
- url	是	string	示例：http://v.douyin.com/xTmdYK	短视频分享地址,例如：http://v.douyin.com/xTmdYK，支持中文和链接一起输入

## 短视频解析（单接口）
- 接口地址： https://v1.alapi.cn/api/video/[ type ]
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- url	是	string		短视频平台的分享链接
- 地址	说明
- 请求地址的 type 参数支持
```html
/api/video/dy	抖音解析
/api/video/ks	快手解析
/api/video/ws	微视解析
/api/video/ppx	皮皮虾解析
/api/video/wb	微博视频和秒拍解析
/api/video/mp	美拍解析
/api/video/bi	BiliBili 视频解析
/api/video/hs	火山视频解析
/api/video/xkx	小咖秀视频解析
/api/video/kd	QQ看点视频解析
/api/video/uc	UC 视频解析
```
## 快递查询接口
- 根据快递编号查询快递实时物流信息，目前支持国内常用快递。
- 接口地址： https://v1.alapi.cn/api/kd
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- number	是	string	560006690892	快递编号
- com	是	string		快递公司编号

## 1.网易头条新闻列表
- 获取 网易新闻头条 数据
- 接口地址： https://v1.alapi.cn/api/new/toutiao
- 请求方式： GET POST
- 参数名称	是否必选	参数类型	示例	说明
- start	否	int	1	起始页，默认1
- num	否	int	10	每页数量，默认10

## 2.网易新闻详情解析
- 通过 网易新闻 docid , 获取新闻的主体详情解析
- 接口地址： https://v1.alapi.cn/api/new/detail
- 请求方式： GET POST
- 参数名称	是否必选	参数类型	示例	说明
- docid	是	string	EQ1NGK0I0001875P	网易新闻的 docid

## 1.获取知乎当天日报
- 获取当天的知乎日报
- 接口地址： https://v1.alapi.cn/api/zhihu/latest
- 请求方式： get post

## 1.1 获取指定日期的日报
- 获取指定日期的日报.根据日期，获取日期的前一天的日报。比如输入 20191007，那么获取的数据就是20191006 的日报
- 接口地址： https://v1.alapi.cn/api/zhihu/before
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- date	是	date	20191007	日报的日期,如 20191007
- 关于 date: 比如输入 20191007，那么获取的数据就是20191006 的日报

## 2. 获取日报的详情内容
- 接口地址： https://v1.alapi.cn/api/zhihu/news
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- id	是	int	9716101	知乎日报的 ID

## 1.网易云搜索接口
- 通过关键词可以搜索 音乐 / 专辑 / 歌手 / 歌单 / 用户
- 接口地址： https://v1.alapi.cn/api/music/search
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- keyword	是	string	海阔天空	搜索关键字
- limit	否	int	10	单页数量
- offset	否	int	1	页码
- type	否	int	1	搜索类型
- 搜索类型type 默认为 1 即单曲 , 取值意义 :1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

## 2.获取歌曲直链地址
- 根据音乐 id 获取 直链下载地址
- 接口地址： https://v1.alapi.cn/api/music/url
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- id	是	int	440342015	歌曲ID
- format	否		json	返回格式,默认跳转到歌曲真实地址

## 3.获取歌曲详情
- 接口地址： https://v1.alapi.cn/api/music/detail
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- id	是	int	1413142894	歌曲id,支持多个，用英文逗号隔开

## 4.获取歌单列表
- 接口地址： https://v1.alapi.cn/api/music/playlist
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- id	是	int	2948171497	歌单ID

## 5.获取热门评论
- 获取资源 id 的热门评论，支持：歌曲 , mv, 专辑 , 歌单 , 电台, 视频
- 接口地址： https://v1.alapi.cn/api/music/comment/hot
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- id	是	int	186016	资源 Id
- offset	否	int	0	偏移数量，用于分页 默认 0
- limit	否	int	10	返回数量 ，默认 10
- type	否	type	1	资源类型，默认 0: 0 :歌曲 1 : mv 2 : 歌单 3 : 专辑4 : 电台 5: 视频

## 刷屏热词
- 获取网络上网络流行语或者梗。
- 接口地址： https://v1.alapi.cn/api/tophub/wiki
- 请求方式： get post

## 获取热榜(无需ID)
- 接口地址： https://v1.alapi.cn/api/tophub/get
- 请求方式： get post
- 参数名称	是否必选	参数类型	示例	说明
- type	否	string	zhihu	获取热榜的 type ，默认 36k,详细见下面表格
- type 参数说明
- 因为已经封装好了id, 你只需要提供对应的 type 就可以
```html
type参数值	说明
zhihu	知乎热榜
weibo	微博热搜
weixin	微信 ‧ 24h热文榜
baidu	百度 ‧ 实时热点
toutiao	今日头条
163	网易新闻
xl	新浪网 ‧ 热词排行榜
36k	36氪 ‧ 24小时热榜(默认)
hitory	历史上的今天
sspai	少数派
csdn	**csdn **今日推荐
juejin	掘金热榜
bilibili	哔哩哔哩热榜
douyin	抖音视频榜
52pojie	吾爱破解热榜
v2ex	V2ex 热帖
hostloc	全球主机论坛热帖
```
## 天气接口
- 接口地址 https://query.asilu.com/weather/baidu
- 请求方式get
- 参数 name 必填 城市

## 获取用户设备信息	
- 接口地址：https://api.asilu.com/user-agent/
- 通过 user-agent 分析用户设备信息
- 请求方式 get
- 	name-----默认值---备注
- USER AGENT (UA 字符串)----USER_AGENT----为空 获取当前设备信息 Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36

## RSS 订阅信息获取	
- 接口地址 https://api.asilu.com/rss/
- 参数url  RSS 订阅地址	
- 请求方式 get

## 1.视频 视频分类
- 接口地址 https://api.apiopen.top/videoHomeTab
- 请求方式 get
- 共有22种分类，每一类又有详细的视频

## 1.1视频分类：
- 接口地址 https://api.apiopen.top/videoCategory
- 请求方式 get

## 1.2今日视频推荐：
- 接口地址 https://api.apiopen.top/todayVideo
- 请求方式 get

## 1.3 根据ID推荐视频：
- 接口地址 https://api.apiopen.top/videoRecommend?id=127398
- 请求方式 get
- 参数 id 必填
