$(document).ready(function(){
	
	var scroll_height=270;
	var window_h=$(window).height();
	var window_w=$(window).width();
	var img_min_h=488;
	var img_min_w=863;
	var phone_min_h=547;
	var phone_min_w=1118;
	var phone_set_h=parseInt(547/488*window_h);
	var phone_set_w=parseInt(1118/863*window_w);
	var phone_set_l=parseInt(123/1118*phone_set_w);
	var phone_set_t=parseInt(30/547*phone_set_h);
	var scroll_length=350;
	var ocupy_length=$(".ocupy_area").offset().top;
	var translate_h=600;
	
	$(".main").css({
		"margin-top": scroll_length+110+"px"
	});
	
	$(window).scroll(function(){
		var scroll_num=$(window).scrollTop();
/*		if(scroll_num>270){
			$(".phone_screen").removeAttr("style");
			$(".phone_wrap").removeAttr("style");
			
		}*/
		setPhoneSize(scroll_num);
		//console.log($(window).scrollTop());
	});
	
/*	$(".phone_screen").css({
		"height": window_h+"px",
		"width": window_w+"px",
		"left":phone_set_l+"px",
		"top":phone_set_t+"px"
	});
	
	$(".phone_wrap").css({
		"height": phone_set_h+"px",
		"width": phone_set_w+"px",
		"left": "0",
		"top": "0",
		"margin-left": phone_set_l*-1+"px",
		"margin-top": phone_set_t*-1+"px",
		"position":"fixed"
	});*/
	
	setPhoneSize(0);
	function setPhoneSize(num){
		/*if(num==0){
			if(num>=0&&num<=scroll_length&& window_h*((scroll_length-num)/scroll_length)>=img_min_h){
				$(".phone_screen").css({
					"height": window_h*((scroll_length-num)/scroll_length)+"px",
					"width": window_w*((scroll_length-num)/scroll_length)+"px",
					"left":phone_set_l*((scroll_length-num)/scroll_length)+"px",
					"top":phone_set_t*((scroll_length-num)/scroll_length)+"px"
				});
				
				$(".phone_wrap").css({
					"height": phone_set_h*((scroll_length-num)/scroll_length)+"px",
					"width": phone_set_w*((scroll_length-num)/scroll_length)+"px",
					"left": "50%",
					"top": "50%",
					"margin-left": Math.floor(phone_set_w/2)*-1*((scroll_length-num)/scroll_length)+"px",
					"margin-top": (ocupy_length+Math.floor(phone_set_h/2))*-1*((scroll_length-num)/scroll_length)+"px",
					"position":"absolute"
				});
			}
		}
		else{*/
		
			//背景缩放、偏移
			if(num>=scroll_length){
				$(".phone_wrap").css({
					"-moz-transform": " translate(0,0) scale(1)"
				});
			}else{
				$(".phone_wrap").css({
					"-moz-transform": " translate(0,-"+(scroll_length-num)*1.6+"px) scale("+(1+(scroll_length-num)/scroll_length*1.4)+")"
				});
			}
			
			if(num>=scroll_length){ //二维码悬浮
				$(".qr_code_wrap").css({
					"-moz-transform": " translate(0,0)"
				});
			}else{
				$(".qr_code_wrap").css({
					"-moz-transform": " translate(0,"+(translate_h-num*(translate_h/scroll_length))*-1+"px)" //1.7=600-35()
				});
				
			}
			
			//if($(".phone_wrap").css("width"))
			//console.log(num);
		//}
	}
	
});




















