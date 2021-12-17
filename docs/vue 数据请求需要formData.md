

# 请求Data 转formData
> 某些特殊的请求 需要数据为表单格式
>

    utils/formData.js
    export const  toFormData  =  function (param){
		let data =  new FormData();
				for(let key in param){
					data.append(key, param[key]);
				}
				return data;
			}

	export const  toForm  =function(param){

	let formData =  new FormData();
		Object.keys(param).forEach(key => {
			formData.append(key, param[key]);
		});
			return formData
	}


> 引入

    // main.js
    Vue.prototype.$toFormData = toForm;

> 使用

    let Obj = { a:"123",b:"234" }
    let param = this.$toFormData(Obj)
    
    getTableInfo(param ).then(()=>{   
		// do something ...
	})

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NjQ4NjcyMjRdfQ==
-->