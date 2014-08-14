// JavaScript Document
var iBox;
var iArray;
var mouseBox;
var map;
var score;
var gameOver=false;

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

function createMap(){
	var chessboard=document.createElement("table");
	iArray=new Array();
	chessboard.className="chessboard_bg";
	chessboard.cellPadding=0;
	chessboard.cellSpacing=0;
	var row,cell;
	for(var i=0;i<14;i++){
		row=chessboard.insertRow(-1);
		for(var j=0;j<14;j++){
			cell=row.insertCell(-1);
			cell.innerHTML=i+"*"+j;
		}
	}
	
	iBox=document.createElement("div");
	iBox.className="iBox";
	for(var i=0;i<15;i++)
		for(var j=0;j<15;j++){
			var iObj=document.createElement("i");
			iObj.appendChild(document.createTextNode(i*15+j));
			iObj.style.left=j*41+1+"px";
			iObj.style.top=i*41+1+"px";
			iBox.appendChild(iObj);
			iArray.push(iObj);
	}
	
	chessboardBox.appendChild(chessboard);
	chessboardBox.appendChild(iBox);
}

function bindEvent(){
	for(var i=0;i<iArray.length;i++){
		iArray[i].index=i;
		iArray[i].oncontextmenu=function(){return false;}
			
		iArray[i].onclick=function(e){
			createPiece(iArray[this.index],0);
			winOrLose(iArray[this.index]);
			if(!gameOver){
				setScore();
				playChess();
				iArray[this.index].onclick=null;
			}
		}
		
		iArray[i].onmouseover=function(){
			mouseOverTips(iArray[this.index]);
		}
		iArray[i].onmouseout=function(){
			clearTips(iArray[this.index]);
		}
	}
}

function unbindEvent(){
	for(var i=0;i<iArray.length;i++){
		iArray[i].onclick=null;
		iArray[i].onmouseover=null;
		iArray[i].onmouseout=null;
	}
}

function createPiece(obj,num){
	var objLeft=parseInt(obj.style.left);
	var objTop=parseInt(obj.style.top);
	var num10=parseInt(obj.innerHTML/15);
	var num1=parseInt(obj.innerHTML%15);
	var pieceObj=document.createElement("div");
	
	addClass(pieceObj,"piece");
	if(num==0){ addClass(pieceObj,"black"); map[num10][num1][4]=0;}
	else if(num==1){ addClass(pieceObj,"white"); map[num10][num1][4]=1;}
	
	pieceObj.style.left=objLeft+12+"px";
	pieceObj.style.top=objTop+12+"px";
	
	pieceObj.appendChild(document.createElement("i"));
	pieceBox.appendChild(pieceObj);
	winOrLose(obj);
	
}

function startGame(){
	bindEvent();
	init();
	gameOver=false;
	holdOnLayer.style.display="none";
	document.forms[0].startBtn.disabled="disabled";
	document.forms[0].saveBtn.disabled=null;
	createPiece(iArray[112],1);
}

function stopGame(){
	holdOnLayer.style.display="block";
	document.forms[0].startBtn.disabled=null;
	var expiration=new Date(new Date().getTime()-60*60*1000);
}

function resetGame(){
	holdOnLayer.style.display="none";
	pieceBox.innerHTML="";
	document.forms[0].startBtn.disabled=null;
	document.forms[0].stopBtn.disabled=null;
	unbindEvent();
}

function restoreGame(){
	pieceBox.innerHTML="";
	bindEvent();
	init();
	holdOnLayer.style.display="none";
	document.forms[0].startBtn.disabled="disabled";
	if(document.cookie){
		var cookieStr=document.cookie;
		var cookieArray=cookieStr.split("#");
		cookieArray[0]=cookieArray[0].split("=")[1];
		pieceBox.innerHTML="";
		for(var i=0;i<cookieArray.length-1;i++){
			if(cookieArray[i]!=-1) createPiece(iArray[i],parseInt(cookieArray[i]));
		}
	}
}

function saveGame(){
	var cookies="";
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			cookies+=map[i][j][4]+"#";
		}
	}
	var expiration=new Date(new Date().getTime()+60*60*1000);
	if(document.cookie) document.cookie=";expires="+expiration.toGMTString()+";";
	document.cookie="zhen="+encodeURI(cookies)+"; path=/; expires="+expiration.toGMTString()+";";
}

function canCookie(){
	if(navigator.cookieEnabled){
		document.forms[0].saveBtn.onclick=saveGame;
		document.forms[0].restoreBtn.onclick=restoreGame;
	}
}

function init(){
	map=new Array();
	score=new Array();
	for(var i=0;i<15;i++){
	    map[i]=new Array();
		score[i]=new Array();
		for(var j=0;j<15;j++){
			map[i][j]=new Array();
			score[i][j]={black:0,white:0};
			for(var k=0;k<9;k++){
				if(k==4){map[i][j][k]=-1; continue;}
				map[i][j][k]={black:0,white:0};
			}
		}
	}
	
}

function mouseOverTips(obj){
	var objLeft=parseInt(obj.style.left);
	var objTop=parseInt(obj.style.top);
	if(!mouseBox){
		mouseBox=document.createElement("div");
		addClass(mouseBox,"mouseBox");
		for(var i=0;i<4;i++){
			var iObj=document.createElement("i");
			addClass(iObj,"mouseP");
			switch(i){
			case 0:	addClass(iObj,"mouseLT"); break;
			case 1:	addClass(iObj,"mouseRT"); break;
			case 2:	addClass(iObj,"mouseLB"); break;
			case 3:	addClass(iObj,"mouseRB"); break;
			default: break;
			}
			mouseBox.appendChild(iObj);
		}
		chessboardBox.appendChild(mouseBox);
	}
	mouseBox.style.display="block";
	mouseBox.style.left=objLeft+9+"px";
	mouseBox.style.top=objTop+9+"px";
}

function clearTips(){
    mouseBox.style.display="none";
}

function setScore(){
	var num=0;
	
	if(num==0){ var num2=1;}
	else{ var num2=0;}
	
	for(var i=0;i<15;i++)
		for(var j=0;j<15;j++){
			score[i][j]={black:0,white:0};
		}
		
	for(var i=0;i<15;i++)
		for(var j=0;j<15;j++)
			for(var k=0;k<9;k++){
				if(k==4) continue;
				var k2=1;
				var k3=1;
				if(parseInt(k/3)==0) k2=-1;
				else if(parseInt(k/3)==1) k2=0;
				
				if(k%3==0) k3=-1;
				else if(k%3==1) k3=0;
				
				if(map[i+k2]&&map[i+k2][j+k3]){
					if(map[i+k2][j+k3][4]==num){
						map[i][j][k].black=map[i+k2][j+k3][k].black+1;
					}
					else if(map[i+k2][j+k3][4]==num2){
						map[i][j][k].white=map[i+k2][j+k3][k].white+1;
					}
				}
		    }
	for(var i=14;i>=0;i--)
		for(var j=14;j>=0;j--)
			for(var k=0;k<9;k++){
				if(k==4) continue;
				var k2=1;
				var k3=1;
				if(parseInt(k/3)==0) k2=-1;
				else if(parseInt(k/3)==1) k2=0;
				
				if(k%3==0) k3=-1;
				else if(k%3==1) k3=0;
				
				if(map[i+k2]&&map[i+k2][j+k3]){
					if(map[i+k2][j+k3][4]==num){
						map[i][j][k].black=map[i+k2][j+k3][k].black+1;
					}
					else if(map[i+k2][j+k3][4]==num2){
						map[i][j][k].white=map[i+k2][j+k3][k].white+1;
					}
				}
		    }
	
	
	for(var i=0;i<15;i++)
		for(var j=0;j<15;j++){
			if(map[i][j][4]==-1){
				var maxCount={black:0,white:0};
				for(var k=0;k<9;k++){
					if(k==4) continue;
					if(maxCount.black<map[i][j][k].black) maxCount.black=map[i][j][k].black;
					if(maxCount.white<map[i][j][k].white) maxCount.white=map[i][j][k].white;
				}
				
				for(var k=0;k<4;k++){
					if(maxCount.black<map[i][j][k].black+map[i][j][8-k].black){
						if(map[i][j][k].black+map[i][j][8-k].black>4) maxCount.black=4;
						else maxCount.black=map[i][j][k].black+map[i][j][8-k].black;
					} 
					if(maxCount.white<map[i][j][k].white+map[i][j][8-k].white){
						if(map[i][j][k].white+map[i][j][8-k].white>4) maxCount.white=4;
						else maxCount.white=map[i][j][k].white+map[i][j][8-k].white;
					} 
				}
				
				switch(maxCount.black){
					case 0:{score[i][j].black=0;break;}
					case 1:{score[i][j].black=100;break;}
					case 2:{score[i][j].black=200;break;}
					case 3:{score[i][j].black=300;break;}
					case 4:{score[i][j].black=400;break;}
					default:break;
				}
				
				switch(maxCount.white){
					case 0:{score[i][j].white=0;break;}
					case 1:{score[i][j].white=100;break;}
					case 2:{score[i][j].white=200;break;}
					case 3:{score[i][j].white=300;break;}
					case 4:{score[i][j].white=400;break;}
					default:break;
				}
				
			}
		}
	
}

function playChess(){
	var num=1;
	var ScoreList=new Array();
	ScoreList[0]=0;
	var ScoreList2=new Array();
	ScoreList2[0]=0;
	
	for(var i=0;i<score.length;i++)
		for(var j=0;j<score[i].length;j++){
			if(ScoreList[0]<score[i][j].black){
				ScoreList.unshift(score[i][j].black);
			}
			if(ScoreList2[0]<score[i][j].white){
				ScoreList2.unshift(score[i][j].white);
			}
		}
	
	var maxArray=new Array();
	var maxArray2=new Array();
	for(var i=0;i<score.length;i++)
		for(var j=0;j<score[i].length;j++){
			if(ScoreList[0]==score[i][j].black){
				maxArray.push(iArray[i*15+j]);
				if(ScoreList[0]==400){
					maxArray[maxArray.length-1].score=400;
				}
			}
			if(ScoreList2[0]==score[i][j].white){
				maxArray2.push(iArray[i*15+j]);
				if(ScoreList2[0]==400){
					maxArray2[maxArray2.length-1].score2=400;
				}
			}
			
		}
	
	if(ScoreList[0]>0&&ScoreList[0]<400) maxArray=checkArray(maxArray,ScoreList,0);

	if(ScoreList2[0]>0&&ScoreList2[0]<400) maxArray2=checkArray(maxArray2,ScoreList2,1);	

	
	if(maxArray2[0].score2>=maxArray[0].score) maxArray=maxArray2;
	
	if(maxArray.length==1) {
		createPiece(maxArray[0],num); 
		maxArray[0].onclick=null;
	}
	else if(maxArray.length>1){
		var temNum=parseInt(Math.random()*maxArray.length);
		createPiece(maxArray[temNum],num);
		maxArray[temNum].onclick=null;
	}

}

function checkArray(maxArray,ScoreList,num){
	if(num==0) var num2=1;
	else var num2=0;
	
	var temArray=new Array();
	for(var i=0;i<maxArray.length;i++){
		if(num==0) maxArray[i].score=0;
		else if(num==1) maxArray[i].score2=0;
		
		var num10=parseInt(maxArray[i].innerHTML/15);
		var num1=maxArray[i].innerHTML%15;
		var flag=new Array();
		var checkMore=new Array();
		var otherCheckMore=new Array();
		for(var k=0;k<9;k++){
			if(num==0){
				if(map[num10][num1][k].black==parseInt(ScoreList[0]/100)){flag.push(k);}
				else if(k<4){
					if((map[num10][num1][k].black>0||map[num10][num1][8-k].black>0)&&(map[num10][num1][k].black+map[num10][num1][8-k].black<parseInt(ScoreList[0]/100))){
						if(map[num10][num1][k].black>=map[num10][num1][8-k].black)
						checkMore.push({num:map[num10][num1][k].black,direct:k});
						else checkMore.push({num:map[num10][num1][8-k].black,direct:8-k});
					}
					
					if((map[num10][num1][k].white>0||map[num10][num1][8-k].white>0)&&(map[num10][num1][k].white+map[num10][num1][8-k].white<=parseInt(ScoreList[0]/100))){
						if(map[num10][num1][k].white>=map[num10][num1][8-k].white)
						otherCheckMore.push({num:map[num10][num1][k].white,direct:k});
						else otherCheckMore.push({num:map[num10][num1][8-k].white,direct:8-k});
					}
					
				}
			}
			else if(num==1){
				if(map[num10][num1][k].white==parseInt(ScoreList[0]/100)){flag.push(k);}
				else if(k<4){
					if((map[num10][num1][k].white>0||map[num10][num1][8-k].white>0)&&(map[num10][num1][k].white+map[num10][num1][8-k].white<parseInt(ScoreList[0]/100))){
						if(map[num10][num1][k].white>=map[num10][num1][8-k].white)
						checkMore.push({num:map[num10][num1][k].white,direct:k});
						else checkMore.push({num:map[num10][num1][8-k].white,direct:8-k});
					}
					
					if((map[num10][num1][k].black>0||map[num10][num1][8-k].black>0)&&(map[num10][num1][k].black+map[num10][num1][8-k].black<parseInt(ScoreList[0]/100))){
						if(map[num10][num1][k].black>=map[num10][num1][8-k].black)
						otherCheckMore.push({num:map[num10][num1][k].black,direct:k});
						else otherCheckMore.push({num:map[num10][num1][8-k].black,direct:8-k});
					}
					
				}
			}
		}

		if(flag.length>0){
			var zeroCount=0;
			var num2Count=0;
			for(var j=0;j<flag.length;j++){
				if(num==0){
					var k3=k2=map[num10][num1][flag[j]].black+1;
				}
				else if(num==1){
					var k3=k2=map[num10][num1][flag[j]].white+1;
				}
				if(parseInt(flag[j]/3)==0) k2=-k2;
				else if(parseInt(flag[j]/3)==1) k2=0;
				
				if(flag[j]%3==0) k3=-k3;
				else if(flag[j]%3==1) k3=0;
				if(map[num10+k2]&&map[num10+k2][num1+k3]){
					if(map[num10+k2][num1+k3][4]==-1){
						if(num==0) maxArray[i].score=ScoreList[0];
						else if(num==1) maxArray[i].score2=ScoreList[0];
						if(flag.length>1) zeroCount++;
					}
					else if(map[num10+k2][num1+k3][4]==num2){
						if(num==0) maxArray[i].score=ScoreList[0]-25;
						else if(num==1) maxArray[i].score2=ScoreList[0]-25;
						if(flag.length>1) num2Count++;
					}
				}
			}
			if(flag.length>1){
				if(zeroCount>1) {
					if(num==0) maxArray[i].score+=5*(zeroCount-1);
					else if(num==1) maxArray[i].score2+=5*(zeroCount-1);
				}
				if(parseInt(ScoreList[0]/100)>1){
					if(zeroCount>1&&num2Count>1){
						if(num==0) maxArray[i].score+=5*(zeroCount-1)+2*(num2Count-1);
					    else if(num==1) maxArray[i].score2+=5*(zeroCount-1)+2*(num2Count-1);
					}
				}
			}
		}
		else if(flag.length==0){
			var zeroCount=0;
			var num2Count=0;
			var temMax=new Array();
			for(var j=0;j<4;j++){
				if(num==0){
					if(map[num10][num1][j].black+map[num10][num1][8-j].black==parseInt(ScoreList[0]/100)) temMax.push(j);
				}
				else if(num==1){
					if(map[num10][num1][j].white+map[num10][num1][8-j].white==parseInt(ScoreList[0]/100)) temMax.push(j);
				}
			}
			
			for(var j=0;j<temMax.length;j++){
				if(num==0){
					var k3=k2=map[num10][num1][temMax[j]].black+1;
					var k5=k4=map[num10][num1][(8-temMax[j])].black+1;
				}
				else if(num==1){
					var k3=k2=map[num10][num1][temMax[j]].white+1;
					var k5=k4=map[num10][num1][(8-temMax[j])].white+1;
				}
				if(parseInt(temMax[j]/3)==0) k2=-k2;
				else if(parseInt(temMax[j]/3)==1) k2=0;
				
				if(temMax[j]%3==0) k3=-k3;
				else if(temMax[j]%3==1) k3=0;

				if(parseInt((8-temMax[j])/3)==0) k4=-k4;
				else if(parseInt((8-temMax[j])/3)==1) k4=0;
				
				if((8-temMax[j])%3==0) k5=-k5;
				else if((8-temMax[j])%3==1) k5=0;
				if(map[num10+k2]&&map[num10+k4]&&map[num10+k2][num1+k3]&&map[num10+k4][num1+k5]){
					if(map[num10+k2][num1+k3][4]==-1&&map[num10+k4][num1+k5][4]==-1){
						if(num==0) maxArray[i].score=ScoreList[0];
					    else if(num==1) maxArray[i].score2=ScoreList[0];
						if(temMax.length>1) zeroCount++;
					}
					else if(map[num10+k2][num1+k3][4]==-1&&map[num10+k4][num1+k5][4]==num2||map[num10+k2][num1+k3][4]==num2&&map[num10+k4][num1+k5][4]==-1){
						if(num==0) maxArray[i].score=ScoreList[0]-50;
					    else if(num==1) maxArray[i].score2=ScoreList[0]-50;
						if(temMax.length>1) num2Count++;
					}
					else if(map[num10+k2][num1+k3][4]==num2&&map[num10+k4][num1+k5][4]==num2){
						if(maxArray[i].score<ScoreList[0]-75) maxArray[i].score=ScoreList[0]-75;
					}
				}
				
			}
			
			if(temMax.length>1){
				if(zeroCount>1){
					if(num==0) maxArray[i].score+=5*(zeroCount-1);
					else if(num==1) maxArray[i].score2+=5*(zeroCount-1);
					
				}
				if(parseInt(ScoreList[0]/100)>1){
					if(zeroCount>1&&num2Count>1){
						if(num==0) maxArray[i].score+=5*(zeroCount-1)+2*(num2Count-1);
					    else if(num==1) maxArray[i].score2+=5*(zeroCount-1)+2*(num2Count-1);
					}
				}
			}
			
		}
		
		for(var j=0;j<checkMore.length;j++){
			var k2=k3=checkMore[j].num+1;
			
			if(parseInt(checkMore[j].direct/3)==0) k2=-k2;
			else if(parseInt(checkMore[j].direct/3)==1) k2=0;
			
			if(checkMore[j].direct%3==0) k3=-k3;
			else if(checkMore[j].direct%3==1) k3=0;
			
			if(map[num10+k2]&&map[num10+k2][num1+k3]){
				if(map[num10+k2][num1+k3][4]==-1){
					if(checkMore[j].num==2){
						if(num==0) maxArray[i].score+=3;
					    else if(num==1) maxArray[i].score2+=3;
					}
					else if(checkMore[j].num==1){
						if(num==0) maxArray[i].score+=2;
					    else if(num==1) maxArray[i].score2+=2;
				    }
				}
				else if(map[num10+k2][num1+k3][4]==num2){
					if(checkMore[j].num==2){
						if(num==0) maxArray[i].score+=2;
					    else if(num==1) maxArray[i].score2+=2;
					}
				}
			}
			
		}
		
		for(var j=0;j<otherCheckMore.length;j++){
			var k2=k3=otherCheckMore[j].num+1;
			
			if(parseInt(otherCheckMore[j].direct/3)==0) k2=-k2;
			else if(parseInt(otherCheckMore[j].direct/3)==1) k2=0;
			
			if(otherCheckMore[j].direct%3==0) k3=-k3;
			else if(otherCheckMore[j].direct%3==1) k3=0;
			
			if(map[num10+k2]&&map[num10+k2][num1+k3]){
				if(map[num10+k2][num1+k3][4]==-1){
					if(otherCheckMore[j].num==3){
						if(num==0) maxArray[i].score+=3;
					    else if(num==1) maxArray[i].score2+=3;
					}
					else if(otherCheckMore[j].num==2){
						if(num==0) maxArray[i].score+=2;
					    else if(num==1) maxArray[i].score2+=2;
					}
					else if(otherCheckMore[j].num==1){
						if(num==0) maxArray[i].score+=1;
					    else if(num==1) maxArray[i].score2+=1;
				    }
				}
			    else if(map[num10+k2][num1+k3][4]==num){
					if(otherCheckMore[j].num==3){
						if(num==0) maxArray[i].score+=2;
					    else if(num==1) maxArray[i].score2+=2;
					}
					else if(otherCheckMore[j].num==2){
						if(num==0) maxArray[i].score+=1;
					    else if(num==1) maxArray[i].score2+=1;
					}
				}
			}
			
		}
		
	}
	
	var temMax2=0;
	
	if(num==0){
		for(var i=0;i<maxArray.length;i++){
			if(temMax2<maxArray[i].score) temMax2=maxArray[i].score;
		}
		
		for(var i=0;i<maxArray.length;i++){
			if(temMax2==maxArray[i].score) temArray.push(maxArray[i]);
		}
	}
	else if(num==1){
		for(var i=0;i<maxArray.length;i++){
			if(temMax2<maxArray[i].score2) temMax2=maxArray[i].score2;
		}
		
		for(var i=0;i<maxArray.length;i++){
			if(temMax2==maxArray[i].score2) temArray.push(maxArray[i]);
		}
	}
	return temArray;
}

function winOrLose(obj){
	var num=0;
	if(num==0) var num2=1;
	else var num2=0;
	
	var num10=parseInt(obj.innerHTML/15);
	var num1=obj.innerHTML%15;
	
	for(var l=0;l<4;l++){
		
		for(var m=-4;m<=0;m++){
			blackCount=0; whiteCount=0;
			for(var k=m;k<m+5;k++){
				var k2=k3=k;
				if(l%4==0) k2=0;
				else if(l%4==2) k3=0;
				else if(l%4==3) k3=-k2;
				
				if(map[num10+k2]&&map[num10+k2][num1+k3]){
					if(map[num10+k2][num1+k3][4]==num) blackCount++;
					else if(map[num10+k2][num1+k3][4]==num2) whiteCount++;
				}
				
			}
			
			if(blackCount>=5) {alert("you win! (black win!)"); gameOver=true;unbindEvent();}
			else if(whiteCount>=5) {alert("you lose! (white win!)"); gameOver=true;unbindEvent();}
		}
		
		
	}
}

























