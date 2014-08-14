// JavaScript Document
var timer;
var countdownTimer;
var period=2000;
var score=0;
var iBlockArray;
var srcObj;
var desObj;
var pathList;

function createMap(){
	var check=document.getElementsByTagName("table")[0];
	check.cellPadding=0;
	check.cellSpacing=0;
	var row,cell;
	for(var i=0;i<10;i++){
		row=check.insertRow(-1);
		for(var j=0;j<10;j++){
			cell=row.insertCell(-1);
			if(j==9)
			cell.className="last";
			cell.innerHTML=i+"*"+j;
		}
	}
}

function addClass(object,className){
    var classString;
    if(document.all) classString=object.getAttribute("className");
	else classString=object.getAttribute("class");
	if(classString==null){
		if(document.all) object.setAttribute("className",className);
		else object.setAttribute("class",className);
	}
	else{
		classString+=" "+className;
		if(document.all) object.setAttribute("className",classString);
		else object.setAttribute("class",classString);
	}
}

function removeClass(object,className){
	var classString;
    if(document.all) classString=object.getAttribute("className");
	else classString=object.getAttribute("class");
	if(classString==null) return false;
	var classArray=classString.split(" ");
	for(var i=0;i<classArray.length;i++){
		if(classArray[i]!=className) continue;
		else{
			classArray.splice(i,1);
		}
	}
	classString=classArray.join(" ");
	if(document.all)object.setAttribute("className",classString);
	else object.setAttribute("class",classString);
}

function getElementsByClassName(className,root){
    var list=new Array();
	var temClass;
	if(!root)root=document.body;
	var array=root.getElementsByTagName("*");
	for(var i=0;i<array.length;i++){
	    if(document.all) temClass=array[i].getAttribute("className");
		else temClass=array[i].getAttribute("class");
		if(temClass==null)
			continue;
		var temList=temClass.split(" ");
		for(var j=0;j<temList.length;j++){
			if(temList[j]==className){ 
				list.push(array[i]);
			}
		}
	}
	return list;
}

function repeatCheck(checkList){
    for(var i=0;i<checkList.length;i++)
		for(var j=i+1;j<checkList.length;j++)
           if(checkList[i]===checkList[j]) checkList.splice(j,1);
	return checkList;
}

function getElement(string,rootArray){
    if(!rootArray){
		rootArray=new Array();
		rootArray[0]=document.body;
	}
	var temArray=string.split(" ");
	if(temArray.length==1){
	    var returnList=new Array();
		string=temArray[0];
	    while(rootArray.length){
			if(string.match(/^\#{1}/)){
				var temId=string.replace(/^\#{1}/,"");
				returnList.push(document.getElementById(temId));
			}
			else if(string.match(/^\.{1}/)){
				var temClass=string.replace(/^\.{1}/,"");
				var classList=getElementsByClassName(temClass,rootArray[0]);
				for(var i=0;i<classList.length;i++){
					returnList.push(classList[i]);
				}
			}
			else{
				var obj=rootArray[0].getElementsByTagName(string);
				if(obj) for(var i=0;i<obj.length;i++) returnList.push(obj[i]);
			}
			rootArray.shift();
		}
		
		return repeatCheck(returnList);
	}
	else{
	    var childArray=new Array();
		for(var i=0;i<rootArray.length;i++){
		        var arr=new Array(rootArray[i]);
				childArray=childArray.concat(getElement(temArray[0],arr));
			}
		if(temArray.length>1){
			temArray.shift();
			string=temArray.join(" ");
			return getElement(string,childArray);
		}
	}
}

function resetGame(){
	iBlockContainer.innerHTML="";
    createGame();
	holdOnLayer.style.display="none";
	document.forms[0].startBtn.disabled=null;
	document.forms[0].stopBtn.disabled=null;
	var countDownBox=getElement(".countDownBox")[0];
	countDownBox.innerHTML="60";
	var scoreBox=getElement(".scoreBox")[0];
	scoreBox.innerHTML="0";
}

function startGame(){
	iArray=getElement(".showBox i");
	bindEvent();
	holdOnLayer.style.display="none";
	document.forms[0].startBtn.disabled="disabled";
	pathList=new Array();
	countdownTimer=setInterval(countdown,1000);
}

function stopGame(){
	clearInterval(countdownTimer);
	holdOnLayer.style.display="block";
	document.forms[0].startBtn.disabled=null;
	 
}

function createGame(){
	var length=36;
	var temArray=new Array();
	var memoryArray=new Array();
	for(var i=0;i<=length/2;i++) memoryArray[i]=0;
	for(var i=0;i<length;i++){
		var num=Math.ceil(Math.random()*18);//var num=parseInt(Math.random()*50);//获得0的几率太低
		if(memoryArray[num]==2||num==0){
			i-=1;
			continue;
	    }
		else{
			temArray[i]=num;
			memoryArray[num]++;
		}
	}
	var k=0;
	for(var i=0;i<10;i++){
		if(i==0||i==3||i==6||i==9) continue;
		for(var j=0;j<10;j++){
			if(j==0||j==3||j==6||j==9) continue;
			var iBlock=document.createElement("i");
			iBlock.id="iBlock"+(i*10+j);
			iBlock.style.left=j*40+j+"px";
			iBlock.style.top=i*40+i+"px";
			iBlock.appendChild(document.createTextNode(temArray[k++]));
			iBlockContainer.appendChild(iBlock);
		}	
	}
}

function bindEvent(){
	for(var i=0;i<iArray.length;i++){
		iArray[i].onclick=function(){
			if(!srcObj||(srcObj!=null&&desObj!=null)){
				srcObj=this.id;
				addClass(this,"selected");
				pathList=new Array();
				pathList.push(this);//放入头
				desObj=null;
			}
			else if(!desObj&&this.id!=srcObj){
				desObj=this.id;
				for(var i=0;i<iArray.length;i++){
					if(iArray[i]) removeClass(iArray[i],"selected");
				}
				if(check()){
					pathList.push(this);//放入尾
					createPath();
					//alert(typeof(pathList[0]));
					iBlockContainer.removeChild(document.getElementById(pathList[0]));
					iBlockContainer.removeChild(this);	
					scoreCalculate();
					
/*					var str="";
					for(var i=0;i<pathList.length;i++){
						if(typeof(pathList[i])=="object")
						str+=pathList[i].id+" ";
						else str+=pathList[i]+" ";
					}
					alert(str);*/
					//alert("stop for a while");
					
					var clearPathTimer=setTimeout(function(){
						pathContainer.innerHTML="";
						pathList=new Array();
						clearTimeout(clearPathTimer);
						},200);
					
				}
			}
			//alert(srcObj+" "+desObj);
			if(getElement(".iBlockContainer")[0].childNodes.length==0){ clearInterval(countdownTimer); alert("you win!");}
		}
	}
}

function check(){
/*	var Element1=document.getElementById(srcObj);
	var Element2=document.getElementById(desObj);*/
	var Element1=getElement("#"+srcObj)[0];
	var Element2=getElement("#"+desObj)[0];
	if(parseInt(Element1.innerHTML)==parseInt(Element2.innerHTML))//不用&&减少判断，提高速度
		if(reach(srcObj,desObj)||reach2(srcObj,desObj)){
			return true;
		}
	return false;
}

/*function sideCheck(num){
	if(getElement("#iBlock"+(num+1))[0]&&getElement("#iBlock"+(num-1))[0]&&getElement("#iBlock"+(num+10))[0]&&getElement("#iBlock"+(num-10))[0])
	return false;
}*/

function reach(srcObj,desObj){
	var srcObjNum=parseInt(srcObj.replace(/iBlock/ig,""));
	var desObjNum=parseInt(desObj.replace(/iBlock/ig,""));
	if(srcObjNum>desObjNum){
		var num=srcObjNum;
		srcObjNum=desObjNum;
		desObjNum=num;
	}
	if(parseInt(srcObjNum/10)==parseInt(desObjNum/10)){ //直线检测 横
		for(var i=srcObjNum+1;i<desObjNum;i++){
			if(document.getElementById("iBlock"+i)){ return false;}
			else continue;
		}
		//alert("same line");
		return true;
	}
	else if(srcObjNum%10==desObjNum%10){  //直线检测 竖
		for(var i=srcObjNum+10;i<desObjNum;i+=10){
			if(document.getElementById("iBlock"+i)){ return false;}
			else continue;
		}
		return true;
	}
	
/*	var num10=parseInt(desObjNum/10);//拐1次弯检测 顺时针，逆时针没有实现
	var num1=srcObjNum%10;
	var vehicle="iBlock"+(num10*10+num1);
	if(reach("iBlock"+srcObjNum,vehicle)&&reach(vehicle,"iBlock"+desObjNum))
	return true;*/
	
/*	if(sideCheck(srcObjNum)||sideCheck(desObjNum))//提速
	return false;*/
	
	var vehicle1="iBlock"+(parseInt(desObjNum/10)*10+srcObjNum%10);
	var vehicle2="iBlock"+(parseInt(srcObjNum/10)*10+desObjNum%10);
	if(reach("iBlock"+srcObjNum,vehicle1)&&reach(vehicle1,"iBlock"+desObjNum)&&!document.getElementById(vehicle1)){
		pathList.push(vehicle1);
		return true;
	}
	if(reach("iBlock"+srcObjNum,vehicle2)&&reach(vehicle2,"iBlock"+desObjNum)&&!document.getElementById(vehicle2)){
		pathList.push(vehicle2);
		return true;
	}
    return false;
	
	
	
}


function reach2(srcObj,desObj){//拐2次弯检测
	var srcObjNum=parseInt(srcObj.replace(/iBlock/ig,""));
	var desObjNum=parseInt(desObj.replace(/iBlock/ig,""));
	if(srcObjNum>desObjNum){
		var num=srcObjNum;
		srcObjNum=desObjNum;
		desObjNum=num;
	}
	if(srcObjNum>parseInt(srcObjNum/10)*10){
		for(var i=srcObjNum-1;i>=parseInt(srcObjNum/10)*10;i--){
			if(document.getElementById("iBlock"+i)) break;
			else if(reach("iBlock"+i,"iBlock"+desObjNum)){pathList.push("iBlock"+i); return true;}
		}
	}
	if(srcObjNum<parseInt(srcObjNum/10)*10+9){
		for(var i=srcObjNum+1;i<=parseInt(srcObjNum/10)*10+9;i++){
			if(document.getElementById("iBlock"+i)) break;
			else if(reach("iBlock"+i,"iBlock"+desObjNum)){pathList.push("iBlock"+i); return true;}
		}
	}
	if(srcObjNum>srcObjNum%10){
		for(var i=srcObjNum-10;i>=srcObjNum%10;i-=10){
			if(document.getElementById("iBlock"+i)) break;
			else if(reach("iBlock"+i,"iBlock"+desObjNum)){pathList.push("iBlock"+i); return true;}
		}
	}
	if(srcObjNum<srcObjNum%10+90){
		for(var i=srcObjNum+10;i<=srcObjNum%10+90;i+=10){
			if(document.getElementById("iBlock"+i)) break;
			else if(reach("iBlock"+i,"iBlock"+desObjNum)){pathList.push("iBlock"+i); return true;}
		}
	}
	
    return false;
}

function createPathItem(index){
	var PathItemList=getElement(".pathItem");
	for(var i=0;i<PathItemList.length;i++){
		if(parseInt(PathItemList[i].id.replace(/pathItem/ig,""))==index) return;
	}
	var num10=parseInt(index/10);
	var num1=index%10;
	var pathItem=document.createElement("i");
	pathItem.className="pathItem";
	pathItem.id="pathItem"+index;
	pathItem.style.left=num1*40+num1+"px";
	pathItem.style.top=num10*40+num10+"px";
	pathContainer.appendChild(pathItem);
}

function createPath(){
	if(pathList.length>1){
		pathList[0]=pathList[0].id;
		pathList[pathList.length-1]=pathList[pathList.length-1].id;
		if(pathList.length==4){
			var pathList0=parseInt(pathList[0].replace(/iBlock/ig,""));
			var pathList3=parseInt(pathList[2].replace(/iBlock/ig,""));
			if(pathList0%10==pathList3%10||parseInt(pathList0/10)==parseInt(pathList3/10))
			{
				var temNum=pathList[1];
				pathList[1]=pathList[2];
				pathList[2]=temNum;
			}
		}
		for(var i=0;i<pathList.length-1;i++){
			var pathStartNum=parseInt(pathList[i].replace(/iBlock/ig,""));
			var pathEndNum=parseInt(pathList[i+1].replace(/iBlock/ig,""));
			if(pathEndNum<pathStartNum){
				var temObj=pathEndNum;
				pathEndNum=pathStartNum;
				pathStartNum=temObj;
			}
			if(pathEndNum-pathStartNum>=10){//垂直
				for(var j=pathStartNum;j<=pathEndNum;j+=10){
					createPathItem(j);
				}
			}
			else{//水平
				for(var j=pathStartNum;j<=pathEndNum;j++){
					createPathItem(j);
				}
			}
		}
	}
	
}

function countdown(){
	var countDownBox=getElement(".countDownBox")[0];
	var countDownNum=parseInt(countDownBox.innerHTML);
	if(countDownNum==0){ clearInterval(countdownTimer); alert("you lose!"); return;}
	countDownNum-=1;
	countDownBox.innerHTML=countDownNum;
}

function scoreCalculate(){
	var scoreBox=getElement(".scoreBox")[0];
	var scoreNum=parseInt(scoreBox.innerHTML);
	scoreBox.innerHTML=scoreNum+1;
}




