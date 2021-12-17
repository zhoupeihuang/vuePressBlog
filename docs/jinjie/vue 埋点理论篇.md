业界的埋点方案主要分为以下三类：

代码埋点：在需要埋点的节点调用接口，携带数据上传。如百度统计等；  
可视化埋点：使用可视化工具进行配置化的埋点，即所谓的「无痕埋点」，前端在页面加载时，可以读取配置数据，自动调用接口进行埋点。如开源的Mixpanel;  
无埋点：前端自动采集全部事件并上报埋点数据。如国内的神策数据等；  
在当时排期紧凑，人力紧缺的情况下，显然不允许我们去开发可视化埋点方案和无埋点方案，所以只能采取代码埋点方案。

  
  
##### 命令式埋点

命令式埋点，顾名思义，开发者需要手动在需要埋点的节点处进行埋点。如点击按钮或链接后的回调函数、页面ready时进行请求的发送。大家肯定都很熟悉这样的代码：

```
// 页面加载时发送埋点请求
$(document).ready(function(){
   // ... 这里存在一些业务逻辑
   sendRequest(params);
});
// 按钮点击时发送埋点请求
$('button').click(function(){
   // ... 这里存在一些业务逻辑
   sendRequest(params);
});

```

可以很容易发现，这样的做法很有可能会将埋点代码侵入业务代码，这使整体业务代码变得繁琐，容易出错，且后续代码会愈加膨胀，难以维护。所以，我们需要让埋点的代码与具体的业务逻辑解耦，即 声明式埋点 ，从而提高埋点的效率和代码的可维护性。

##### 声明式埋点

理论上，声明式埋点只需要关注两个问题：

需要埋点的DOM节点；  
所需携带的数据  
因此，可以很快想出一个声明式埋点的方法：

// key表示埋点的唯一标识；act表示埋点方式  
<button data-stat="{key:'111', act: 'click'}">埋点</button>  
那么可以去遍历DOM树，找到 [data-stat] 的节点，给这个button绑上click事件，把这些参数在回调函数中通过请求发出去。

在DOM节点(html)上声明埋点，与业务逻辑（通常在Javascript文件中）就解耦了。调用也很方便。

看起来很美，但这样就能解决问题了吗？显然是不够的。还需要解决以下问题：

遍历DOM树的时机问题，一个简单的例子，一个表格的行数据是通过异步加载，而表格行中的操作按钮需要埋点，那么在DOM ready的时候去遍历，显然是无法找到的  
绑定埋点事件次数的问题，怎样保证埋点事件不会被重复绑定到元素上，一次操作发了N个埋点请求?  
如何处理特有的埋点行为，如页面展现埋点，区域展现埋点?  
如何在解绑时，销毁已绑定的事件?

1.自定义指令实现埋点数据统计  
在项目中通常需要做数据埋点，这个时候，使用自定义指令将会变非常简单

在项目入口文件 main.js 中配置我们的自定义指令

// 坑位埋点指令

```
Vue.directive('stat', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const data = binding.value;
      let prefix = 'store';
      if (OS.isAndroid || OS.isPhone) {
        prefix = 'mall';
      }
      analytics.request({
        ty: `${prefix}_${data.type}`,
        dc: data.desc || ''
      }, 'n');
    }, false);
  }
});

```

2.使用路由拦截统计页面级别的 PV  
由于第一次在单页应用中尝试数据埋点，在项目上线一个星期之后，数据统计后台发现，首页的 PV 远远高于其它页面，数据很不正常。后来跟数据后台的人沟通询问他们的埋点统计原理之后，才发现其中的问题所在。

_传统应用，一般都在页面加载的时候，会有一个异步的 js 加载，就像百度的统计代码类似，所以我们每个页面的加载的时候，都会统计到数据；然而在单页应用，页面加载初始化只有一次，所以其它页面的统计数据需要我们自己手动上报_

**解决方案**

使用 `vue-router` 的 `beforeEach` 或者 `afterEach` 钩子上报数据，具体使用哪个最好是根据业务逻辑来选择。

```
const analyticsRequest = (to, from) => {
  // 只统计页面跳转数据，不统计当前页 query 不同的数据
  // 所以这里只使用了 path, 如果需要统计 query 的，可以使用 to.fullPath
  if (to.path !== from.path) {
    analytics.request({
      url: `${location.protocol}//${location.host}${to.path}`
    });
  }
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 这里做登录等前置逻辑判断
    // 判断通过之后，再上报数据
    ...
    analyticsRequest(to, from);
  } else {
    // 不需要判断的，直接上报数据
    analyticsRequest(to, from);
    next();
  }
});

```

在组件中使用我们的自定义指令

  

![](//upload-images.jianshu.io/upload_images/72150-fad130aa4655a7e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/814/format/webp)

image.png

##### 基于 jquery + widget 的老项目，

那么在这些项目中的DOM操作是jquery甚至原生DOM API来实现，Vue的自定义指令就无法工作

## 基于MutationObserver API的Mixin

MutationObserver是在DOM3标准中提出的标准API，提供让开发者感知到在某一个DOM节点变更的能力。可以监听以下场景：

-   childList: 目标节点的子节点插入删除引起的变更
    
-   attributes: 目标节点属性改变引起的变更
    
-   characterData: 目标节点的文本节点改变引起的变更，如通过appendData()等
    
-   subtree: 目标节点的子孙节点改变引起的变更
    
-   attributeOldValue：当attribute监听被设定为true时，可以记录改变前的属性值
    
-   characterDataOldValue：当characterData监听被设定为true时，可以记录改变前的属性值
    
-   attributeFilter：可以设定需要监听的属性列表
    

但为了保证MutationObserver可以在所有浏览器上正常工作，我们仍然引入了这个API的polyfill,详情可见[这里](https://link.jianshu.com?t=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Fmegawac%2FMutationObserver.js)。

在此能力的前提下，我们就可以在任意的DOM操作下触发Vue进行重新解析指令。

我们将 MutationObserver 封装进一个 Vue mixin , 非Vue应用的业务代码只需要引入这个mixin，这样也可以很好地解耦。

详细的实现原理可以见以下伪代码：

```
let observer;
export default {
  ready() {
    // 开启监听
    observer = new MutationObserver(mutations => {
      this.$compile(this.$el);
    });
    observer.observe(this.$el, config);
  },
  destroyed() {
    // 清理工作
    observer.disconnect();
    observer.takeRecords();
  }
}

```

参考：  
[https://segmentfault.com/a/1190000011066120](https://link.jianshu.com?t=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000011066120)  
[https://zhuanlan.zhihu.com/p/27659302](https://link.jianshu.com?t=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F27659302)  
[http://webcomponents.org/polyfills/](https://link.jianshu.com?t=http%3A%2F%2Fwebcomponents.org%2Fpolyfills%2F)  
[https://www.zhihu.com/question/67951942/answer/259125217](https://link.jianshu.com?t=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F67951942%2Fanswer%2F259125217)

  
  
作者：penjoyer  
链接：https://www.jianshu.com/p/7bc63935a570  
来源：简书  
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTQxNTQ4NTQ1XX0=
-->