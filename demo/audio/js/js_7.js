(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
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
	
	
	function wipe_right(){
		
	}
	
	function wipe_left(){
		
	}
	
	function wipe_up(){
		
	}
	
	function wipe_down(){
		
	}
	
	var img_loaded=0;
	var img_array=[];
	for(var i=1;i<=10;i++){
		img_array.push("../audio/images/sunny_"+i+".jpg");
	}
	
	for(var i=0;i<img_array.length;i++){
		var img=new Image();
		img.src=img_array[i];
		img.onload=function(){
			//console.log(img_loaded);
			img_loaded++;
			if(img_array.length==img_loaded){
				
				loadSound();
				//pageStart(); //载完图片，直接进入首页，音频自己慢慢载，载完自动播放
			}
		}
	}
	
	function loadSound(){
		var audio_address_list =[];
		audio_address_list.push("../audio/media/beep.mp3");
		audio_address_list.push("../audio/media/happy.mp3");
		audio_address_list.push("../audio/media/slide.mp3");
		audio_address_list.push("../audio/media/thunder.mp3");
		
		for(var i=0;i<audio_address_list.length;i++){
			var audio = document.createElement("audio");
			audio.src=audio_address_list[i];
			$(".audio_wrap").append(audio);
		}
		
		var audio_array=$("audio");
		for(var i=0;i<audio_array.length;i++){
			audio_array[i].load();
			audio_array[i].addEventListener("canplaythrough", function(){
				pageStart();
			});
		}
	}
	
	function pageStart(){
		$(".page_1 .txt").html("Page Start");
	}
	
});




















