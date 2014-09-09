(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){

	var winH = $(window).height();
	var wrap = $("#tea_warp");
	var wrapMd = $("#tea_warp .md");
	wrapMd.eq(0).addClass("page0");
	var pageNum = 0;
	var mdSize = $(".md").size();
	$("html").touchwipe({
		wipeUp: function() { 
			
			if(pageNum>0){
				pageNum--;
				pageScroll(pageNum,"up");
			}

		},
		wipeDown: function() { 
			if(pageNum<=mdSize-2){

				pageNum++;
				pageScroll(pageNum,"down");
			}

		},
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});

	function pageScroll(pageNum,dir){
		var marginT = winH * pageNum;
		wrap.css({"margin-top":-marginT});
		setTimeout(function(){
			if(dir==="up"){
				var parNum = pageNum+1;
			}else{
				var parNum = pageNum-1;
			}
			
			wrapMd.eq(parNum).removeClass("page"+parNum);
			wrapMd.eq(pageNum).addClass("page"+pageNum);
		},300)
	}

	$(".bottom_dir").bind("click",function(){
		if(pageNum<=mdSize-1){
			pageNum++;
			pageScroll(pageNum);
		}
	})

	/*微信转发图片*/
	var imgUrl = location+'images/forwarding.jpg';
	var lineLink = location.href;
	var descContent = "九月教师节，属于讲师、导师，也属于每一们爱分享的腾讯人。";
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



})