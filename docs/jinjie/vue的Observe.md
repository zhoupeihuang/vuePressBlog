---


---

<p><code>observer</code>是Vue核心中最重要的一个模块（个人认为），能够实现视图与数据的响应式更新，底层全凭<code>observer</code>的支持。</p>
<p><code>observer</code>模块在Vue项目中的代码位置是<code>src/core/observer</code>，模块共分为这几个部分：</p>
<ul>
<li>
<p><code>Observer</code>: 数据的观察者，让数据对象的读写操作都处于自己的监管之下</p>
</li>
<li>
<p><code>Watcher</code>: 数据的订阅者，数据的变化会通知到<code>Watcher</code>，然后由<code>Watcher</code>进行相应的操作，例如更新视图</p>
</li>
<li>
<p><code>Dep</code>:  <code>Observer</code>与<code>Watcher</code>的纽带，当数据变化时，会被<code>Observer</code>观察到，然后由<code>Dep</code>通知到<code>Watcher</code></p>
</li>
</ul>
<p>示意图如下：</p>
<p><img src="https://i.loli.net/2021/04/23/tlgdCRGHMXQjeYy.png" alt="image.png"></p>
<h2 id="observer">Observer</h2>
<p><code>Observer</code>类定义在<code>src/core/observer/index.js</code>中，先来看一下<code>Observer</code>的构造函数</p>
<pre><code>constructor (value: any) {
  this.value = value
  this.dep = new Dep()
  this.vmCount = 0
  def(value, '__ob__', this)
  if (Array.isArray(value)) {
      const augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}
</code></pre>
<p><code>value</code>是需要被观察的数据对象，在构造函数中，会给<code>value</code>增加<code>__ob__</code>属性，作为数据已经被<code>Observer</code>观察的标志。如果<code>value</code>是数组，就使用<code>observeArray</code>遍历<code>value</code>，对<code>value</code>中每一个元素调用<code>observe</code>分别进行观察。如果<code>value</code>是对象，则使用<code>walk</code>遍历<code>value</code>上每个key，对每个key调用<code>defineReactive</code>来获得该key的<code>set/get</code>控制权。</p>
<p>解释下上面用到的几个函数的功能：</p>
<ul>
<li>
<p><code>observeArray</code>: 遍历数组，对数组的每个元素调用<code>observe</code></p>
</li>
<li>
<p><code>observe</code>: 检查对象上是否有<code>__ob__</code>属性，如果存在，则表明该对象已经处于<code>Observer</code>的观察中，如果不存在，则<code>new Observer</code>来观察对象（其实还有一些判断逻辑，为了便于理解就不赘述了）</p>
</li>
<li>
<p><code>walk</code>: 遍历对象的每个key，对对象上每个key的数据调用<code>defineReactive</code></p>
</li>
<li>
<p><code>defineReactive</code>: 通过<code>Object.defineProperty</code>设置对象的key属性，使得能够捕获到该属性值的<code>set/get</code>动作。一般是由<code>Watcher</code>的实例对象进行<code>get</code>操作，此时<code>Watcher</code>的实例对象将被自动添加到<code>Dep</code>实例的依赖数组中，在外部操作触发了<code>set</code>时，将通过<code>Dep</code>实例的<code>notify</code>来通知所有依赖的<code>watcher</code>进行更新。</p>
</li>
</ul>
<p>如果不太理解上面的文字描述可以看一下图：</p>
<p><img src="https://i.loli.net/2021/04/23/kxAHN8O5Kp36Xvh.png" alt="image.png"></p>
<h2 id="dep">Dep</h2>
<p><code>Dep</code>是<code>Observer</code>与<code>Watcher</code>之间的纽带，也可以认为<code>Dep</code>是服务于<code>Observer</code>的订阅系统。<code>Watcher</code>订阅某个<code>Observer</code>的<code>Dep</code>，当<code>Observer</code>观察的数据发生变化时，通过<code>Dep</code>通知各个已经订阅的<code>Watcher</code>。</p>
<p><code>Dep</code>提供了几个接口：</p>
<ul>
<li>
<p><code>addSub</code>: 接收的参数为<code>Watcher</code>实例，并把<code>Watcher</code>实例存入记录依赖的数组中</p>
</li>
<li>
<p><code>removeSub</code>: 与<code>addSub</code>对应，作用是将<code>Watcher</code>实例从记录依赖的数组中移除</p>
</li>
<li>
<p><code>depend</code>:  <code>Dep.target</code>上存放这当前需要操作的<code>Watcher</code>实例，调用<code>depend</code>会调用该<code>Watcher</code>实例的<code>addDep</code>方法，<code>addDep</code>的功能可以看下面对<code>Watcher</code>的介绍</p>
</li>
<li>
<p><code>notify</code>: 通知依赖数组中所有的<code>watcher</code>进行更新操作</p>
</li>
</ul>
<h2 id="watcher">Watcher</h2>
<p><code>Watcher</code>是用来订阅数据的变化的并执行相应操作（例如更新视图）的。<code>Watcher</code>的构造器函数定义如下：</p>
<pre><code>constructor (vm, expOrFn, cb, options) {
  this.vm = vm
  vm._watchers.push(this)
  // options
  if (options) {
    this.deep = !!options.deep
    this.user = !!options.user
    this.lazy = !!options.lazy
    this.sync = !!options.sync
  } else {
    this.deep = this.user = this.lazy = this.sync = false
  }
  this.cb = cb
  this.id = ++uid // uid for batching
  this.active = true
  this.dirty = this.lazy // for lazy watchers
  this.deps = []
  this.newDeps = []
  this.depIds = new Set()
  this.newDepIds = new Set()
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : ''
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn
  } else {
    this.getter = parsePath(expOrFn)
    if (!this.getter) {
      this.getter = function () {}
      process.env.NODE_ENV !== 'production' &amp;&amp; warn(
        `Failed watching path: "${expOrFn}" ` +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      )
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get()
}
</code></pre>
<p>参数中，<code>vm</code>表示组件实例，<code>expOrFn</code>表示要订阅的数据字段（字符串表示，例如<code>a.b.c</code>）或是一个要执行的函数，<code>cb</code>表示watcher运行后的回调函数，<code>options</code>是选项对象，包含<code>deep</code>、<code>user</code>、<code>lazy</code>等配置。</p>
<p><code>watcher</code>实例上有这些方法：</p>
<ul>
<li>
<p><code>get</code>: 将<code>Dep.target</code>设置为当前<code>watcher</code>实例，在内部调用<code>this.getter</code>，如果此时某个被<code>Observer</code>观察的数据对象被取值了，那么当前<code>watcher</code>实例将会自动订阅数据对象的<code>Dep</code>实例</p>
</li>
<li>
<p><code>addDep</code>: 接收参数<code>dep</code>(Dep实例)，让当前<code>watcher</code>订阅<code>dep</code></p>
</li>
<li>
<p><code>cleanupDeps</code>: 清除<code>newDepIds</code>和<code>newDep</code>上记录的对dep的订阅信息</p>
</li>
<li>
<p><code>update</code>: 立刻运行<code>watcher</code>或者将<code>watcher</code>加入队列中等待统一flush</p>
</li>
<li>
<p><code>run</code>: 运行<code>watcher</code>，调用<code>this.get()</code>求值，然后触发回调</p>
</li>
<li>
<p><code>evaluate</code>: 调用<code>this.get()</code>求值</p>
</li>
<li>
<p><code>depend</code>: 遍历<code>this.deps</code>，让当前<code>watcher</code>实例订阅所有<code>dep</code></p>
</li>
<li>
<p><code>teardown</code>: 去除当前<code>watcher</code>实例所有的订阅</p>
</li>
</ul>
<h2 id="array-methods">Array methods</h2>
<p>在<code>src/core/observer/array.js</code>中，Vue框架对数组的<code>push</code>、<code>pop</code>、<code>shift</code>、<code>unshift</code>、<code>sort</code>、<code>splice</code>、<code>reverse</code>方法进行了改造，在调用数组的这些方法时，自动触发<code>dep.notify()</code>，解决了调用这些函数改变数组后无法触发更新的问题。在Vue的官方文档中对这个也有说明：<a href="http://cn.vuejs.org/v2/guide/list.html#">http://cn.vuejs.org/v2/guide/list.html#变异方法</a></p>

