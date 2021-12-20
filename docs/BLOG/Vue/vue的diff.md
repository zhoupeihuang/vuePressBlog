---
title: vue的diff
date: 2021-12-17 10:50:23
permalink: /pages/0e30f8/
categories:
  - jinjie
tags:
  - 
---

<h2 id="前言">前言</h2>
<p>我的目标是写一个非常详细的关于diff的干货，所以本文有点长。也会用到大量的图片以及代码举例，目的让看这篇文章的朋友一定弄明白diff的边边角角。</p>
<p>先来了解几个点…</p>
<h3 id="当数据发生变化时，vue是怎么更新节点的？">1. 当数据发生变化时，vue是怎么更新节点的？</h3>
<p>要知道渲染真实DOM的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排，有没有可能我们只更新我们修改的那一小块dom而不要更新整个dom呢？diff算法能够帮助我们。</p>
<p>我们先根据真实DOM生成一颗<code>virtual DOM</code>，当<code>virtual DOM</code>某个节点的数据改变后会生成一个新的<code>Vnode</code>，然后<code>Vnode</code>和<code>oldVnode</code>作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使<code>oldVnode</code>的值为<code>Vnode</code>。</p>
<p>diff的过程就是调用名为<code>patch</code>的函数，比较新旧节点，一边比较一边给<strong>真实的DOM</strong>打补丁。</p>
<h3 id="virtual-dom和真实dom的区别？">2. virtual DOM和真实DOM的区别？</h3>
<p>virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。比如dom是这样的：</p>
<pre><code>&lt;div&gt;
    &lt;p&gt;123&lt;/p&gt;
&lt;/div&gt;
</code></pre>
<p>对应的virtual DOM（伪代码）：</p>
<pre><code>var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
</code></pre>
<p>（温馨提示：<code>VNode</code>和<code>oldVNode</code>都是对象，一定要记住）</p>
<h3 id="diff的比较方式？">3. diff的比较方式？</h3>
<p>在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。</p>
<pre><code>&lt;div&gt;
    &lt;p&gt;123&lt;/p&gt;
&lt;/div&gt;

&lt;div&gt;
    &lt;span&gt;456&lt;/span&gt;
&lt;/div&gt;
</code></pre>
<p>上面的代码会分别比较同一层的两个div以及第二层的p和span，但是不会拿div和span作比较。在别处看到的一张很形象的图：</p>
<p><img src="https://i.loli.net/2021/04/23/AfmHDBaV6qPMeX9.png" alt="image.png"></p>
<h2 id="diff流程图">diff流程图</h2>
<p>当数据发生改变时，set方法会让调用<code>Dep.notify</code>通知所有订阅者Watcher，订阅者就会调用<code>patch</code>给真实的DOM打补丁，更新相应的视图。</p>
<p><img src="https://i.loli.net/2021/04/23/4q9v7JPTEgQmw6B.png" alt="image.png"></p>
<h2 id="具体分析">具体分析</h2>
<h3 id="patch">patch</h3>
<p>来看看<code>patch</code>是怎么打补丁的（代码只保留核心部分）</p>
<pre><code>function patch (oldVnode, vnode) { // some code
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl)  // 父元素
        createEle(vnode)  // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null }
    } // some code 
    return vnode
}
</code></pre>
<p>patch函数接收两个参数<code>oldVnode</code>和<code>Vnode</code>分别代表新的节点和之前的旧节点</p>
<ul>
<li>
<p>判断两节点是否值得比较，值得比较则执行<code>patchVnode</code></p>
<p>function sameVnode (a, b) { return (<br>
a.key === b.key &amp;&amp;  // key值<br>
a.tag === b.tag &amp;&amp;  // 标签名<br>
a.isComment === b.isComment &amp;&amp;  // 是否为注释节点<br>
// 是否都定义了data，data包含一些具体信息，例如onclick , style<br>
isDef(a.data) === isDef(b.data) &amp;&amp; sameInputType(a, b) // 当标签是的时候，type必须相同<br>
)<br>
}</p>
</li>
<li>
<p>不值得比较则用<code>Vnode</code>替换<code>oldVnode</code></p>
</li>
</ul>
<p>如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明<code>Vnode</code>完全被改变了，就可以直接替换<code>oldVnode</code>。</p>
<p>虽然这两个节点不一样但是他们的子节点一样怎么办？别忘了，diff可是逐层比较的，如果第一层不一样那么就不会继续深入比较第二层了。（我在想这算是一个缺点吗？相同子节点不能重复利用了…）</p>
<h3 id="patchvnode">patchVnode</h3>
<p>当我们确定两个节点值得比较之后我们会对两个节点指定<code>patchVnode</code>方法。那么这个方法做了什么呢？</p>
<pre><code>patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children if (oldVnode === vnode) return
    if (oldVnode.text !== null &amp;&amp; vnode.text !== null &amp;&amp; oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode) if (oldCh &amp;&amp; ch &amp;&amp; oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
</code></pre>
<p>这个函数做了以下事情：</p>
<ul>
<li>找到对应的真实dom，称为<code>el</code></li>
<li>判断<code>Vnode</code>和<code>oldVnode</code>是否指向同一个对象，如果是，那么直接<code>return</code></li>
<li>如果他们都有文本节点并且不相等，那么将<code>el</code>的文本节点设置为<code>Vnode</code>的文本节点。</li>
<li>如果<code>oldVnode</code>有子节点而<code>Vnode</code>没有，则删除<code>el</code>的子节点</li>
<li>如果<code>oldVnode</code>没有子节点而<code>Vnode</code>有，则将<code>Vnode</code>的子节点真实化之后添加到<code>el</code></li>
<li>如果两者都有子节点，则执行<code>updateChildren</code>函数比较子节点，这一步很重要</li>
</ul>
<p>其他几个点都很好理解，我们详细来讲一下updateChildren</p>
<h3 id="updatechildren">updateChildren</h3>
<p>代码量很大，不方便一行一行的讲解，所以下面结合一些示例图来描述一下。</p>
<pre><code>updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0 let oldEndIdx = oldCh.length - 1 let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1 let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before while (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) { if (oldStartVnode == null) {   // 对于vnode.key的比较，会把oldVnode = null
            oldStartVnode = oldCh[++oldStartIdx] 
        }else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        }else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        }else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else { // 使用key时的比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
 }
            idxInOld = oldKeyToIdx[newStartVnode.key] if (!idxInOld) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            } else {
                elmToMove = oldCh[idxInOld] if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                }else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    } if (oldStartIdx &gt; oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    }else if (newStartIdx &gt; newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
</code></pre>
<p>先说一下这个函数做了什么</p>
<ul>
<li>将<code>Vnode</code>的子节点<code>Vch</code>和<code>oldVnode</code>的子节点<code>oldCh</code>提取出来</li>
<li><code>oldCh</code>和<code>vCh</code>各有两个头尾的变量<code>StartIdx</code>和<code>EndIdx</code>，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了<code>key</code>，就会用<code>key</code>进行比较，在比较的过程中，变量会往中间靠，一旦<code>StartIdx&gt;EndIdx</code>表明<code>oldCh</code>和<code>vCh</code>至少有一个已经遍历完了，就会结束比较。</li>
</ul>
<h4 id="图解updatechildren">图解updateChildren</h4>
<p>终于来到了这一部分，上面的总结相信很多人也看得一脸懵逼，下面我们好好说道说道。（这都是我自己画的，求推荐好用的画图工具…）</p>
<p>粉红色的部分为oldCh和vCh</p>
<p><img src="https://i.loli.net/2021/04/23/KXRnmsFyHZCEoaz.png" alt="image.png"></p>
<p>我们将它们取出来并分别用s和e指针指向它们的头child和尾child</p>
<p><img src="https://i.loli.net/2021/04/23/xcMCj4N7YyeR9Eb.png" alt="image.png"></p>
<p>现在分别对<code>oldS、oldE、S、E</code>两两做<code>sameVnode</code>比较，有四种比较方式，当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，这句话有点绕，打个比方</p>
<ul>
<li>如果是oldS和E匹配上了，那么真实dom中的第一个节点会移到最后</li>
<li>如果是oldE和S匹配上了，那么真实dom中的最后一个节点会移到最前，匹配上的两个指针向中间移动</li>
<li>如果四种匹配没有一对是成功的，那么遍历<code>oldChild</code>，<code>S</code>挨个和他们匹配，匹配成功就在真实dom中将成功的节点移到最前面，如果依旧没有成功的，那么将<code>S对应的节点</code>插入到dom中对应的<code>oldS</code>位置，<code>oldS</code>和<code>S</code>指针向中间移动。</li>
</ul>
<p>再配个图</p>
<p><img src="https://i.loli.net/2021/04/23/VJGhUOtXpD7eLRT.png" alt="image.png"></p>
<ul>
<li>第一步</li>
</ul>
<p>oldS = a, oldE = d；<br>
S = a, E = b;</p>
<p><code>oldS</code>和<code>S</code>匹配，则将dom中的a节点放到第一个，已经是第一个了就不管了，此时dom的位置为：a b d</p>
<ul>
<li>第二步</li>
</ul>
<p>oldS = b, oldE = d；<br>
S = c, E = b;</p>
<p><code>oldS</code>和<code>E</code>匹配，就将原本的b节点移动到最后，因为<code>E</code>是最后一个节点，他们位置要一致，这就是上面说的：<strong>当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置</strong>，此时dom的位置为：a d b</p>
<ul>
<li>第三步</li>
</ul>
<p>oldS = d, oldE = d；<br>
S = c, E = d;</p>
<p><code>oldE</code>和<code>E</code>匹配，位置不变此时dom的位置为：a d b</p>
<ul>
<li>第四步</li>
</ul>
<p>oldS++;<br>
oldE–;<br>
oldS &gt; oldE;</p>
<p>遍历结束，说明<code>oldCh</code>先遍历完。就将剩余的<code>vCh</code>节点根据自己的的index插入到真实dom中去，此时dom位置为：a c d b</p>
<p>一次模拟完成。</p>
<p>这个匹配过程的结束有两个条件：</p>
<ul>
<li><code>oldS &gt; oldE</code>表示<code>oldCh</code>先遍历完，那么就将多余的<code>vCh</code>根据index添加到dom中去（如上图）</li>
<li><code>S &gt; E</code>表示vCh先遍历完，那么就在真实dom中将区间为<code>[oldS, oldE]</code>的多余节点删掉</li>
</ul>
<p><img src="https://i.loli.net/2021/04/23/uix71l5eOSZFYfC.png" alt="image.png"></p>
<p>下面再举一个例子，可以像上面那样自己试着模拟一下</p>
<p><img src="https://i.loli.net/2021/04/23/Yu6G3BInHOCZtPp.png" alt="image.png"></p>
<p>当这些节点<code>sameVnode</code>成功后就会紧接着执行<code>patchVnode</code>了，可以看一下上面的代码</p>
<p>if (sameVnode(oldStartVnode, newStartVnode)) {<br>
patchVnode(oldStartVnode, newStartVnode)<br>
}</p>
<p>就这样层层递归下去，直到将oldVnode和Vnode中的所有子节点比对完。也将dom的所有补丁都打好啦。那么现在再回过去看updateChildren的代码会不会容易很多呢？</p>
<h2 id="总结">总结</h2>
<p>以上为diff算法的全部过程，放上一张文章开始就发过的总结图，可以试试看着这张图回忆一下diff的过程。</p>
<p><img src="https://i.loli.net/2021/04/23/4q9v7JPTEgQmw6B.png" alt="image.png"></p>

