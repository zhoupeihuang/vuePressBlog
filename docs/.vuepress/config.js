module.exports = {
  title: 'peyton\'s blog',
  description: '我的个人博客',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', {
      rel: 'icon',
      href: './public/images/logo.jpg'
    }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    plugins: [
      'vuepress-plugin-redirect',
      {
          // provide i18n redirection
          // it will automatically redirect `/foo/bar/` to `/:locale/foo/bar/` if exists
          locales: true,
      },
  ],
  sidebar: [
    {
      title: '前言',   // 必要的
      collapsable: true, // 可选的, 默认值是 true,
      children: [
        '/'
      ]
    },],

    // nav: [ // 导航栏配置
    //   {
    //     text: '前端基础',
    //     link: '/base/'
    //   },
    //   // {text: '算法题库', link: '/algorithm/'},
    //   // {text: '微博', link: 'https://baidu.com'}      
    // ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};