/*
attax.js selector engineer version 0.0.0.1
Copyright © www.w3csky.com
Email: westooy@gmail.com
Author: sky 
Date:2014-5-15 17:59:06+UTC 8:00
*/

function getElementsByClassName(oParent,sClass){
	//浏览器自带支持getElementsByClassName()方法
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}
	else{
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
}

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
}

function getElements(str){
	//将str拆成n段
	var aEle=str.replace(/^\s+|\s+$/g, '').split(/\s+/g);
	var aParent=[document];	//父级
	var aChild=[];	//子级
	for(var i=0;i<aEle.length;i++){
		//通过父级获取子级元素
		aChild=getElementsByStr(aParent,aEle[i]);
		
		//设置子级为父级，循环往复
		aParent=aChild;
	}
	//循环结束，返回获取到的元素
	return aChild;
}
