module.exports = {
  title: 'peyton Blog', // 设置网站标题
  description: 'Adroi',
  theme: 'vdoing',
  base: './', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: [{
        text: '接口定义',
        link: '/apiword'
      },
      {
        text: '接口字段定义',
        link: '/api'
      },
      {
        text: '附录：错误码',
        link: '/error'
      }
    ],
    sidebar: {
      '/': [{
          title: '前言', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            '/'
          ]
        },
        {
          title: '奇怪的知识', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            '/Other/错误提示'
          ]
        },
        {
          title: 'ES5', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            ['/ES5/js获取上传图片真实的尺寸大小和存储大小'],
            ['/ES5/数组操作方法'],
            ['/ES5/数组内对象去重'],
            ['/ES5/原型对象与原型链'],
          ]
        },
        {
          title: 'ES6', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            ['/ES6/手写装饰器'],
            ['/ES6/什么是装饰器'], 
            ['/ES6/防抖节流'], 
            ['/ES6/ES6常用对象操作整理'], 
          ]
        },
        {
          title: 'Vue', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            ['/Vue/vue better-scroll 是什么'],
            ['/Vue/vue cookie抽象类'],
            ['/Vue/vue router.beforeEach'],
            ['/Vue/vue toast 小提示'],
            ['/Vue/vue 动态设置 title'],
            ['/Vue/vue 埋点理论篇'],
            ['/Vue/vue 数据请求需要formData'],
            ['/Vue/vue-cli3.0 GUI'],
            ['/Vue/vue-cli3.0入门'],
            ['/Vue/vue-filter 过滤器'],
            ['/Vue/vue3为什么使用proxy'],
            ['/Vue/vue3起步'],
            ['/Vue/vuex 持久化'],
            ['/Vue/vuex'],
            ['/Vue/vue之36计'],
            ['/Vue/vue动态生成路由页面'],
            ['/Vue/vue图片压缩'],
            ['/Vue/vue埋点'],
            ['/Vue/vue的compile'],
            ['/Vue/vue的defineProperty'],
            ['/Vue/vue的diff'],
            ['/Vue/vue的Observe'],
            ['/Vue/vue的双向绑定原理'],
          ]
        },
        {
          title: 'CSS', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            ['/CSS/5种footer底部固定'],
            ['/CSS/CSS3动画特效'],
            ['/CSS/css垂直居中'],
            ['/CSS/十分钟了解BFC'],
          ]
        },
        {
          title: '进阶', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            ['/Interview/1000条数据的展示如何不卡'],
            ['/Interview/BFC'],
            ['/Interview/CSS3动画特效'],
            ['/Interview/css垂直居中'],
            ['/Interview/http https区别和优劣'],
            ['/Interview/http1.0&http2.0区别优劣'],
            ['/Interview/jquery核心概念'],
            ['/Interview/jQ链式调用的原理'],
            ['/Interview/npm run 自动化任务'],
            ['/Interview/npm 镜像'],
            ['/Interview/promise实现原理ES5'],
            ['/Interview/RBAC权限控制'],
            ['/Interview/vue的diff'],
            ['/Interview/watch和computed区别'],
            ['/Interview/Webpack原理，核心，包'],
            ['/Interview/前端安全防范与常见攻击手段'],
            ['/Interview/前端权限控制流程'],
            ['/Interview/前端组件化'],
            ['/Interview/宏任务&微任务'],


          ]
        },
        {
          title: 'nodejs', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            '', '', '', '', '',
          ]
        },
        {
          title: 'other', // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            '', '', '', '', '',
          ]
        }

      ]
    },
    sidebarDepth: 2
  }
}