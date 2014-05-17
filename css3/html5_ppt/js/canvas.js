// JavaScript Document
$(document).ready(function(){
    var canvas=$(".canvas")[0];
	var ctx=canvas.getContext("2d");
	
	var painter=function(params){
		this.width=params.width;
		this.color=params.color;
		this.lastPoint={x:0,y:0};
		this.nowPoint={x:0,y:0};
		this.drawState=false;
		
		this.draw=function(){
			ctx.strokeStyle=this.color;
			ctx.lineWidth=this.width;
			ctx.beginPath();
			ctx.moveTo(this.lastPoint.x,this.lastPoint.y);
			ctx.lineTo(this.nowPoint.x,this.nowPoint.y);
			ctx.closePath();
			ctx.stroke();
		}
		
		this.onmousedown=function(e){
			this.drawState=true;
			var canOffset=$(canvas).offset();
			this.lastPoint={x:e.pageX-canOffset.left,y:e.pageY-canOffset.top};
			this.onmousemove=function(e){
				if(this.drawState){
					this.nowPoint={x:e.pageX-canOffset.left,y:e.pageY-canOffset.top};
					this.draw();
					this.lastPoint={x:this.nowPoint.x,y:this.nowPoint.y};
				}
			}
			
		}
		
		this.onmouseup=function(e){
			this.drawState=false;
		}
		
	}
	
	painter({width:2,color:"black"});
	
});










