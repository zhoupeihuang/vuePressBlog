---


---

<h1 id="vue3-学习文档1">vue3 学习文档1</h1>
<h2 id="必须要理解的5个-tree-shaking-composition--fragment-teleport-suspense">必须要理解的5个 tree-shaking composition  Fragment Teleport Suspense</h2>
<p>vite</p>
<p><strong>Tree-shaking</strong> 抖动树  类似树抖动身子，抖掉没有用的树叶，只留下果实。<br>
<em>**tree shaking</em>  是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)**。</p>
<blockquote>
<p>拓展阅读 它依赖于 ES2015<br>
模块系统中的<a href="http://exploringjs.com/es6/ch_modules.html#static-module-structure">静态结构特性</a>，例如<br>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import"><code>import</code></a><br>
和<br>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export"><code>export</code></a>。这个术语和概念实际上是兴起于<br>
ES2015 模块打包工具  <a href="https://github.com/rollup/rollup">rollup</a>。</p>
<p>新的 webpack 4 正式版本，扩展了这个检测能力，通过  <code>package.json</code>  的  <code>"sideEffects"</code><br>
属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 “pure(纯的 ES2015<br>
模块)”，由此可以安全地删除文件中未使用的部分。</p>
</blockquote>
<h2 id="composition">composition</h2>
<blockquote>
<p>拓展阅读<br>
commposition 作用之一就是 防止污染 组件当中的this [也就是 vue原型 ]<br>
另外它的语法更类似与ES6 的 class  【上class 下 composition】</p>
</blockquote>
<h4 id="class-语法">class 语法</h4>
<pre><code>class Animal { 
//构造方法  
    constructor(_name_){ 
	    //属性 name 
		    this.name = _name_;  
        } 
        //自定义方法getName 
        getName(){ 
            return this.name;  
        }  
    }
    /*---------------------使用-------------------------*/
    //创建一个Animal实例对象dog  
	 let _dog_ = new Animal('dog');  
	 _dog_.name; //结果：dog  
	 _dog_.getName(); //结果：This is a dog
</code></pre>
<h4 id="commposition--语法">commposition  语法</h4>
<pre><code>&lt;template&gt;
	&lt;h1&gt;{{ state.count }}*2&lt;/h1&gt;
	&lt;h2&gt;{{ double }}&lt;/h2&gt;
	&lt;h3&gt;{{ num }}&lt;/h3&gt;
	&lt;button  @click="add"&gt;累加&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt;
//Composition API将组件属性公开为函数，因此第一步是导入我们需要的函数。
//在案例中，我们需要用ref创建响应式引用、计算属性使用computed、用onMounted访问装载后的生命周期钩子。
import { reactive, computed, ref, onMounted } from  "vue";
/*
它只是一个函数，它将属性和函数返回到模板。我们在这里声明所有的响应式属性、计算属性、观察者和
生命周期钩子，然后返回它们，以便它们可以在模板中使用。我们没有在setup函数返回的内容将在模板中
不可用。
*/	  
export  default {
	name: "App",
	setup() {
	// reactive负责复杂数据结构
	const state =  reactive({
			count: 1,
		});
	// ref可以把基本的数据结构包装成响应式
	// 理解为 默认值为 num.value = 2
	/*
	ref函数声明称为count的响应式属性。它可以包装任何原始类型或对象，并返回它的响应式引用。
	传递元素的值将保留在创建引用的值属性中。例如，如果要访问count引用的值，
	则需要扩展请求count.value.
	*/
	const num =  ref(2);
	// 我们在声明计算属性double和add函数时所做的事 
	// 申明元素double的值为 state.count的2倍
	const double =  computed(() =&gt; state.count *  2);
	onMounted(() =&gt; {
	// 初始化打印 num
		console.log("mouted");
		console.log(num);
	});
	function  add() {
		state.count++;
		// ref 以后内部会自动有value 属性
		num.value +=  10;
	}
	// 类似 export { state,add,double,num }
	// 在最后，我们返回state,num和double属性与add方法，使它们在模板中可用。
	return {
		state,
		add,
		double,
		num,
	};
  }	
};
&lt;/script&gt;
</code></pre>
<h4 id="composition--优缺点--能干啥？">composition  优缺点 &amp; 能干啥？</h4>
<p>compositon 可以在其他组件之间共享一些代码 主要是实现 <strong>混入</strong> 和 <strong>范围插槽</strong><br>
<strong>混入</strong></p>
<h5 id="js引入式">js引入式</h5>
<pre><code>import CounterMixin from './mixins/counter'
export default{
    mixins:[CounterMixin]
}
</code></pre>
<h5 id="组件引入式">组件引入式</h5>
<pre><code>&lt;template&gt;
	&lt;counter v-slot="{ state,num,double,add}"&gt;
		{{state.count}}
		&lt;button @click="add"&gt;Increment&lt;/button&gt;
	&lt;/counter&gt;
&lt;/template&gt;
</code></pre>
<blockquote>
<p>拓展阅读<br>
mixins 是多继承，extends 是单继承<br>
mixins:[爸爸1，爸爸2，隔壁老王]   &lt; ==== &gt; extends:亲爹<br>
优先调用mixins和extends继承的父类，extends触发的优先级更高<br>
extends &lt; mixins &lt; 组件， 组件会覆盖mixins, mixins会覆盖extends<br>
mixins data覆盖 生命周期不覆盖 , 对于生命周期会先调用 extends ,然后mixins ，然后组件</p>
</blockquote>
<p><strong>缺点</strong><br>
混入最大的缺点:是我们不知道它给我们的组件增加了什么。它不仅难以解释，而且还可能导致与现有属性和函数的名称冲突。</p>

