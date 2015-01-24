(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	var item_sel_index=0;
	var decoration_list=["glass","blush","anger","knife","beard"];
	var decoration_index=0;
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			wipe_down();
		 },
		 wipeUp: function() { 
			wipe_up();
		 },
		 wipeLeft: function() {
			wipe_right();
		 },
		 wipeRight: function() { 
		 	wipe_left();
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	//wipeLeft
	$(".hook_right").bind("click",function(){
		wipe_right();
	});
	
	//wipeRight
	$(".hook_left").bind("click",function(){
		wipe_left();
	});
	
	//wipeUp
	$(".hook_up").bind("click",function(){
		wipe_up();
	});
	
	//wipeDown
	$(".hook_down").bind("click",function(){
		wipe_down();
	});
	
	
	function wipe_right(){
		if(item_sel_index==1){
			
			if(decoration_index==0){
				
			}
			else if(decoration_index==1){
				$("."+decoration_list[0]).css({
					"opacity":0
				});
				
				$("."+decoration_list[decoration_list.length-1]).css({
					"opacity":1
				});
			}
			else{
				$("."+decoration_list[decoration_index-1]).css({
					"opacity":0
				});
				
				$("."+decoration_list[decoration_index-2]).css({
					"opacity":1
				});
			}
			
			if(decoration_index==1){
				decoration_index=decoration_list.length;
			}
			else{
				decoration_index--;
			}
		}
	}
	
	function wipe_left(){
		if(item_sel_index==1){
			
			if(decoration_index==0){
				$("."+decoration_list[0]).css({
					"opacity":1
				});
			}
			else if(decoration_index==decoration_list.length){
				$("."+decoration_list[decoration_list.length-1]).css({
					"opacity":0
				});
				
				$("."+decoration_list[0]).css({
					"opacity":1
				});
			}
			else{
				$("."+decoration_list[decoration_index-1]).css({
					"opacity":0
				});
				
				$("."+decoration_list[decoration_index]).css({
					"opacity":1
				});
			}
			
			if(decoration_index==decoration_list.length){
				decoration_index=1;
			}
			else{
				decoration_index++;
			}
			
		}
	}
	
	function wipe_up(){
		
	}
	
	function wipe_down(){
		
	}
	
	function BindItemEvent(){
		var itemlist=$(".operate_list .item");
		for(var i=1;i<=itemlist.length;i++){
			(function(){
				var index=i;
				$(".operate_list .item_"+index).click(function(){
					$(".operate_list .item").removeClass("current");
					$(this).addClass("current");
					item_sel_index=index;
				});
			})();
		}
	}
	
	BindItemEvent();
	
	
	/*pc test*/
	
	/* 安卓版本兼容 */
	var brower = {
		versions:function(){
			var u = window.navigator.userAgent;
			var num ;
			if(u.indexOf('Trident') > -1){
			//IE
				return "IE";
			}else if(u.indexOf('Presto') > -1){
			//opera
				return "Opera";
			}else if(u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1){
			//firefox
				return "Firefox";
			}else if(u.indexOf('AppleWebKit' && u.indexOf('Safari') > -1) > -1){
			//苹果、谷歌内核
				if(u.indexOf('Chrome') > -1){
				//chrome
					return "Chrome";
				}else if(u.indexOf('OPR')){
				//webkit Opera
					return "Opera_webkit"
				}else{
				//Safari
					return "Safari";
				}
			}else if(u.indexOf('Mobile') > -1){
			//移动端
				if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
				//ios
					if(u.indexOf('iPhone') > -1){
					//iphone
						return "iPhone"
					}else if(u.indexOf('iPod') > -1){
					//ipod
						return "iPod"
					}else if(u.indexOf('iPad') > -1){
					//ipad
						return "iPad"
					}
				}else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
				//android
					num = u.substr(u.indexOf('Android') + 8, 3);
					return {"type":"Android", "version": num};
				}else if(u.indexOf('BB10') > -1 ){
				//黑莓bb10系统
					return "BB10";
				}else if(u.indexOf('IEMobile')){
				//windows phone
					return "Windows Phone"
				}
			}
		}
    }
	
	var system=brower.versions();
	if(system.type=="Android"){
		if(system.version==4.4){
			$("body").addClass("android_version_4_4");
		}
		else{
			$("body").addClass("android_version");
		}
	}
	
	
});




















