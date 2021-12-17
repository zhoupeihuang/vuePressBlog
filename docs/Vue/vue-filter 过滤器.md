---
title: vue-filter 过滤器
date: 2021-12-17 10:50:23
permalink: /pages/e9d53a/
categories:
  - jinjie
tags:
  - 
---
> vue filter 过滤器
>   过滤器作用就是输入或者后台返回一个code，通过过滤器，过滤成自己需要的字符串

    //main.js
    import Filters from  '@/utils/filter.js';
    //引入过滤函数
    for (let key in Filters){
         Vue.filter(key,Filters[key])
    }
----

    utils/filter.js
    const Filters = {
		// 是否打款的状态 过滤器
		// 0 未打款，
		// 1 已打款，
		// 2 打款失败，
		// 3 未打款且已超时
	isPay(isPay) {
		let isPayText =  "数据获取中..."
		switch (isPay) {
			case  0:
				return isPayText =  "未打款，"
				break;
			case  1:
				return isPayText =  "已打款，"
				break;
			case  2:
				return isPayText =  "打款失败，"
				break;
			case  3:
				return isPayText =  "未打款且已超时"
				break;
			}
	},
	// 受让状态 过滤器
	transformState(state) {
		let stateText =  "数据获取中..."
		switch (state) {
			case  0:
				return stateText =  "匹配中"
				break;
			case  1:
				return stateText =  "进行中"
				break;
			case  2:
				return stateText =  "审核中"
				break;
			case  3:
				return stateText =  "转让成功"
				break;
			case  4:
				return stateText =  "转让失败"
				break;
			case  5:
				return stateText =  "转让失败"//转让失败
				break;
			default:
				return stateText
				break;
		}
	},
	// 金额 过滤器
	NumFormat(value) {
		if (!value) return  '';
		/*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
		/*后来改成了 Number(value)|0,但是输入超过十一位就为负数了，具体见评论 */
		var intPart = Number(value) - Number(value) %  1; //获取整数部分（这里是windy93的方法）
		var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
		var floatPart =  ".00"; //预定义小数部分
		var value2Array = value.toString().split("."); 
		//=2表示数据有小数位
		if (value2Array.length ==  2) {
			floatPart = value2Array[1].toString(); //拿到小数部分
				if (floatPart.length ==  1) { //补0,实际上用不着
					return intPartFormat +  "." + floatPart +  '0';
				} else {
					return intPartFormat +  "." + floatPart;
				}
		} else {
			return intPartFormat + floatPart;
		}
	},
	// 姓名掩码
	nameMask(v) {
		var ming =  '**';
		let maskName =  "";
			if (v.length ==  4) {
				maskName = v.substring(0, v.length -  2) + ming
			}else if (v.length ==  3) {
				maskName = v.substring(0, v.length -  2) + ming
			} else {
				let ming2 =  ""
					for (var i =  0; i < v.length -  1; i++) {
						ming2 +=  "*"
					}
				maskName = v.substring(0, 1) + ming2
			}
				return maskName
			}
	}
	export default Filters


---
> 使用

    <span  class="tftb2 chaochang">转让人：{{ transferUserName | nameMask}}</span>
     // 或
    <span  class="PopNum"  v-show="num!=''">{{num|NumFormat}}</span>

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5NzI3MDM5MiwyMTQzMjIyODI3XX0=
-->