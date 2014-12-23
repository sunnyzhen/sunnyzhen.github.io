$(document).ready(function(){
	
	
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
	
	//console.log(system);
	if(system!="IE"){
		
		
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
		
	}
	else{
		$("body").addClass("version_ie");
	}
	
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
			var param_h=(window_h/1100);
			var param_w=(window_w/700);
			//console.log(param_h);
			
			//大致合适位置：
			//1920x1200 偏移-540 缩放2.5
			//1440x900  偏移-630 缩放1.9
			//1024x768  偏移-735 缩放1.5
			
			//当宽度变小，手机的偏移值变大，缩放倍数变小，所以宽度相对于偏移值是反比，相对于缩放是正比
			//所以针对偏移，可以列2元一次不等式，解方程
			//x=630y+630*1440
			//x=735y+735*1024
			
			//x=1834560
			//y=1472
			
			//所以针对缩放，可以列2元一次不等式，解方程
			//1440+x=1.9y
			//1024+x=1.5y
			
			//x=536
			//y=1040
			
			//缩放2.1
			//1440+x=2.1y
			//1024+x=1.5y
			//x=16
			//y=693
			
			//二维码偏移值同理，反比
			//1200 600
			//900 700
			//768 750
			
			//x=700y+700*900
			//x=750y+750*768
			//x=1386000
			//y=1080
			
			
			
			
			var x_t=1834560;
			var y_t=1472;
			var param_a=(x_t/(y_t+window_w))/scroll_length;
			
			var x_s=536;
			var y_s=1040;
			var param_b=(window_w+x_s)/y_s-0.95;
			
			var x_qr=1386000;
			var y_qr=1080;
			var translate_h=x_qr/(y_qr+window_h)-80; //大概80为头部导航菜单栏的高度
			
			if(num>=scroll_length){
				$(".phone_wrap").css({
					"-moz-transform": " translate(0,0) scale(1)",
					"-webkit-transform": " translate(0,0) scale(1)"
				});
			}else{
				$(".phone_wrap").css({
					"-moz-transform": " translate(0,-"+(scroll_length-num)*param_a+"px) scale("+(1+(scroll_length-num)/scroll_length*param_b)+")",
					"-webkit-transform": " translate(0,-"+(scroll_length-num)*param_a+"px) scale("+(1+(scroll_length-num)/scroll_length*param_b)+")"
				});
			}
			
			if(num>=scroll_length){ //二维码悬浮
				$(".qr_code_wrap").css({
					"-moz-transform": " translate(0,0)",
					"-webkit-transform": " translate(0,0)"
				});
			}else{
				$(".qr_code_wrap").css({
					"-moz-transform": " translate(0,"+(translate_h-num*(translate_h/scroll_length))*-1+"px)", 
					"-webkit-transform": " translate(0,"+(translate_h-num*(translate_h/scroll_length))*-1+"px)" 
				});
				
			}
			
			//if($(".phone_wrap").css("width"))
			//console.log(num);
		//}
	}
});




















