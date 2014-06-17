/*
	Color.js JavaScript Color transform Library version 0.0.0.1

	Copyright © www.w3csky.com 

	Email: westooy@gmail.com

	Author: sky 

	Date:2014-6-17 23:40:06+UTC 8:00

*/

	function $(id){return document.getElementById(id)};
	//getStyle()方法
	function getStyle(node,name){
		return node.currentStyle?node.currentStyle[name]:getComputedStyle(node,null)[name];
	};
	//颜色适配
	function colorAdapter(node,name){
		var result=getStyle(node,name);
		/*
			Code here!
		
		*/
	};
	//颜色变幻
	function colorTrans(node,t1,t2,t3,time){
		var start=0;
		var disX=t1-start;
		var disY=t2-start;
		var disZ=t3-start;
		//需要变化次数
		var count=parseInt((time*1000)/30);
		//记录当前变化次数
		var n=0;
		//Red Channel、Green Channel、Blue Channel animate speed
		var sX=parseFloat(disX/count);
		var sY=parseFloat(disY/count);
		var sZ=parseFloat(disZ/count);
		//Red Channel、Green Channel、Blue Channel  Value
		var cX=0;
		var cY=0;
		var cZ=0;
		clearInterval(node.timer);
		node.timer=setInterval(function(){
			n++;
			cX+=sX;
			cY+=sY;
			cZ+=sZ;
			node.style.backgroundColor='rgb('+parseInt(cX)+','+parseInt(cY)+','+parseInt(cZ)+')';
			
			if(n>=count){
				clearInterval(node.timer);
				console.log('cX_'+cX+'_cY_'+cY+'_cZ_'+cZ);
				node.style.backgroundColor='rgb('+t1+','+t2+','+t3+')';
			}	
			
		},30);
	
	};
