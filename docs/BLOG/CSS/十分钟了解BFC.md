---
title: 十分钟了解BFC
date: 2021-12-17 10:50:23
permalink: /pages/d26ec2/
categories:
  - jinjie
tags:
  - 
---

<p><a href="https://zhuanlan.zhihu.com/learncoding">前端客栈</a></p>
<p><img src="https://pic4.zhimg.com/v2-208fa56cef7454ef82930ebb71d08bc0_1200x500.jpg" alt="10 分钟理解 BFC 原理"></p>
<h1 id="分钟理解-bfc-原理">10 分钟理解 BFC 原理</h1>
<h2 id="一、常见定位方案">一、常见定位方案</h2>
<p>在讲 BFC 之前，我们先来了解一下常见的定位方案，定位方案是控制元素的布局，有三种常见方案:</p>
<ul>
<li>普通流 (normal flow)</li>
</ul>
<blockquote>
<p>在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。</p>
</blockquote>
<ul>
<li>浮动 (float)</li>
</ul>
<blockquote>
<p>在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。</p>
</blockquote>
<ul>
<li>绝对定位 (absolute positioning)</li>
</ul>
<blockquote>
<p>在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。</p>
</blockquote>
<h2 id="二、bfc-概念">二、BFC 概念</h2>
<p>Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。</p>
<p>那么 BFC 是什么呢？</p>
<p>BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。</p>
<p>**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。<br>
**</p>
<p>通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。</p>
<h2 id="三、触发-bfc">三、触发 BFC</h2>
<p>只要元素满足下面任一条件即可触发 BFC 特性：</p>
<ul>
<li>body 根元素</li>
<li>浮动元素：float 除 none 以外的值</li>
<li>绝对定位元素：position (absolute、fixed)</li>
<li>display 为 inline-block、table-cells、flex</li>
<li>overflow 除了 visible 以外的值 (hidden、auto、scroll)</li>
</ul>
<h2 id="四、bfc-特性及应用">四、BFC 特性及应用</h2>
<p><strong>1. 同一个 BFC 下外边距会发生折叠</strong></p>
<pre class=" language-html"><code class="prism  language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
div{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>

</code></pre>
<p><img src="https://pic4.zhimg.com/80/v2-0a9ca8952c83141250a2d9002e6d2047_hd.png" alt=""></p>
<p>从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。</p>
<p>首先这不是 CSS 的 bug，我们可以理解为一种规范，<strong>如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。</strong></p>
<pre class=" language-html"><code class="prism  language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

</code></pre>
<pre class=" language-css"><code class="prism  language-css"><span class="token selector"><span class="token class">.container</span> </span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre>
<p>这时候，两个盒子边距就变成了 200px</p>
<p><img src="https://pic2.zhimg.com/80/v2-5b8d6e8b2b507352900c1ece00018855_hd.png" alt=""></p>
<p><strong>2. BFC 可以包含浮动的元素（清除浮动）</strong></p>
<p>我们都知道，浮动的元素会脱离普通文档流，来看下下面一个例子</p>
<pre class=" language-html"><code class="prism  language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">border</span><span class="token punctuation">:</span> <span class="token number">1</span>px solid <span class="token hexcode">#000</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span><span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode">#eee</span><span class="token punctuation">;</span><span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

</code></pre>
<p><img src="https://pic4.zhimg.com/80/v2-371eb702274af831df909b2c55d6a14b_hd.png" alt=""></p>
<p>由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。</p>
<pre class=" language-html"><code class="prism  language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">border</span><span class="token punctuation">:</span> <span class="token number">1</span>px solid <span class="token hexcode">#000</span><span class="token punctuation">;</span><span class="token property">overflow</span><span class="token punctuation">:</span> hidden</span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span><span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode">#eee</span><span class="token punctuation">;</span><span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

</code></pre>
<p>效果如图：</p>
<p><img src="https://pic4.zhimg.com/80/v2-cc8365db5c9cc5ca003ce9afe88592e7_hd.png" alt=""></p>
<p><strong>3. BFC 可以阻止元素被浮动元素覆盖</strong></p>
<p>先来看一个文字环绕效果：</p>
<pre class=" language-html"><code class="prism  language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span><span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">100</span>px<span class="token punctuation">;</span><span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span><span class="token property">background</span><span class="token punctuation">:</span> lightblue</span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>我是一个左浮动的元素<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">200</span>px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">200</span>px<span class="token punctuation">;</span><span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode">#eee</span></span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

</code></pre>
<p><img src="https://pic4.zhimg.com/80/v2-dd3e636d73682140bf4a781bcd6f576b_hd.png" alt=""></p>
<p>这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入  <strong>overflow: hidden</strong>，就会变成：</p>
<p><img src="https://pic3.zhimg.com/80/v2-5ebd48f09fac875f0bd25823c76ba7fa_hd.png" alt=""></p>
<p>这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。</p>

