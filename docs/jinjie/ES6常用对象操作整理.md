---


---

<h1 id="es6常用对象操作整理"><a href="https://www.cnblogs.com/woodk/p/6564055.html">ES6常用对象操作整理</a></h1>
<h2 id="const">const</h2>
<p>简单类型数据常量</p>
<p>// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。<br>
const PI = 3.1415926;<br>
console.log(PI)</p>
<p>对象常量</p>
<p>const foo = Object.freeze({}); // 常规模式时，下面一行不起作用； // 严格模式时，该行会报错<br>
foo.prop = 123;</p>
<p>除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。</p>
<p>var constantize = (obj) =&gt; {<br>
Object.freeze(obj);<br>
Object.keys(obj).forEach( (key, i) =&gt; { if ( typeof obj[key] === ‘object’ ) {<br>
constantize( obj[key] );<br>
}<br>
});<br>
};</p>
<h2 id="属性的简洁表示">属性的简洁表示</h2>
<p>对象，函数都可以简写</p>
<p>var birth = ‘2000/01/01’; var Person = {<br>
name: ‘张三’, //等同于birth: birth<br>
birth, // 等同于hello: function ()…<br>
hello() { console.log(‘我的名字是’, <a href="http://this.name">this.name</a>); }<br>
};</p>
<p>CommonJS模块输出变量，就非常合适使用简洁写法。</p>
<p>var ms = {}; function getItem(key) { return key in ms ? ms[key] : null;<br>
} function setItem(key, value) {<br>
ms[key] = value;<br>
} function clear() {<br>
ms = {};<br>
}</p>
<p>module.exports = {<br>
getItem,<br>
setItem,<br>
clear<br>
}; // 等同于<br>
module.exports = {<br>
getItem: getItem,<br>
setItem: setItem,<br>
clear: clear<br>
};</p>
<h2 id="object.is"><a href="http://Object.is">Object.is</a>()</h2>
<p>+0 === -0 //true<br>
NaN === NaN // false<br>
<a href="http://Object.is">Object.is</a>(+0, -0) // false<br>
<a href="http://Object.is">Object.is</a>(NaN, NaN) // true</p>
<h2 id="object.assign">Object.assign()</h2>
<p>用于对象的合并，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。</p>
<p>var target = { a: 1 }; var source1 = { b: 2 }; var source2 = { c: 3 };</p>
<p>Object.assign(target, source1, source2);<br>
target // {a:1, b:2, c:3}</p>
<h3 id="注意点：">注意点：</h3>
<p>Object.assign 方法实行的是浅拷贝</p>
<p>var obj1 = {a: {b: 1}}; var obj2 = Object.assign({}, obj1);</p>
<p>obj1.a.b = 2;<br>
obj2.a.b // 2</p>
<h3 id="常见用途：">常见用途：</h3>
<p>（1）为对象添加属性</p>
<p>class Point {<br>
constructor(x, y) {<br>
Object.assign(this, {x, y});<br>
}<br>
}</p>
<p>（2）为对象添加方法</p>
<p>Object.assign(SomeClass.prototype, {<br>
someMethod(arg1, arg2) {<br>
···<br>
},<br>
anotherMethod() {<br>
···<br>
}<br>
}); // 等同于下面的写法<br>
SomeClass.prototype.someMethod = function (arg1, arg2) {<br>
···<br>
};<br>
SomeClass.prototype.anotherMethod = function () {<br>
···<br>
};</p>
<p>（3）克隆对象</p>
<p>function clone(origin) { return Object.assign({}, origin);<br>
}</p>
<p>不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。</p>
<p>想要保持继承链，可以采用下面的代码。</p>
<p>function clone(origin) {<br>
let originProto = Object.getPrototypeOf(origin); return Object.assign(Object.create(originProto), origin);<br>
}</p>
<p>（4）合并多个对象</p>
<p>const merge = (target, …sources) =&gt; Object.assign(target, …sources);</p>
<p>const merge = (…sources) =&gt; Object.assign({}, …sources);</p>
<p>（5）为属性指定默认值</p>
<p>const DEFAULTS = {<br>
logLevel: 0,<br>
outputFormat: ‘html’ }; function processContent(options) {<br>
options = Object.assign({}, DEFAULTS, options);<br>
console.log(options); // …<br>
}</p>
<p>由于存在深拷贝的问题，<code>DEFAULTS</code>对象和<code>options</code>对象的所有属性的值，最好都是简单类型，不要指向另一个对象。</p>
<h2 id="属性的遍历">属性的遍历</h2>
<p>ES6一共有5种方法可以遍历对象的属性。</p>
<p><strong>（1）for…in</strong></p>
<p><code>for...in</code>循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。</p>
<p><strong>（2）Object.keys(obj)</strong></p>
<p><code>Object.keys</code>返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。</p>
<p><strong>（3）Object.getOwnPropertyNames(obj)</strong></p>
<p><code>Object.getOwnPropertyNames</code>返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。</p>
<p><strong>（4）Object.getOwnPropertySymbols(obj)</strong></p>
<p><code>Object.getOwnPropertySymbols</code>返回一个数组，包含对象自身的所有Symbol属性。</p>
<p><strong>（5）Reflect.ownKeys(obj)</strong></p>
<p><code>Reflect.ownKeys</code>返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。</p>
<p>（对象自身属性遍历）：</p>
<p>for (var i in data) { if (data.hasOwnProperty(i) === true) {<br>
console.log(data[i])<br>
}<br>
}</p>
<h2 id="object.keys，object.values，object.entries">Object.keys()，Object.values()，Object.entries()</h2>
<p>ES5 引入了<code>Object.keys</code>方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。</p>
<p>var obj = { foo: ‘bar’, baz: 42 };<br>
Object.keys(obj) // [“foo”, “baz”]</p>
<p>ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for…of循环使用。</p>
<p>var obj = { foo: ‘bar’, baz: 42 };<br>
Object.values(obj) // [“bar”, 42]</p>
<h2 id="对象的扩展运算符">对象的扩展运算符</h2>
<p><strong>（1）解构赋值</strong></p>
<p>let { x, y, …z } = { x: 1, y: 2, a: 3, b: 4 };<br>
x // 1<br>
y // 2<br>
z // { a: 3, b: 4 }</p>
<p><strong>（2）扩展运算符</strong></p>
<p>let z = { a: 3, b: 4 };<br>
let n = { …z };<br>
n // { a: 3, b: 4 }</p>
<h2 id="null-传导运算符">Null 传导运算符</h2>
<p>编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取<code>message.body.user.firstName</code>，安全的写法是写成下面这样。</p>
<p>const firstName = (message &amp;&amp; message.body &amp;&amp; message.body.user &amp;&amp; message.body.user.firstName) || ‘default’;</p>
<p>这样的层层判断非常麻烦，因此现在有一个<a href="https://github.com/claudepache/es-optional-chaining">提案</a>，引入了“Null 传导运算符”（null propagation operator）<code>?.</code>，简化上面的写法。</p>
<p>const firstName = message?.body?.user?.firstName || ‘default’;</p>

