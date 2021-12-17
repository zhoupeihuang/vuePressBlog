

# vue router.beforeEach 简介
## 路由守卫


    const router=new VueRouter({ ... })

	router.beforeEach((to,from,next)=>{ ... })
	

每个守卫方法接收三个参数：

**to: Route**: 即将要进入的目标路由对象

**from: Route**: 当前导航正要离开的路由

**next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 next 方法的调用参数。

  
   

在前端路由跳转中，路由跳转前都是会经过beforeEach，而beforeEach可以通过next来控制到底去哪个路由。根据这个特性我们就可以在beforeEach中设置一些条件来控制路由的重定向。常见的使用场景有：

 1. 验证用户是否登录（若未登录，且当前非登录页面，则自动重定向登录页面）； 
 2. 用户权限；
 3. 用户输入的路路径是否存在，不存在的情况下如何处理，重定向到哪个页面。此处呢我使用一个简单的例子：当用户输入的路径不存在的情况下，将其重定向到‘/’路径来说明beforeEach是如何控制路由的。话不多说，直接看下边如何实现的（这里我以创建一个名为router-be的项目为例）。

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg1MjIwMTY5Nl19
-->