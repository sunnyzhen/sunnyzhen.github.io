(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在那个页面
	var subpage_index=9;//页面总共有多少个子页
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			if(page_index==1){
				$(".cover_wrap").addClass("wrap_hide");
				$(".con_wrap_1").addClass("wrap_show");
				
				var timer=setTimeout(function(){
					$(".cover_wrap").removeClass("wrap_show");
					$(".con_wrap_1").removeClass("wrap_prepare");
					page_index=2;
					clearTimeout(timer);
					
				},300);
			}
			else if(page_index>1&&page_index<subpage_index){
				$(".con_wrap_"+(page_index-1)).addClass("wrap_hide");
				$(".con_wrap_"+page_index).addClass("wrap_show");
				
				var str_name_1=".con_wrap_"+(page_index-1);
				var str_name_2=".con_wrap_"+page_index;
				
				page_index+=1;
				
				var timer=setTimeout(function(){
					$(str_name_1).removeClass("wrap_show");
					$(str_name_2).removeClass("wrap_prepare");
					
					ResetWrapState();
					clearTimeout(timer);
					
				},300);
			}
			else{
					
			}
			
		 },
		 wipeUp: function() { 
			var str_name_1=".con_wrap_"+(page_index-2);
			var str_name_2=".con_wrap_"+(page_index-1);
			
			if(page_index==2){
				$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
				$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
				page_index=1;
			}
			else if(page_index>2&&page_index<=subpage_index){
				$(str_name_1).removeClass("wrap_hide").addClass("wrap_show");
				$(str_name_2).removeClass("wrap_show").addClass("wrap_prepare");
				
				page_index-=1;
			}
			else{
				
			}
				
		 },
		 wipeLeft: function() {
			
		 },
		 wipeRight: function() { 
			
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	/*pc test*/
	
	$(".hook_right").bind("click",function(){
		
	});
	
	$(".hook_left").bind("click",function(){
		
	});
	
	$(".hook_up").bind("click",function(){
		var str_name_1=".con_wrap_"+(page_index-2);
		var str_name_2=".con_wrap_"+(page_index-1);
		
		if(page_index==2){
			$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
			$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
			page_index=1;
		}
		else if(page_index>2&&page_index<=subpage_index){
			$(str_name_1).removeClass("wrap_hide").addClass("wrap_show");
			$(str_name_2).removeClass("wrap_show").addClass("wrap_prepare");
			
			page_index-=1;
		}
		else{
			
		}
	});
	
	$(".hook_down").bind("click",function(){
		if(page_index==1){
			$(".cover_wrap").addClass("wrap_hide");
			$(".con_wrap_1").addClass("wrap_show");
			
			var timer=setTimeout(function(){
				$(".cover_wrap").removeClass("wrap_show");
				$(".con_wrap_1").removeClass("wrap_prepare");
				page_index=2;
				clearTimeout(timer);
				
			},300);
		}
		else if(page_index>1&&page_index<subpage_index){
			$(".con_wrap_"+(page_index-1)).addClass("wrap_hide");
			$(".con_wrap_"+page_index).addClass("wrap_show");
			
			var str_name_1=".con_wrap_"+(page_index-1);
			var str_name_2=".con_wrap_"+page_index;
			
			page_index+=1;
			
			var timer=setTimeout(function(){
				$(str_name_1).removeClass("wrap_show");
				$(str_name_2).removeClass("wrap_prepare");
				
				ResetWrapState();
				clearTimeout(timer);
				
			},300);
		}
		else{
				
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




















