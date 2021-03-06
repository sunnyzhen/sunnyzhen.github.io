(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);


$(document).ready(function(){
	var window_h=$(window).height();
	var window_w=$(window).width();
	
	if(window_w<=500){
		$(".mod_con").css({
			"margin-bottom":window_h-$(".mod_con").height()-20+"px"
		});
		$(".animation_box_1").css({
			"margin-right":window_w-310+"px"
		});
	}
	//var address=window.location;
	//window.location=address+"#link_2";
	
	//触按触发事件
	$("body").bind("touchstart", function(event){
		
		if($(".menu_wrap").hasClass("hover")){
			$(".menu_wrap").removeClass("hover");
		}
		
		if(y==0){
			
			$("#link_"+i+" .animation_box:first-child").addClass("hover");
			
			$("body").bind("touchend", function(event){
				$("#link_"+i+" .animation_box:first-child").removeClass("hover");
				
			});
						
		}
		else if(y==1){
			$("#link_"+i+" .animation_box:last-child").addClass("hover");
			
			$("body").bind("touchend", function(event){
				$("#link_"+i+" .animation_box:last-child").removeClass("hover");
				
			});
						
		}
		
	});

	var i=1;
	var y=0;
	
	//划屏触发事件
	$("body").touchwipe({
		 wipeLeft: function() { 
		 
		 	if(y==0){
				$("#link_"+i+" .animation_area").css({
					"margin-left": -1*(window_w-10)+"px"
				});
				//$("#link_"+i+" .animation_area").addClass("swipeLeft");
				y=1;
			}

		 },
		 wipeRight: function() {
			 
			if(y==1){
				$("#link_"+i+" .animation_area").css({
					"margin-left": "0px"
				});
				//$("#link_"+i+" .animation_area").removeClass("swipeLeft");
				y=0;
			} 
			
		 },
		 wipeUp: function() { 
		 	
			for(var j=1;j<15;j++){
				if(j==i){
					$(".content_wrap").css({
						"margin-top":"-"+window_h*(i-2)+"px"
					});
				}
			}
			
			if(y==1){
				$("#link_"+i+" .animation_area").css({
					"margin-left": "0px"
				});
				y=0;
			} 
			
			i--;
			
		 },
		 wipeDown: function() { 
		 
			for(var j=1;j<15;j++){
				if(j==i){
					$(".content_wrap").css({
						"margin-top":"-"+window_h*i+"px"
					});
				}
			}
			
			if(y==1){
				$("#link_"+i+" .animation_area").css({
					"margin-left": "0px"
				});
				y=0;
			}
			 
			i++;
			
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});

	
	//菜单触按触发事件
	$(".menu_wrap .tri").bind("touchstart", function(event){
		
		if($(".menu_wrap").hasClass("hover")){
			$(".menu_wrap").removeClass("hover");
		}
		else{
			$(".menu_wrap").addClass("hover");
		}
		
		event.stopPropagation();
	});
	
	function BindMenuItem(){
		var menu_list=$(".menu_list li .txt");
		for(var x=0;x<menu_list.length;x++){
			$(menu_list[x]).removeAttr("href");
			$(menu_list[x]).data("num",x);
			
			$(menu_list[x]).bind("touchstart",function(event){
				$(".content_wrap").css({
					"margin-top":"-"+window_h*$(this).data("num")+"px"
				});
				
				if(y==1){
					$("#link_"+i+" .animation_area").css({
						"margin-left": "0px"
					});
					//$("#link_"+i+" .animation_area").removeClass("swipeLeft");
					y=0;
				}
				
				i=$(this).data("num")+1;
				
			});
		}
		$(".menu_wrap .tri").removeAttr("href");
		
	}
	
	if(window_w<=500){//小于ip6+
		BindMenuItem();
	}
	
	$(".hook_right").bind("click",function(){
		
		alert("left");
		if(y==0){
			$("#link_"+i+" .animation_area").css({
				"margin-left": -1*(window_w-10)+"px"
			});
			//$("#link_"+i+" .animation_area").addClass("swipeLeft");
			y=1;
		}
	});
	
	$(".hook_left").bind("click",function(){
		alert("right");
		if(y==1){
			$("#link_"+i+" .animation_area").css({
				"margin-left": "0px"
			});
			//$("#link_"+i+" .animation_area").removeClass("swipeLeft");
			y=0;
		} 
	});
	
	$(".hook_up").bind("click",function(){
		alert("down");
		for(var j=1;j<15;j++){
			if(j==i){
				$(".content_wrap").css({
					"margin-top":"-"+window_h*(i-2)+"px"
				});
			}
		}
		
		if(y==1){
			$("#link_"+i+" .animation_area").removeClass("swipeLeft");
			y=0;
		} 
		
		i--;
	});
	
	$(".hook_down").bind("click",function(){
		
		alert("up");
		for(var j=1;j<15;j++){
			if(j==i){
				$(".content_wrap").css({
					"margin-top":"-"+window_h*i+"px"
				});
			}
		}
		
		if(y==1){
			$("#link_"+i+" .animation_area").removeClass("swipeLeft");
			y=0;
		}
		 
		i++;
	});

	
	/*微信转发图片*/
	
	var imgUrl = 'http://sunnyzhen.github.io/public/img/sunny.jpg';
	var lineLink = location.href;
	var descContent = "《动画十四原则》 - 桑尼真出品";
	var shareTitle = document.title;
	var appid = '';
	
	function shareFriend() {
		WeixinJSBridge.invoke('sendAppMessage',{
			"appid": appid,
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			//_report('send_msg', res.err_msg);
		})
	}
	function shareTimeline() {
		WeixinJSBridge.invoke('shareTimeline',{
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			   //_report('timeline', res.err_msg);
		});
	}
	function shareWeibo() {
		WeixinJSBridge.invoke('shareWeibo',{
			"content": descContent,
			"url": lineLink,
		}, function(res) {
			//_report('weibo', res.err_msg);
		});
	}
	// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// 发送给好友
		WeixinJSBridge.on('menu:share:appmessage', function(argv){
			shareFriend();
		});
		// 分享到朋友圈
		WeixinJSBridge.on('menu:share:timeline', function(argv){
			shareTimeline();
		});
		// 分享到微博
		WeixinJSBridge.on('menu:share:weibo', function(argv){
			shareWeibo();
		});
	}, false);
	
	
});




















