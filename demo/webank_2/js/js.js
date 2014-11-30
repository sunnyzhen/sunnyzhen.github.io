(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在哪个页面
	var page_total=8;//总共有多少页面
	var subpage_index=1;//当前在哪个子页
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			if(page_index==page_total){
				var list_num=$(".details_list .details_con").length;
				if(subpage_index>=1&&subpage_index<list_num){
					$($(".details_con")[subpage_index-1]).addClass("wrap_before").removeClass("current");
					$($(".details_con")[subpage_index]).addClass("current").removeClass("wrap_after");
					
					subpage_index++;
				}
			}
		 },
		 wipeUp: function() { 
			if(page_index==page_total){
			
				var list_num=$(".details_list .details_con").length;
				if(subpage_index>=2&&subpage_index<=list_num){
					$($(".details_con")[subpage_index-2]).removeClass("wrap_before").addClass("current");
					$($(".details_con")[subpage_index-1]).removeClass("current").addClass("wrap_after");
					
					subpage_index--;
				}
				
			}
		 },
		 wipeLeft: function() {
			if(page_index>=1&&page_index<page_total&&subpage_index==1){
				$($(".con_wrap")[page_index-1]).addClass("wrap_hide");
				$($(".con_wrap")[page_index]).addClass("wrap_show");
				
				var timer=setTimeout(function(){
					$($(".con_wrap")[page_index-1]).removeClass("wrap_show");
					$($(".con_wrap")[page_index]).removeClass("wrap_prepare");
					
					clearTimeout(timer);
					page_index++;
					if(page_index>page_total){
						page_index=page_total;
					}
					
					console.log(page_index+" "+subpage_index);
					
				},300);
				
			}
		 },
		 wipeRight: function() { 
		 	if(page_index>=2&&page_index<=page_total&&subpage_index==1){
				$($(".con_wrap")[page_index-2]).removeClass("wrap_hide").addClass("wrap_show");
				$($(".con_wrap")[page_index-1]).removeClass("wrap_show").addClass("wrap_prepare");
				
				page_index--;
				
			}
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	/*pc test*/
	
	//wipeLeft
	$(".hook_right").bind("click",function(){
		
		if(page_index>=1&&page_index<page_total&&subpage_index==1){
			$($(".con_wrap")[page_index-1]).addClass("wrap_hide");
			$($(".con_wrap")[page_index]).addClass("wrap_show");
			
			var timer=setTimeout(function(){
				$($(".con_wrap")[page_index-1]).removeClass("wrap_show");
				$($(".con_wrap")[page_index]).removeClass("wrap_prepare");
				
				clearTimeout(timer);
				page_index++;
				if(page_index>page_total){
					page_index=page_total;
				}
				
				console.log(page_index+" "+subpage_index);
				
			},300);
			
		}
		
		
	});
	
	//wipeRight
	$(".hook_left").bind("click",function(){
		
		if(page_index>=2&&page_index<=page_total&&subpage_index==1){
			$($(".con_wrap")[page_index-2]).removeClass("wrap_hide").addClass("wrap_show");
			$($(".con_wrap")[page_index-1]).removeClass("wrap_show").addClass("wrap_prepare");
			
			page_index--;
			
		}
		
		console.log(page_index+" "+subpage_index);
		
	});
	
	//wipeUp
	$(".hook_up").bind("click",function(){
		
		if(page_index==page_total){
			
			var list_num=$(".details_list .details_con").length;
			if(subpage_index>=2&&subpage_index<=list_num){
				$($(".details_con")[subpage_index-2]).removeClass("wrap_before").addClass("current");
				$($(".details_con")[subpage_index-1]).removeClass("current").addClass("wrap_after");
				
				subpage_index--;
			}
			
		}
		
	});
	
	//wipeDown
	$(".hook_down").bind("click",function(){
		
		if(page_index==page_total){
			var list_num=$(".details_list .details_con").length;
			if(subpage_index>=1&&subpage_index<list_num){
				$($(".details_con")[subpage_index-1]).addClass("wrap_before").removeClass("current");
				$($(".details_con")[subpage_index]).addClass("current").removeClass("wrap_after");
				
				subpage_index++;
			}
		}
		
	});
	
	/*pc test*/
	
	/*微信转发图片*/
	
	var imgUrl = 'http://sunnyzhen.github.io/public/img/sunny.jpg';
	var lineLink = location.href;
	var descContent = "这里是 转发文字，比如：大家都爱陈某真！";
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




















