---


---

<h1 id="vue-埋点">vue 埋点</h1>
<p>首先，Vue.directive要在<strong>实例初始化之前</strong>，不然会报错，还有，定义的指令<strong>不支持驼峰式</strong>写法，也会报下面同样的错，虽然在源码中没有找到在哪里统一处理大小写，但是在有关directive的方法中捕捉到的指令命名统一变为小写,所以，还是用’-‘或者’_'分割吧。</p>
<pre><code>vue.js:491 [Vue warn]: Failed to resolve directive: xxx
</code></pre>
<pre><code>Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})
</code></pre>
<p><a href="http://doc.vue-js.com/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0"></a></p>
<h2 id="钩子函数">钩子函数</h2>
<p>指令定义函数提供了几个钩子函数（可选）：</p>
<ul>
<li>
<p><code>bind</code>: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。</p>
</li>
<li>
<p><code>inserted</code>: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。</p>
</li>
<li>
<p><code>update</code>: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。</p>
</li>
<li>
<p><code>componentUpdated</code>: 被绑定元素所在模板完成一次更新周期时调用。</p>
</li>
<li>
<p><code>unbind</code>: 只调用一次， 指令与元素解绑时调用。</p>
</li>
</ul>
<p>接下来我们来看一下钩子函数的参数 (包括  <code>el</code>，<code>binding</code>，<code>vnode</code>，<code>oldVnode</code>) 。</p>
<p><a href="http://doc.vue-js.com/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0"></a></p>
<h2 id="钩子函数参数">钩子函数参数</h2>
<p>钩子函数被赋予了以下参数：</p>
<ul>
<li><strong>el</strong>: 指令所绑定的元素，可以用来直接操作 DOM 。</li>
<li><strong>binding</strong>: 一个对象，包含以下属性：
<ul>
<li><strong>name</strong>: 指令名，不包括  <code>v-</code>  前缀。</li>
<li><strong>value</strong>: 指令的绑定值， 例如：  <code>v-my-directive="1 + 1"</code>, value 的值是  <code>2</code>。</li>
<li><strong>oldValue</strong>: 指令绑定的前一个值，仅在  <code>update</code>  和  <code>componentUpdated</code>  钩子中可用。无论值是否改变都可用。</li>
<li><strong>expression</strong>: 绑定值的字符串形式。 例如  <code>v-my-directive="1 + 1"</code>  ， expression 的值是  <code>"1 + 1"</code>。</li>
<li><strong>arg</strong>: 传给指令的参数。例如  <code>v-my-directive:foo</code>， arg 的值是  <code>"foo"</code>。</li>
<li><strong>modifiers</strong>: 一个包含修饰符的对象。 例如：  <code>v-my-directive.foo.bar</code>, 修饰符对象 modifiers 的值是  <code>{ foo: true, bar: true }</code>。</li>
</ul>
</li>
<li><strong>vnode</strong>: Vue 编译生成的虚拟节点，查阅  <a href="http://doc.vue-js.com/v2/api/#VNode%E6%8E%A5%E5%8F%A3">VNode API</a>  了解更多详情。</li>
<li><strong>oldVnode</strong>: 上一个虚拟节点，仅在  <code>update</code>  和  <code>componentUpdated</code>  钩子中可用。</li>
</ul>
<p>除了  <code>el</code>  之外，其它参数都应该是只读的，尽量不要修改他们。如果需要在钩子之间共享数据，建议通过元素的  <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset">dataset</a>  来进行。</p>
<p>一个使用了这些参数的自定义钩子样例：</p>

