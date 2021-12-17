---


---

<h1 id="vue-的双向绑定原理">Vue 的双向绑定原理</h1>
<p>实现mvvm的双向绑定，是采用<strong>数据劫持结合发布者-订阅者</strong>模式的方式，通过<strong>Object.defineProperty()<strong>来劫持各个属性的setter，getter，在数据变动时发布消息给</strong>订阅者</strong>，触发相应的监听回调。就必须要实现以下几点：</p>
<p>1、实现一个数据监听器<strong>Observer</strong>，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者<br>
2、实现一个指令解析器<strong>Compile</strong>，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数<br>
3、实现一个<strong>Watcher</strong>，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图</p>
<p><img src="https://i.loli.net/2021/04/22/QdSK43rVRPJCiyX.png" alt="image.png"></p>
<p><strong>ECMScript</strong>中有两种属性<br>
<strong>①.数据属性</strong>：包含一数据值的位置，属性：<br>
<strong>Configurable</strong>： 能否delete、修改、或者把属性修改成访问器属性 （默认值：true）<br>
<strong>Enumberable</strong>： 能否通过for in 循环返回属性 （true）<br>
<strong>Writable</strong>： 能否修改属性值 （true）<br>
<strong>Value</strong>： 属性的数据值（undefined）<br>
要修改属性默认的特性，必须使用ES5里的Object.defineProperty()方法，接收三个参数：属性所在对象、属性名、描述符对象（属性必须是以上四个值的一个或多个）</p>
<p><strong>②.访问器属性</strong>：只包含一对getter（读取调用，返回有效值）和setter（写入调用）函数<br>
访问器属性特性：<br>
<strong>Configurable</strong> (同上，默认true )<br>
<strong>Enumberable</strong> （true）<br>
<strong>Get</strong> ：读取属性是调用的函数，（undefined）<br>
<strong>Set</strong>： 写入属性时调用的函数</p>
<blockquote>
<p><em>注意： 访问器不能直接定义，必须使用Object.defineProperty（）来定义</em></p>
</blockquote>
<p>实现数据双向绑定的核心就是</p>
<blockquote>
<p><strong>利用为每一个属性都创建了订阅者的实例对象, 以便观察, getter函数里面返回一个value值,在setter函数中写入修改后的值并调用update方法更新视图的数据值</strong></p>
</blockquote>
<p>Object.defineProperty( 目标对象，属性，描述)<br>
定义对象上属性的一些特性</p>
<p><img src="https://i.loli.net/2021/04/22/U3Snx56gCs9e7LI.png" alt="image.png"></p>
<p>————————————————</p>
<p>原文链接：<a href="https://blog.csdn.net/qq_40072782/article/details/105759487">https://blog.csdn.net/qq_40072782/article/details/105759487</a></p>

