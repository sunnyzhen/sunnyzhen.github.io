// JavaScript Document
window.onload=function(){
	var itune_canvas=document.getElementById("itune_canvas");
	var itune_ctx=itune_canvas.getContext("2d");
	var itune_image=new Image();
	var _itune_image = (location.search)?location.search.replace('?',''):"images/img_1.jpg";
	itune_image.src=_itune_image;
	//itune_image.src="images/img_1.jpg";
	itune_image.height=350;
	itune_image.width=250;
	itune_image.onload=function(){
		itune_ctx.drawImage(itune_image,0,0,250,350);
		var imageData=itune_ctx.getImageData(0,0,itune_image.width,itune_image.height);
		var pixelArray=imageData.data;
		var bcArray=new Array();
		var j=0,k=(itune_image.height-1)*itune_image.width*4;
		for(var i=0;i<itune_image.width;j++,i+=4){//获取第一行数据
			//bcArray[j]=To10(RGB216(pixelArray[i])+RGB216(pixelArray[i+1])+RGB216(pixelArray[i+2]));
			bcArray[j]=setRGBToHSV(pixelArray[i],pixelArray[i+1],pixelArray[i+2]);
		}
		for(var i=0;i<itune_image.width;j++,i+=4){//获取最后一行数据
			//bcArray[j]=To10(RGB216(pixelArray[k+i])+RGB216(pixelArray[k+i+1])+RGB216(pixelArray[k+i+2]));
			bcArray[j]=setRGBToHSV(pixelArray[k+i],pixelArray[k+i+1],pixelArray[k+i+2]);
		}
		for(var i=1;i<itune_image.height-1;j++,i+=4){//获取第一列数据
			//bcArray[j]=To10(RGB216(pixelArray[4*i*itune_image.width])+RGB216(pixelArray[4*i*itune_image.width+1])+RGB216(pixelArray[4*i*itune_image.width+2]));
			bcArray[j]=setRGBToHSV(pixelArray[4*i*itune_image.width],pixelArray[4*i*itune_image.width+1],pixelArray[4*i*itune_image.width+2]);
		}
		for(var i=2;i<itune_image.height;j++,i+=4){//获取最后一列数据
			//bcArray[j]=To10(RGB216(pixelArray[4*(i*itune_image.width-1)])+RGB216(pixelArray[4*(i*itune_image.width-1)+1])+RGB216(pixelArray[4*(i*itune_image.width-1)+2]));
			bcArray[j]=setRGBToHSV(pixelArray[4*(i*itune_image.width-1)],pixelArray[4*(i*itune_image.width-1)+1],pixelArray[4*(i*itune_image.width-1)+2]);
		}
		
		var bgColor={H:0,S:0,V:0};
		
		
		//console.log(j);
		//console.log(bcArray);
		bgColor=getMaxHSV(bgColor,bcArray);
		
		//console.log(bgColor);
		var RGB_color=setHSVToRGB(bgColor.H,bgColor.S,bgColor.V);
		//console.log(RGB_color);
		var value_color=RGB216(RGB_color.R)+RGB216(RGB_color.G)+RGB216(RGB_color.B);
		//console.log(value_color);
		
		setShadow(value_color);//设置投影、背景色
		
		
		
		
		var textColor={H:0,S:0,V:0};
		
		bcArray=new Array();//获取整个图片的抽样像素
		
		for(var i=0;i<itune_image.width*itune_image.height;i+=16){//四个像素抽样
			bcArray.push(setRGBToHSV(pixelArray[i],pixelArray[i+1],pixelArray[i+2]));
		}
		
		//console.log(bcArray);
		
		textColor=getTextHSV(bgColor,bcArray);
		//console.log(bcArray.length);
		/*var rankColor=80;
		
		for(var i=0;i<bcArray.length;i++){
			if(bgColor.V<70){
				if(bcArray[i].V>70){
					textColor.H=bcArray[i].H;
					textColor.S=bcArray[i].S;
					textColor.V=bcArray[i].V;
					break;
				}
			}
			else{
				if(bcArray[i].V<70){
					textColor.H=bcArray[i].H;
					textColor.S=bcArray[i].S;
					textColor.V=bcArray[i].V;
					break;
				}
			}
		}*/
		
		var RGB_color=setHSVToRGB(textColor.H,textColor.S,textColor.V);
		//console.log('zhen'+textColor.H+textColor.S+textColor.V);
		setText(RGB216(RGB_color.R)+RGB216(RGB_color.G)+RGB216(RGB_color.B));
	}
}

function getTextHSV(bgColor,bcArray){
	var HArray=new Array();
	var SArray=new Array();
	var VArray=new Array();
	//var color={H:0,S:0,V:0};
	
	for(var i=0;i<bcArray.length;i++){
		HArray.push(bcArray[i].H)
	}
	//color.H=getColor(HArray);
	HArray=getRepeat(HArray);
	
	//console.log(HArray);
	
	for(var i=0;i<HArray.length;i++)
		for(var j=0;j<bcArray.length;j++){
			if(HArray[i].num==bcArray[j].H&&bcArray[j].S>10){
/*				if(bgColor.V>80){//分段检测
					if(bcArray[j].V<=40&&bcArray[j].V>20){
						return {H:bcArray[j].H,S:bcArray[j].S,V:bcArray[j].V};
					}
				}
				else if(bgColor.V<=80&&bgColor.V>60){
					if(bcArray[j].V<=20&&bcArray[j].V>0){
						return {H:bcArray[j].H,S:bcArray[j].S,V:bcArray[j].V};
					}
				}
				else if(bgColor.V<=60&&bgColor.V>40){
					if(bcArray[j].V<=100&&bcArray[j].V>80){
						return {H:bcArray[j].H,S:bcArray[j].S,V:bcArray[j].V};
					}
				}
				else if(bgColor.V<=40&&bgColor.V>20){
					if(bcArray[j].V<=80&&bcArray[j].V>60){
						return {H:bcArray[j].H,S:bcArray[j].S,V:bcArray[j].V};
					}
				}
				else{
					if(bcArray[j].V<=60&&bcArray[j].V>40){
						return {H:bcArray[j].H,S:bcArray[j].S,V:bcArray[j].V};
					}
				}*/
				
				if(Math.abs(bgColor.S-bcArray[j].S)>20&&Math.abs(bgColor.V-bcArray[j].V)>25||Math.abs(bgColor.V-bcArray[j].V)>60){//绝对值检测or扩大明度差距检测
					return {H:bcArray[j].H,S:bcArray[j].S,V:bcArray[j].V};
				}
				
			}
		}
	
/*	var o_H=new Array();
	for(var i=0;i<HArray.length;i++){
		if(HArray[i].num<bgColor.H-30||HArray[i].num>bgColor.H+30){
			o_H.push(HArray[i].num);//color.H=HArray[i].num;
		}*/
		
/*		if(HArray[i].num!=bgColor.H){
			color.H=HArray[i].num;
			break;
		}*/
/*		
	}
	
	console.log(o_H);
	color.H=o_H[0];
	for(var i=0;i<bcArray.length;i++){
		if(bcArray[i].H==color.H){
			SArray.push(bcArray[i].S);
			break;
		}
	}
	SArray=getRepeat(SArray);
	color.S=SArray[0].num;
	
	for(var i=0;i<bcArray.length;i++){
		if(bcArray[i].H==color.H){
			VArray.push(bcArray[i].V);
		}
	}
	VArray=getRepeat(VArray);
	console.log(bgColor.V);
	console.log(VArray);
	
	for(var i=0;i<VArray.length;i++){
		if(bgColor.V<50){
			if(VArray[i].num>50){
				color.V=VArray[i].num;
				break;
			}
		}
		else{
			if(VArray[i].num<50){
				color.V=VArray[i].num;
				break;
			}
		}
	}
	console.log(bgColor);
	console.log(color);*/
	
	return {H:0,S:0,V:0};
}

function getRepeat(colorArray){
	var array=new Array();
	for(var i=0;i<colorArray.length;i++){
		var flagAdd=false;
		for(var j=0;j<array.length;j++){
			if(colorArray[i]==array[j].num){
					array[j].index++;
					flagAdd=true;
			}
		}
		if(!flagAdd){
			array.push({num:colorArray[i],index:1});
		}
		
	}
	
	sortObjectArray(array)
	
	return array;
}

function getMaxHSV(o_color,bcArray){
	var HArray=new Array();
	var SArray=new Array();
	var VArray=new Array();
	
	for(var i=0;i<bcArray.length;i++){
		HArray.push(bcArray[i].H)
	}
	o_color.H=getColor(HArray);
	
	for(var i=0;i<bcArray.length;i++){
		if(bcArray[i].H==o_color.H)
		SArray.push(bcArray[i].S)
	}
	o_color.S=getColor(SArray);
	
	for(var i=0;i<bcArray.length;i++){
		if(bcArray[i].H==o_color.H&&bcArray[i].S==o_color.S)
		VArray.push(bcArray[i].V)
	}
	o_color.V=getColor(VArray);
	
	return o_color;
}

function RGB216(num){
	return (Number(num).toString(16).length==1)?"0"+Number(num).toString(16):Number(num).toString(16);
}

function To10(string){
	return parseInt('0x'+string);
}

function getColor(colorArray){//设置像素点的重复次数
	var flagIndex=new Array();
	var flagNum=new Array();
	for(var i=0;i<colorArray.length;i++){
		var flagAdd=false;
		for(var j=0;j<flagNum.length;j++){
			if(colorArray[i]==flagNum[j]){
					flagIndex[j]++;
					flagAdd=true;
			}
		}
		if(!flagAdd){
			flagNum.push(colorArray[i]);
			flagIndex.push(1);
		}
		
	}
	//console.log(flagIndex);
	return flagNum[maxItem(flagIndex)];	
	
}

function maxItem(flagIndex){//获取数组里面出现次数最多的项
	var maxNum=0,index=0;
	for(i=0;i<flagIndex.length;i++){
		if(flagIndex[i]>=maxNum){
			maxNum=flagIndex[i];
			index=i;
		}
	}
	return index;
}

function sortArray(array){
	for(var i=0;i<array.length;i++)
		for(var j=i+1;j<array.length;j++){
			if(array[i]<array[j]){
				var temNum=array[i];
				array[i]=array[j];
				array[j]=temNum;
			}
		}
		
}

function sortObjectArray(array){
	for(var i=0;i<array.length;i++)
		for(var j=i+1;j<array.length;j++){
			if(array[i].index<array[j].index){
				var temNum=array[i];
				array[i]=array[j];
				array[j]=temNum;
			}
		}
		
}

function setHSVToRGB(_l,_m,_n) {
	console.log(_l+" "+_m+" "+_n);
  if(_m == 0) {
    _l = _m = _n = Math.round(255*_n/100);
    newR = _l;
    newG = _m;
    newB = _n;
  } 
  else {
    _m = _m/100;
    _n = _n/100;
    p = Math.floor(_l/60)%6;
    f = _l/60 - p;
    a = _n*(1-_m);
    b = _n*(1-_m*f);
    c = _n*(1-_m*(1-f));
    switch(p) {
      case 0:
        newR = _n; newG = c; newB = a;
        break;
      case 1:
        newR = b; newG = _n; newB = a;
        break;
      case 2:
        newR = a; newG = _n; newB = c;
        break;
      case 3:
        newR = a; newG = b; newB = _n;
        break;
      case 4:
        newR = c; newG = a; newB = _n;
        break;
      case 5:
        newR = _n; newG = a; newB = b;
        break;
    }
    newR = Math.round(255*newR);
    newG = Math.round(255*newG);
    newB = Math.round(255*newB);
  }
  
  return {R:newR,G:newG,B:newB};
}

function setRGBToHSV (r,g,b) {
	var computedH = 0;
	var computedS = 0;
	var computedV = 0;
	
	var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
	var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
	var b = parseInt( (''+b).replace(/\s/g,''),10 ); 
	
	r=r/255; g=g/255; b=b/255;
	var minRGB = Math.min(r,Math.min(g,b));
	var maxRGB = Math.max(r,Math.max(g,b));
	
	if (minRGB==maxRGB) {
	computedV = minRGB;
	return {H:0,S:0,V:Math.round(computedV*100)};
	}
	
	var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
	var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
	computedH = 60*(h - d/(maxRGB - minRGB));
	computedS = (maxRGB - minRGB)/maxRGB;
	computedV = maxRGB;
	return {H:Math.round(computedH),S:Math.round(computedS*100),V:Math.round(computedV*100)};
}

function setShadow(color){
	var itune_shadow=document.getElementById('itune_shadow');
	var itune_box=document.getElementById('itune_box');
	itune_shadow.style.cssText="box-shadow:0px 0px 10px 5px #"+color+" inset,0px 0px 20px 15px #"+color+" inset";
	itune_box.style.background="#"+color;
}

function setText(color){
	var o_body=document.getElementById('body');
	o_body.style.color="#"+color;
}

















































































