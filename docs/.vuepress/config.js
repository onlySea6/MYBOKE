module.exports = {
	// 主页图片下第一行字
	title: '光のN^',
	// 端口配置 80是默认端口
	// port: 80,
	// 主页图片下第二行字
	description: '欢迎YOU',
	// 主题设置（默认）
	theme: 'reco', //必填：使用vuepress-theme-ting 主题
	head: [
		// 改变title的图标，图标放在public文件夹中，herf后直接 '/图片.格式' ，不要./
		[
			'link',
			{
				rel: 'icon',
				href: '/繁星.png',
			},
		],
	],
	plugins: [
		'@vuepress/plugin-back-to-top',
		'@vuepress/plugin-medium-zoom',
		'@vuepress-reco/vuepress-plugin-kan-ban-niang',
		'ribbon',
		{
			size: 90, // width of the ribbon, default: 90
			opacity: 0.8, // opacity of the ribbon, default: 0.3
			zIndex: -1, // z-index property of the background, default: -1
		},
		'cursor-effects',
		{
			size: 2, // size of the particle, default: 2
			shape: ['star' | 'circle'], // shape of the particle, default: 'star'
			zIndex: 999999999, // z-index property of the canvas, default: 999999999
		},

		// 'vuepress-plugin-sponsor',
		// {
		// 	theme: 'drinks',
		// 	alipay: '/zfb.jpg',
		// 	wechat: '/wx.jpg',
		// 	qq: '',
		// 	paypal: '',
		// 	duration: 2000,
		// },
		{
			theme: [
				'haruto',
				'blackCat',
				'whiteCat',
				'haru1',
				'haru2',
				'koharu',
				'izumi',
				'shizuku',
				'wanko',
				'miku',
				'z16',
			],

			clean: false,
			messages: {
				welcome: '我是王杰欢迎你的关注 ',
				home: '心里的花，想要带你回家.',
				theme: '好吧，希望你能喜欢其他小伙伴！',
				close: '那再见了哦~',
			},
		},
	],
	base: '/wangjie/',
	themeConfig: {
		//添加评论功能 主题自带的
		valineConfig: {
			appId: 'giaaoVraJzOnmglwm5fMiTV7-gzGzoHsz', // your appId
			appKey: 'ESvi7ADCSTEtOKxIQ483Cgi7', // your appKey
		},
		//侧边栏自动显示当前激活页面中标题的链接?
		// sidebarDepth: 2,
		// 博客配置
		blogConfig: {
			category: {
				location: 2, // 在导航栏菜单中所占的位置，默认2
				text: '分类', // 默认文案 “分类”
			},
		},
		//作者
		author: '光のN^',
		//设置背景图片指定
		type: 'blog',

		//设置首页信息栏头像
		authorAvatar:
			'https://tse2-mm.cn.bing.net/th/id/OIP.R4LPrjlWN15goCMc4ihrPwHaEo?w=255&h=180&c=7&o=5&pid=1.7',

		// 允许你获取每个文件的最后一次 git 提交的 UNIX 时间戳（ms
		lastUpdated: 'Last Updated',

		//显示所有页面的标题链接
		// displayAllHeaders: true // 默认值：false
		//设置导航栏禁用（navbar固定写法） navbar：false
		// navbar: false,

		// catalogUrl: '/catalog', //必填 目录路径
		// lastUpdated: 'Last Updated', //必填：文章显示最新修改时间

		// nav导航栏设置
		nav: [
			// 每个{}中是导航选项，link可以跳转其他路由，或者链接
			{
				text: '首页',
				link: '/',
				icon: 'reco-home',
			},
			// 同上，可以设置成下拉的子选项
			//js
			{
				text: 'JavaScript/css',
				items: [
					{
						text: 'js基础',
						link: '/Js/js1',
					},
					{
						text: 'js数组对象',
						link: '/Js/js2',
					},
					{
						text: 'js与dom',
						link: '/Js/js3',
					},
					{
						text: 'js解析数组',
						link: '/Js/jsimport',
					},
					{
						text: 'css基础',
						link: '/CssHtml/cssjc',
					},
					{
						text: 'css拓展',
						link: '/CssHtml/css',
					},
				],
			},
			//es6
			{
				text: 'ES6',
				items: [
					{
						text: ' 声明变量的方式',
						link: '/ES6/new1',
					},
					{
						text: '模板字符串',
						link: '/ES6/new2',
					},
					{
						text: '箭头函数',
						link: '/ES6/new3',
					},
					{
						text: '解构赋值',
						link: '/ES6/new4',
					},
					{
						text: '数组新增方法',
						link: '/ES6/new5',
					},
					{
						text: 'Promise',
						link: '/ES6/new6',
					},
				],
			},
			//前端框架
			{
				text: '前端框架',
				items: [
					{
						text: 'jQuery',
						link: '/jQuery/jquery',
					},
					{
						text: '微信小程序',
						link: '/WeChat/weixin1',
					},
					{
						text: 'vuepress',
						link: '/Vuepress/vuepress',
					},
					{
						text: 'Vue',
						link: '/Vue/vue1',
					},
					{
						text: 'React',
						link: '/React/react1',
					},
					{
						text: 'Angular',
						link: '/Angular/01enter',
					},
					{
						text: 'uni-app',
						link: '/uni-app/uni-app',
					},
				],
			},
			//markdow vuepress node git axios webpack
			{
				text: '工具编译',
				items: [
					{
						text: 'git',
						link: '/Git/git',
					},
					{
						text: 'Axios',
						link: '/Axios/axios',
					},
					{
						text: 'Markdown语法',
						link: '/Other/page1',
					},
					{
						text: 'vscode接口测试',
						link: '/Other/vs',
					},
					{
						text: 'TypeScript',
						link: '/TyScript/ts',
					},
					{
						text: 'Node',
						link: '/Node/node1',
					},
					{
						text: 'webpack',
						link: '/webpacks/webpack1',
					},
					{
						text: '后端',
						link: '/backstage/mongodb',
					},
					{
						text: 'Reptiles',
						link: '/Reptiles/no',
					},
					{
						text: 'web前端导航',
						link: '/Learn/learing',
					},
					{
						text: '前端知识体系',
						link: '/Other/all',
					},
				],
			},
			//关于我
			{
				text: '关于',
				items: [
					{
						text: '项目经验',
						link: '/Other/xmjy',
					},
					{
						text: '前端开发流程',
						link: '/Other/lc',
					},
					{
						text: '关于我',
						link: '/About/about',
					},
					{
						text: '鸡汤',
						link: '/Other/check',
					},
				],
			},
		],
		// 侧边导航设置
		// sidebar: auto,// 自动生成侧栏 /运行项目报错？？？
		sidebar: {
			// 侧边导航栏内容（示例）

			// TyScript
			'/TyScript/': [
				{
					title: 'TyScript基础语法',
					collapsable: false,
					path: 'ts',
				},
				{
					title: 'TyScript基础类型',
					collapsable: false,
					path: 'ts1',
				},
				{
					title: 'TyScript变量声明',
					collapsable: false,
					path: 'ts2',
				},
				{
					title: 'TyScript运算符',
					collapsable: false,
					path: 'ts3',
				},
				{
					title: 'TyScript循环',
					collapsable: false,
					path: 'ts4',
				},
				{
					title: 'TyScript函数',
					collapsable: false,
					path: 'ts5',
				},
				{
					title: 'Number',
					collapsable: false,
					path: 'ts6',
				},
				{
					title: 'String',
					collapsable: false,
					path: 'ts7',
				},
				{
					title: 'Array',
					collapsable: false,
					path: 'ts8',
				},
				{
					title: 'Map',
					collapsable: false,
					path: 'ts9',
				},
			],
			// 微信小程序
			'/WeChat/': [
				{
					title: '微信小程序基础',
					collapsable: false,
					path: 'weixin1',
				},
				{
					title: '微信小程序npm使用',
					collapsable: false,
					path: 'weixin2',
				},
				{
					title: '微信小程序生命周期',
					collapsable: false,
					path: 'weixin3',
				},
				{
					title: '微信小程序组件',
					collapsable: false,
					path: 'weixin4',
				},
				{
					title: '微信小程序pages通信',
					collapsable: false,
					path: 'weixin5',
				},
				{
					title: '微信小程序路由',
					collapsable: false,
					path: 'weixin6',
				},
				{
					title: '微信小程序数据存储',
					collapsable: false,
					path: 'weixin7',
				},
				{
					title: '微信小程序混入',
					collapsable: false,
					path: 'weixin8',
				},
				{
					title: '微信小程序请求',
					collapsable: false,
					path: 'weixinimport',
				},
			],
			//markdow
			'/Other/': [
				{
					title: 'VSCode测试接口',
					collapsable: false, //是否折叠侧边栏
					path: 'vs',
				},
				{
					title: '项目经验',
					collapsable: false, //是否折叠侧边栏
					path: 'xmjy',
				},
				{
					title: 'markdown基础',
					collapsable: false, //是否折叠侧边栏
					path: 'page1',
				},
			],
			//webpack
			'/webpacks/': [
				{
					title: 'webpack',
					collapsable: false, //是否折叠侧边栏
					path: 'webpack1',
				},
				{
					title: 'webpack配置',
					collapsable: false, //是否折叠侧边栏
					path: 'webpack2',
				},
				{
					title: 'webpack例子',
					collapsable: false, //是否折叠侧边栏
					path: 'webpack3',
				},
			],
			'/Vuepress/': [
				{
					title: 'vuepress',
					collapsable: false,
					path: 'vuepress',
				},
			],
			'/backstage/': [
				{
					title: 'mongodbs数据库',
					collapsable: false,
					path: 'mongodb',
				},
				{
					title: 'mysql数据库',
					collapsable: false,
					path: 'mysql',
				},
				{
					title: '服务器开启接口',
					collapsable: false,
					path: 'Linuk',
				},
				{
					title: '邮箱验证码',
					collapsable: false,
					path: 'email',
				},
				{
					title: ' easy-mock',
					collapsable: false,
					path: 'easy',
				},
			],
			//Node
			'/Node/': [
				{
					title: 'Node是什么',
					collapsable: false,
					path: 'node1',
				},
				{
					title: 'Nodeの理解',
					collapsable: false,
					path: 'node2',
				},
				{
					title: 'package.json文件',
					collapsable: false,
					path: 'node3',
				},
				{
					title: 'node写登录注册接口',
					collapsable: false,
					path: 'node4',
				},
				{
					title: 'node安装问题',
					collapsable: false,
					path: 'node5',
				},
				{
					title: 'Interface',
					collapsable: false,
					path: 'Interface',
				},
			],
			//js系列
			'/Js/': [
				{
					title: 'js基础',
					collapsable: false,
					path: 'js1',
				},
				{
					title: 'js数组对象',
					collapsable: false,
					path: 'js2',
				},
				{
					title: 'js与dom',
					collapsable: false,
					path: 'js3',
				},
				{
					title: 'js数组解析',
					collapsable: false,
					path: 'jsimport',
				},
				{
					title: 'js正则',
					collapsable: false,
					path: 'js4zz',
				},
				{
					title: 'js原型',
					collapsable: false,
					path: 'js5yx',
				},
				{
					title: 'js面试题',
					collapsable: false,
					path: 'jsq',
				},
				{
					title: 'js高阶',
					collapsable: false,
					path: 'jsgj',
				},
			],
			//css系列
			'/CssHtml/': [
				{
					title: 'css基础',
					collapsable: false,
					path: 'cssjc',
				},
				{
					title: 'css拓展',
					collapsable: false,
					path: 'css',
				},
				{
					title: 'html标准文档',
					collapsable: false,
					path: 'improtcss',
				},
				{
					title: 'html转译符',
					collapsable: false,
					path: 'html字符',
				},
				{
					title: 'css注意',
					collapsable: false,
					path: 'zyindex',
				},
				{
					title: '封装的方法',
					collapsable: false,
					path: 'SomeZz',
                },
                {
					title: 'css the need',
					collapsable: false,
					path: 'cssms',
                },
			],
			//jquery
			'/jQuery/': [
				{
					title: 'jQuery',
					collapsable: false,
					path: 'jquery',
				},
				{
					title: 'jQuery对象属性',
					collapsable: false,
					path: 'jquery1',
				},
				{
					title: 'jQuery类名和样式',
					collapsable: false,
					path: 'jquery2',
				},
				{
					title: 'jQuery事件',
					collapsable: false,
					path: 'jquery3',
				},
				{
					title: 'Ajax',
					collapsable: false,
					path: 'ajax',
				},
			],
			// es6
			'/ES6/': [
				{
					title: '声明变量的方式',
					collapsable: false,
					path: 'new1',
				},
				{
					title: '模板字符串',
					collapsable: false,
					path: 'new2',
				},
				{
					title: '箭头函数',
					collapsable: false,
					path: 'new3',
				},
				{
					title: '解构赋值',
					collapsable: false,
					path: 'new4',
				},
				{
					title: '数组新增方法',
					collapsable: false,
					path: 'new5',
				},
				{
					title: 'Promise',
					collapsable: false,
					path: 'new6',
				},
				{
					title: '跨域',
					collapsable: false,
					path: 'new7',
				},
			],
			//Axios
			'/Axios/': [
				{
					title: 'Axios',
					collapsable: false,
					path: 'axios',
				},
				{
					title: 'Axios全局配置/新建实例and拦截器',
					collapsable: false,
					path: 'axios2',
				},
				{
					title: 'Axios与Vue',
					collapsable: false,
					path: 'axios3',
				},
				{
					title: 'Axios',
					collapsable: false,
					path: 'axios4',
				},
			],
			//git
			'/Git/': [
				{
					title: 'git之前必做',
					collapsable: false,
					path: 'git',
				},
				{
					title: 'git常用命令',
					collapsable: false,
					path: 'gitbase',
				},
			],
			//vue
			'/Vue/': [
				{
					title: 'vue基础',
					collapsable: false,
					path: 'vue1',
				},
				{
					title: 'vue组件通信',
					collapsable: false,
					path: 'vue2',
				},
				{
					title: 'vue插件开发',
					collapsable: false,
					path: 'vue3',
				},
				{
					title: 'vue内置组件',
					collapsable: false,
					path: 'vue4',
				},
				{
					title: 'vue路由',
					collapsable: true, //是否折叠侧边栏
					children: ['vue5', 'vue6'],
				},
				{
					title: 'vue的反向代理',
					collapsable: false,
					path: 'vue10nginx',
				},
				{
					title: 'vue进阶',
					collapsable: false,
					path: 'vue7_2',
				},
				{
					title: 'vue项目打包为桌面应用',
					collapsable: true, //是否折叠侧边栏
					path: 'vue9',
				},
				{
					title: 'vue3.0基础',
					collapsable: false,
					path: 'vue7',
				},
				{
					title: 'vue3.0进阶',
					collapsable: false,
					path: 'vue8',
				},
			],
			//react
			'/React/': [
				{
					title: 'React基础',
					collapsable: false, //是否折叠侧边栏
					path: 'react1',
				},
				{
					title: 'react受控组件和ref',
					collapsable: false,
					path: 'react2',
				},
				{
					title: 'react基础小例子',
					collapsable: false,
					path: 'reactCar',
				},
				{
					title: 'react生命周期(class)',
					collapsable: false,
					path: 'reactsm',
				},
				{
					title: 'Hook',
					collapsable: false,
					path: 'hook',
				},
				{
					title: 'react路由',
					collapsable: false,
					path: 'router',
				},
				{
					title: 'redux',
					collapsable: false,
					path: 'redux',
				},
				{
					title: 'mobox',
					collapsable: false,
					path: 'mybox',
				},
				{
					title: 'react的23问',
					collapsable: false,
					path: 'react23',
				},
				{
					title: 'react写H5用的',
					collapsable: false,
					path: 'reactapp',
				},
				{
					title: 'react手写分页组件',
					collapsable: false,
					path: 'reactcomponet',
				},
				{
					title: '官方题',
					collapsable: false,
					path: 'reactms',
				},
				{
					title: '属性检查',
					collapsable: false,
					path: 'react3context',
				},
			],
			//angular
			'/Angular/': [
				{
					title: 'angular开始',
					collapsable: false,
					path: '01enter',
				},
				{
					title: 'angular事件',
					collapsable: false,
					path: '02shijian',
				},
				{
					title: 'angular操作dom',
					collapsable: false,
					path: '03dom',
				},
				{
					title: 'angular组件通信',
					collapsable: false,
					path: '04tongxing',
				},
				{
					title: 'angular生命周期',
					collapsable: false,
					path: '05shengming',
				},
				{
					title: 'angular路由',
					collapsable: false,
					path: '06luyou',
				},
				{
					title: 'angular跨域',
					collapsable: false,
					path: '07ky',
				},
			],
		},
		// search: false, //禁用内置搜索框
		// 搜索设置
		search: true,

		searchMaxSuggestions: 10, //调整搜索框显示的搜索提示数量
		// 假定 GitHub。也可以是一个完整的 GitLab URL。

		// repo: 'https://github.com',
		// 自定义项目仓库链接文字

		// 默认根据 `themeConfig.repo` 中的 URL 来自动匹配是 "GitHub"/"GitLab"/"Bitbucket" 中的哪个，如果不设置时是 "Source"。
		// repoLabel: '贡献代码！',

		// 以下为可选的 "Edit this page" 链接选项
		// 如果你的文档和项目位于不同仓库：
		docsRepo: 'vuejs/vuepress',
		// 如果你的文档不在仓库的根目录下：
		docsDir: 'docs',
		// 如果你的文档在某个特定的分支（默认是 'master' 分支）：
		docsBranch: 'master',
		// 默认为 false，设置为 true 来启用
		editLinks: true,
		// 自定义编辑链接的文本。默认是 "Edit this page"
		editLinkText: '帮助我们改进页面！',
	},
}
