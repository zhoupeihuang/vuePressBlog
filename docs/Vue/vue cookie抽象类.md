
# cookie 操作
> 常用的cookie 操作类

    //utils/auth.js
    import Cookies from  'js-cookie'
	
	const TokenKey =  'Admin-Token'
		export  function  getToken() {
			return Cookies.get(TokenKey)
		}
		export  function  setToken(token) {
			return Cookies.set(TokenKey, token)
		}
		export  function  removeToken() {
			return Cookies.remove(TokenKey)
		}
---


> 使用

    import { getToken, setToken, removeToken } from  '@/utils/auth'
	// 新增token  data.token = 'admin'
	setToken(data.token)
	// 清除token 
	removeToken()
    // 验权 ||  取值
   getToken()
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTAzODc5OTc5OV19
-->