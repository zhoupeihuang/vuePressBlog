module.exports = {
  title: 'peyton Blog', // 设置网站标题
  description: 'Adroi',
  theme: 'vdoing',
  // base: './', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  plugins: {
    "vuepress-plugin-auto-sidebar": {},
    // '@vuepress/nprogress': {},
    // '@vuepress/back-to-top': true,
    // '@vuepress/medium-zoom': {
    //   selector: '.content__default img',
    // },
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
    
    sidebarDepth: 2
  }
}