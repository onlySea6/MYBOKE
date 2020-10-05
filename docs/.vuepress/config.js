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
                href: '/繁星.png'
            }
        ]
    ],
    base: '/wangjie/',
    themeConfig: {
        //添加评论功能 主题自带的
        valineConfig: {
            appId: 'giaaoVraJzOnmglwm5fMiTV7-gzGzoHsz',// your appId
            appKey: 'ESvi7ADCSTEtOKxIQ483Cgi7', // your appKey
          },
        //侧边栏自动显示当前激活页面中标题的链接?
        // sidebarDepth: 2,
        // 博客配置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            }
        },
        //作者
        author: '光のN^',
        //设置背景图片指定
        type: 'blog',

        //设置首页信息栏头像
        authorAvatar: 'https://tse2-mm.cn.bing.net/th/id/OIP.R4LPrjlWN15goCMc4ihrPwHaEo?w=255&h=180&c=7&o=5&pid=1.7',

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
                icon: 'reco-home'
            },
            // 同上，可以设置成下拉的子选项
            //js
            {
                text: 'Js',
                items: [{
                        text: 'js基础',
                        link: '/Js/js1'
                    },
                    {
                        text: 'js数组对象',
                        link: '/Js/js2'
                    },
                    {
                        text: 'js与dom',
                        link: '/Js/js3'
                    },
                    {
                        text:'js解析数组',
                        link:'/Js/jsimport'
                    }
                ]
            },
            //es6
            {
                text: 'ES6',
                items: [{
                        text: ' 声明变量的方式',
                        link: '/ES6/new1'
                    },
                    {
                        text: '模板字符串',
                        link: '/ES6/new2'
                    },
                    {
                        text: '箭头函数',
                        link: '/ES6/new3'
                    },
                    {
                        text: '解构赋值',
                        link: '/ES6/new4'
                    },
                    {
                        text: '数组新增方法',
                        link: '/ES6/new5'
                    },
                    {
                        text: 'Promise',
                        link: '/ES6/new6'
                    }
                ]
            },
            //git
            {
                text:'Git',
                items:[{
                    text:'git必做',
                    link:'/Git/git'
                },{
                    text:'git常用命令',
                    link:'/Git/gitbase'
                }]
            },
            //Axios
            {
                text: 'Axios',
                items: [{
                        text: 'Axios',
                        link: '/Axios/axios'
                    }
                ]
            },
            //前端框架
            {
                text: '前端框架',
                items: [ 
                     {
                    text: 'jQuery',
                    link: '/jQuery/jquery'
                },{
                        text: '微信小程序',
                        link: '/WeChat/weixin1'
                    },
                    {
                        text: 'Vue',
                        link: '/Vue/vue1'
                    },
                    {
                        text: 'React',
                        link: '/React/react1'
                    },
                  
                ]
            },
            //markdow vuepress node
            {
                text: '其他',
                items: [{
                    text: 'Markdown基础',
                    link: '/Other/page1'
                },
                {
                    text: 'vueprss',
                    link: '/Other/page2'
                },
                {
                    text: 'Node',
                    link: '/Node/node1'
                },
                {
                    text: 'web前端导航',
                    link: '/Learn/learing'
                }
            ],
            },
            //关于我
            {
                text: '关于',
                items: [{
                    text: '关于我',
                    link: '/About/about'
                }]
            },
        ],
        // 侧边导航设置
        // sidebar: auto,// 自动生成侧栏 /运行项目报错？？？
        sidebar: {
            // 侧边导航栏内容（示例）

            // 微信小程序
            '/WeChat/':[{
                title:'微信小程序基础',
                collapsable: false,
                path:'weixin1'
            },
            {
                title:'微信小程序npm使用',
                collapsable: false,
                path:'weixin2'
            },
            {
                title:'微信小程序生命周期',
                collapsable: false,
                path:'weixin3'
            },
            {
                title:'微信小程序组件',
                collapsable: false,
                path:'weixin4'
            },{
                title:'微信小程序pages通信',
                collapsable: false,
                path:'weixin5'
            },
            {
                title:'微信小程序路由',
                collapsable: false,
                path:'weixin6'
            },
            {
                title:'微信小程序数据存储',
                collapsable: false,
                path:'weixin7'
            },
            {
                title:'微信小程序混入',
                collapsable: false,
                path:'weixin8'
            },
            {
                title:'微信小程序请求',
                collapsable: false,
                path:'weixinimport'
            }
        ],
            //markdow和vuepress
            '/Other/': [{
                title: 'markdown基础',
                collapsable: true, //是否折叠侧边栏
                children: ['page1']
            },{
                title: 'vuepress',
                collapsable: false,
                path: 'page2'
            }
        ],
            //Node
            '/Node/':[
                {
                    title: 'Node是什么',
                    collapsable: false,
                    path: 'node1'
                },
                {
                    title: 'Nodeの理解',
                    collapsable: false,
                    path: 'node2'
                },
                {
                    title: 'package.json文件',
                    collapsable: false,
                    path: 'node3'
                }
            ],
            //js系列
            '/Js/': [{
                title: 'js基础',
                collapsable: false,
                path: 'js1'
            }, {
                title: 'js数组对象',
                collapsable: false,
                path: 'js2'
            }, {
                title: 'js与dom',
                collapsable: false,
                path: 'js3'
            }, {
                title: 'js数组解析',
                collapsable: false,
                path: 'jsimport'
            },
            {
                title: 'js正则',
                collapsable: false,
                path: 'js4zz'
            },
            {
                title: 'js原型',
                collapsable: false,
                path: 'js5yx'
            }
        ],
            //jquery
            '/jQuery/':[{
                title:'jQuery',
                collapsable: false,
                path: 'jquery'
            },
            {
                title:'jQuery对象属性',
                collapsable: false,
                path: 'jquery1'
            },
            {
                title:'jQuery类名和样式',
                collapsable: false,
                path: 'jquery2'
            },
            {
                title:'jQuery事件',
                collapsable: false,
                path: 'jquery3'
            },
            {
                title:'Ajax',
                collapsable: false,
                path: 'ajax'
            }
        ],
            // es6
            '/ES6/':[{
                title:'声明变量的方式',
                collapsable: false,
                path: 'new1'
            },
            {
                title:'模板字符串',
                collapsable: false,
                path: 'new2'
            },
            {
                title:'箭头函数',
                collapsable: false,
                path: 'new3'
            },
            {
                title:'解构赋值',
                collapsable: false,
                path: 'new4'
            },
            {
                title:'数组新增方法',
                collapsable: false,
                path: 'new5'
            },
            {
                title:'Promise',
                collapsable: false,
                path: 'new6'
            }
        ],
            //Axios
            '/Axios/':[{
                title:'Axios',
                collapsable: false,
                path: 'axios'
            },
            {
                title:'Axios全局配置/新建实例and拦截器',
                collapsable: false,
                path: 'axios2'
            },{
                title:'Axios与Vue',
                collapsable: false,
                path: 'axios3'
            },{
                title:'Axios',
                collapsable: false,
                path: 'axios4'
            }
        ],
            //git
            '/Git/':[{
                title:'git之前必做',
                collapsable: false,
                path: 'git'
            },
            {
                title:'git常用命令',
                collapsable: false,
                path: 'gitbase'
            }
        ],
            //vue
            '/Vue/': [{
                    title: 'vue基础',
                    collapsable: false,
                    path: 'vue1'
                },
                {
                    title: 'vue组件通信',
                    collapsable: false,
                    path: 'vue2'
                },
                {
                    title: 'vue插件开发',
                    collapsable: false,
                    path: 'vue3'
                },
                {
                    title: 'vue内置组件',
                    collapsable: false,
                    path: 'vue4'
                },
                {
                    title: 'vue路由',
                    collapsable: true, //是否折叠侧边栏
                    children: ['vue5', 'vue6']
                },
                {
                    title: 'vue3.0',
                    collapsable: false,
                    path: 'vue7'
                },
            ],
            //react
            '/React/':[
                {
                    title: 'React基础',
                    collapsable: true, //是否折叠侧边栏
                    children: ['react1', 'react1.1']
                },
                {
                    title: 'React类组件',
                    collapsable: false, 
                    path:'reactlzj'
                },
                {
                    title: 'Hook',
                    collapsable: false, 
                    path:'hook'
                },
                {
                    title: 'react受控组件和ref',
                    collapsable: false, 
                    path:'react2'
                },
                {
                    title: 'react基础小例子',
                    collapsable: false, 
                    path:'reactCar'
                },
                {
                    title: 'react生命周期(class)',
                    collapsable: false, 
                    path:'reactsm'
                },
                {
                    title: 'react的Context上下文',
                    collapsable: false, 
                    path:'react3context'
                }
            ]
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
        editLinkText: '帮助我们改进页面！'
    }
};

//yarn deploy 打包