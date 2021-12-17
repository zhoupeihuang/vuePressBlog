---


---

<h1 id="vue模板渲染--compile">vue模板渲染–compile</h1>
<p><a href="https://www.jianshu.com/u/c1f6f3d51f0a">指尖跳动</a>关注</p>
<p>模板渲染过程在实际使用vue的过程可能并不需要太深理解，但就vue来说，这些底层思想可以更好地让我们理解这个框架，以及了解为什么Vue的API要如此设计…</p>
<p>vue2+与vue1+的模板渲染过程完全不同，vue1使用的是<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDocumentFragment">DocumentFragment API</a>，具体就不介绍了（可以直接跳到MDN去了解），而vue2开始则使用了Virtual DOM，基于Virtual DOM，vue2支持了服务端渲染SSR，以及JSX语法。介绍渲染流程之前，先说明两个数据结构：<strong>抽象语法树AST</strong>，以及<strong>VNode</strong>。</p>
<h2 id="ast（抽象语法树）">AST（抽象语法树）</h2>
<p><strong>AST 的全称是 Abstract Syntax Tree（抽象语法树）</strong>，是</p>
<blockquote>
<p>源代码的抽象语法结构的树状表现形式，计算机学科中编译原理的概念。而vue就是将模板代码映射为AST数据结构，进行语法解析</p>
</blockquote>
<p>。这里采用了flow的语法，<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fflow.org%2F">flow</a>是一个JS静态类型检查工具。<br>
在 Vue 中，ASTNode 分几种不同类型，关于 ASTNode 的定义在 flow/compile.js 里面，请看下图：</p>
<p><img src="https://i.loli.net/2021/04/22/fsWMSEVq2plKwLa.png" alt="image.png"></p>
<p>看一下 Vue 2.0 源码中  <a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.13%2Fflow%2Fcompiler.js%23L75-L172">AST 数据结构</a>  的定义：</p>
<pre class=" language-tsx"><code class="prism  language-tsx">declare type ASTNode = ASTElement | ASTText | ASTExpression
declare type ASTElement = { // 有关元素的一些定义
  type: 1;
  tag: string;
  attrsList: Array&lt;{ name: string; value: string }&gt;;
  attrsMap: { [key: string]: string | null };
  parent: ASTElement | void;
  children: Array&lt;ASTNode&gt;;
  //......
}
declare type ASTExpression = {
  type: 2;
  expression: string;
  text: string;
  tokens: Array&lt;string | Object&gt;;
  static?: boolean;
  // 2.4 ssr optimization
  ssrOptimizability?: number;
};
declare type ASTText = {
  type: 3;
  text: string;
  static?: boolean;
  isComment?: boolean;
  // 2.4 ssr optimization
  ssrOptimizability?: number;
};

</code></pre>
<p>我们用一个简单的例子来说明一下：</p>
<pre class=" language-xml"><code class="prism  language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>demo<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Latest Vue.js Commits<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>{{1 + 1}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

</code></pre>
<p>我们想一想这段代码会生成什么样的 AST 呢？</p>
<p><img src="https://i.loli.net/2021/04/22/bPxYRHJoCljvAtN.png" alt="image.png"></p>
<h2 id="vnode数据结构">VNODE数据结构</h2>
<p>VNODE就是vue中的虚拟dom节点，<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.13%2Fsrc%2Fcore%2Fvdom%2Fvnode.js%23L31-L64">VNODE 数据结构</a>  如下:</p>
<pre class=" language-kotlin"><code class="prism  language-kotlin"><span class="token keyword">constructor</span> <span class="token punctuation">(</span>
  tag<span class="token operator">?:</span> string<span class="token punctuation">,</span>
  <span class="token keyword">data</span><span class="token operator">?:</span> VNodeData<span class="token punctuation">,</span>
  children<span class="token operator">?:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  text<span class="token operator">?:</span> string<span class="token punctuation">,</span>
  elm<span class="token operator">?:</span> Node<span class="token punctuation">,</span>
  context<span class="token operator">?:</span> Component<span class="token punctuation">,</span>
  componentOptions<span class="token operator">?:</span> VNodeComponentOptions<span class="token punctuation">,</span>
  asyncFactory<span class="token operator">?:</span> Function
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>tag <span class="token operator">=</span> tag
  <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token keyword">data</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>children <span class="token operator">=</span> children
  <span class="token keyword">this</span><span class="token punctuation">.</span>text <span class="token operator">=</span> text
  <span class="token keyword">this</span><span class="token punctuation">.</span>elm <span class="token operator">=</span> elm
  <span class="token keyword">this</span><span class="token punctuation">.</span>ns <span class="token operator">=</span> undefined
  <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> context
  <span class="token keyword">this</span><span class="token punctuation">.</span>fnContext <span class="token operator">=</span> undefined
  <span class="token keyword">this</span><span class="token punctuation">.</span>fnOptions <span class="token operator">=</span> undefined
  <span class="token keyword">this</span><span class="token punctuation">.</span>fnScopeId <span class="token operator">=</span> undefined
  <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> <span class="token keyword">data</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">data</span><span class="token punctuation">.</span>key
  <span class="token keyword">this</span><span class="token punctuation">.</span>componentOptions <span class="token operator">=</span> componentOptions
  <span class="token keyword">this</span><span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> undefined
  <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> undefined
  <span class="token keyword">this</span><span class="token punctuation">.</span>raw <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>isStatic <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>isRootInsert <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>isComment <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>isCloned <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>isOnce <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>asyncFactory <span class="token operator">=</span> asyncFactory
  <span class="token keyword">this</span><span class="token punctuation">.</span>asyncMeta <span class="token operator">=</span> undefined
  <span class="token keyword">this</span><span class="token punctuation">.</span>isAsyncPlaceholder <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

</code></pre>
<p>真实DOM存在什么问题，为什么要用虚拟DOM</p>
<p>我们为什么不直接使用原生 DOM 元素，而是使用真实 DOM 元素的简化版 VNode，最大的原因就是 document.createElement 这个方法创建的真实 DOM 元素会带来性能上的损失。我们来看一个 document.createElement 方法的例子</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">let</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> k <span class="token keyword">in</span> div<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre>
<p>打开 console 运行一下上面的代码，会发现打印出来的属性多达 228 个，而这些属性有 90% 多对我们来说都是无用的。<strong>VNode 就是简化版的真实 DOM 元素，关联着真实的dom，比如属性elm，只包括我们需要的属性，并新增了一些在 diff 过程中需要使用的属性，例如 isStatic。</strong></p>
<h2 id="模板渲染流程">模板渲染流程</h2>
<p>先来一张图：</p>
<p><img src="https://i.loli.net/2021/04/22/xuoX3ZHthB7IcO8.png" alt="image.png"></p>
<p>首先从<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.1.10%2Fsrc%2Fentries%2Fweb-runtime-with-compiler.js%23L14-L67">$mount</a>开始，可以看到，mount其实就是拿到了html模板作为template，然后将这个template通过compileToFunctions方法编译成render函数：</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>NODE_ENV <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">'compile'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> staticRenderFns <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">compileToFunctions</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">//对获取到的template进行编译</span>
    shouldDecodeNewlines<span class="token punctuation">,</span>
    shouldDecodeNewlinesForHref<span class="token punctuation">,</span>
    delimiters<span class="token punctuation">:</span> options<span class="token punctuation">.</span>delimiters<span class="token punctuation">,</span>
    comments<span class="token punctuation">:</span> options<span class="token punctuation">.</span>comments
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
  options<span class="token punctuation">.</span>render <span class="token operator">=</span> render
  options<span class="token punctuation">.</span>staticRenderFns <span class="token operator">=</span> staticRenderFns

  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>NODE_ENV <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">'compile end'</span><span class="token punctuation">)</span>
    <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>_name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> compile`</span></span><span class="token punctuation">,</span> <span class="token string">'compile'</span><span class="token punctuation">,</span> <span class="token string">'compile end'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre>
<p>那么这个<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.1.10%2Fsrc%2Fplatforms%2Fweb%2Fcompiler%2Findex.js%23L36-L84">compileToFunctions</a>做了什么呢？主要将 template 编译成 render 函数。首先读缓存，没有缓存就调用 compile 方法拿到 render 函数 的字符串形式，再通过 new Function 的方式生成 render 函数。</p>
<pre class=" language-cpp"><code class="prism  language-cpp"><span class="token comment">// 有缓存的话就直接在缓存里面拿</span>
<span class="token keyword">const</span> key <span class="token operator">=</span> options <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>delimiters
            <span class="token operator">?</span> <span class="token function">String</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>delimiters<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token keyword">template</span>
            <span class="token operator">:</span> <span class="token keyword">template</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> compiled <span class="token operator">=</span> <span class="token function">compile</span><span class="token punctuation">(</span><span class="token keyword">template</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span> <span class="token comment">// compile 后面会详细讲</span>
res<span class="token punctuation">.</span>render <span class="token operator">=</span> <span class="token function">makeFunction</span><span class="token punctuation">(</span>compiled<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token comment">//通过 new Function 的方式生成 render 函数并缓存</span>
<span class="token keyword">const</span> l <span class="token operator">=</span> compiled<span class="token punctuation">.</span>staticRenderFns<span class="token punctuation">.</span>length
res<span class="token punctuation">.</span>staticRenderFns <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Array</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>let i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span>staticRenderFns<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">makeFunction</span><span class="token punctuation">(</span>compiled<span class="token punctuation">.</span>staticRenderFns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> res<span class="token punctuation">)</span> <span class="token comment">// 记录至缓存中</span>

</code></pre>
<p>现在我们具体看一下<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.13%2Fsrc%2Fcompiler%2Findex.js">compile</a>方法，上文中提到 compile 方法就是将 template 编译成 render 函数 的字符串形式。</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">compile</span> <span class="token punctuation">(</span>
  template<span class="token punctuation">:</span> string<span class="token punctuation">,</span>
  options<span class="token punctuation">:</span> CompilerOptions
<span class="token punctuation">)</span><span class="token punctuation">:</span> CompiledResult <span class="token punctuation">{</span>
  <span class="token keyword">const</span> AST <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span> <span class="token comment">//1. parse</span>
  <span class="token function">optimize</span><span class="token punctuation">(</span>AST<span class="token punctuation">,</span> options<span class="token punctuation">)</span>  <span class="token comment">//2.optimize</span>
  <span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>AST<span class="token punctuation">,</span> options<span class="token punctuation">)</span> <span class="token comment">//3.generate</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    AST<span class="token punctuation">,</span>
    render<span class="token punctuation">:</span> code<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
    staticRenderFns<span class="token punctuation">:</span> code<span class="token punctuation">.</span>staticRenderFns
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre>
<p>这个函数主要有三个步骤组成：<strong>parse，optimize 和 generate</strong>，分别输出一个包含 AST，staticRenderFns 的对象和 render函数 的字符串。</p>
<blockquote>
<p><strong><a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.13%2Fsrc%2Fcompiler%2Fparser%2Findex.js">parse</a>  函数，主要功能是将 template字符串解析成 AST,采用了 jQuery 作者 John Resig 的 HTML Parser。前面定义了ASTElement的数据结构，parse 函数就是将template里的结构（指令，属性，标签等）转换为AST形式存进ASTElement中，最后解析生成AST。</strong></p>
<p><strong><a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.13%2Fsrc%2Fcompiler%2Foptimizer.js%23L21-L29">optimize</a>  函数（src/compiler/optimizer.js）主要功能就是标记静态节点，为后面 patch 过程中对比新旧 VNode 树形结构做优化。被标记为 static 的节点在后面的 diff 算法中会被直接忽略，不做详细的比较。</strong></p>
<p><strong><a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.13%2Fsrc%2Fcompiler%2Fcodegen%2Findex.js%23L40-L50">generate</a>  函数（src/compiler/codegen/index.js）主要功能就是根据 AST 结构拼接生成 render 函数的字符串。</strong></p>
</blockquote>
<h3 id="parse解析器">1. parse(解析器)</h3>
<blockquote>
<p>在 parse 函数中，我们先是定义了非常多的全局属性以及函数，然后调用了 parseHTML 这么一个函数，这也是 parse 最核心的函数，这个函数会不断的解析模板，填充 root，最后把 root(AST) 返回回去。</p>
</blockquote>
<p><strong>parseHTML</strong></p>
<p>在这个函数中，最重要的是 while 循环中的代码，而在解析过程中发挥重要作用的有这么几个正则表达式。</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">const</span> attribute <span class="token operator">=</span> <span class="token operator">/</span><span class="token operator">^</span>\s<span class="token operator">*</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">^</span>\s<span class="token string">"'&lt;&gt;\/=]+)(?:\s*(=)\s*(?:"</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">^</span><span class="token string">"]*)"</span><span class="token operator">+</span><span class="token operator">|</span><span class="token string">'([^'</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token string">'+|([^\s"'</span><span class="token operator">=</span><span class="token operator">&lt;</span><span class="token operator">&gt;</span><span class="token template-string"><span class="token string">`]+)))?/
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>ncname<span class="token punctuation">}</span>\\<span class="token punctuation">:</span><span class="token punctuation">)</span><span class="token operator">?</span>$<span class="token punctuation">{</span>ncname<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token template-string"><span class="token string">`
const startTagOpen = new RegExp(`</span></span><span class="token operator">^</span><span class="token operator">&lt;</span>$<span class="token punctuation">{</span>qnameCapture<span class="token punctuation">}</span><span class="token template-string"><span class="token string">`)
const startTagClose = /^\s*(\/?)&gt;/
const endTag = new RegExp(`</span></span><span class="token operator">^</span><span class="token operator">&lt;</span>\\<span class="token operator">/</span>$<span class="token punctuation">{</span>qnameCapture<span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token operator">^</span><span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token operator">&gt;</span>`<span class="token punctuation">)</span>
<span class="token keyword">const</span> doctype <span class="token operator">=</span> <span class="token regex">/^&lt;!DOCTYPE [^&gt;]+&gt;/i</span>
<span class="token keyword">const</span> comment <span class="token operator">=</span> <span class="token regex">/^&lt;!\--/</span>
<span class="token keyword">const</span> conditionalComment <span class="token operator">=</span> <span class="token regex">/^&lt;!\[/</span>

</code></pre>
<p>Vue 通过上面几个正则表达式去匹配开始结束标签、标签名、属性等等。</p>
<p>关于 while 的详细注解我放在我<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fbalancelove%2FreadingNotes%2Fblob%2Fmaster%2Fvue%2Fwhile.md">仓库</a>里了，有兴趣的可以去看看。</p>
<p>在 while 里，其实就是不断的去用  <code>html.indexOf('&lt;')</code>  去匹配，然后根据返回的索引的不同去做不同的解析处理：</p>
<ul>
<li>**等于 0：**这就代表这是注释、条件注释、doctype、开始标签、结束标签中的某一种</li>
<li>**大于等于 0：**这就说明是文本、表达式</li>
<li>**小于 0：**表示 html 标签解析完了，可能会剩下一些文本、表达式</li>
</ul>
<p>parse 函数就是不断的重复这个工作，然后将 template 转换成 AST，在解析过程中，其实对于标签与标签之间的空格，Vue 也做了优化处理，有些元素之间的空格是没用的。</p>
<p>compile 其实要说要说非常多的篇幅，但是这里只能简单的理一下思路，具体代码还需要各位下去深扣。</p>
<h3 id="optimize优化器">2. optimize(优化器)</h3>
<blockquote>
<p>从代码中的注释我们可以看出，优化器的目的就是去找出 AST 中纯静态的子树：</p>
<p>1.把纯静态子树提升为常量，每次重新渲染的时候就不需要创建新的节点了<br>
2.在 patch 的时候就可以跳过它们</p>
</blockquote>
<p>optimize 的代码量没有 parse 那么多，我们来看看：</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">optimize</span> <span class="token punctuation">(</span>root<span class="token punctuation">:</span> <span class="token operator">?</span>ASTElement<span class="token punctuation">,</span> options<span class="token punctuation">:</span> CompilerOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断 root 是否存在</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token comment">// 判断是否是静态的属性</span>
  <span class="token comment">// 'type,tag,attrsList,attrsMap,plain,parent,children,attrs'</span>
  isStaticKey <span class="token operator">=</span> <span class="token function">genStaticKeysCached</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>staticKeys <span class="token operator">||</span> <span class="token string">''</span><span class="token punctuation">)</span>
  <span class="token comment">// 判断是否是平台保留的标签，html 或者 svg 的</span>
  isPlatformReservedTag <span class="token operator">=</span> options<span class="token punctuation">.</span>isReservedTag <span class="token operator">||</span> no
  <span class="token comment">// 第一遍遍历: 给所有静态节点打上是否是静态节点的标记</span>
  <span class="token function">markStatic</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
  <span class="token comment">// 第二遍遍历:标记所有静态根节点</span>
  <span class="token function">markStaticRoots</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre>
<p>下面两段代码我都剪切了一部分，因为有点多，这里就不贴太多代码了。</p>
<p><strong>第一遍遍历</strong></p>
<pre class=" language-php"><code class="prism  language-php"><span class="token keyword">function</span> <span class="token function">markStatic</span> <span class="token punctuation">(</span>node<span class="token punctuation">:</span> ASTNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  node<span class="token punctuation">.</span><span class="token keyword">static</span> <span class="token operator">=</span> <span class="token function">isStatic</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre>
<p>其实 markStatic 就是一个递归的过程，不断地去检查 AST 上的节点，然后打上标记。</p>
<p>刚刚我们说过，AST 节点分三种，在 isStatic 这个函数中我们对不同类型的节点做了判断：</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">function</span> <span class="token function">isStatic</span> <span class="token punctuation">(</span>node<span class="token punctuation">:</span> ASTNode<span class="token punctuation">)</span><span class="token punctuation">:</span> boolean <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// expression</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// text</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>pre <span class="token operator">||</span> <span class="token punctuation">(</span>
    <span class="token operator">!</span>node<span class="token punctuation">.</span>hasBindings <span class="token operator">&amp;&amp;</span> <span class="token comment">// no dynamic bindings</span>
    <span class="token operator">!</span>node<span class="token punctuation">.</span><span class="token keyword">if</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>node<span class="token punctuation">.</span><span class="token keyword">for</span> <span class="token operator">&amp;&amp;</span> <span class="token comment">// not v-if or v-for or v-else</span>
    <span class="token operator">!</span><span class="token function">isBuiltInTag</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token comment">// not a built-in</span>
    <span class="token function">isPlatformReservedTag</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token comment">// not a component</span>
    <span class="token operator">!</span><span class="token function">isDirectChildOfTemplateFor</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span>isStaticKey<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre>
<p>可以看到 Vue 对下面几种情况做了处理：</p>
<ol>
<li>当这个节点的 type 为 2，也就是表达式节点的时候，很明显它不是一个静态节点，所以返回 false</li>
<li>当 type 为 3 的时候，也就是文本节点，那它就是一个静态节点，返回 true</li>
<li>如果你在元素节点中使用了 v-pre 或者使用了 <pre> 标签，就会在这个节点上加上 pre 为 true，那么这就是个静态节点</pre></li>
<li>如果它是静态节点，那么需要它不能有动态的绑定、不能有 v-if、v-for、v-else 这些指令，不能是 slot 或者 component 标签、不是我们自定义的标签、没有父节点或者元素的父节点不能是带 v-for 的 template、 这个节点的属性都在 type,tag,attrsList,attrsMap,plain,parent,children,attrs 里面，满足这些条件，就认为它是静态的节点。</li>
</ol>
<p>接下来，就开始对 AST 进行递归操作，标记静态的节点，至于里面做了哪些操作，可以到上面那个仓库里去看，这里就不展开了。</p>
<p><strong>第二遍遍历</strong></p>
<p>第二遍遍历的过程是标记静态根节点，那么我们对静态根节点的定义是什么，首先根节点的意思就是他不能是叶子节点，起码要有子节点，并且它是静态的。在这里 Vue 做了一个说明，如果一个静态节点它只拥有一个子节点并且这个子节点是文本节点，那么就不做静态处理，它的成本大于收益，不如直接渲染。</p>
<p>同样的，我们在函数中不断的递归进行标记，最后在所有静态根节点上加上 staticRoot 的标记，关于这段代码也可以去上面的仓库看一看</p>
<h3 id="generate代码生成器">3. generate(代码生成器)</h3>
<blockquote>
<p>在这个函数中，我们将 AST 转换成为 render 函数字符串，代码量还是挺多的，我们可以来看一看。</p>
</blockquote>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">generate</span> <span class="token punctuation">(</span>
  ast<span class="token punctuation">:</span> ASTElement <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  options<span class="token punctuation">:</span> CompilerOptions
<span class="token punctuation">)</span><span class="token punctuation">:</span> CodegenResult <span class="token punctuation">{</span>
  <span class="token comment">// 这就是编译的一些参数</span>
  <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CodegenState</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
  <span class="token comment">// 生成 render 字符串</span>
  <span class="token keyword">const</span> code <span class="token operator">=</span> ast <span class="token operator">?</span> <span class="token function">genElement</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token string">'_c("div")'</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    render<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`with(this){return </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}`</span></span><span class="token punctuation">,</span>
    staticRenderFns<span class="token punctuation">:</span> state<span class="token punctuation">.</span>staticRenderFns
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre>
<p>可以看到在最后代码生成阶段，最重要的函数就是 genElement 这个函数，针对 AST 的属性(不同的指令、属性)，我们会选择不同的代码生成函数。最后我们按照 AST 生成拼接成一个字符串，如下所示：</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">genElement</span> <span class="token punctuation">(</span>el<span class="token punctuation">:</span> ASTElement<span class="token punctuation">,</span> state<span class="token punctuation">:</span> CodegenState<span class="token punctuation">)</span><span class="token punctuation">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>staticRoot <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>staticProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genStatic</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>once <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>onceProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genOnce</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token keyword">for</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>forProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genFor</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token keyword">if</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>ifProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genIf</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">'template'</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>slotTarget<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genChildren</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">'void 0'</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">'slot'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genSlot</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// component or element</span>
    <span class="token keyword">let</span> code
    <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      code <span class="token operator">=</span> <span class="token function">genComponent</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>component<span class="token punctuation">,</span> el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> data <span class="token operator">=</span> el<span class="token punctuation">.</span>plain <span class="token operator">?</span> undefined <span class="token punctuation">:</span> <span class="token function">genData</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>

      <span class="token keyword">const</span> children <span class="token operator">=</span> el<span class="token punctuation">.</span>inlineTemplate <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token punctuation">:</span> <span class="token function">genChildren</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      code <span class="token operator">=</span> <span class="token template-string"><span class="token string">`_c('</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>el<span class="token punctuation">.</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">'${
        data ? `</span></span><span class="token punctuation">,</span>$<span class="token punctuation">{</span>data<span class="token punctuation">}</span><span class="token template-string"><span class="token string">` : '' // data
      }${
        children ? `</span></span><span class="token punctuation">,</span>$<span class="token punctuation">{</span>children<span class="token punctuation">}</span><span class="token template-string"><span class="token string">` : '' // children
      })`</span></span>
    <span class="token punctuation">}</span>
    <span class="token comment">// module transforms</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> state<span class="token punctuation">.</span>transforms<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      code <span class="token operator">=</span> state<span class="token punctuation">.</span>transforms<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> code<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> code
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre>
<p>在 render 这个函数字符串中，我们会看到一些函数，那么这些函数是在什么地方定义的呢？我们可以在 core/instance/index.js 这个文件中找到这些函数：</p>
<pre class=" language-swift"><code class="prism  language-swift"><span class="token comment">// v-once</span>
target<span class="token punctuation">.</span>_o <span class="token operator">=</span> markOnce
<span class="token comment">// 转换</span>
target<span class="token punctuation">.</span>_n <span class="token operator">=</span> toNumber
<span class="token comment">//把一个值转换为字符串。（eg: {{data}}）</span>
target<span class="token punctuation">.</span>_s <span class="token operator">=</span> <span class="token builtin">toString</span>
<span class="token comment">// v-for</span>
target<span class="token punctuation">.</span>_l <span class="token operator">=</span> renderList
<span class="token comment">// slot</span>
target<span class="token punctuation">.</span>_t <span class="token operator">=</span> renderSlot
<span class="token comment">// 是否相等</span>
target<span class="token punctuation">.</span>_q <span class="token operator">=</span> looseEqual
<span class="token comment">// 检测数组里是否有相等的值</span>
target<span class="token punctuation">.</span>_i <span class="token operator">=</span> looseIndexOf
<span class="token comment">// 渲染静态树</span>
target<span class="token punctuation">.</span>_m <span class="token operator">=</span> renderStatic
<span class="token comment">// 过滤器处理</span>
target<span class="token punctuation">.</span>_f <span class="token operator">=</span> resolveFilter
<span class="token comment">// 检查关键字</span>
target<span class="token punctuation">.</span>_k <span class="token operator">=</span> checkKeyCodes
<span class="token comment">// v-bind</span>
target<span class="token punctuation">.</span>_b <span class="token operator">=</span> bindObjectProps
<span class="token comment">// 创建文本节点</span>
target<span class="token punctuation">.</span>_v <span class="token operator">=</span> createTextVNode
<span class="token comment">// 创建空节点</span>
target<span class="token punctuation">.</span>_e <span class="token operator">=</span> createEmptyVNode
<span class="token comment">// 处理 scopeslot</span>
target<span class="token punctuation">.</span>_u <span class="token operator">=</span> resolveScopedSlots
<span class="token comment">// 处理事件绑定</span>
target<span class="token punctuation">.</span>_g <span class="token operator">=</span> bindObjectListeners
<span class="token comment">// 创建 VNode 节点</span>
vm<span class="token punctuation">.</span>_c <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>

</code></pre>
<p>生成 render 的 generate 函数的输入也是 AST，它递归了 AST 树，为不同的 AST 节点创建了不同的内部调用方法，等待后面的调用。生成 render 函数的过程如下：</p>
<p><img src="https://i.loli.net/2021/04/22/b9fYwhtx4vXVeir.png" alt="image.png"></p>
<p>假设我们有这么一段 template</p>
<pre class=" language-xml"><code class="prism  language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>test<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    {{val}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://xx.jpg<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

</code></pre>
<p>最终会被转换成这样子的函数字符串</p>
<pre class=" language-css"><code class="prism  language-css"><span class="token punctuation">{</span><span class="token selector">render: "with(this)</span><span class="token punctuation">{</span><span class="token selector">return _c('div',</span><span class="token punctuation">{</span><span class="token selector">attrs:</span><span class="token punctuation">{</span><span class="token string">"id"</span><span class="token punctuation">:</span><span class="token string">"test"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,[[_<span class="token function">v</span><span class="token punctuation">(</span>_<span class="token function">s</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span>]<span class="token punctuation">)</span>,_<span class="token function">v</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span>,_<span class="token function">m</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>]<span class="token punctuation">)</span><span class="token punctuation">}</span>"<span class="token punctuation">}</span>

</code></pre>
<p>以上就是 compile 函数中三个核心步骤的介绍，**compile之后我们得到了 render 函数 的字符串形式，后面通过 new Function 得到真正的渲染函数。数据发现变化后，会执行 Watcher 中的 _update 函数（src/core/instance/lifecycle.js），_update 函数会执行这个渲染函数，输出一个新的 VNode 树形结构的数据。**然后在调用 patch 函数，拿这个新的 VNode 与旧的 VNode 进行对比，只有发生了变化的节点才会被更新到真实 DOM 树上。</p>
<h2 id="mount后续">mount后续</h2>
<p>通过compile生成render方法之后，会进一步执行<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.13%2Fsrc%2Fcore%2Finstance%2Flifecycle.js%23L143-L209">mount</a>方法,在$mount中可以看到最后一句话:return mount.call(this, el, hydrating),这个mount实际上就是runtime中的mount，执行的就是lifecycle中的mountComponent方法，看一下基本逻辑:</p>
<pre class=" language-jsx"><code class="prism  language-jsx"><span class="token comment">// 触发 beforeMount 生命周期钩子</span>
<span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'beforeMount'</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> updateComponent <span class="token comment">//updateComponent是watcher更新时的回调，用于更新视图操作</span>
<span class="token comment">/* istanbul ignore if */</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>NODE_ENV <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> name <span class="token operator">=</span> vm<span class="token punctuation">.</span>_name
    <span class="token keyword">const</span> id <span class="token operator">=</span> vm<span class="token punctuation">.</span>_uid
    <span class="token keyword">const</span> startTag <span class="token operator">=</span> <span class="token template-string"><span class="token string">`vue-perf-start:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span>
    <span class="token keyword">const</span> endTag <span class="token operator">=</span> <span class="token template-string"><span class="token string">`vue-perf-end:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span>

    <span class="token function">mark</span><span class="token punctuation">(</span>startTag<span class="token punctuation">)</span>
    <span class="token keyword">const</span> vnode <span class="token operator">=</span> vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">mark</span><span class="token punctuation">(</span>endTag<span class="token punctuation">)</span>
    <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> render`</span></span><span class="token punctuation">,</span> startTag<span class="token punctuation">,</span> endTag<span class="token punctuation">)</span>

    <span class="token function">mark</span><span class="token punctuation">(</span>startTag<span class="token punctuation">)</span>
    vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
    <span class="token function">mark</span><span class="token punctuation">(</span>endTag<span class="token punctuation">)</span>
    <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> patch`</span></span><span class="token punctuation">,</span> startTag<span class="token punctuation">,</span> endTag<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 以前是直接new Watch赋值给vm._watcher,现在这一步放到了watcher的构造函数中</span>
<span class="token comment">// we set this to vm._watcher inside the watcher's constructor</span>
<span class="token comment">// since the watcher's initial patch may call $forceUpdate (e.g. inside child</span>
<span class="token comment">// component's mounted hook), which relies on vm._watcher being already defined</span>
<span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> updateComponent<span class="token punctuation">,</span> noop<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* isRenderWatcher */</span><span class="token punctuation">)</span>
hydrating <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token comment">// manually mounted instance, call mounted on self</span>
<span class="token comment">// mounted is called for render-created child components in its inserted hook</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$vnode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span>_isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'mounted'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> vm

</code></pre>
<p>首先会new一个watcher对象（主要是将模板与数据建立联系），在watcher对象创建后，会运行传入的方法 vm._update(vm._render(), hydrating) 。其中的vm._render()主要作用就是运行前面compiler生成的render方法，并返回一个vNode对象。vm.update() 则会对比新的 vdom 和当前 vdom，并把差异的部分渲染到真正的 DOM 树上。</p>
<h2 id="patch">patch</h2>
<p>patch.js 就是新旧 VNode 对比的 diff 函数，主要是为了优化dom，通过算法使操作dom的行为降到最低，diff 算法来源于 snabbdom，是 VDOM 思想的核心。snabbdom 的算法为了 DOM 操作跨层级增删节点较少的这一目标进行优化，它只会在同层级进行, 不会跨层级比较。</p>
<p>参考链接：<br>
<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000012922342">从源码理解 Vue 模板编译</a><br>
<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgeniuspeng.github.io%2F2018%2F02%2F07%2Fvue-compile%2F">Vue源码–深入模板渲染</a><br>
<a href="https://www.jianshu.com/p/f68c9715bea0">咱来聊聊 Vue - compile</a></p>

