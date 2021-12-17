---
title: vue toast 小提示
date: 2021-12-17 10:50:23
permalink: /pages/435376/
categories:
  - Vue
tags:
  - 
---


> 小错误提示

    // main.js
    import Vant from  'vant'
	import  'vant/lib/index.css'
  
  	Vue.use(Vant)
	import {	Toast	} from  'vant' 

	Toast.setDefaultOptions({
		duration:  3 *  1000,
		position:  'bottom'
	})

---
>  使用

    //a.vue
 
	this.$toast("文件过大，请重新编辑后再上传！") 
	

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMyNzE1NzQ3NF19
-->