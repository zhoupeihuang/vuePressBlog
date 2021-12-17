---


---

<h1 id="vue-cli-3.0-入门">vue-cli 3.0 入门</h1>
<p><code>此文章只针对入门的学习，简洁版操作请看第二篇**《vue-cli3.0入门》**</code></p>
<h2 id="简介">简介</h2>
<blockquote>
<p>Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能&gt;够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必&gt;花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵&gt;活性，无需 eject。</p>
</blockquote>
<h2 id="安装">安装</h2>
<pre><code> npm  install -g @vue/cli
</code></pre>
<h2 id="检测版本">检测版本</h2>
<pre><code> vue -version  //vue 3.** is right
</code></pre>
<h2 id="创建一个项目">创建一个项目</h2>
<pre><code> vue create hello-world
</code></pre>
<h3 id="选择预设">选择预设</h3>
<p>默认基本版，<br>
自定义选择版<br>
<img src="https://i.loli.net/2019/03/18/5c8f1130e4cb0.png" alt="cli-new-project.png"></p>
<h3 id="此处我们选择-自定义-供开发使用">此处我们选择 自定义 供开发使用</h3>
<p>选择项目需要的一些特性（此处我们选择需要Babel编译、TypeScript ,PWA ,使用Vue路由、Vue状态管理器、CSS预处理器、代码检测和格式化、以及单元测试，暂时不考虑端到端测试(E2E Testing)）<br>
<img src="https://i.loli.net/2019/03/18/5c8f1130e953e.png" alt="cli-select-features.png"></p>
<h4 id="pwa是什么">PWA是什么?</h4>
<blockquote>
<p>PWA == Progressive Web APP, 渐进式 Web 应用。<br>
实际上是通过 Web 技术编写出的一个网页应用，加上App Manifest和Service Worker来实现PWA的安装和离线缓存等功能。<br>
可以添加至主屏幕，点击主屏幕图标可以实现启动动画及隐藏地址栏<br>
实现离线缓存功能<br>
实现了消息推送<br>
PWA 的实现-Manifest 实现添加至主屏幕<br>
首先在index.html的head中引入manifest.json文件，尽可能早的引入</p>
</blockquote>
<h3 id="选择css预处理器语言，此处选择less">选择CSS预处理器语言，此处选择LESS</h3>
<p><img src="https://i.loli.net/2019/03/18/5c8f160499c93.png" alt="1196972-d2be541d362b1662.png"></p>
<p>vue-cli-2.png</p>
<h3 id="选择eslint的代码规范，此处使用-standard代码规范">2.4. 选择ESLint的代码规范，此处使用 Standard代码规范</h3>
<p><img src="https://i.loli.net/2019/03/18/5c8f1604aeb5f.png" alt="1196972-cf85c45a5d432058.png"></p>
<p>vue-cli-3.png</p>
<h3 id="选择何时进行代码检测，此处选择在保存时进行检测">2.5. 选择何时进行代码检测，此处选择在保存时进行检测</h3>
<p><img src="https://i.loli.net/2019/03/18/5c8f160489f17.png" alt="1196972-42088b0085a848c9.png"></p>
<p>vue-cli-4.png</p>
<h3 id="选择单元测试解决方案，此处选择-jest">2.6. 选择单元测试解决方案，此处选择 Jest</h3>
<p><img src="https://i.loli.net/2019/03/18/5c8f1604b06ae.png" alt="1196972-e631d9f71ab1e18a.png"></p>
<h3 id="选择-babel、postcss、eslint等配置文件存放位置，此处选择单独保存在各自的配置文件中">2.7. 选择 Babel、PostCSS、ESLint等配置文件存放位置，此处选择单独保存在各自的配置文件中</h3>
<p><img src="https://i.loli.net/2019/03/18/5c8f16047ad9d.png" alt="1196972-5dad67c616d6dc0c.png"></p>
<h3 id="配置完成后等待vue-cli完成初始化">2.8. 配置完成后等待Vue-cli完成初始化</h3>
<p><img src="https://i.loli.net/2019/03/18/5c8f1604b8012.png" alt="1196972-c27e74c06fadc518.png"></p>
<h3 id="vue-cli初始化完成后，根据提示，进入到vue-test项目中，并启动项目">2.9### vue-cli初始化完成后，根据提示，进入到vue-test项目中，并启动项目</h3>
<pre><code>// 进入到vue-test项目
cd vue-test
// - 启动服务
yarn serve  npm run serve
// - 打包编译
yarn build npm run bulid
// - 执行lint
yarn lint npm run lint
// - 执行单元测试
yarn test:unit npm run test
yarn == npm run 
</code></pre>
<h2 id="vue.config.js配置">3. vue.config.js配置</h2>
<p><em>PS：默认是没有的，需自己新建</em></p>
<h3 id="vue.config.js介绍">3.1 vue.config.js介绍</h3>
<p>此部分内容参考<a href="https://cli.vuejs.org/zh/config/">Vue-cli配置参考</a></p>
<blockquote>
<p><code>vue.config.js</code>是一个可选的配置文件，如果项目的（和package.json同级的）根目录中存在这个文件，那么它会被<code>@vue/cli</code>自动加载。你也可以使用<code>package.json</code>中的<code>vue</code>字段，但是注意这种写法需要你严格遵照JSON的格式来写。</p>
</blockquote>
<p>这个文件应该导出了一个包含了选项的对象</p>
<pre><code>// vue.config.js
module.exports = {
  // 选项...
}

</code></pre>
<h3 id="配置代理">3.2. 配置代理</h3>
<blockquote>
<p>如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置</p>
</blockquote>
<h4 id="devserver">devServer</h4>
<ul>
<li>Type: Object<br>
<a href="https://webpack.js.org/configuration/dev-server/">所有<code>webpack-dev-server</code>的选项</a>都支持.注意：
<ul>
<li>有些值像<code>host</code>、<code>port</code>和<code>https</code>可能会被命令行参数覆写</li>
<li>有些像<code>publicPath</code>和<code>historyApiFallback</code>不应该被修改，因为它们需要和开发服务器的baseUrl同步以保障正常工作</li>
</ul>
</li>
</ul>
<h4 id="devserver.proxy">devServer.proxy</h4>
<ul>
<li>Type:<code>string | object</code><br>
<code>devServer.proxy</code>可以是一个指向开发环境API服务器的字符串：</li>
</ul>
<pre><code>module.exports = {
  devServer: {
    proxy: 'http://localhost:4000' //或者 https://incsit.huaxiafinance.com/loan-after
  }
}

</code></pre>
<p>这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到<code>http://localhost:4000</code>。</p>
<p>如果你想要更多的代理控制行为，也可以使用一个 <code>path: options</code> 成对的对象。完整的选项可以查阅 <a href="https://github.com/chimurai/http-proxy-middleware#proxycontext-config">http-proxy-middleware</a> 。</p>
<p><code>vue-cli2.0</code>创建的项目的代理配置方式是修改<code>config/index.js</code>文件中的proxyTable:</p>
<p><img src="https://i.loli.net/2019/03/18/5c8f2047469cd.png" alt="22.png"></p>
<p>image.png</p>
<p><code>vue-cli3.0</code>的代理配置，直接将proxyTable中配置copy到devServer.proxy中即可：</p>
<pre><code>module.exports = {
  devServer: {
    proxy: {
     '/hrm/api': {
        //target: 'http://192.168.1.209:10751/', // Dev环境
        //  target: 'http://192.168.1.238:10751/', // Test环境
        // target: 'http://192.168.1.215:10751/', // Rls环境
        target: 'http://192.168.1.218:10751/', // 正式环境
        changeOrigin: true,
        autoRewrite: true,
        cookieDomainRewrite: true,
        pathRewrite: {
          '^/hrm/api/': '/'
        }
      }
    }
  }
}

</code></pre>
<h3 id="配置webpack其他选项">3.3. 配置Webpack其他选项</h3>
<p>参考：<a href="https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F">webpack简单的配置方式</a></p>
<p>调整webpack配置最简单的方式就是在<code>vue.config.js</code>中的<code>configureWebpack</code>选项提供一个对象：</p>
<pre><code>module.exports = {
  // 其他选项...
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
      //......
    ]
  }
}

</code></pre>
<blockquote>
<p><strong>警告</strong><br>
有些 webpack 选项是基于 vue.config.js 中的值设置的，所以不能直接修改。例如你应该修改 vue.config.js 中的 outputDir 选项而不是修改 output.path；你应该修改 vue.config.js 中的 baseUrl 选项而不是修改 output.publicPath。这样做是因为 vue.config.js 中的值会被用在配置里的多个地方，以确保所有的部分都能正常工作在一起。</p>
</blockquote>
<h2 id="环境变量和模式">环境变量和模式</h2>
<p><strong>模式</strong>是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式：</p>
<ul>
<li><code>development</code>  模式用于  <code>vue-cli-service serve</code></li>
<li><code>production</code>  模式用于  <code>vue-cli-service build</code>  和  <code>vue-cli-service test:e2e</code></li>
<li><code>test</code>  模式用于  <code>vue-cli-service test:unit</code></li>
</ul>
<p>注意模式不同于  <code>NODE_ENV</code>，一个模式可以包含多个环境变量。也就是说，每个模式都会将  <code>NODE_ENV</code>的值设置为模式的名称——比如在 development 模式下  <code>NODE_ENV</code>  的值会被设置为  <code>"development"</code>。</p>
<p>你可以通过为  <code>.env</code>  文件增加后缀来设置某个模式下特有的环境变量。比如，如果你在项目根目录创建一个名为  <code>.env.development</code>  的文件，那么在这个文件里声明过的变量就只会在 development 模式下被载入。</p>
<p>你可以通过传递  <code>--mode</code>  选项参数为命令行覆写默认的模式。例如，如果你想要在构建命令中使用开发环境变量，请在你的  <code>package.json</code>  脚本中加入：</p>
<pre><code>"dev-build": "vue-cli-service build --mode development",
"sit": "vue-cli-service build --mode sit",
"uat": "vue-cli-service build --mode uat",
</code></pre>
<p>那么，根目录下 就需要配置如下</p>
<p><img src="https://i.loli.net/2019/03/18/5c8f3745aff39.png" alt="微信截图_20190318140926.png"></p>
<p><strong><em>环境加载优先级</em></strong><br>
为一个特定模式准备的环境文件将会比一般的环境文件拥有更改的优先级。<br>
同一个key: <code>.env.[mode].local</code> &gt; <code>.env.[mode]</code> &gt; <code>.env</code></p>
<h2 id="在客户端侧代码中使用环境变量">在客户端侧代码中使用环境变量</h2>
<p><em><strong>只有以  <code>VUE_APP_</code>  开头的变量会被  <code>webpack.DefinePlugin</code>  静态嵌入到客户端侧的包中</strong></em>。你可以在应用的代码中这样访问它们：</p>
<pre><code>console.log(process.env.VUE_APP_SECRET)
</code></pre>
<p>也就是说，你申明axios的时候，你就可以通过判断当前的暂存环境变量来判断，现在运行那个<br>
baseUrl or publishPath <em>PS：从 Vue CLI 3.3 起已弃用，请使用[<code>publicPath</code>]</em>(<a href="https://cli.vuejs.org/zh/config/#publicPath">https://cli.vuejs.org/zh/config/#publicPath</a>)。</p>
<pre><code>// 举个例子来说 
import axios from  'axios'
// axios.defaults.baseURL = baseUrl

let baseUrl ='/api'
switch (process.env.VUE_APP_TYPE) {
		case  'development':
			baseUrl =  'https://easy-mock.com/mock/5b875b7db762eb26e90eb8f8/huaxiafinance-api/'
			break
		case  'sit':
			baseUrl =  'https://incsit.huaxiafinance.com/huaxiafinance-api/'
			break
		case  'uat':
			baseUrl =  'https://incuat.huaxiafinance.com/huaxiafinance-api/'
			break
		case  'production':
			baseUrl =  'https://inc.huaxiafinance.com/huaxiafinance-api/'
			break
		}

// 创建axios实例
const service = axios.create({
		baseURL: baseUrl, // api的base_url
		timeout:  30000 // 请求超时时间
})

</code></pre>

