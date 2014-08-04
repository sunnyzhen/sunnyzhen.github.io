(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	var i=0;
	
	//触摸触发事件
	$("body").touchwipe({
		 wipeLeft: function() { 
		 	alert("left");
		 	if(i=-1){
				$(".bottle").attr("class","bottle");
				i=0;
			}
		 	else if(i==0){
				$(".bottle").attr("class","bottle water_yellow yellow");
				i=1;
			}
			else if(i=1){
				$(".bottle").attr("class","bottle water_pink pink");
				i=2;
			}
			else if(i=2){
				
			}
			
		 },
		 wipeRight: function() { 
		 	alert("right");
			if(i=-1){
			}
		 	else if(i==0){
				$(".bottle").attr("class","bottle water_green green");
				i=-1;
			}
			else if(i=1){
				$(".bottle").attr("class","bottle");
				i=0;
			}
			else if(i=2){
				$(".bottle").attr("class","bottle water_yellow yellow");
				i=1;
			}
		 },
		 wipeUp: function() { 
		 	alert("top");
			$(".cloverTop").show();
			$(".cloverBottom").show();
			$(".jellyfish").hide();
		 },
		 wipeDown: function() { 
		 	alert("bottom");
			$(".cloverTop").hide();
			$(".cloverBottom").hide();
			$(".jellyfish").show();
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	$(".btn_1").click(function(){
		$(".bottle").attr("class","bottle water_green green");
	});
	
	$(".btn_2").click(function(){
		$(".bottle").attr("class","bottle water_yellow yellow");
	});
	
	$(".btn_3").click(function(){
		$(".bottle").attr("class","bottle water_pink pink");
	});
	
	$(".btn_4").click(function(){
		$(".cloverTop").show();
		$(".cloverBottom").show();
		$(".jellyfish").hide();
	});
	
	$(".btn_5").click(function(){
		$(".cloverTop").hide();
		$(".cloverBottom").hide();
		$(".jellyfish").show();
	});
	
	/*微信转发图片*/
	
	var imgUrl = 'http://sunnyzhen.github.io/public/img/sunny.jpg';
	var lineLink = location.href;
	var descContent = "《四叶草、水母与玻璃瓶》 - 桑尼真出品";
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




















