(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	var page_index=1;
	var sub_page_index=0;
	
	//触摸触发事件
	/*$("body").touchwipe({
		wipeDown: function() { 
			
		 },
		 wipeUp: function() { 
			
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});*/
	
	//默认隐藏内页，1s后还原
	/*var wrap_prepare_timer=setTimeout(function(){
		$(".wrap_prepare").css({
			"display":"block"
		});
	},1500);*/
	
	
	/*var loadpage_timer=setTimeout(function(){
		$(".sub_page_container").load("sub_page.html");
	},2000);
	
	$.ajaxSetup ({  
		cache: false //关闭AJAX相应的缓存  
	});*/
	
	
	//切换 详细岗位列表
	function SwitchSubList(wrap,index){
		var list=$(wrap).children(".tear_page_wrap");
		if(index==0){
			$(wrap).removeClass("detail_wrap_show");
			for(var i=0;i<list.length;i++){
				$(list[i]).removeClass("wrap_before").addClass("wrap_after");
			}
			$(wrap).children(".poster_wrap").removeClass("wrap_before");
		}
		else{
			$(wrap).addClass("detail_wrap_show");
			for(var i=0;i<list.length;i++){
				if($(list[i]).data("index")<index){
					$(list[i]).removeClass("wrap_after").addClass("wrap_before");
				}
				else if($(list[i]).data("index")>index){
					$(list[i]).addClass("wrap_after").removeClass("wrap_before");
				}
				else if($(list[i]).data("index")==index){
					$(list[i]).removeClass("wrap_after").removeClass("wrap_before");
				}
			}
			
			$(wrap).children(".poster_wrap").addClass("wrap_before");
		}
		$(".design_wrap").removeClass("wrap_after");
		sub_page_index=index;
		
		if($("body").hasClass("android_version_4_2")&&$(".poster_wrap").hasClass("wrap_before")){
			$(".con_wrap").css("display","inline");
			var time=setTimeout(function(){ $(".con_wrap").css("display","block"); },1);
		}
	}
	
	//绑定切换详细岗位事件
	function BindTabEvent(list,wrap){ 
	 	var tabList=$(list).children("li").children(".tab_item");
		for(var i=0;i<tabList.length;i++){
			(function(){
				var index=i;
				$(tabList[index]).bind("click",function(){
					SwitchSubList(wrap,index+1);
					
					$(list).children("li").removeClass("current");
					$(this).parent().addClass("current");
				});
			})();
		}
		
		/*$(".con_wrap_1 .detail_title").bind("click",function(){
			$(".con_wrap_1").addClass("tearing");
		});
		
		$(".con_wrap_1 .surrender_tips").bind("click",function(){
			$(".con_wrap_1").addClass("tearing");
		});*/
		
		/*$(wrap).find(".detail_title").bind("click",function(){
			GetEmailPage(wrap);
		});*/
		
		$(wrap).find(".detail_title").each(function(index,value){
			value.addEventListener("click", function (e) {
				GetEmailPage(wrap);
			}, false);
		})
		
		$(wrap).find(".surrender_tips").bind("click",function(){
			GetEmailPage(wrap);
		});
		
	}
	
	BindTabEvent($("#tab_list_1"),$(".con_wrap_1"));
	BindTabEvent($("#tab_list_2"),$(".con_wrap_2"));
	BindTabEvent($("#tab_list_3"),$(".con_wrap_3"));
	BindTabEvent($("#tab_list_4"),$(".con_wrap_4"));
	
	//撕下通缉令 出现邮箱页
	function GetEmailPage(wrap){
		$(wrap).addClass("tearing");
		$(".email_wrap").addClass("tearing");
		
		page_index=0;
	 	sub_page_index=0;
	}
	
	/*$(".con_wrap_1").find(".detail_title").bind("click",function(){
		$(this).parentsUntil("con_wrap").addClass("tearing");
	})*/
	
	/*$(".tab_list_1 .tab_item_1").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,1);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	
	$(".tab_list_1 .tab_item_2").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,2);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	$(".tab_list_1 .tab_item_3").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,3);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	$(".tab_list_1 .tab_item_4").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,4);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});
	$(".tab_list_1 .tab_item_5").bind("click",function(){
		var sub_list=$(".con_wrap_1 .tear_page_wrap");
		SwitchSubList(sub_list,5);
		
		$(".tab_list_1 li").removeClass("current");
		$(this).parent().addClass("current");
	});*/
	
	function ResetWrapState(){
		$(".poster_wrap").removeClass("wrap_before");
		$(".tear_page_wrap").removeClass("wrap_before").addClass("wrap_after");
		$(".tab_list li").removeClass("current");
		$(".con_wrap").removeClass("detail_wrap_show");
		$(".email_wrap").removeClass("tearing");
		
		$(".design_wrap").removeClass("wrap_after");

	}
	
	var style_load=0;
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			if(page_index==1){
				$(".cover_wrap").addClass("wrap_hide");
				$(".con_wrap_1").addClass("wrap_show");
				
				if(style_load==0){
					includeStyleElement(styles,"newstyle");
					style_load=1;
				}
				
				var timer=setTimeout(function(){
					$(".cover_wrap").removeClass("wrap_show");
					$(".con_wrap_1").removeClass("wrap_prepare");
					
					ResetWrapState();
					page_index=2;
					clearTimeout(timer);
					
				},300);
			}
			else if(page_index>1&&page_index<5){
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
			else if(page_index==5){
				GetEmailPage($(".con_wrap_4"));
			}
			else{
					
			}
			sub_page_index=0;
			
			//安卓4.4兼容，按钮滑屏隐藏bug
			$(".android_version .tab_wrap").css("z-index","auto");
			if($("body").hasClass("android_version")){
				var timer=setTimeout(function(){
					$(".android_version .tab_wrap").css("z-index","3");
				},1);
			}
			
		 },
		 wipeUp: function() { 
		 	if(wipe_hook==0){
				var str_name_1=".con_wrap_"+(page_index-2);
				var str_name_2=".con_wrap_"+(page_index-1);
				
				if(page_index==2){
					$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
					$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
					
					ResetWrapState();
					page_index=1;
				}
				else if(page_index>2&&page_index<=5){
					
					$(str_name_1).removeClass("wrap_hide").addClass("wrap_show");
					$(str_name_2).removeClass("wrap_show").addClass("wrap_prepare");
					
					ResetWrapState();
					page_index-=1;
				}
				else{
					
				}
				sub_page_index=0;
				
				//安卓4.4兼容，按钮滑屏隐藏bug
				$(".android_version .tab_wrap").css("z-index",3);
			}
		 },
		 wipeLeft: function() {
			if(wipe_hook==0){
				var str_name_1=".con_wrap_"+(page_index-1);
				var str_name_2="#tab_list_"+(page_index-1);
				
				if(page_index==0||page_index==1){
					
				}
				else if(page_index>1){
					var list_length=$(str_name_2).children("li").length;
					if(sub_page_index<list_length){
						SwitchSubList($(str_name_1),sub_page_index+1);
					}
				}
				else{
					
				}
				
				$(str_name_2).children("li").removeClass("current");
				if(sub_page_index!=0){
					$($(str_name_2).children("li")[sub_page_index-1]).addClass("current");
				}
			}
			
		 },
		 wipeRight: function() { 
			
			var str_name_1=".con_wrap_"+(page_index-1);
			var str_name_2="#tab_list_"+(page_index-1);
			
			if(page_index==0||page_index==1){
				
			}
			else if(page_index>1){
				var list_length=$(str_name_2).children("li").length;
				
				if(sub_page_index>0){
					SwitchSubList($(str_name_1),sub_page_index-1);
				}
				
			}
			else{
				
			}
			
			$(str_name_2).children("li").removeClass("current");
			if(sub_page_index!=0){
				$($(str_name_2).children("li")[sub_page_index-1]).addClass("current");
			}
			
			if($("body").hasClass("android_version")){
				$(".android_version .poster_wrap .brush").css({
					"z-index":"auto"
				});
				$(".android_version .poster_wrap .reward").css({
					"background":"none",
					"background-size":"none"
				});
				
				var timer=setTimeout(function(){
					$(".android_version .poster_wrap .brush").css({
						"z-index": 2
					});
					$(".android_version .poster_wrap .reward").css({
						"background":"url(../recruit/images/poster_bg_1.jpg) no-repeat 0 -928px",
						"background-size":"213px 955px"
					});
				},1);
			}
			
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	/*
	$(".cover_wrap .hook_down").bind("click",function(){
		$(".cover_wrap").addClass("wrap_hide");
		$(".con_wrap_1").addClass("wrap_show");
		
		var timer=setTimeout(function(){
			$(".cover_wrap").removeClass("wrap_show");
			$(".con_wrap_1").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	
	$(".con_wrap_1 .hook_down").bind("click",function(){
		$(".con_wrap_1").addClass("wrap_hide");
		$(".con_wrap_2").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".con_wrap_1").removeClass("wrap_show");
			$(".con_wrap_2").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	$(".con_wrap_2 .hook_down").bind("click",function(){
		$(".con_wrap_2").addClass("wrap_hide");
		$(".con_wrap_3").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".con_wrap_2").removeClass("wrap_show");
			$(".con_wrap_3").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	$(".con_wrap_3 .hook_down").bind("click",function(){
		$(".con_wrap_3").addClass("wrap_hide");
		$(".con_wrap_4").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".con_wrap_3").removeClass("wrap_show");
			$(".con_wrap_4").removeClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	
	$(".con_wrap_1 .hook_up").bind("click",function(){
		$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});
	$(".con_wrap_2 .hook_up").bind("click",function(){
		$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});
	$(".con_wrap_3 .hook_up").bind("click",function(){
		$(".con_wrap_2").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_3").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});
	$(".con_wrap_4 .hook_up").bind("click",function(){
		$(".con_wrap_3").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_4").removeClass("wrap_show").addClass("wrap_prepare");
		ResetWrapState();
	});*/
	
	$(".tab_list_3 .tab_item_8").bind("click",function(){
		$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap").removeClass("wrap_show").addClass("wrap_prepare");
		
		page_index=1;
		sub_page_index=0;
		wipe_hook=0;
		
		var timer=setTimeout(function(){
			$(".con_wrap").removeClass("wrap_hide").removeClass("wrap_show").removeClass("tearing").removeClass("detail_wrap_show").addClass("wrap_prepare");
			ResetWrapState();
		},300);
	});
	
	$(".hook_right").bind("click",function(){
		
		var str_name_1=".con_wrap_"+(page_index-1);
		var str_name_2="#tab_list_"+(page_index-1);
		
		if(page_index==0||page_index==1){
			
		}
		else if(page_index>1){
			var list_length=$(str_name_2).children("li").length;
			if(sub_page_index<list_length){
				SwitchSubList($(str_name_1),sub_page_index+1);
			}
		}
		else{
			
		}
		
		$(str_name_2).children("li").removeClass("current");
		if(sub_page_index!=0){
			$($(str_name_2).children("li")[sub_page_index-1]).addClass("current");
		}
		
	});
	
	$(".hook_left").bind("click",function(){
		
		var str_name_1=".con_wrap_"+(page_index-1);
		var str_name_2="#tab_list_"+(page_index-1);
		
		if(page_index==0||page_index==1){
			
		}
		else if(page_index>1){
			var list_length=$(str_name_2).children("li").length;
			
			if(sub_page_index>0){
				SwitchSubList($(str_name_1),sub_page_index-1);
			}
			
		}
		else{
			
		}
		
		$(str_name_2).children("li").removeClass("current");
		if(sub_page_index!=0){
			$($(str_name_2).children("li")[sub_page_index-1]).addClass("current");
		}
		
	});
	
	$(".hook_up").bind("click",function(){
		
		var str_name_1=".con_wrap_"+(page_index-2);
		var str_name_2=".con_wrap_"+(page_index-1);
		
		if(page_index==2){
			$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
			$(".con_wrap_1").removeClass("wrap_show").addClass("wrap_prepare");
			
			ResetWrapState();
			page_index=1;
		}
		else if(page_index>2&&page_index<=5){
			
			$(str_name_1).removeClass("wrap_hide").addClass("wrap_show");
			$(str_name_2).removeClass("wrap_show").addClass("wrap_prepare");
			
			ResetWrapState();
			page_index-=1;
		}
		else{
			
		}
		sub_page_index=0;
	});
	
	$(".hook_down").bind("click",function(){
		if(page_index==1){
			$(".cover_wrap").addClass("wrap_hide");
			$(".con_wrap_1").addClass("wrap_show");
			
			if(style_load==0){
				includeStyleElement(styles,"newstyle");
				style_load=1;
			}
			
			var timer=setTimeout(function(){
				$(".cover_wrap").removeClass("wrap_show");
				$(".con_wrap_1").removeClass("wrap_prepare");
				
				ResetWrapState();
				page_index=2;
				clearTimeout(timer);
				
			},300);
		}
		else if(page_index>1&&page_index<5){
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
		else if(page_index==5){
			GetEmailPage($(".con_wrap_4"));
		}
		else{
				
		}
		sub_page_index=0;
	});
	
	var wipe_hook=0;
	
	$(".detail_wrap .detail_title").touchwipe({
		wipeUp:function(e){
			wipe_hook=1;
			
			var wrap=$(e.currentTarget).parents(".con_wrap");
			GetEmailPage($(wrap));
			
		},
		wipeLeft:function(e){
			wipe_hook=1;
			
			var wrap=$(e.currentTarget).parents(".con_wrap");
			GetEmailPage($(wrap));
			
/*			eve.stopPropagation();
			eve.preventDefault();
			eve.cancleBubble=true;
			return false;*/
		},
		min_move_x: 60,
		min_move_y: 60,
		preventDefaultEvents: true
	});
	
	$(".share_click_area").bind("click",function(){
		$(".email_wrap").addClass("share_tips_show");
	});
	
	$(".mask").bind("click",function(){
		$(this).parents(".email_wrap").removeClass("share_tips_show");
	});
	
	
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
		if(system.version==4.1||system.version==4.2||system.version==4.3){
			$("body").addClass("android_version_4");
		}
		else{
			$("body").addClass("android_version");
		}
	}
	
	//首页背景移动
	
	function orientationHandler(event) { 
		if(Math.round(event.beta)>-100&&Math.round(event.beta)<100){
			if(Math.round(event.gamma)<30&&Math.round(event.gamma)>-30){
			
				var scale_num=Math.round(event.beta)/140;
				var skew_num=Math.round(event.gamma)*(-1);
				
				var translate_y=Math.floor(Math.round(event.beta)/15)*(-1);
				
				if(event.gamma>0){
					var translate_x=Math.floor(Math.round(event.gamma)/5);
				}
				else{
					var translate_x=Math.floor(Math.round(event.gamma)/10);
				}
					
				$(".penguin_1 .slide_hook").css({
					"-webkit-transform":"skew("+skew_num+"deg,0) scale(1,"+(1+scale_num)+") translate("+translate_x+"px,"+translate_y+"px)"
				});
				$(".penguin_2 .slide_hook").css({
					"-webkit-transform":"skew("+skew_num+"deg,0) scale(1,"+(1+scale_num)+") translate("+translate_x+"px,"+translate_y+"px)"
				});
				$(".penguin_3 .slide_hook").css({
					"-webkit-transform":"skew("+skew_num+"deg,0) scale(1,"+(1+scale_num)+") translate("+translate_x+"px,"+translate_y+"px)"
				});
				$(".penguin_4 .slide_hook").css({
					"-webkit-transform":"skew("+skew_num+"deg,0) scale(1,"+(1+scale_num)+") translate("+translate_x+"px,"+translate_y+"px)"
				});
			}
			
			
			/*$(".penguin_1 .slide_hook").css({
				"-webkit-transform":"scale(1,"+(1+num)+") translate(0px,"+Math.floor(Math.round(event.beta)/15)*(-1)+"px)"
			});
			$(".penguin_2 .slide_hook").css({
				"-webkit-transform":"scale(1,"+(1+num)+") translate(0px,"+Math.floor(Math.round(event.beta)/15)*(-1)+"px)"
			});
			$(".penguin_3 .slide_hook").css({
				"-webkit-transform":"scale(1,"+(1+num)+") translate(0px,"+Math.floor(Math.round(event.beta)/15)*(-1)+"px)"
			});
			$(".penguin_4 .slide_hook").css({
				"-webkit-transform":"scale(1,"+(1+num)+") translate(0px,"+Math.floor(Math.round(event.beta)/15)*(-1)+"px)"
			});*/
		}
		
		
		//$(".static .txt").html(/*"左右："+Math.round(event.gamma)+" "+Math.floor(Math.round(event.gamma)/10)+*/" 上下："+Math.round(event.gamma));

		/*if(Math.round(event.gamma)<30&&Math.round(event.gamma)>-30){
			$(".penguin_1 .slide_hook").css({
				"-webkit-transform":"skew("+Math.round(event.gamma)*(-1)+"deg,0) translate("+Math.floor(Math.round(event.gamma)/10)+"px,0px)"
			});
			$(".penguin_2 .slide_hook").css({
				"-webkit-transform":"skew("+Math.round(event.gamma)*(-1)+"deg,0) translate("+Math.floor(Math.round(event.gamma)/10)+"px,0px)"
			});
			$(".penguin_3 .slide_hook").css({
				"-webkit-transform":"skew("+Math.round(event.gamma)*(-1)+"deg,0) translate("+Math.floor(Math.round(event.gamma)/10)+"px,0px)"
			});
			$(".penguin_4 .slide_hook").css({
				"-webkit-transform":"skew("+Math.round(event.gamma)*(-1)+"deg,0) translate("+Math.floor(Math.round(event.gamma)/10)+"px,0px)"
			});
		}*/
		
	
		/*for(var i=0;i<shadow_hook_list.length;i++){
			
		}*/
		
		/*if(Math.round(event.gamma)>10){
			$(".cover_wrap").addClass("shadow_right");
		}
		else if(Math.round(event.gamma)<10&&Math.round(event.gamma)>-10){
			$(".cover_wrap").removeClass("shadow_right").removeClass("shadow_left");
		}
		else if(Math.round(event.gamma)<-10){
			$(".cover_wrap").addClass("shadow_left");
		}*/
		
	}  
	  
	if (window.DeviceOrientationEvent) {  
	  window.addEventListener("deviceorientation", orientationHandler, false);  
	}
	
	//设置缓存
/*	window.addEventListener('load', function(e) {
	 
	  window.applicationCache.addEventListener('updateready', function(e) {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		  // Browser downloaded a new app cache.
		  // Swap it in and reload the page to get the new hotness.
		  window.applicationCache.swapCache();
		  window.location.reload();
		} else {
		  // Manifest didn't changed. Nothing new to server.
		}
	  }, false);
	 
	}, false);*/
	
	/**
	 * 统计代码
	 * author：bobbli
	 */
	
/*	var appKey = '6d22f29b760c672ebef90ff35117112aofea543c857f4202b';

	ofea.creat('',{
		appKey: appKey
	});

	ofea.send('pageview');
	
	var $listNum = $('.get_list_num');
	
	var pvTimer=setInterval(function(){
		
		$.ajax('http://ofea.cdc.im/hr/getpv?key=6d22f29b760c672ebef90ff35117112aofea543c857f4202b&dd=aHIucXEuY29t',{
			dataType : 'JSONP',
			cache: false,
			success: function(json){
				$listNum.html(json);
			}
		});
		
	},5000);*/
	
	/*function setListNum(){
		var pvTimer=setTimeout(function(){
		
			$.ajax('http://ofea.cdc.im/hr/getpv?key=6d22f29b760c672ebef90ff35117112aofea543c857f4202b&dd=aHIucXEuY29t',{
				dataType : 'JSONP',
				cache: false,
				success: function(json){
					$listNum.html(json);
				}
			});
			
			clearTimeout(pvTimer);
			setListNum();
			
		},5000);
		
	}
	setListNum();*/

	/*加载内页背景图*/
	function includeStyleElement(styles,styleId) {
		if (document.getElementById(styleId)) {
			return ;
		}
		var style = document.createElement("style");
		style.id = styleId;
	
		(document.getElementsByTagName("head")[0] || document.body).appendChild(style);
		if (style.styleSheet) { //for ie
			style.styleSheet.cssText = styles;
		} else {//for w3c
			style.appendChild(document.createTextNode(styles));
		}
	}
	var styles = "";
	//.poster_wrap .penguin_poster{ background-image:url(images/poster_bg_banner.jpg);}.poster_wrap .name,.poster_wrap .detail,.poster_wrap .reward{background-image:url(images/poster_bg_txt.jpg);}.back_cover{ background-image:url(images/watermark.png);}.poster_wrap,.detail_wrap,.detail_wrap .bg,.poster_wrap .bg{background-image:url(images/poster_bg_2.jpg);}
	
	/*微信转发图片*/
	
	var imgUrl = 'http://sunnyzhen.github.io/demo/recruit/images/forward_icon.jpg';
	var lineLink = location.href;
	var descContent = "奉天承运,皇帝诏曰！鹅厂有旨，全球追寻神鹅下落，提供线索者封侯拜相，重赏！";
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




















