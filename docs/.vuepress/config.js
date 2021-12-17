module.exports = {
  title: 'peyton Blog',  // 设置网站标题
  description : 'Adroi',
  theme: 'vdoing',
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig : {
    nav : [
        { text: '接口定义', link: '/apiword' },
        { text: '接口字段定义', link: '/api' },
        { text: '附录：错误码', link: '/error' }
    ],
    sidebar: [
      {
        title: '前言',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        children: [
          '/'
        ]
		  },
      {
        title: '奇怪的知识',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        children: [
          '/'
        ]
		  },
      {
        title: 'ES5',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        children: [
          'js获取上传图片真实的尺寸大小和存储大小',
          '数组操作方法',
          '数组内对象去重',
          '原型对象与原型链',
        ]
		  },
      {
        title: 'ES6',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        children: [
          '手写装饰器','什么是装饰器','防抖节流','ES6常用对象操作整理','',
        ]
		  },
      {
        title: 'Vue',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        children: [
          'vue better-scroll 是什么',
          'vue cookie抽象类',
          'vue router.beforeEach',
          'vue toast 小提示',
          'vue 动态设置 title',
          'vue 埋点理论篇',
          'vue 数据请求需要formData',
          'vue-cli3.0 GUI',
          'vue-cli3.0入门',
          'vue-filter 过滤器',
          'vue3为什么使用proxy',
          'vue3起步',
          'vuex 持久化',
          'vuex',
          'vue之36计',
          'vue动态生成路由页面',
          'vue图片压缩',
          'vue埋点',
          'vue的compile',
          'vue的defineProperty',
          'vue的diff',
          'vue的Observe',
          'vue的双向绑定原理',
        ]
		  },
      {
        title: 'CSS',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        children: [
          '5种footer底部固定',
          'CSS3动画特效',
          'css垂直居中',
          '十分钟了解BFC',
                  ]
		  },
        {
        title: '进阶',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        children: [
          '1000条数据的展示如何不卡',
          'BFC',
          'CSS3动画特效',
          'css垂直居中',
          'http https区别和优劣',
          'http1.0&http2.0区别优劣',
          'jquery核心概念',
          'jQ链式调用的原理',
          'npm run 自动化任务',
          'npm 镜像',
          'promise实现原理ES5',
          'RBAC权限控制',
          'vue的diff',
          'watch和computed区别',
          'Webpack原理，核心，包',
          '前端安全防范与常见攻击手段',
          '前端权限控制流程',
          '前端组件化',
          '宏任务&微任务',


        ]
		  },
      {
      title: 'nodejs',   // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      children: [
        '','','','','',
      ]
    },
    {
    title: 'other',   // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    children: [
      '','','','','',
    ]
  }
       
      ],
    sidebarDepth : 2
  }
}
