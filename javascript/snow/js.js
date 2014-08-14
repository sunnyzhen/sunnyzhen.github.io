// JavaScript Document
function letItSnow(){
	var snowBox=document.getElementById("snowBox");
	var iArray=new Array();
	createSnow(snowBox,iArray);

}

function fallDown(temObj,iArray){
	var speed=2;
	var top=parseInt(temObj.style.top);
	if(top>510){//当到超过高度时候就删了它，减轻浏览器压力
		for(var i=0;i<iArray.length;i++){
			if(temObj==iArray[i]){
				iArray.splice(i,1);
				var snowBox=document.getElementById("snowBox");
				snowBox.removeChild(temObj);
				return false;
			}
		}
	}
	temObj.style.top=top+speed+"px";
	var wind=windBlow(temObj,top);
	temObj.style.left=parseInt(temObj.style.left)+wind*2+"px";
}

function windBlow(temObj,top){
	if(parseInt(Math.random())%2==1)
	return Math.sin(top/16);
	else return Math.cos(top/16);
}

function createSnow(snowBox,iArray){
	var temObj=document.createElement("i");
	var temText=document.createTextNode("*");
	temObj.appendChild(temText);
	temObj.style.left=parseInt(Math.random()*window.screen.width)+"px";
	temObj.style.top="0px";
	var temNum=parseInt(Math.random()*200);
	temObj.style.color="#"+temNum.toString(16)+temNum.toString(16)+temNum.toString(16);
	iArray.push(temObj);
	snowBox.appendChild(temObj);
	
	var temNum=0;
	while(temNum<10){
		temNum=parseInt(Math.random()*15);
	}
	temObj.style.fontSize=temNum+"px";
	
	var time=0;
	while(time<40){
		time=parseInt(Math.random()*50);
	}
	
	temObj.timer=setInterval(function(){
		fallDown(temObj,iArray);								
	},time);
	
	var snowInterval=0;
	while(snowInterval<500){
		snowInterval=parseInt(Math.random()*1000);
	}
	
	var createTimer=setTimeout(function(){
		createSnow(snowBox,iArray);	
		clearTimeout(createTimer);
	},snowInterval);
}






































































