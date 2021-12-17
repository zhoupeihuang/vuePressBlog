---
title: vuex
date: 2021-12-17 10:50:23
permalink: /pages/8d8ea3/
categories:
  - Vue
tags:
  - 
---

# vuex 之简介
## 此文只针对 user 类做实例
### 核心概念 5大属性

 1. state：vuex的基本数据，用来存储变量 
 2. geeter：从基本数据(state)派生的数据，相当于state的计算属性    
 3. mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action)。每个 mutation 都有一个字符串的 事件类型    (type) 和 一个 回调函数 (handler)。 回调函数就是我们实际进行状态更改的地方，并且它会接受 state作为第一个参数，提交载荷作为第二个参数。
【例如：SET_TOKEN: (state, token) => {		state.token = token;		},】
 5. action：和mutation的功能大致相同，不同之处在于 ==》
	 (a). Action 提交的是 mutation，而不是直接变更状态。 
	 (b). Action 可以包含任意异步操作。
 6. modules：模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。通常表达为 【user.js 里面包含 state、mutation、action】



##例子目录结构
> 
├── store                               // 源代码
│   ├── modules                   // 模块化
│   │  ├── user.js                  // 同步 异步 操作 包含[mutations actions state]
│   ├── getters.js                  // 暴露出去的成员变量 【】
│   ├── index.js                     // 全局 store 入口文件 【初始化以及定义】



**store 初始化**
	
	// store/index.js
    import Vue from  'vue'
	import Vuex from  'vuex'
	import getters from  './getters'
	import user from  './modules/user'

  
	Vue.use(Vuex)

	const store =  new Vuex.Store({
		modules: {
			user,
			},
			getters
		})
	export default store

**getters 初始化**


    // getters.js
    const getters = {		
		token: state => state.user.token,
		avatar: state => state.user.avatar,
		name: state => state.user.name,
		id: state => state.user.id,
		roles: state => state.user.roles,
		status: state => state.user.status,
		userInfo:state => state.userInfo,	
		}
	export default getters

**/moudel/user.js**

    import { login, logout, getInfo } from  '@/api/user'
	import { getToken, setToken, removeToken } from  '@/utils/auth'
	import { resetRouter } from  '@/router'
	const  getDefaultState  = () => {
		return {
			token:  getToken(),
			introduction:  '',
			roles: [],
			setting: {
				articlePlatform: []
			},
				userInfo:[]
			}
	}

	  

	const state =  getDefaultState()
	const mutations = {
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_NAME: (state, name) => {
			state.name = name;
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar;
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles;
		},
		SET_USER_INFO: (state, avatar) => {
			state.avatar = avatar;
		},
		LOFIN_STATUS: (state, status) => {
			state.loginStatus = status;
		},
		SET_USERINFO:(state,data)=>{
			state.userInfo = data
		}
	}
	const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		return  new  Promise((resolve, reject) => {
			login({  username: username.trim(),  password: password }).then(response => {
			const data = response.data
				setToken(data.token)
				commit('SET_TOKEN', data.token)
				commit('SET_USERINFO',data)
				commit('LOFIN_STATUS', '已登录');
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	// get user info
	getInfo({ commit, state }) {
		return  new  Promise((resolve, reject) => {
			getInfo(state.token).then(response => {
				const data = response.data
				if (!data) { // 如果无 就登录
					reject('验证失败, 请重新登录！')
				}
				let roles = [response.data.roles]
				// data.id === 1 ? (roles = ['admin']) : (roles = ['editor']);
				const { name, avatar } = data
				commit('SET_ROLES', roles);
				commit('SET_USER_INFO', data);
				commit('SET_NAME', name);
				commit('SET_AVATAR', avatar)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
	},
	// user logout
	logout({ commit, state }) {
		removeToken() // must remove token first
			// commit('RESET_STATE')
			commit('SET_ROLES', []);
			commit('SET_TOKEN', ''); 
		},
	// 前端 登出
	FedLogOut({ commit }) {
		return  new  Promise(resolve => {
			commit('SET_TOKEN', '');
			commit('LOFIN_STATUS', '');
			removeToken();
			resolve();
		});
	},
	// remove token
	resetToken({ commit }) {
		return  new  Promise(resolve => {
			removeToken() // must remove token first
			// commit('RESET_STATE')
			resolve()
			})
		}
	}
	export default {
		namespaced: true,
		state,
		mutations,
		actions
	}


---
## 使用

### 取值
	// index.vue
    import { mapGetters } from  'vuex'
    computed: {
	    // 取出 store内的属性 name 无需在data申明
		...mapGetters([
			'name',
			'token',
			'avatar',
		])
	}
	// this.name 就是你可以取出的值
	或者
	this.$store.state.user.introduction
    
### 同步方法 
#### 存储user 的 state  此处没有直接 this.$store.commit()
####  因为都是先异步 再从异步内操作同步方法

---

    // store/modules/user.js
    const mutations = {
		SET_TOKEN: (state, token) => {
			state.token = token;
		},		
		LOFIN_STATUS: (state, status) => {
			state.loginStatus = status;
		},
		SET_USERINFO:(state,data)=>{
			state.userInfo = data
		}
	}

### 异步方法
---

    index.vue
    const actions = {
		// user login
		login({ commit }, userInfo) {
			const { username, password } = userInfo
				return  new  Promise((resolve, reject) => {
					login({  username: username.trim(),  password: password }).then(response => {
					  	const data = response.data
						setToken(data.token)
						commit('SET_TOKEN', data.token)
						commit('SET_USERINFO',data)
						commit('LOFIN_STATUS', '已登录');
						resolve()
					}).catch(error => {
						reject(error)
					})
		})
	}
	}

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMTc3NTc2NThdfQ==
-->