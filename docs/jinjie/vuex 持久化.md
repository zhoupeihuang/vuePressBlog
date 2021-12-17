---


---

<h1 id="vuex-持久化">VUEX 持久化</h1>
<h2 id="安装">安装</h2>
<h3 id="第0步">第0步</h3>
<pre><code>npm install vuex vuex-persistedstate --save 
</code></pre>
<h2 id="初始化">初始化</h2>
<h3 id="第1步-main.js-引入store">第1步 main.js 引入store</h3>
<pre><code>// main.js
import store from  './store/index' 
    new Vue({
	    router,
	    store,
	    render: h =&gt;  h(App)
    }).$mount('#app')
</code></pre>
<h3 id="第2步-申明-getters-mutations--引入vuex-persistedstate">第2步 申明 getters mutations  引入vuex-persistedstate</h3>
<pre><code>//stroe
import Vue from  'vue'
import Vuex from  'vuex'
import getters from  './getters'
import mutations from  './mutations'
// vuex 持久化 插件 自动化 判定 存储 localStorage
import createPersistedState from  'vuex-persistedstate' 

Vue.use(Vuex)
const state = {
		userInfo: {
			token:'',          // 用户令牌		 
			orderNo:"",        // 订单号		 
			mobilePhone :"",   // 用户手机号		 
			name :"",          // 姓名
			appType :""       // app类型
		}	
	}
export default  new Vuex.Store({
	state,
	getters,
// 保存用户信息
mutations,
	plugins: [createPersistedState()],
	actions: { 
	}
})
</code></pre>
<h3 id="第3步--getters.js-实时监听state值变化">第3步  getters.js 实时监听state值变化</h3>
<pre><code>// getters.js
// 实时监听 access_token refresh_token productNo
// 实时监听state值的变化(最新状态)
	const getters = {
		token: state =&gt; state.userInfo.token,			 
		orderNo: state =&gt; state.userInfo.orderNo,			 
		mobilePhone: state =&gt; state.userInfo.mobilePhone,			 
		name: state =&gt; state.userInfo.name,			
		appType: state =&gt; state.userInfo.appType			
	}

export default getters
</code></pre>
<h3 id="第4步-mutations.js-同步事务-类似setters">第4步 mutations.js 同步事务 类似setters</h3>
<pre><code>// 同步事务
// 类似 赋值方法 setter
import {GET_USERINFO,} from  './mutation-types.js'

export default {
	// 保存用户信息
	[GET_USERINFO](state, obj) {
		Object.keys(obj).forEach(function(key){
			state.userInfo[key] = obj[key]
		}
}
</code></pre>
<h3 id="第5步-mutation-types.js-是方法名的集合-方便修改-与多人参与项目开发">第5步 mutation-types.js 是方法名的集合, 方便修改 与多人参与项目开发</h3>
<blockquote>
<p>一般来说全大写 加下划线 也可以 合在mutation一起写</p>
</blockquote>
<pre><code>export const GET_USERINFO =  'GET_USERINFO'
</code></pre>
<hr>
<h2 id="使用">使用</h2>
<h3 id="第7步-demo.vue-取值">第7步 Demo.vue 取值</h3>
<pre><code>//引入
import { mapState } from  'vuex'
export  default {
	name: 'home',
	data() {
		return {
			// 注意此处不需要申明 userInfo 来接收
		}
	},
//在computed 时定义 取值用处
	computed: {
		...mapState([
		'userInfo'
		])
	},
mounted() {
// console.log(this.userInfo);
// 初始化方法 取出userInfo
	this.init()
},
//方法内 修改值与取值
methods: {
	init() {
		// 此处即可取出
		console.log(this.userInfo);
			}
	}
}	
</code></pre>
<h3 id="第8步-demo.vue-赋值">第8步 Demo.vue 赋值</h3>
<pre><code>//引入
import { mapMutations, mapState } from  'vuex'
export  default {
	name: 'home',
	data() {
		return {
			// 注意此处不需要申明 userInfo 来接收
		}
	},
//在computed 时定义 取值用
	computed: {
		...mapState([
		'userInfo'
		])
	},
//修改值用的方法
...mapMutations(['GET_USERINFO']),
//方法内 修改值与取值
methods: {
	init() {
		// 此处即可取出
		console.log(this.userInfo);
			const param = {
				userId: '233'
			}
		getUserInfo(param).then(res  =&gt; {
			if (res.code ==  '0000') {
					this.GET_USERINFO({
						token:res.token,              // 用户令牌		 
						orderNo:res.orderNo,          // 订单号		 
						mobilePhone :res.mobilePhone,// 用户手机号		 
						name :res.name,              // 姓名
						appType :res.appType          // app类型
					})
					}
				})
			}
		}
	}
</code></pre>
<h2 id="注意">注意</h2>
<blockquote>
<p>不要额外的在 data内申明 <strong>userInfo</strong></p>
</blockquote>

