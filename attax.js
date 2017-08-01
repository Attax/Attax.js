/*
	Attax.js JavaScript Library version 0.0.0.2

	Copyright © www.w3csky.com 

	Email: westooy@gmail.com

	Author: sky 

	Date:2014-5-26 23:40:06+UTC 8:00

*/
(function(window){

	//defined attax object
	function attax(arg){
		//存放获取的元素节点
		this.elements=[];
		
		switch(typeof arg){
			case 'function':	//domready
				attax.ready(arg);
				break;
			case 'string':
				this.elements=getElements(arg);	//存放页面
				break;
			case 'object':
				if(arg.length){
					//this.elements=arg;
					if(arg instanceof Array){
						this.elements=arg;
					}
					else{
						for(var i=0;i<arg.length;i++){
							this.elements.push(arg[i]);
						}
					}
				}
				else{
					this.elements.push(arg);
				}
			break;
		};
		
	};

	//DOMReady()方法
	//调用ready()方法

	(function(attax){
		//判断DOMReady方法是否执行过
		var isReady=false;
		//存储需要执行的函数
		var readyList=[];

		var timer=null;

		attax.ready=function(fn){
			if(isReady){
				fn.call(document);
			}else{
				readyList.push(
						function(){
							return fn.call(this);
						}
					);
			}
			return this;
		}

		var onDOMReady=function(){
			for(var i=0;i<readyList.length;i++){
				readyList[i].apply(document);
			}
			readyList=null;
		}


		var bindReady=function(){
			if(isReady) return;
			isReady=true;
			onDOMReady.call(window);
			if(document.removeEventListener){
				document.removeEventListener('DOMContentLoaded',bindReady,false);
			} else if(document.attachEvent){
				document.detachEvent('onreadystatechange',bindReady);
				if(window==window.top){
					clearInterval(timer);
					timer=null;
				}
			}
		};

		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded',bindReady,false);
		}
		else if(document.attachEvent){
			document.attachEvent('onreadystatechange',function(){
				if((/loaded|complete/).test(document.readyState)){
					bindReady();
				}
			});

			if(window==window.top){
				timer=setInterval(function(){
					try{
						//在IE下面用doScroll能否执行来判断DOM是否加载完成
						isReady||document.documentElement.doScroll('left');
					}catch(e){
						return;
					}
					bindReady();
				},1)
			}
		}

	})(attax)




	//选取元素

	// getElementsByClassName()方法
	function getElementsByClassName(node,className){
		//浏览器自带支持getElementsByClassName()方法
		if(node.getElementsByClassName){
			return node.getElementsByClassName(className);
		}
		else{
			//获取所有标签
			var aEle=document.getElementsByTagName('*');
			//空数组存储获取到的className元素
			var result=[];
			//匹配sClass的正则
			var regExp=new RegExp('\\b'+className+'\\b');
			for(var i=0;i<aEle.length;i++){
				if(regExp.test(aEle[i].className)){
					result.push(aEle[i]);
				}
			}
			//循环结束后，返回所有className的元素
			return result;
		}
	};


	//addClass方法
	attax.prototype.addClass=function(className){
		for(var i=0;i<this.elements.length;i++){
			addClass(this.elements[i],className);
		}
	};
	//removeClass方法
	attax.prototype.removeClass=function(className){
		for(var i=0;i<this.elements.length;i++){
			removeClass(this.elements[i],className);
		}
	};
			
	//css方法
	attax.prototype.css=function(name,value){
		if(arguments.length==2){
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].style[name]=value;
			};
		}
		else if(typeof name=='string'){
			var node=this.elements[0];
			return getStyle(node,name);
		}else{
			//如果传进来的是json，批量设置
			for(var i=0;i<this.elements.length;i++){
				
				for(var j in name){
					//j  属性名
					//name[j] 属性值
					this.elements[i].style[j]=name[j];
				}
			};
		}
	};
	
	//attr方法
	attax.prototype.attr=function(name,value){
		if(arguments.length==2){
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].setAttribute(name,value);
			}
		}
		else if(typeof name=='string'){
			var node=this.elements[0];
			return node.getAttribute(name);
		}
		else{	//批量设置
			for(var i=0;i<this.elements.length;i++){
				for(var j in name){
					this.elements[i].setAttribute(j,name[j]);
				}
			};
		};
	};
	
	//html方法
	attax.prototype.html=function(str){
		if(arguments.length==1){
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].innerHTML=str;
			}
		}else{
			var node=this.elements[0];
			return node.innerHTML;
		}
	};
	
	
	//动画
	attax.prototype.animate=function(json,params){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length==2){
				Move(this.elements[i],json,params);
			}else{
				Move(this.elements[i],json);
			}
			
		};
	};
	
	//each方法
	attax.prototype.each=function(fn){
		for(var i=0;i<this.elements.length;i++){
			fn.call(this.elements[i],i,this.elements[i]);
		}
	};
	
	//get方法
	attax.prototype.get=function(n){
		return this.elements[n];
	};
	
	//eq方法
	attax.prototype.eq=function(n){
		return $(this.elements[n]);
	};
	
	
	//find方法
	
	attax.prototype.find=function(str){
		
		var aEle=getElements(str,this.elements);
		//console.log(typeof aEle);
		return $(aEle);
		
	};
	
	


	//解析 选择器字符
	function getElementsByStr(aParent,str){
		var aChild=[];
		for(var i=0;i<aParent.length;i++){
			//判断str是#id|.class|tagName
			switch(str.charAt(0)){
				case '#':	//id
					var aEle=document.getElementById(str.substring(1));
					aChild.push(aEle);
					break;
				case '.':	//class
					var aEle=getElementsByClassName(aParent[i],str.substring(1));
					for(var j=0;j<aEle.length;j++){
						aChild.push(aEle[j]);
					}
					break;
				default:	//标签tagName
					//li.box input[value=0.35] li:first li
					//li.box
					if(/\w+\.\w+/.test(str)){
						var aStr=str.split('.');
						//aStr[0] 	li		标签
						//aStr[1] 	.box	 class
						//1.按照标签筛选
						var aEle=aParent[i].getElementsByTagName(aStr[0]);
						
						//2.按照class再筛选
						var regExp=new RegExp('\\b'+aStr[1]+'\\b');
						
						for(var j=0;j<aEle.length;j++){
							if(regExp.test(aEle[j].className)){
								aChild.push(aEle[j]);
							}
						}
					}	//li#box
					else if(/^\w+#\w+$/.test(str)){
						var aStr=str.split('#');
						//aStr[0]		标签
						//aStr[1]		ID
						
						var aEle=aParent[i].getElementsByTagName(aStr[0]);
						
						for(var j=0;j<aEle.length;j++){
							if(aEle[j].id==aStr[1]){
								aChild.push(aEle[j]);
							}
						}
					}

					//input[type=button]
					else if(/^\w+\[\w+=.+\]$/.test(str)){
						var aStr=str.split(/\[|=|\]/g);
						//aStr[0]		input 标签
						//aStr[1]		type 属性名
						//aStr[2]		button 属性值
						var aEle=aParent[i].getElementsByTagName(aStr[0]);
						
						for(var j=0;j<aEle.length;j++){
							if(aEle[j].getAttribute(aStr[1])==aStr[2]){
								aChild.push(aEle[j]);
							}
						}
					
					}//li:first		li:eq(xxx)
					else if(/^\w+:\w+(\(\w+\))?$/.test(str)){
						var aStr=str.split(/:|\(|\)/g);
						//aStr[0]		li       标签
						//aStr[1]		first/eq 伪类名
						//aStr[2]		         伪类值
						
						var aEle=aParent[i].getElementsByTagName(aStr[0]);
						
						switch(aStr[1]){
							case 'eq':
								var num=parseInt(aStr[2]);
								
								if(!isNaN(num)&&num>0&&num<aEle.length){
									//获取索引，插入aChild中
									aChild.push(aEle[num]);
								}
								break;
							case 'first':
								aChild.push(aEle[0]);
								break;
							case 'last':
								aChild.push(aEle[aEle.length-1]);
								break;
							case 'odd':
								for(var j=1;j<aEle.length;j+=2){
									aChild.push(aEle[j]);
								}
								break;
							case 'even':
								for(var j=1;j<aEle.length;j+=2){
									aChild.push(aEle[j]);
								}
								break;
						}
					}	
					else{	//普通标签tagName
							var aEle=aParent[i].getElementsByTagName(str);
							for(var j=0;j<aEle.length;j++){
								aChild.push(aEle[j]);
							}
							
					};
					break;
			}
		}
		return aChild;
	};


	//获取元素
	function getElements(str,aParent){
		//将str拆成n段
		var aEle=str.replace(/^\s+|\s+$/g, '').split(/\s+/g);
		aParent=aParent||[document];	//父级
		var aChild=[];	//子级
		for(var i=0;i<aEle.length;i++){
			//通过父级获取子级元素
			aChild=getElementsByStr(aParent,aEle[i]);
			
			//设置子级为父级，循环往复
			aParent=aChild;
		}
		//循环结束，返回获取到的元素
		return aChild;
	};		
			
			
			
	//addClass()方法

	function addClass(node,className){
		//perl风格的正则不支持字符串拼接，所以下面的方式不对
		//var regExp=/\b/+className+/\b/;
		 
		var regExp=new RegExp('\\b'+className+'\\b');
		if(!regExp.test(node.className)){
			if(node.className==''){
				node.className=className;
			}
			else{
				node.className+=' '+className;
			}
			 
		}
	};
	//removeClass()方法
	function removeClass(node,className){
		var regExp=new RegExp('\\b'+className+'\\b', 'g');
		node.className=node.className.replace(regExp,'').replace(/\s+/g,' ').replace(/^\s+\s+$/g,'');
	};

	
	//getStyle()方法
	function getStyle(node,name){
		return node.currentStyle?node.currentStyle[name]:getComputedStyle(node,null)[name];
	};
	
	//动画 Move
	function Move(node,json,options){
		options=options||{};
		options.type=options.type||'ease-out';
		options.time=options.time||700;
		var start={};
		var dis={};
		
		for(name in json){
			if(name=='opacity'){
				start[name]=Math.round(parseFloat(getStyle(node,name))*100);
			}else{
				start[name]=parseInt(getStyle(node,name));
				
			};
			//left top等css属性忘记设置时，默认使用缺省值
			if(isNaN(start[name])){
				switch(name)
				{
					case 'left':
						start[name]=node.offsetLeft;
						break;
					case 'top':
						start[name]=node.offsetTop;
						break;
					default:
						start[name]=0;
				}
			};
			dis[name]=json[name]-start[name];
		};
		
		
		var count=parseInt(options.time/30);//需要运动的次数
		var n=0;	//记录当前运动第几次
		
		clearTimeout(node.timer);
		node.timer=setInterval(function(){
			n++;
			for(name in json){
				switch(options.type){
					case 'linear':	//匀速运动
						var cur=start[name]+dis[name]*n/count;
						break;
					case 'ease-in':	//加速运动
						var x=n/count
						var cur=start[name]+dis[name]*(x*x);
						break;
					case 'ease-out':
						var x=1-n/count
						var cur=start[name]+dis[name]*(1-x*x);
						break;
				};
				if(name=='opacity'){
					node.style.filter='alpha(opacity:'+cur+')';
					node.style.opacity=cur/100;
				}else{
					node.style[name]=cur+'px';
				}
				
			};
			
			
			if(n==count){
				clearTimeout(node.timer);
				options.end&&options.end();
			}
			
		},30);
	};
	
	
	/*
		下一阶段要添加的方法类型
		
		ajax
		
		jsonp
		
		animate
		
		setCookie
		
		getCookie
		
		removeCookie
		
		preLoad
		
		lazyLoad
		
		
		
		
		
		事件队列
		
		事件委托
		
		数据类型校验
		数据类型转换
		
		
		后期(待定)
		noConflict()
		namespace
		moduleload
		
	
	*/
	
	
	
	
	


	//定义一个全局的$()，暴露$给使用者;
	function $(arg){
		return new attax(arg);
		//定义$()方法，返回attax的实例
	};

	
	
	//jsonp方法
	$.jsonp=function(url,data,options){
		
		var fnName='jsonp_'+Math.random();
		fnName=fnName.replace('.','');
		window[fnName]=function(json){
			options.success && options.success(json);
			options.complete && options.complete(json);
			
			//删除之前的jsonp产生的script标签
			oHead.removeChild(oS);
			window[fnName]=null;
			clearTimeout(timer);
		};
		
		//拼接url
		data[options.callback]=fnName;
		
		var arr=[];
		for(var name in data){
			arr.push(name+'='+encodeURIComponent(data[name]));
		};
		
		var sData=arr.join('&');
		
		//创建script
		var oS=document.createElement('script');
		oS.src=url+'?'+sData;
		console.log(oS.src);
		
		var oHead=document.getElementsByTagName('head')[0];
		oHead.appendChild(oS);
		
		timer=setTimeout(function(){
			options.fnTime && options.fnTime();
		},3000);	
			
		
	};




	
	
	
	//给$加插件机制
	//单一方式增加插件
	$.fn=attax.prototype;
	//批量增加插件
	$.fn.extend=function(json){
		for(var i in json){
			attax.prototype[i]=json[i];
		};
	};
	
	

	
	//暂时未添加noConflict机制，所以在$冲突的时候使用Attax作为命名空间
	
	window.Attax=window.$=$||{};
	
	
	
	
	//CMD version attax.js
	define(function (require, exports, module){
		return $;
	});
	


})(window);


(function(doc,att){
			var _attax=function $(selector){
						var aChild=[];
							switch(selector.charAt(0)){
								case '#':	//id
									var aEle=document.getElementById(selector.substring(1));
									aChild.push(aEle);
									break;
								case '.':	//class
									var aEle=getElementsByClassName(document,selector.substring(1));
									for(var j=0;j<aEle.length;j++){
										aChild.push(aEle[j]);
									}
									break;
							}
						return aChild;
					};
			function getElementsByClassName(parentNode,sClass){
				if(document.getElementsByClassName){
					return parentNode.getElementsByClassName(sClass);
				}else{
					//获取所有标签
					var aEle=document.getElementsByTagName('*');
					//空数组存储获取到的className元素
					var result=[];
					//匹配sClass的正则
					var regExp=new RegExp('\\b'+sClass+'\\b');
					for(var i=0;i<aEle.length;i++){
						if(regExp.test(aEle[i].className)){
							result.push(aEle[i]);
						}
					}
					//循环结束后，返回所有className的元素
					return result;
				}
			};
			
			(function(attax){
				//判断DOMReady方法是否执行过
				var isReady=false;
				//存储需要执行的函数
				var readyList=[];

				var timer=null;

				attax.ready=function(fn){
					if(isReady){
						fn.call(document);
					}else{
						readyList.push(
								function(){
									return fn.call(this);
								}
							);
					}
					return this;
				}

				var onDOMReady=function(){
					for(var i=0;i<readyList.length;i++){
						readyList[i].apply(document);
					}
					readyList=null;
				}


				var bindReady=function(){
					if(isReady) return;
					isReady=true;
					onDOMReady.call(window);
					if(document.removeEventListener){
						document.removeEventListener('DOMContentLoaded',bindReady,false);
					} else if(document.attachEvent){
						document.detachEvent('onreadystatechange',bindReady);
						if(window==window.top){
							clearInterval(timer);
							timer=null;
						}
					}
				};

				if(document.addEventListener){
					document.addEventListener('DOMContentLoaded',bindReady,false);
				}
				else if(document.attachEvent){
					document.attachEvent('onreadystatechange',function(){
						if((/loaded|complete/).test(document.readyState)){
							bindReady();
						}
					});

					if(window==window.top){
						timer=setInterval(function(){
							try{
								//在IE下面用doScroll能否执行来判断DOM是否加载完成
								isReady||document.documentElement.doScroll('left');
							}catch(e){
								return;
							}
							bindReady();
						},1)
					}
				}

			})(_attax)

			
			
			
			
			_attax.prototype={
				css:function(){
					
				}
				
				
			};
			
			//ajax、表单之类的
			function json2url(json) {
				var a = [];
				for (var i in json) {
					var v = json[i] + '';
					v = v.replace(/\n/g, '<br/>');
					v = encodeURIComponent(v);
					a.push(i + '=' + v);
				}
				return a.join('&');
			}

			
			_attax.ajax=function ajax(url, opt) {
						opt = opt || {};
						opt.data = opt.data || {};
						opt.data.t = opt.data.t || new Date().getTime();
						opt.method = opt.method || 'GET';

						var oAjax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

						if (opt.method == 'POST') {
							oAjax.open('POST', url, true);
							oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
							try {
								oAjax.send(opt.data ? json2url(opt.data) : null);
							} catch (e) {}
						} else {
							url += '?' + json2url(opt.data);
							oAjax.open('GET', url, true);
							try {
								oAjax.send();
							} catch (e) {}
						}

						oAjax.onreadystatechange = function() {
							if (oAjax.readyState == 4) {
								if (oAjax.status == 200) {
									opt.success && opt.success(oAjax.responseText);
								} else {
									opt.failed && opt.failed(oAjax.status);
								}
							}
						};
					};
					
			_attax.trim=function(str){
				 return str.replace(/(^\s*)|(\s*$)/g,'');
			};
			
			_attax.ltrim=function(str){
				 return str.replace(/(^\s*)/g,'');
			};
			_attax.ltrim=function(str){
				 return str.replace(/(\s*$)/g,'');
			}
					
			
			window.$=_attax;
		})(document,'attax');
