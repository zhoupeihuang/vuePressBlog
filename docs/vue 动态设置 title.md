


> 动态设置title 

    // **main.js**
    // 动态设置 title
	router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
		if (to.meta.title) {
			document.title = to.meta.title
		}
		next()
	})
**router.js**

    {
		path:  'p1',
		name:  'p1',
		component: () => import('@/views/p1/index'),
		meta: {  title:  '你的页面的title',   icon:  'table' }
	},

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTExNzg4ODM4OCwtMTgxMzk1OTA2XX0=
-->