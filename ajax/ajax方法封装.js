
//ajax对象获得
function createXhr() {
    //ie7后  包括chrome firefox
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    return new ActiveXObject("Microsoft.XMLHTTP"); //1e7以前的生成方法
}

//1、请求方法method  GET/POST
//2、是否异步async  true/false
//3、请求地址url 以及数据data


//传递给ajax的参数格式如下
// var json={"method":"POST","async":"true","url":"1_get.php","data":{"name":"kitty","age":18,"sex":"female"}};

//ajax
function ajax(json){
	//首先获得ajax对象
	var xhr=createXhr();
	//请求方法method是否存在，如果存在，即方法就是设置值，否则，给一个默认值POST
	if(json.method){
		var method=json.method;
	}
	else{
		var method="POST";
	}
	//async 是否存在，如果存在，同步方式就是设置值，否则，给一个默认值true（异步）
	if(json.async){
		var async=json.async;
	}
	else{
		var async=true;
	}
	//请求地址是否存在，如果不存在，提醒用户设置url
	if(json.url){
		var url=json.url;
	}
	else{
		alert("请输入正确的请求地址");
		return false;//不再执行下面的代码
	}

	//请求方法是否为POST，是，即需要设置请求头 模拟成form表单而且xhr.open()和xhr.send()的形式也不同
	if(method=="POST"){
		xhr.open(method,url,async);
		//将ajax请求模拟成form表单
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	//请求方法是否为GET
	if(method=="GET"){
		url+='?'+deal();
		xhr.open(method,url,async);
	}
	//是否为异步传输，是，即需要设置监听函数 
	if(async==true){
			xhr.send(deal());
			xhr.onreadystatechange = function(){
			     if (xhr.readyState==4&&xhr.status==200) {
			         if(json.callback){//对callback 进行判断  必须
			             json.callback(xhr.responseText);
			             // console.log(xhr.responseText);
			         }
			     }
			}

		}
	//同步传输
	else{
		xhr.send(null);
	}
	//设置处理数据的函数
	function deal(){
		var result="",arr=[];
		if(json.data){
			for(var key in json.data){
				result=key+'='+json.data[key];
				arr.push(result);//得到类似["name=jack","age=22","sex=male"]的数组
			}
			var result=arr.join("&");//得到类似name=jack&age=22&sex=male的字符串
		}
		else{
			alert("数据为空");
			return false;
		}
		return result;
	}


}

