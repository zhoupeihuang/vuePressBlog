module.exports = {
  title: 'peyton\'s blog',
  description: '我的个人博客',
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
        text: 'Home',
        link: '/'
      },
      {
       text: 'base',
       items:[
        {text: '闭包',link: '/base/闭包'},
        {text: '错误提示',link: '/base/错误提示'},
        {text: '防抖节流',link: '/base/防抖节流'},
        {text: '冒泡排序',link: '/base/冒泡排序'},
        {text: '前端跨域',link: '/base/前端跨域'},
        {text: '什么是装饰器',link: '/base/什么是装饰器'},
       ]
      },
      { text: 'External', link: 'https://vuepress.docschina.org/default-theme-config/#%E4%B8%BB%E9%A1%B5-homepage' },
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};