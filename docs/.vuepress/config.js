module.exports = {
  title: 'peyton Blog', // 设置网站标题
  description: 'Adroi',
  theme: 'vdoing',
  base: './', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false, // 代码块显示行号
    toc: { includeLevel: [1, 2] }, // 显示的目录深度
  },
  themeConfig: {
    plugins: {
      "vuepress-plugin-auto-sidebar": {},
      '@vuepress/back-to-top': true,
      '@vuepress/medium-zoom': {
        selector: '.content__default img',
      },
      '@vuepress/nprogress': {}
    },
    lastUpdated: 'Last Updated', // 显示最后的更新时间
    sidebarDepth: 3, // 侧边栏的目录深度
    repo: 'https://github.com/Tamray/myblog', // 源码地址
    repoLabel: '查看源码', // (查看源码的)组件名称
    docsBranch: 'master', // git 源仓库 仓库分支
    docsDir: 'docs', // 仓库下的文件夹
    editLinks: true, // 编辑链接
    editLinkText: '修改页面', // 链接字段
    serviceWorker: {
      updatePopup: {
        // 刷新内容的弹窗
        message: '发现新内容',
        buttonText: '刷新'
      }
    },
    smoothScroll: true, //页面滚动效果
    sidebar: { // 侧边栏
      // '/class1/class11/': class11,
      // '/class1/class12/': class12,
      // '/class2/': class2
    },
    sidebarDepth: 2
    }
  }