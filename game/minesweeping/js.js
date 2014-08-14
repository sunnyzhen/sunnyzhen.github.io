// JavaScript Document
var map;
var map2;
var gameWidth=10;
var gameHight=10;
var bomNum=10;
var bomList;
var iArray;
var memoryClickObj;
var memoryEvent;
var memoryBtn;
var rcArray;
var clickBtn;
var winGameFlag=0;
var timeCountTimer;
var boomCountTimer;

function createMap(){
	var check=document.getElementsByTagName("table")[0];
	check.cellPadding=0;
	check.cellSpacing=0;
	var row,cell;
	for(var i=0;i<gameWidth;i++){
		row=check.insertRow(-1);
		for(var j=0;j<gameHight;j++){
			cell=row.insertCell(-1);
			if(j==gameWidth-1)
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
    winGameFlag=0;
	timeCountBox.innerHTML=0;
	bomNumBox.innerHTML=bomNum;
}

function startGame(){
	bindEvent();
	rcArray=new Array;
	holdOnLayer.style.display="none";
	document.forms[0].startBtn.disabled="disabled";
    timeCount();
}

function stopGame(){
	holdOnLayer.style.display="block";
	document.forms[0].startBtn.disabled=null;
	clearTimeout(timeCountTimer);
}

function createGame(){
	map=new Array();
	map2=new Array();
	for(var i=0;i<gameWidth;i++){
		map[i]=new Array();
		map2[i]=new Array();
		for(var j=0;j<gameHight;j++){
			map[i][j]=0;
			map2[i][j]=0;
		}
	}
	if(bomNum>gameWidth*gameHight) return false;
	bomList=new Array();
	var memoryList=new Array(gameWidth*gameHight);
	for(var i=0;i<memoryList.length;i++) memoryList[i]=0;
	for(var i=0;i<bomNum;i++){
		var temNum=parseInt(Math.random()*gameWidth*gameHight);
		if(memoryList[temNum]>=1){ i-=1; continue;}
		memoryList[temNum]++;
		bomList[i]=temNum;
		map[parseInt(temNum/10)][temNum%10]=-1;//-1为炸弹位置
		map2[parseInt(temNum/10)][temNum%10]=-1;
	}//bomList存放炸弹的位置
	
	boomSideNumCheck();
	createItem();
}

function createItem(){
	for(var i=0;i<10;i++){
		for(var j=0;j<10;j++){
			var iBlock=document.createElement("i");
			iBlock.id="iBlock"+(i*10+j);
			iBlock.style.left=j*40+j+"px";
			iBlock.style.top=i*40+i+"px";
			iBlock.appendChild(document.createTextNode(map[i][j]));
			iBlockContainer.appendChild(iBlock);
			iBlock.oncontextmenu=function(){return false;}
		}	
	}
}

function boomSideNumCheck(){
	for(var i=0;i<bomList.length;i++){
		var num10=parseInt(bomList[i]/10);
		var num1=bomList[i]%10;
		if(typeof(map[num10-1])!="undefined"){
			if(map[num10-1][num1-1]>=0) map[num10-1][num1-1]++;
			if(map[num10-1][num1]>=0) map[num10-1][num1]++;
			if(map[num10-1][num1+1]>=0) map[num10-1][num1+1]++;
		}
		if(typeof(map[num10])!="undefined"){
			if(map[num10][num1-1]>=0) map[num10][num1-1]++;
			if(map[num10][num1+1]>=0) map[num10][num1+1]++;
		}
		if(typeof(map[num10+1])!="undefined"){
			if(map[num10+1][num1-1]>=0) map[num10+1][num1-1]++;
			if(map[num10+1][num1]>=0) map[num10+1][num1]++;
			if(map[num10+1][num1+1]>=0) map[num10+1][num1+1]++;
		}
	}

}

function bindEvent(){
	iArray=getElement(".iBlockContainer i");
	for(var i=0;i<iArray.length;i++){
		iArray[i].index=i;
		iArray[i].onmousedown=function(clickEvent){
			clickEvent=window.event?window.event:clickEvent;
			if(document.all){
				if(clickEvent.button==1){
					leftClick(this,clickEvent);
				}
				else if(clickEvent.button==2||clickEvent.button==0){//IE6 2为右，遨游0为右
					rightClick(this,clickEvent);
				}
				else if(clickEvent.button==3){//遨游检测到鼠标左右键同时按下，ie检测不到
					bothClick(this,clickEvent);
				}
				//bothClickCheck(this,clickEvent);
			}
			else{
				bothClickCheck(this,clickEvent);//ff鼠标左右键同时按下
			}
			
		}
	}
}

function unbindEvent(){
	for(var i=0;i<iArray.length;i++){
		iArray[i].onmousedown=null;
	}
}

function bothClickCheck(clickObj,clickEvent){
	if(typeof(memoryBtn)!="number") memoryBtn=clickEvent.button;
	else clickBtn=clickEvent.button;
	//alert(memoryBtn+" "+clickBtn);
	if(!memoryClickObj) memoryClickObj=clickObj;
	if(!memoryEvent) memoryEvent=clickEvent;
    if(typeof(clickBtn)!="number"){
		var timer=setTimeout(function(){
			if(typeof(clickBtn)!="number"){
				if(memoryBtn==0) leftClick(memoryClickObj,memoryEvent);
				else if(memoryBtn==2) rightClick(memoryClickObj,memoryEvent);
			}
			else bothClick(clickObj,clickEvent);
			memoryBtn=null; clickBtn=null; memoryClickObj=null; memoryEvent=null; clearTimeout(timer);
		},100);
	}
}

function bothClick(clickObj,clickEvent){
	var iBlockNum=parseInt(clickObj.id.replace(/iBlock/,""));
	var num10=parseInt(iBlockNum/10);
	var num1=iBlockNum%10;
	var sideBomNum=0;
	
	for(var i=-1;i<2;i++)
	for(var j=-1;j<2;j++){
		if(sideBomNum>map[num10][num1]) return false;
		if(typeof(map[num10+i])!="undefined"){
			if(map2[num10+i][num1+j]==10) {
				if(map[num10+i][num1+j]>=0){ showBoom(clickObj,(num10+i)*10+num1+j); loseGame(); return false; }
				else if(map[num10+i][num1+j]==-1) sideBomNum++;
			}
			
		}
	}
	if(sideBomNum<map[num10][num1]){
		for(var i=-1;i<2;i++)
		for(var j=-1;j<2;j++){
			if(typeof(map[num10+i])!="undefined"){
				if(map2[num10+i][num1+j]<=0) clickTips(document.getElementById("iBlock"+((num10+i)*10+num1+j)));
			}
		}
	}
	
	if(sideBomNum==map[num10][num1]&&sideBomNum!=0){//这里还是存在bug
		for(var i=-1;i<2;i++)
		for(var j=-1;j<2;j++){
			if(typeof(map[num10+i])!="undefined"){
				if(map2[num10+i][num1+j]!=10){
					if(num1==0&&j==-1||num1==9&&j==1) continue;
					leftClick(document.getElementById("iBlock"+((num10+i)*10+num1+j)),clickEvent);
				}
			}
		}
	}
	
}

function clickTips(clickObj){
	clickObj.style.backgroundColor="#fff";
	var tipsTimer=setTimeout(function(){
		clickObj.style.backgroundColor="";
		clearTimeout(tipsTimer);
	},300);
	
}



function leftClick(clickObj,clickEvent){
	var iBlockNum=parseInt(clickObj.id.replace(/iBlock/,""));
	var num10=parseInt(iBlockNum/10);
	var num1=iBlockNum%10;
	if(map2[num10][num1]==10) return false;
	
	if(parseInt(clickObj.innerHTML)>0){
		clickObj.style.backgroundColor="#fff";
		clickObj.style.textIndent="0px";
		map2[num10][num1]=1;
	}
	else if(parseInt(clickObj.innerHTML)==0){//向四个方向延伸检测
	    
		map2[num10][num1]=1;
		clickObj.style.backgroundColor="#fff";
		
		for(var i=-1;i<2;i++)
		for(var j=-1;j<2;j++){
			if(typeof(map[num10+i])!="undefined"){
				if(map[num10+i][num1+j]>=0&&map2[num10+i][num1+j]!=1) leftClick(document.getElementById("iBlock"+((num10+i)*10+num1+j)),clickEvent);
			}
		}
		
	}
	else{ //点到-1
	    showBoom(clickObj);
		loseGame();
		
	}
	winGameCheck(clickEvent);
}

function rightClick(clickObj,clickEvent){
	var iBlockNum=parseInt(clickObj.id.replace(/iBlock/,""));
	var num10=parseInt(iBlockNum/10);
	var num1=iBlockNum%10;
	if(map2[num10][num1]==1) return false;
	
	for(var i=0;i<rcArray.length;i++){
		if(clickObj==rcArray[i]){
			map2[num10][num1]=rcArray[i].index;
			clickObj.style.backgroundImage="";
			clickObj.style.textIndent="";
			rcArray.splice(i,1);
			bomNumBox.innerHTML=parseInt(bomNumBox.innerHTML)+1;
			return false;
		}
	}
	clickObj.style.backgroundImage="url(images/find.jpg)";
	clickObj.style.textIndent="-9999px";
	clickObj.index=parseInt(clickObj.innerHTML);
	map2[num10][num1]=10;
	rcArray.push(clickObj);
	winGameCheck(clickEvent);
	bomNumBox.innerHTML=parseInt(bomNumBox.innerHTML)-1;
	
}

function winGameCheck(clickEvent){
    var temBoomNum=0;
	if(clickEvent.button==0){
		var winCount=0;
		for(var i=0;i<map2.length;i++)
			for(var j=0;j<map2[0].length;j++){
				if(map2[i][j]==1) winCount++;
			}
		if(winCount==gameWidth*gameHight-bomNum){
			if(winGameFlag==0){
				winGameFlag=1;
				for(var i=0;i<bomList.length;i++){
					var temNum=map2[parseInt(bomList[i]/10)][bomList[i]%10];
					if(temNum==-1) rightClick(document.getElementById("iBlock"+bomList[i]),clickEvent);
				}
				winGame();
			}
			return false;
		}
	}
	else{
		for(var i=0;i<bomList.length;i++){
			if(map2[parseInt(bomList[i]/10)][bomList[i]%10]==-1) return false;
		}
		
		for(var i=0;i<map2.length;i++)
		for(var j=0;j<map2[0].length;j++){
			if(map2[i][j]==10) temBoomNum++;
		}
		
		if(temBoomNum==bomList.length){
			for(var i=0;i<map2.length;i++)
			for(var j=0;j<map2[0].length;j++){
				if(map2[i][j]==0) leftClick(document.getElementById("iBlock"+(i*10+j)),clickEvent);
			}
			if(winGameFlag==0){ winGameFlag=1; winGame();}
		}
	}
}

function loseGame(){
	unbindEvent();
	clearTimeout(timeCountTimer);
	alert("you lose!"); 
}

function winGame(){
	unbindEvent();
	clearTimeout(timeCountTimer);
	alert("you win!"); 
}

function timeCount(){
	timeCountTimer=setTimeout(function(){
		timeCountBox.innerHTML=parseInt(timeCountBox.innerHTML)+1;	
		timeCount();
	},1000);
	
}

function showBoom(clickObj,errorNum){
	var iBlockNum=parseInt(clickObj.id.replace(/iBlock/,""));
	var num10=parseInt(iBlockNum/10);
	var num1=iBlockNum%10;
	map2[num10][num1]=1;
	for(var i=0;i<bomList.length;i++){
		if(map2[parseInt(bomList[i]/10)][bomList[i]%10]==-1){
			var temObj=document.getElementById("iBlock"+bomList[i]);
			temObj.style.backgroundImage="url(images/boom.jpg)";
		}
		else if(map[parseInt(bomList[i]/10)][bomList[i]%10]!=-1&&map2[parseInt(bomList[i]/10)][bomList[i]%10]==10){
			var temObj=document.getElementById("iBlock"+bomList[i]);
			temObj.style.backgroundImage="url(images/fuck.jpg)";
		}
	}
	if(errorNum){
		var temObj=document.getElementById("iBlock"+errorNum);
		temObj.style.backgroundImage="url(images/fuck.jpg)";
	}
	else
	clickObj.style.backgroundImage="url(images/fuck.jpg)";
}



























