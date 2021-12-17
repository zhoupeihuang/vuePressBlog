---


---

<h1 id="vue3-为什么使用proxy">vue3 为什么使用proxy?</h1>
<p>为什么在Vue3.0 采用了Proxy，抛弃了Object.defineProperty？<br>
Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添<br>
加元素，不能实时响应；<br>
需要手动更新   <strong>this.$forceupdate</strong><br>
Object.defineProperty 只能劫持对象的属性，从而需要对每个对象，每个<br>
属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy 可以劫持整个对<br>
象，并返回一个新的对象。<br>
Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。</p>

