(function(){
	
	$(document).ready(function(e) {
        
		/*var ori_y=$("span.icon_4").height();
		var ori_x=$("span.icon_4").width();
		var Cur_y=$("span.icon_4").height();
		var Cur_x=$("span.icon_4").width();
		
		var area_num=50;
		var Max_x=Math.round(ori_x*1.5);
		var Max_y=Math.round(ori_y*1.5);
		var Min_x=Math.round(ori_x/2);
		var Min_y=Math.round(ori_y/2);
		
		var m_distance=5;
		var r_min_x=0;
		var r_max_x=1;
		var r_min_y=0;
		var r_max_y=1;
		
		if(Cur_x-m_distance>Min_x){
			r_min_x=Cur_x-m_distance;
		}
		else{
			r_min_x=Min_x;
		}
		
		if(Cur_x+m_distance<Max_x){
			r_max_x=Cur_x+m_distance;
		}
		else{
			r_max_x=Max_x;
		}
		
		if(Cur_y+m_distance>Min_y){
			r_min_y=Cur_y+m_distance;
		}
		else{
			r_min_y=Min_y;
		}
		
		if(Cur_y+m_distance<Max_y){
			r_max_y=Cur_y+m_distance;
		}
		else{
			r_max_y=Max_y;
		}
		
		
		var Cur_x=Math.round(Math.random()*(r_max_x-r_min_x))+r_min_x;
		var Cur_y=Math.round(Math.random()*(r_max_y-r_min_y))+r_min_y;
		
		$("span.icon_4").width(Cur_x);
		$("span.icon_4").height(Cur_y);
		
		console.log(Cur_x+" "+Cur_y);*/
		
		/*浮动的小球 对象抽取第二版*/
		
		function ConnectBall($elem){
			var ball=new Object;
			ball.elem=$elem;
			ball.container=$($elem).parent(".icon_area");
			ball.subBallList=[];
			
			ball.ori_y=parseInt($(ball.container).css("top"));          //球的起点纵坐标
			ball.ori_x=parseInt($(ball.container).css("left"));         //球的起点横坐标
			ball.Max_x=Math.round(ball.ori_x*1.3);                      //球的浮动最大横坐标
			ball.Max_y=Math.round(ball.ori_y*1.3);                      //球的浮动最大纵坐标
			ball.Min_x=Math.round(ball.ori_x*0.7);                     //球的浮动最小横坐标
			ball.Min_y=Math.round(ball.ori_y*0.7);                     //球的浮动最小纵坐标
			
			ball.m_distance=10;                      //球的每次浮动最大偏移值 
			ball.r_min_x=0;                          //球的每次浮动横坐标随机范围最小值
			ball.r_max_x=1;                          //球的每次浮动横坐标随机范围最大值
			ball.r_min_y=0;                          //球的每次浮动纵坐标随机范围最小值
			ball.r_max_y=1;                          //球的每次浮动纵坐标随机范围最小值
			ball.Cur_y=0;                            //球的每次浮动纵坐标当前值
			ball.Cur_x=0;                            //球的每次浮动横坐标当前值
			
			ball.timer=null;                         //球的浮动计时器
			ball.timeInterval=500;                   //球的每次浮动时间间隔
			
			//设置子球
			ball.setSubBall=function(){
				var list=$(ball.elem.children("span.icon"));
				for(var i=0;i<list.length;i++){
					ball.subBallList.push(FloatBall(list[i]));
				}
				//console.log(ball.subBallList);
			}
			
			//设置子球浮动回收
			ball.subBallFloat=function(){
				for(var i=0;i<ball.subBallList.length;i++){
					ball.subBallList[i].floating();
				}
			}
			
			//设置子球弹开
			ball.bigBang=function(){
				for(var i=0;i<ball.subBallList.length;i++){
					ball.subBallList[i].resetPosition();
				}
			}
			
			ball.ballFloat=function(){
				//console.log(ball);
				ball.timer=setInterval(function(){
					ball.Cur_y=parseInt($(ball.container).css("top"));
					ball.Cur_x=parseInt($(ball.container).css("left"));
					
					if(ball.Cur_x-ball.m_distance>ball.Min_x){
						ball.r_min_x=ball.Cur_x-ball.m_distance;
					}
					else{
						ball.r_min_x=ball.Min_x;
					}
					
					if(ball.Cur_x+ball.m_distance<ball.Max_x){
						ball.r_max_x=ball.Cur_x+ball.m_distance;
					}
					else{
						ball.r_max_x=ball.Max_x;
					}
					
					if(ball.Cur_y-ball.m_distance>ball.Min_y){
						ball.r_min_y=ball.Cur_y-ball.m_distance;
					}
					else{
						ball.r_min_y=ball.Min_y;
					}
					
					if(ball.Cur_y+ball.m_distance<ball.Max_y){
						ball.r_max_y=ball.Cur_y+ball.m_distance;
					}
					else{
						ball.r_max_y=ball.Max_y;
					}
					
					ball.Cur_x=Math.round(Math.random()*(ball.r_max_x-ball.r_min_x))+ball.r_min_x;
					ball.Cur_y=Math.round(Math.random()*(ball.r_max_y-ball.r_min_y))+ball.r_min_y;
					
					$(ball.container).css("left",ball.Cur_x+"px");
					$(ball.container).css("top",ball.Cur_y+"px");
					
					
				},ball.timeInterval);
			}
			
			ball.stopfloating=function(){
				clearInterval(ball.timer);
			}
			
			return ball;
		}
		
		var mainball_1=ConnectBall($("span.icon_1"));
		mainball_1.ballFloat();
		
		mainball_1.setSubBall();
		mainball_1.subBallFloat();
		
		$("i.icon_1").click(function(eve){
			mainball_1.bigBang();
			mainball_1.subBallFloat();
		});
		
		var mainball_2=ConnectBall($("span.icon_11"));
		mainball_2.ballFloat();
		
		mainball_2.setSubBall();
		mainball_2.subBallFloat();
		
		$(".icon_11").click(function(){
			mainball_2.bigBang();
			mainball_2.subBallFloat();
		});
		
		var mainball_3=ConnectBall($("span.icon_21"));
		mainball_3.ballFloat();
		
		mainball_3.setSubBall();
		mainball_3.subBallFloat();
		
		$(".icon_21").click(function(){
			mainball_3.bigBang();
			mainball_3.subBallFloat();
		});
		
		function FloatBall($elem){
			
			var ball=new Object;                     //创建新对象
			ball.elem=$elem;                         //对象主体
			ball.container=$($elem).parent(".icon"); //球的容器
			ball.child=$($elem).children("i"); //球的容器
			ball.ori_y=$($elem).height();            //球的起点纵坐标
			ball.ori_x=$($elem).width();             //球的起点横坐标
			ball.Max_x=Math.round(ball.ori_x*1.5);   //球的浮动最大横坐标
			ball.Max_y=Math.round(ball.ori_y*1.5);   //球的浮动最大纵坐标
			ball.Min_x=0;                            //球的浮动最小横坐标
			ball.Min_y=0;                            //球的浮动最小纵坐标
			
			ball.m_distance=10;                      //球的每次浮动最大偏移值 
			ball.r_min_x=0;                          //球的每次浮动横坐标随机范围最小值
			ball.r_max_x=1;                          //球的每次浮动横坐标随机范围最大值
			ball.r_min_y=0;                          //球的每次浮动纵坐标随机范围最小值
			ball.r_max_y=1;                          //球的每次浮动纵坐标随机范围最小值
			ball.Cur_y=0;                            //球的每次浮动纵坐标当前值
			ball.Cur_x=0;                            //球的每次浮动横坐标当前值
			
			ball.timer=null;                         //球的浮动计时器
			ball.timeInterval=250;                   //球的每次浮动时间间隔
			ball.gravity=3;                          //球的引力指数
			ball.opacity=0;                          //球的透明度
			ball.ResetArea={                         //球弹开区域
				area_min:50,
				area_max:200
			}
			ball.summation=ball.ori_y+ball.ori_x;    //球的边长距离总和
			ball.quadrant=1;                         //球所处象限
			ball.position_x=$(ball.container).height()/2; //球的纵坐标定位
			ball.position_y=$(ball.container).width()/2;  //球的横坐标定位
			
			
			ball.floating=function(){
				//console.log(ball.Cur_y+" "+ball.Cur_x);
				ball.timer=setInterval(function(){
					ball.Cur_y=$(ball.elem).height();
					ball.Cur_x=$(ball.elem).width();
					ball.summation=ball.Cur_y+ball.Cur_x;
					
					if(ball.Cur_x-ball.m_distance*ball.gravity>ball.Min_x){
						ball.r_min_x=ball.Cur_x-ball.m_distance*ball.gravity;
					}
					else{
						ball.r_min_x=ball.Min_x;
					}
					
					if(ball.Cur_x+ball.m_distance<ball.Max_x){
						ball.r_max_x=ball.Cur_x+ball.m_distance;
					}
					else{
						ball.r_max_x=ball.Max_x;
					}
					
					if(ball.Cur_y-ball.m_distance*ball.gravity>ball.Min_y){
						ball.r_min_y=ball.Cur_y-ball.m_distance*ball.gravity;
					}
					else{
						ball.r_min_y=ball.Min_y;
					}
					
					if(ball.Cur_y+ball.m_distance<ball.Max_y){
						ball.r_max_y=ball.Cur_y+ball.m_distance;
					}
					else{
						ball.r_max_y=ball.Max_y;
					}
					
					//回收效果
					/*if(ball.gravity>1){ //回收效果，缺点会依附垂直线，不自然
						//如果该坐标方向上已经为0，就归0
						if(ball.r_min_x==ball.Min_x){
							ball.Cur_x=ball.Min_x;
						}
						else{
							ball.Cur_x=Math.round(Math.random()*(ball.r_max_x-ball.r_min_x))+ball.r_min_x;
						}
						
						if(ball.r_min_y==ball.Min_y){
							ball.Cur_y=ball.Min_y;
						}
						else{
							ball.Cur_y=Math.round(Math.random()*(ball.r_max_y-ball.r_min_y))+ball.r_min_y;
						}
					}
					else{
						ball.Cur_x=Math.round(Math.random()*(ball.r_max_x-ball.r_min_x))+ball.r_min_x;
						ball.Cur_y=Math.round(Math.random()*(ball.r_max_y-ball.r_min_y))+ball.r_min_y;
					}*/
					//回收效果
					
					//回收效果优化
					if(ball.gravity>1){
						
						if(ball.Cur_x==ball.ori_x&&ball.Cur_y==ball.ori_y){
							var r_x=ball.ori_x;
							var r_y=ball.ori_y;
						}
						else{
							var r_x=ball.Cur_x;
							var r_y=ball.Cur_y;
						}
						
						var counter=0;
						while(r_x+r_y>=ball.summation){
							if(counter>=10){//防止一直死循环
								
								if(ball.Cur_x-ball.gravity*2>ball.Min_x){
									r_x=ball.Cur_x-ball.gravity*2;
								}
								else{
									r_x=ball.Min_x;
								}
								
								if(ball.Cur_y-ball.gravity*2>ball.Min_y){
									r_y=ball.Cur_y-ball.gravity*2;
								}
								else{
									r_y=ball.Min_y;
								}
								
								counter=0;
							}else{
								r_x=Math.round(Math.random()*(ball.r_max_x-ball.r_min_x))+ball.r_min_x;
								r_y=Math.round(Math.random()*(ball.r_max_y-ball.r_min_y))+ball.r_min_y;
								counter++;
							}
						}
						
						ball.Cur_x=r_x;
						ball.Cur_y=r_y;
						
					}
					else{
						ball.Cur_x=Math.round(Math.random()*(ball.r_max_x-ball.r_min_x))+ball.r_min_x;
						ball.Cur_y=Math.round(Math.random()*(ball.r_max_y-ball.r_min_y))+ball.r_min_y;
					}
					//回收效果优化
					
					
					//console.log(ball.Cur_x+" "+ball.Cur_y);
					
					$(ball.elem).width(ball.Cur_x);
					$(ball.elem).height(ball.Cur_y);
					
					if(ball.Cur_x==0&&ball.Cur_y==0){
						ball.stopfloating();
						ball.setOpacity(0);
					}
					
				},ball.timeInterval);
			}
			
			ball.stopfloating=function(){
				clearInterval(ball.timer);
			}
			
			ball.setOpacity=function(num){
				$(ball.elem).css({
					"opacity":num
				});
			}
			
			ball.resetPosition=function(){
				ball.stopfloating();
				ball.quadrant=Math.floor(Math.random()*4)+1; //0-4之间随机，再地板，保证4个象限概率平等
				ball.Cur_y=Math.round(Math.random()*(ball.ResetArea.area_max-ball.ResetArea.area_min))+ball.ResetArea.area_min;           
				ball.Cur_x=Math.round(Math.random()*(ball.ResetArea.area_max-ball.ResetArea.area_min))+ball.ResetArea.area_min;
				ball.ori_y=ball.Cur_y;           
				ball.ori_x=ball.Cur_x; 
				$(ball.elem).width(ball.Cur_x);
				$(ball.elem).height(ball.Cur_y);
				
				//球的定位偏移值
				var half_h=-1*$(ball.child).height()/2;
				var half_w=-1*$(ball.child).width()/2;
				
				//控制球出现的象限
				if(ball.quadrant==1){
					$(ball.elem).css({
						"opacity": 1,
						"left": ball.position_x+"px",
						"bottom": ball.position_y+"px",
						"right":"auto",
						"top":"auto",
						"background-image": "url(../images/index/icon_line.png)"
					});
					$(ball.child).css({
						"right": half_w +"px",
						"top": half_h +"px",
						"left": "auto",
						"bottom": "auto"
					});
				}
				else if(ball.quadrant==2){
					$(ball.elem).css({
						"opacity": 1,
						"right": ball.position_x+"px",
						"bottom": ball.position_y+"px",
						"left": "auto",
						"top": "auto",
						"background-image": "url(../images/index/icon_line_2.png)"
					});
					$(ball.child).css({
						"left": half_w +"px",
						"top": half_h +"px",
						"right": "auto",
						"bottom": "auto"
					});
				}
				else if(ball.quadrant==3){
					$(ball.elem).css({
						"opacity": 1,
						"right": ball.position_x+"px",
						"top": ball.position_y+"px",
						"left":"auto",
						"bottom":"auto",
						"background-image": "url(../images/index/icon_line.png)"
					});
					$(ball.child).css({
						"left": half_w +"px",
						"bottom": half_h +"px",
						"right": "auto",
						"top": "auto"
					});
				}
				else if(ball.quadrant==4){
					$(ball.elem).css({
						"opacity": 1,
						"left": ball.position_x+"px",
						"top": ball.position_y+"px",
						"right":"auto",
						"bottom":"auto",
						"background-image": "url(../images/index/icon_line_2.png)"
					});
					$(ball.child).css({
						"right": half_w +"px",
						"bottom": half_h +"px",
						"left": "auto",
						"top": "auto"
					});
				}
				else{
					console.log("It's impossible!");
				}
				
				/*$(ball.elem).css({
					"opacity":1
				});*/
			}
			
			return ball;
		}
		
		/*var ball_1=FloatBall($("span.icon_2"));
		var ball_2=FloatBall($("span.icon_3"));
		var ball_3=FloatBall($("span.icon_4"));
		var ball_4=FloatBall($("span.icon_5"));
		
		ball_1.floating();
		ball_2.floating();
		ball_3.floating();
		ball_4.floating();*/
		
		/*浮动的小球 对象抽取第二版*/
		
		/*浮动的小球 对象抽取第一版*/
		/*function FloatBall($elem){
			
			var ball=new Object;
			ball.elem=$elem;
			ball.ori_y=$($elem).height();
			ball.ori_x=$($elem).width();
			ball.Max_x=Math.round(ball.ori_x*1.5);
			ball.Max_y=Math.round(ball.ori_y*1.5);
			ball.Min_x=Math.round(ball.ori_x/2);
			ball.Min_y=Math.round(ball.ori_y/2);
			
			ball.area_num=50;
			ball.m_distance=10;
			ball.r_min_x=0;
			ball.r_max_x=1;
			ball.r_min_y=0;
			ball.r_max_y=1;
			ball.Cur_y=0;
			ball.Cur_x=0;
			
			ball.timer=null;
			ball.timeInterval=250;
			
			ball.floating=function(){
				ball.timer=setInterval(function(){
					ball.Cur_y=ball.elem.height();
					ball.Cur_x=ball.elem.width();
					
					if(ball.Cur_x-ball.m_distance>ball.Min_x){
						ball.r_min_x=ball.Cur_x-ball.m_distance;
					}
					else{
						ball.r_min_x=ball.Min_x;
					}
					
					if(ball.Cur_x+ball.m_distance<ball.Max_x){
						ball.r_max_x=ball.Cur_x+ball.m_distance;
					}
					else{
						ball.r_max_x=ball.Max_x;
					}
					
					if(ball.Cur_y-ball.m_distance>ball.Min_y){
						ball.r_min_y=ball.Cur_y-ball.m_distance;
					}
					else{
						ball.r_min_y=ball.Min_y;
					}
					
					if(ball.Cur_y+ball.m_distance<ball.Max_y){
						ball.r_max_y=ball.Cur_y+ball.m_distance;
					}
					else{
						ball.r_max_y=ball.Max_y;
					}
					
					
					ball.Cur_x=Math.round(Math.random()*(ball.r_max_x-ball.r_min_x))+ball.r_min_x;
					ball.Cur_y=Math.round(Math.random()*(ball.r_max_y-ball.r_min_y))+ball.r_min_y;
					
					ball.elem.width(ball.Cur_x);
					ball.elem.height(ball.Cur_y);
					
				},ball.timeInterval);
			}
			
			ball.stopfloating=function(){
				clearInterval(ball.timer);
			}
			
			return ball;
		}
		
		var ball_1=FloatBall($("span.icon_2"));
		ball_1.floating();
		var ball_2=FloatBall($("span.icon_3"));
		ball_2.floating();
		var ball_3=FloatBall($("span.icon_4"));
		ball_3.floating();
		var ball_4=FloatBall($("span.icon_5"));
		ball_4.floating();*/
		/*浮动的小球 对象抽取第一版*/
		
		/*浮动的小球 面向过程 出版*/
		//icon_Moving($("span.icon_2"));
		
		/*function icon_Moving(elem){
			
			var ori_y=$(elem).height();
			var ori_x=$(elem).width();
			
			var Max_x=Math.round(ori_x*1.5);
			var Max_y=Math.round(ori_y*1.5);
			var Min_x=Math.round(ori_x/2);
			var Min_y=Math.round(ori_y/2);
			
			var area_num=50;
			var m_distance=5;
			var r_min_x=0;
			var r_max_x=1;
			var r_min_y=0;
			var r_max_y=1;
			
			var timer=setInterval(function(){
				var Cur_y=$(elem).height();
				var Cur_x=$(elem).width();
				
				if(Cur_x-m_distance>Min_x){
					r_min_x=Cur_x-m_distance;
				}
				else{
					r_min_x=Min_x;
				}
				
				if(Cur_x+m_distance<Max_x){
					r_max_x=Cur_x+m_distance;
				}
				else{
					r_max_x=Max_x;
				}
				
				if(Cur_y-m_distance>Min_y){
					r_min_y=Cur_y-m_distance;
				}
				else{
					r_min_y=Min_y;
				}
				
				if(Cur_y+m_distance<Max_y){
					r_max_y=Cur_y+m_distance;
				}
				else{
					r_max_y=Max_y;
				}
				
				
				var Cur_x=Math.round(Math.random()*(r_max_x-r_min_x))+r_min_x;
				var Cur_y=Math.round(Math.random()*(r_max_y-r_min_y))+r_min_y;
				
				$(elem).width(Cur_x);
				$(elem).height(Cur_y);
				
			},250);
		}*/
		/*浮动的小球 面向过程 出版*/
    });
	
})();