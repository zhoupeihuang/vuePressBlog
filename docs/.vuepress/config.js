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
    nav: [{
      text: 'Home',
      link: '/'
    }],
    sidebar: {
      'jinjie': [{
        title: '进阶',
        collapsable: true, // 可折叠
        children: [
          '/jinjie/十分钟了解BFC',
          '/jinjie/手写装饰器'
        ]
      }],
      '/base/': [
        '',
        '闭包',
        '错误提示',
        '防抖节流',
        '冒泡排序',
        '前端跨域',
        '什么是装饰器',
      ]
    },
    // { text: 'External', link: 'https://vuepress.docschina.org/default-theme-config/#%E4%B8%BB%E9%A1%B5-homepage' },
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};