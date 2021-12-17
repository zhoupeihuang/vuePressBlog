---


---

<h1 id="让我告诉你一些强无敌的-npm-软件包">让我告诉你一些强无敌的 NPM 软件包</h1>
<p>面对繁忙的日程安排与紧迫的工期限制，选择能够切实提升生产率的工具无疑至关重要。</p>
<p>在这里，我整理出一份个人最喜欢的 NPM 软件包清单。为了便于浏览，我还对它们进行了分类，希望呈现出更加清晰的结构。</p>
<p>当然，大家不必全数安装与学习。在大多数情况下，每个类别选择一款就足以解决生产需求。我只是想多提供一点替代方案，帮助每位读者朋友找到最适合自己的选项。闲言少叙，咱们马上开始！</p>
<h2 id="🧰-实用工具">🧰 实用工具</h2>
<h3 id="lodash">Lodash</h3>
<p><a href="https://www.lodashjs.com/docs/latest">lodash</a>是一套现代 JavaScript 实用程序库，提供模块化、性能与多种附加功能。可提供关于 JavaScript 数组、对象及其他数据结构的多种实用功能。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b6a2d8506304a62afeb575afed3c5ea~tplv-k3u1fbpfcp-zoom-1.image" alt="lodash-logo"></p>
<h4 id="安装及示例">安装及示例</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add lodash
复制代码
</code></pre>
<p><strong>不要滥用，尽量使用 ES 自带方法</strong>  。 我常用的一些方法如下</p>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token comment">// -----------------------------深度比较两个对象的值是否全相等</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> isEqual<span class="token punctuation">,</span> cloneDeep<span class="token punctuation">,</span> uniqBy<span class="token punctuation">,</span> sortBy <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"lodash"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> object <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> other <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">isEqual</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> other<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// =&gt; true</span>

object <span class="token operator">===</span> other<span class="token punctuation">;</span>
<span class="token comment">// =&gt; false</span>

<span class="token comment">// -----------------------------深拷贝</span>
<span class="token keyword">const</span> objects <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> a<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> b<span class="token punctuation">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> deep <span class="token operator">=</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>objects<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>deep<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> objects<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// =&gt; false</span>

<span class="token comment">// -----------------------------数组去重</span>
<span class="token function">uniqBy</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"x"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// =&gt; [{ 'x': 1 }, { 'x': 2 }]</span>

<span class="token comment">// -----------------------------数组排序</span>
<span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> user<span class="token punctuation">:</span> <span class="token string">"fred"</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token number">48</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> user<span class="token punctuation">:</span> <span class="token string">"barney"</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token number">36</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> user<span class="token punctuation">:</span> <span class="token string">"fred"</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token number">40</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> user<span class="token punctuation">:</span> <span class="token string">"barney"</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token number">34</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">sortBy</span><span class="token punctuation">(</span>users<span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*
[
  { 'user': 'barney', 'age': 34 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred', 'age': 40 },
  { 'user': 'fred', 'age': 48 },
];
*/</span>
复制代码
</code></pre>
<h3 id="qs">qs</h3>
<p><a href="https://www.npmjs.com/package/qs"><code>qs</code></a>  处理 URL 查询字符串,支持内嵌对象和数组。简而言之，就是将对象和 URL 地址的参数互相转换</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6599b1196e84ee6ab1f0d0ce4a274d1~tplv-k3u1fbpfcp-zoom-1.image" alt="qs-github"></p>
<h5 id="安装及示例-1">安装及示例</h5>
<pre class=" language-shell"><code class="prism  language-shell">yarn add qs
复制代码
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> parse<span class="token punctuation">,</span> stringify <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"qs"</span><span class="token punctuation">;</span>

<span class="token comment">// 用途一</span>
<span class="token comment">// 将 浏览器上 URL地址参数转换为对象（字符串转对象）</span>
<span class="token keyword">const</span> urlParams <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"?"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 用途二</span>
<span class="token comment">// 将对象参数 传递给到后端接口--GET 请求  （对象转字符串）</span>
<span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">"wang"</span><span class="token punctuation">,</span>
  age<span class="token punctuation">:</span> <span class="token string">"18"</span><span class="token punctuation">,</span>
  sex<span class="token punctuation">:</span> <span class="token string">"女"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// =&gt;  /api/user?name=wang&amp;age=18&amp;sex=%E5%A5%B3</span>
<span class="token keyword">const</span> apiUrl <span class="token operator">=</span> <span class="token template-string"><span class="token string">`/api/user?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>
复制代码
</code></pre>
<h3 id="classnames">classnames</h3>
<p><a href="https://www.npmjs.com/package/classnames">classnames</a>有条件地将类名组合在一起</p>
<h4 id="安装及示例-2">安装及示例</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add classnames
复制代码
</code></pre>
<p>错误 ❎ 代码示例: React 原生动态添加多个样式类名会报错：</p>
<pre class=" language-tsx"><code class="prism  language-tsx">import styles from "./index.less";

const Index=()=&gt;&lt;div className={styles.class1 styles.class2}&lt;/div&gt;
复制代码
</code></pre>
<p>修改为如下代码即可解决</p>
<pre class=" language-tsx"><code class="prism  language-tsx">import React from "react"
import classnames from 'classnames'

import styles from "./index.less";

const Index=()=&gt;(&lt;div
          className=classnames({
              styles.class1,
              styles.class2
          })&gt;
&lt;/div&gt;)
复制代码
</code></pre>
<h3 id="numeral">numeral</h3>
<p><a href="http://numeraljs.com/#format">numeral</a>是一个专门用来格式化数字的 NPM 库，同时 numeral 还能解析各种格式的数字。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f995483fc3174302900f69b0fa00d3de~tplv-k3u1fbpfcp-zoom-1.image" alt="numeral-github"></p>
<h4 id="安装及示例-3">安装及示例</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add numeral
复制代码
</code></pre>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token keyword">import</span> numeral <span class="token keyword">from</span> <span class="token string">"numeral"</span><span class="token punctuation">;</span>

<span class="token comment">// 解析数字</span>
<span class="token function">numeral</span><span class="token punctuation">(</span><span class="token string">"10,000.12"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10000.12</span>
<span class="token function">numeral</span><span class="token punctuation">(</span><span class="token string">"$10,000.00"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10000</span>
<span class="token function">numeral</span><span class="token punctuation">(</span><span class="token string">"3.467TB"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3467000000000</span>
<span class="token function">numeral</span><span class="token punctuation">(</span><span class="token string">"-76%"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -0.76</span>

<span class="token comment">// 格式化</span>

<span class="token function">numeral</span><span class="token punctuation">(</span><span class="token number">10000.23</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"0,0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '10,000'</span>
<span class="token function">numeral</span><span class="token punctuation">(</span><span class="token number">1000.234</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"$0,0.00"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '$1,000.23'</span>
复制代码
</code></pre>
<h3 id="cross-env">cross-env</h3>
<p><a href="https://www.npmjs.com/package/cross-env">cross-env</a>是一个运行<strong>跨平台</strong>设置和使用环境变量的脚本</p>
<h5 id="安装及示例-4">安装及示例</h5>
<pre class=" language-shell"><code class="prism  language-shell">yarn add cross-env --dev
复制代码
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript">  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"start"</span><span class="token punctuation">:</span> <span class="token string">"cross-env REACT_APP_ENV=development webpack"</span><span class="token punctuation">,</span>
    <span class="token string">"build"</span><span class="token punctuation">:</span> <span class="token string">"cross-env REACT_APP_ENV=production webpack"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
复制代码
</code></pre>
<h3 id="path-to-regexp">path-to-regexp</h3>
<p><a href="https://www.npmjs.com/package/path-to-regexp">path-to-regexp</a>用来处理 url 中地址与参数，能够很方便得到我们想要的数据。</p>
<p>js 中有  <code>RegExp</code>  方法做正则表达式校验，而  <code>path-to-regexp</code>  可以看成是 url 字符串的正则表达式。</p>
<h4 id="安装及示例-5">安装及示例</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add path-to-regexp
复制代码
</code></pre>
<p><code>pathToRegexp</code>方法可以类比于 js 中  <code>new RegExp('xxx')</code>。</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">import</span> pathToRegexp <span class="token keyword">from</span> <span class="token string">"path-to-regexp"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> re <span class="token operator">=</span> <span class="token function">pathToRegexp</span><span class="token punctuation">(</span><span class="token string">"/foo/:bar"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>re<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// /^\/foo\/((?:[^\/]+?))(?:\/(?=$))?$/i</span>
复制代码
</code></pre>
<p><code>compile</code>用于填充 url 字符串的参数值。</p>
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">var</span> pathToRegexp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path-to-regexp"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token string">"/user/:id/:name"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">10001</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"bob"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// /user/10001/bob</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pathToRegexp<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
复制代码
</code></pre>
<hr>
<h2 id="📅-日期格式">📅 日期格式</h2>
<h3 id="day.js">Day.js</h3>
<p><a href="https://dayjs.gitee.io/docs/zh-CN/display/format">Day.js</a>  是一款快速且轻量化的  <a href="http://momentjs.cn/">Moment.js</a>(自 2020 年 9 月起进入纯维护模式,不再开发新版本) 替代方案。二者拥有类似的 API，只要你接触过  <code>Moment.js</code>，就能够快速上手  <code>Day.js</code>。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54dadaf204fd4efeb3860ffe53e58647~tplv-k3u1fbpfcp-zoom-1.image" alt="dayJS-office"></p>
<h4 id="安装">安装</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add dayjs
复制代码
</code></pre>
<h4 id="示例">示例</h4>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">import</span> dayjs <span class="token keyword">from</span> <span class="token string">"dayjs"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> myformat <span class="token operator">=</span> <span class="token string">"YYYY-MM-DD HH:mm:ss"</span><span class="token punctuation">;</span>

<span class="token comment">// -------------------------以字符串形式返回 当前时间</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>myformat<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// =&gt;  2020-11-25 12:25:56</span>

<span class="token comment">// -------------------------日期格式化</span>
<span class="token keyword">const</span> data1 <span class="token operator">=</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token string">"2020-11-25 12:25:56"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"YYYY/MM/DD HH/mm/ss"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// =&gt; 2020/11/25 12/25/56</span>

<span class="token comment">// -------------------------多久之前</span>
<span class="token keyword">var</span> relativeTime <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"dayjs/plugin/relativeTime"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dayjs<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>relativeTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> data1 <span class="token operator">=</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token string">"2020-11-25 11:40:41"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fromNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// =&gt;</span>
复制代码
</code></pre>
<hr>
<h2 id="🌷-linters-与格式化工具">🌷 Linters 与格式化工具</h2>
<h3 id="eslint">ESLint</h3>
<p><a href="https://eslint.bootcss.com/docs/user-guide/getting-started">ESLint</a>  是一个很好用的工具，可用来避免代码错误并强制开发团队使用编码标准。ESLint 是用于识别和报告 ECMAScript/JavaScript 代码中模式的工具。ESLint 具备全面的可插入特性，每项规则对应一款插件，供你在运行时添加更多内容。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ca7c4c0ffad4f84ba906623bb19f583~tplv-k3u1fbpfcp-zoom-1.image" alt="eslint-offcial"></p>
<h5 id="安装和使用">安装和使用</h5>
<pre class=" language-powershell"><code class="prism  language-powershell">$ yarn add eslint <span class="token operator">--</span>dev
复制代码
</code></pre>
<p>然后，你应该设置一个配置文件：</p>
<pre class=" language-powershell"><code class="prism  language-powershell">$ <span class="token punctuation">.</span><span class="token operator">/</span>node_modules<span class="token operator">/</span><span class="token punctuation">.</span>bin<span class="token operator">/</span>eslint <span class="token operator">--</span>init
复制代码
</code></pre>
<p>之后，你可以在任何文件或目录上运行 ESLint，如下所示：</p>
<pre class=" language-powershell"><code class="prism  language-powershell">$ <span class="token punctuation">.</span><span class="token operator">/</span>node_modules<span class="token operator">/</span><span class="token punctuation">.</span>bin<span class="token operator">/</span>eslint yourfile<span class="token punctuation">.</span>js
复制代码
</code></pre>
<p>有关更多说明，请参阅<a href="https://eslint.org/">官方文档</a>，其中有许多入门和配置示例。</p>
<h3 id="prettier">Prettier</h3>
<p><a href="https://prettier.bootcss.com/docs/index.html">Prettier</a>  是一款风格鲜明的代码格式化程序。它通过解析代码并使用自己的规则（限定最大行长）对代码进行重新输出，借此实现统一的样式；</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1541af36a2e549b2b38b10588385d48e~tplv-k3u1fbpfcp-zoom-1.image" alt="prettier-office"></p>
<h4 id="安装-1">安装</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add --dev --exact prettier
复制代码
</code></pre>
<h4 id="示例-1">示例</h4>
<p>创建  <code>.prettierrc.js</code>  加入自定义格式化规则</p>
<pre class=" language-js"><code class="prism  language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  trailingComma<span class="token punctuation">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>
  tabWidth<span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  semi<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  singleQuote<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
复制代码
</code></pre>
<p>创建  <code>.prettierignore</code>  加入需要忽略的文件或目录</p>
<pre class=" language-shell"><code class="prism  language-shell"># Ignore artifacts:
build
coverage
复制代码
</code></pre>
<p>执行格式化命令</p>
<pre class=" language-shell"><code class="prism  language-shell"># 格式化src目录下的所有js文件

prettier --write "src/**/*.js"
复制代码
</code></pre>
<h3 id="stylelint">stylelint</h3>
<p><a href="https://stylelint.io/user-guide/get-started">stylelint</a>  一个强大的样式规则，可以让你强制执行样式规范，避免书写错误的样式代码</p>
<h4 id="安装-2">安装</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add stylelint stylelint-config-standard --dev
复制代码
</code></pre>
<h4 id="示例-2">示例</h4>
<p>创建<code>.stylelintrc.js</code>并加入配置</p>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token keyword">module</span><span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token punctuation">:</span> <span class="token string">"stylelint-config-standard"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
复制代码
</code></pre>
<p>执行 lint 命令</p>
<pre class=" language-shell"><code class="prism  language-shell"># 检查 src目录下所有css文件是否符合规范
npx stylelint "src/**/*.css"
复制代码
</code></pre>
<h3 id="husky">Husky</h3>
<p><a href="https://www.npmjs.com/package/husky">Husky</a>  可以帮助我们简单直接地实现 git hooks。你们团队正在协作开发，并希望在整个团队中推行一套编码标准？没问题！有了 Husky，你就可以要求所有人在提交或推送到存储库之前自动完成 lint 并测试其代码。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec7412d2675c430f9d134c2ae3b63529~tplv-k3u1fbpfcp-zoom-1.image" alt="HUSKY-GITHUB"></p>
<h5 id="安装及示例-6">安装及示例</h5>
<pre class=" language-powershell"><code class="prism  language-powershell">yarn add husky <span class="token operator">--</span>dev
复制代码
</code></pre>
<p>下面是一个实现 husky hooks 的示例：</p>
<pre class=" language-json"><code class="prism  language-json"><span class="token comment">// package.json</span>
<span class="token punctuation">{</span>
  <span class="token string">"husky"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"hooks"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
      <span class="token string">"pre-commit"</span><span class="token punctuation">:</span> <span class="token string">"npm lint"</span><span class="token punctuation">,</span>
      <span class="token string">"pre-push"</span><span class="token punctuation">:</span> <span class="token string">"npm test"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
复制代码
</code></pre>
<p>这里  <code>pre-commit</code>  的  <code>hooks</code>  会在你提交到存储库之前运行。在将代码推送到存储库之前，将运行  <code>pre-push hook</code>。</p>
<hr>
<h2 id="🧙‍♂️-数据生成器">🧙‍♂️ 数据生成器</h2>
<h3 id="uuid">Uuid</h3>
<p><a href="https://www.npmjs.com/package/uuid">uuid</a>是一个便捷的微型软件包，能够快速生成更为复杂的通用唯一标识符（UUID）。</p>
<h4 id="安装及示例-7">安装及示例</h4>
<pre><code>npm install uuid
复制代码
</code></pre>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> v4 <span class="token keyword">as</span> uuidv4 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"uuid"</span><span class="token punctuation">;</span>
<span class="token function">uuidv4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'</span>
复制代码
</code></pre>
<h3 id="faker.js">faker.js</h3>
<p><a href="https://www.npmjs.com/package/faker">faker.js</a>非常实用的工具包，用于在浏览器及 Node.js 中生成大量假数据。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f0ab7a99ade4a11b3435944aae2c55c~tplv-k3u1fbpfcp-zoom-1.image" alt="faker-github"></p>
<h4 id="安装及示例-8">安装及示例</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add faker
复制代码
</code></pre>
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">import</span> faker <span class="token keyword">from</span> <span class="token string">"faker"</span>

<span class="token keyword">function</span> <span class="token function">generateCustomers</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> customers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> id <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> id <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span> id<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> firstName <span class="token operator">=</span> faker<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">firstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> lastName <span class="token operator">=</span> faker<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">firstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> phoneNumber <span class="token operator">=</span> faker<span class="token punctuation">.</span>phone<span class="token punctuation">.</span><span class="token function">phoneNumberFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> zipCode <span class="token operator">=</span> faker<span class="token punctuation">.</span>address<span class="token punctuation">.</span><span class="token function">zipCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> date <span class="token operator">=</span> faker<span class="token punctuation">.</span>date<span class="token punctuation">.</span><span class="token function">recent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    customers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      id<span class="token punctuation">,</span>
      firstName<span class="token punctuation">,</span>
      lastName <span class="token punctuation">,</span>
      phoneNumber <span class="token punctuation">,</span>
      zipCode<span class="token punctuation">,</span>
      date
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> customers <span class="token punctuation">}</span>
复制代码
</code></pre>
<h3 id="mock.js">Mock.js</h3>
<p><a href="http://mockjs.com/examples.html">Mock.js</a>  是一个模拟数据生成器，可帮助前端开发和原型与后端进度分开，并减少某些单调性，尤其是在编写自动化测试时。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc52cc9447ba4e43b8f86235a1ebdcca~tplv-k3u1fbpfcp-zoom-1.image" alt="moackjs-github"></p>
<h5 id="安装及示例-9">安装及示例</h5>
<pre><code>npm install mockjs
复制代码
</code></pre>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token keyword">import</span> Mock <span class="token keyword">from</span> <span class="token string">"mockjs"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Random <span class="token operator">=</span> Mock<span class="token punctuation">.</span>Random

<span class="token keyword">function</span> <span class="token function">generateCustomers</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> customers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> id <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> id <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span> id<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> firstName <span class="token operator">=</span> Random<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> lastName <span class="token operator">=</span> Random<span class="token punctuation">.</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> province <span class="token operator">=</span> Random<span class="token punctuation">.</span><span class="token function">province</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> date <span class="token operator">=</span> Random<span class="token punctuation">.</span><span class="token function">date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    customers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      id<span class="token punctuation">,</span>
      firstName<span class="token punctuation">,</span>
      lastName <span class="token punctuation">,</span>
      province<span class="token punctuation">,</span>
      date
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> customers <span class="token punctuation">}</span>
复制代码
</code></pre>
<hr>
<h2 id="🧪-测试工具">🧪 测试工具</h2>
<h3 id="jest">Jest</h3>
<p><a href="https://www.jestjs.cn/docs/getting-started">Jest</a>  是一款便捷好用的 JavaScript 测试框架，以简单为核心诉求。您可以通过易于上手且功能丰富的 API 编写测试，从而快速获取结果。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45618dec2d38426ab86713324d26d179~tplv-k3u1fbpfcp-zoom-1.image" alt="jest-office"></p>
<h4 id="安装及示例-10">安装及示例</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add --dev jest
复制代码
</code></pre>
<p>测试<code>sum</code>函数，这个函数的功能是两数相加。首先创建  <code>sum.js</code>  文件：</p>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">module</span><span class="token punctuation">.</span>exports <span class="token operator">=</span> sum<span class="token punctuation">;</span>
复制代码
</code></pre>
<p>接下来，创建名为  <code>sum.test.js</code>  的文件。这个文件包含了实际测试内容：</p>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">"./sum"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"adds 1 + 2 to equal 3"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
复制代码
</code></pre>
<p>将如下代码添加到  <code>package.json</code>  中：</p>
<pre class=" language-json"><code class="prism  language-json"><span class="token punctuation">{</span>
  <span class="token string">"script"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"test"</span><span class="token punctuation">:</span> <span class="token string">"jest"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
复制代码
</code></pre>
<p>最后，运行  <code>yarn test</code>  ，Jest 将输出如下信息：</p>
<pre class=" language-shell"><code class="prism  language-shell">PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
复制代码
</code></pre>
<h3 id="mocha">Mocha</h3>
<p><a href="https://mochajs.cn/">Mocha</a>  是一个功能丰富的 javascript 测试框架，运行在 node.js 和浏览器中，使异步测试变得简单有趣。Mocha 测试连续运行，允许灵活和准确的报告，同时将未捕获的异常映射到正确的测试用例。</p>
<h3 id="安装及示例-11">安装及示例</h3>
<pre class=" language-shell"><code class="prism  language-shell">yarn add mocha --dev
复制代码
</code></pre>
<p>接下来，创建名为  <code>test.js</code>  的文件。这个文件包含了实际测试内容：</p>
<pre class=" language-ts"><code class="prism  language-ts"><span class="token keyword">var</span> assert <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">"assert"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"Array"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"#indexOf()"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"should return -1 when the value is not present"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      assert<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
复制代码
</code></pre>
<p>将如下代码添加到  <code>package.json</code>  中：</p>
<pre class=" language-json"><code class="prism  language-json"><span class="token punctuation">{</span>
  <span class="token string">"script"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"test"</span><span class="token punctuation">:</span> <span class="token string">"mocha"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
复制代码
</code></pre>
<p>最后，运行  <code>yarn test</code>  ，Mocha 将输出如下信息：</p>
<pre class=" language-shell"><code class="prism  language-shell">$ ./node_modules/mocha/bin/mocha

  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (9ms)
复制代码
</code></pre>
<hr>
<h2 id="👨‍💻-进程管理器与运行器">👨‍💻 进程管理器与运行器</h2>
<h3 id="nodemon">Nodemon</h3>
<p><a href="https://www.npmjs.com/package/nodemon">nodemon</a>用来监视 node.js 应用程序中的任何更改并自动重启服务,非常适合用在开发环境中。</p>
<p>nodemon 将监视启动目录中的文件，如果有任何文件更改，nodemon 将自动重新启动 node 应用程序。</p>
<h4 id="安装及示例-12">安装及示例</h4>
<pre class=" language-shell"><code class="prism  language-shell">yarn add  nodemon global
复制代码
</code></pre>
<p><code>server.js</code>表示一个 Node.js 入口文件</p>
<pre class=" language-javascript"><code class="prism  language-javascript">  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"start"</span><span class="token punctuation">:</span> <span class="token string">"nodemon server.js"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
复制代码
</code></pre>
<h3 id="pm2">PM2</h3>
<p><a href="https://www.npmjs.com/package/pm2">PM2</a>  是一个具有内置负载均衡器的 Node.js 应用程序的生产流程管理器。有了它，你就可以让应用程序永远保持活跃，可以在不停机的前提下重新加载它们，并简化常见的系统管理任务。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac4eefa000cb4664b0a208b92d335efa~tplv-k3u1fbpfcp-zoom-1.image" alt="p2-github"></p>
<h5 id="安装及示例-13">安装及示例</h5>
<pre class=" language-shell"><code class="prism  language-shell">$ yarn add global pm2
复制代码
</code></pre>
<p>你可以像下面一样启动任何应用程序（Node.js、Python、Ruby、$PATH 中的二进制文件……）</p>
<pre class=" language-shell"><code class="prism  language-shell">$ pm2 start app.js
复制代码
</code></pre>
<p>现在，你的应用将被守护、监控并永远保持活跃。有关流程管理的更多信息<a href="https://pm2.keymetrics.io/docs/usage/quick-start/">见此</a>：</p>
<p>应用程序启动后，你就可以轻松管理它们。可以通过以下方法列出所有正在运行的应用程序：</p>
<pre class=" language-shell"><code class="prism  language-shell">$ pm2 ls
复制代码
</code></pre>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07e62e1a02c640aa88a33e986b4f437d~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>
<p>查阅<a href="https://pm2.io/">官方文档</a>，以获取 PM2 功能给的完整列表。</p>
<h3 id="concurrently">Concurrently</h3>
<p><a href="https://www.npmjs.com/package/concurrently">Concurrently</a>简单而直接——可同时运行多条命令的实用工具。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/912f956311fb4c589936e6dd03a0a113~tplv-k3u1fbpfcp-zoom-1.image" alt="Concurrently-github"></p>
<h5 id="安装及示例-14">安装及示例</h5>
<pre class=" language-shell"><code class="prism  language-shell">yarn add concurrently global
复制代码
</code></pre>
<p>时启动前端 webpack 项目和 后端 node 项目</p>
<pre class=" language-json"><code class="prism  language-json"><span class="token comment">// package.json   同</span>
<span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"start"</span><span class="token punctuation">:</span> <span class="token string">"concurrently \"webpack-dev-server\" \"nodemon server.js\""</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
复制代码
</code></pre>
<hr>
<h2 id="web-sockets">Web sockets</h2>
<h3 id="socket.io"><a href="http://Socket.io">Socket.io</a></h3>
<p><a href="https://socketio.bootcss.com/">Socket.IO</a>  支持实时、双向、基于事件的通信功能。它能够运行在各类平台、浏览器及设备之上，且拥有良好的可靠性与速度表现。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67c0f960a6234559ba907592559c04b7~tplv-k3u1fbpfcp-zoom-1.image" alt="Socket.io-office"></p>
<h4 id="安装及示例-15">安装及示例</h4>
<p><a href="https://socketio.bootcss.com/get-started/chat/">官方教程</a></p>
<h3 id="ws">WS</h3>
<p><a href="https://www.npmjs.com/package/ws">WS</a>易于使用、快速且经过全面测试的 WebSocket 客户端与服务器实现。同时也是一套强大、抽象度更低且几乎能够与 <a href="http://Socket.io">Socket.io</a> 相媲美的替代方案。</p>
<p><a href="https://www.npmjs.com/package/ws">官方教程</a></p>

