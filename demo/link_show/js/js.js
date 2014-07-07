(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	//触摸触发事件
	$(".cover_wrap").touchwipe({
		wipeDown: function() { 
			$(".cover_wrap").addClass("wrap_hide");
			$(".con_wrap_1").removeClass("wrap_prepare").addClass("wrap_show");
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	$(".con_wrap_1").touchwipe({
		wipeUp: function() { 
			$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
			$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
		},
		wipeDown: function() { 
			$(".con_wrap_1").addClass("wrap_hide");
			$(".con_wrap_2").removeClass("wrap_prepare").addClass("wrap_show");
		},
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	$(".con_wrap_2").touchwipe({
		wipeUp: function() { 
			$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_show");
			$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
		},
		wipeDown: function() { 
			$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
			$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_prepare");
			$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
		},
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	$(".con_wrap_3").touchwipe({
		wipeUp: function() { 
			$(".con_wrap_2").removeClass("wrap_hide").addClass("wrap_show");
			$(".con_wrap_3").removeClass("wrap_show").addClass("wrap_prepare");
		},
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	//点击触发事件
	$(".link_next_1").click(function(){
		$(".cover_wrap").addClass("wrap_hide");
		$(".con_wrap_1").removeClass("wrap_prepare").addClass("wrap_show");
	});
	
	$(".link_next_2").click(function(){
		$(".con_wrap_1").addClass("wrap_hide");
		$(".con_wrap_2").removeClass("wrap_prepare").addClass("wrap_show");
	});
	
	$(".link_next_3").click(function(){
		$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_prepare");
		$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
	});
	
	$(".link_next_4").click(function(){
		$(".con_wrap_2").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_3").removeClass("wrap_show").addClass("wrap_prepare");
	});
	
	$(".detail_star").click(function(){
		$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
	});
	
	$(".info_title").click(function(){
		$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
	});
	
	$(".logo_middle").click(function(){
		$(".con_wrap_2").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_3").removeClass("wrap_show").addClass("wrap_prepare");
	});
	
	$(".logo_small").click(function(){
		$(".con_wrap_2").addClass("wrap_hide");
		$(".con_wrap_3").removeClass("wrap_prepare").addClass("wrap_show");
	});
	
	
	/*微信转发图片*/
	
	var imgUrl = 'http://sunnyzhen.github.io/demo/link_show/images/linkshow.jpg';
	var lineLink = location.href;
	var descContent = "首期Linkshow，力邀9款产品，多个招聘岗位，邀你听产品故事，荐优秀人才！";
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




















