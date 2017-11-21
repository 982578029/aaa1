//定义一些工具方法
var Util={
	/**
	 * 获取模板内容
	 * @id     元素的id
	 * return  模板的内容
	 */
	tpl:function(id) {
		return document.getElementById(id).innerHTML;
	},
	/**
	*获取异步数据的方法
	*@url    请求地址
	* @fn    成功时候的回调函数
	*
	 **/
	 ajax:function(url,fn){
	 	//创建xhr对象
	 	var xhr=new XMLHttpRequest();
	 	//监听事件
	 	xhr.onreadystatechange=function(){
	 		//监听 readystate
		if(xhr.readyState===4){                          
			// xhr.readyState===0  打开链接 （请求未初始化）
			// xhr.readyState===1  换数据 （服务器建立连接）
			// xhr.readyState===2  接数据 （请求已接受）
			// xhr.readyState===3  还没接收完成 （请求处理中）
			// xhr.readyState===4  接收完成 （请求已完成，且相应已就绪）
	 			 if(xhr.status==200){
	 			 	// 状态码 xhr.status==200  "OK 表示响应已就绪"
	 			 	// 状态码 xhr.status==404  "未找到页面" 
	 			 }
	 		}
	 	}
	 	//打开请求
	 	xhr.open('GET',url,true)
	 	//发送数据
	 	xhr.send(null)
	 }
}

// 第二步 定义组件
// 首页组件
var Home=Vue.extend({
	template:Util.tpl('tpl_home')
})
// 列表页组件
var List=Vue.extend({
	template:Util.tpl('tpl_list')
})
// // 详情页组件
var Detail=Vue.extend({
	template:'<h1>Detail</h1>'
})

// 第三步 注册组件  

Vue.component('home',Home)
Vue.component('list',List)
Vue.component('detail',Detail)

// 第一步 实例化vue
var app=new Vue({
	el:"#app",
	data:{
		// msg:'jhsakf'
		// 定义切换组件的变量
		view:'home',
		query:[]
	}
})
// 定义路由方法
function route(){
	//获取hash
	var hash=window.location.hash;  // #/list/type/1
	// console.log(hash)
	//删除# #/list/type/1=>  /list/type/1
	hash=hash.slice(1)
	//删除可能存在  /list/type/1  => list/type/1
	hash=hash.replace(/^\//,'')
	//切割hash字段   list/type/1  => ["list","type","1"]
	hash=hash.split('/')
	// var hash1=window.location.hash.slice(1).replace(/^\//,'').split('/')
	// console.log(hash1)
	// route();
//定义组件名称映射表
	var map={
		home:true,
		list:true,
		detail:true
	}
	//根据hash[0]决定渲染那个组件，就是切换app.view值
	//要判断hash[0]是否可以切换
	if(map[hash[0]]){
		app.view=hash[0]
		//否则进入默认路由，首页
	}else{
		app.view='home'
	}
	//将路由参数保存在参数中，后面要根据路由参数，请求数据
	app.query=hash.slice(1);
}
//绑定hashchange事件
window.addEventListener('hashchange',route)
//页面加载后会触发load事件，此时也要检测路由
window.addEventListener('load',route)
