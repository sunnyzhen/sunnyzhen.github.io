(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);


$(document).ready(function(){
	
	//var address=window.location;
	//window.location=address+"#link_2";
	
	//点击触发事件
/*	$("body").bind("click", function(event){
		
		switch(i){
			case 1: {
				if(y==0){
					$("#link_1 .animation_box:first-child").addClass("hover");	
				}
				break;
			}
			case 2: break;
			case 3: System.out.println("haha"); break;
			case 4: System.out.println("hehe"); break;
		}
		
	});*/
	
	//触摸触发事件
	$("body").bind("touchstart", function(event){
		
		switch(i){
			case 1: {
				if(y==0){
					$("#link_1 .animation_box:first-child").addClass("hover");
					
					$("body").bind("touchend", function(event){
						$("#link_1 .animation_box:first-child").removeClass("hover");
						
					});
								
				}
				else if(y==1){
					$("#link_1 .animation_box:last-child").addClass("hover");
					
					$("body").bind("touchend", function(event){
						$("#link_1 .animation_box:last-child").removeClass("hover");
						
					});
								
				}
				break;
			}
			case 2: break;
			case 3: System.out.println("haha"); break;
			case 4: System.out.println("hehe"); break;
		}
		
	});

	var i=1;
	var y=0;
	
	//触摸触发事件
	$("body").touchwipe({
		 wipeLeft: function() { 
		 	switch(i){
				case 1: {
					if(y==0){
						$("#link_1 .animation_area").addClass("swipeLeft");
						y=1;
					}
					break;
				}
				case 2: break;
				case 3: System.out.println("haha"); break;
				case 4: System.out.println("hehe"); break;
			}
		 },
		 wipeRight: function() { 
			switch(i){
				case 1: {
					if(y==1){
						$("#link_1 .animation_area").removeClass("swipeLeft");
						y=0;
					}
					break;
				}
			}
		 },
		 wipeUp: function() { 
		 	switch(i){
				case 1: {
					
					break;
				}
				case 2: {
					$(".content_wrap").css({
						"margin-top":"-"+416*(i-1)+"px"
					});
					break;
				}
			}
		 },
		 wipeDown: function() { 
		 	switch(i){
				case 1: {
					$(".content_wrap").css({
						"margin-top":"-"+416*i+"px"
					});
					break;
				}
				case 2: {
					break;
				}
			}
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
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




















