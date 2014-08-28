(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	//生成星星
	function CreateStar(num,area){
		var size_s=2;
		var size_m=5;
		var size_l=10;
		var star_area=area;
		var star_tri="";
		var star_size="";
		
		for(var i=0;i<num;i++){
			var p_left=Math.round(Math.random()*$(window).width())+"px";
			var p_top=Math.round(Math.random()*$(window).height())+"px";
			if(i<size_s){ star_size=" ";}
			else if(i>=size_s&&i<size_m){ star_size=" star_2";}
			else if(i>=size_m){ star_size=" star_3";}
			star_tri+="<i class='star"+star_size+"' style='left:"+p_left+"; top:"+p_top+"'></i>";
		}
		$(star_area).html(star_tri);
	}
	
	function Create_stararea(){
		for(var j=0;j<6;j++){
			CreateStar(18,$(".star_area")[j]);
		}
	}
	
	// 初始化星空背景
	Create_stararea();
	
	function setHeight(){
		var w_height=$(window).height();
		if(w_height>504){
			$(".cover_wrap").height(w_height);
			$(".con_wrap").height(w_height);
			$(".back_cover_wrap").height(w_height);
		}
	}
	
	setHeight();
	
	var screen_num=1;
	var screen_h=$(window).height();
	
	/*wipeUp: function() { 
			
			for(var i=1;i<=6;i++){
				if(i<6){
					$(".star_wrap").css({
						"margin-top": screen_h*screen_num*(-1)
					});
					screen_num=i+1;
					break;
				}
			}
			
		},
		wipeDown: function() { 
			for(var i=1;i<=6;i++){
				if(i>1){
					screen_num=i-1;
					$(".star_wrap").css({
						"margin-top": screen_h*screen_num*(-1)
					});
					break;
				}
			}
		},*/
	
	$("body").touchwipe({
		wipeUp: function() { 
			if(screen_num!=1){
				$(".con_wrap_1").removeClass("con_wrap_1_show");
				$(".con_wrap_2").removeClass("con_wrap_2_show");
				$(".con_wrap_3").removeClass("con_wrap_3_show");
				$(".con_wrap_4").removeClass("con_wrap_4_show");
				$(".back_cover_wrap").removeClass("back_cover_wrap_show");
				$(".cover_wrap").removeClass("cover_wrap_show");
			}
			
			if(screen_num==1){}
			else if(screen_num==2){
				screen_num=1;
				$(".star_wrap").css({
					"margin-top": screen_h*(screen_num-1)*(-1)
				});
				$(".cover_wrap").addClass("cover_wrap_show");
				$(".pliers_wrap").removeClass("get_diamond_2").removeClass("get_diamond_1");
				
			}
			else if(screen_num==3){
				screen_num=2;
				$(".star_wrap").css({
					"margin-top": screen_h*(screen_num-1)*(-1)
				});
				$(".con_wrap_1").addClass("con_wrap_1_show");
				
			}
			else if(screen_num==4){
				screen_num=3;
				$(".star_wrap").css({
					"margin-top": screen_h*(screen_num-1)*(-1)
				});
				$(".con_wrap_2").addClass("con_wrap_2_show");
				
			}
			else if(screen_num==5){
				screen_num=4;
				$(".star_wrap").css({
					"margin-top": screen_h*(screen_num-1)*(-1)
				});
				$(".con_wrap_3").addClass("con_wrap_3_show");
				
			}
			else if(screen_num==6){
				screen_num=5;
				$(".star_wrap").css({
					"margin-top": screen_h*(screen_num-1)*(-1)
				});
				$(".con_wrap_4").addClass("con_wrap_4_show");
				
			}
		},
		wipeDown: function() { 
		
			if(screen_num!=6){
				$(".con_wrap_1").removeClass("con_wrap_1_show");
				$(".con_wrap_2").removeClass("con_wrap_2_show");
				$(".con_wrap_3").removeClass("con_wrap_3_show");
				$(".con_wrap_4").removeClass("con_wrap_4_show");
				$(".back_cover_wrap").removeClass("back_cover_wrap_show");
				$(".cover_wrap").removeClass("cover_wrap_show");
			}
			
			if(screen_num==1){
				$(".star_wrap").css({
					"margin-top": screen_h*screen_num*(-1)
				});
				$(".con_wrap_1").addClass("con_wrap_1_show");
				
				screen_num=2;
			}
			else if(screen_num==2){
				$(".star_wrap").css({
					"margin-top": screen_h*screen_num*(-1)
				});
				$(".con_wrap_2").addClass("con_wrap_2_show");
				$(".pliers_wrap").removeClass("get_diamond_2").removeClass("get_diamond_1");
				
				screen_num=3;
			}
			else if(screen_num==3){
				$(".star_wrap").css({
					"margin-top": screen_h*screen_num*(-1)
				});
				$(".con_wrap_3").addClass("con_wrap_3_show");
				
				screen_num=4;
			}
			else if(screen_num==4){
				$(".star_wrap").css({
					"margin-top": screen_h*screen_num*(-1)
				});
				$(".con_wrap_4").addClass("con_wrap_4_show");
				
				screen_num=5;
			}
			else if(screen_num==5){
				$(".star_wrap").css({
					"margin-top": screen_h*screen_num*(-1)
				});
				$(".back_cover_wrap").addClass("back_cover_wrap_show");
				
				screen_num=6;
			}
			else if(screen_num==6){}
		},
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	$(".tab_item_1").click(function(){
		$(".pliers_wrap").removeClass("get_diamond_2").addClass("get_diamond_1");
	});
	$(".tab_item_2").click(function(){
		$(".pliers_wrap").removeClass("get_diamond_1").addClass("get_diamond_2");
	});
	
	$(".link_apply").click(function(){
		$(".link_share").removeClass("link_share_show");
		$(".link_apply").addClass("link_apply_show");
		
	});
	
	$(".link_share").click(function(){
		$(".link_apply").removeClass("link_apply_show");
		$(".link_share").addClass("link_share_show");
		
	});
	
	
	
	
	function bindClickEvent(){
		for(var i=1;i<=6;i++){
			var link_txt=".link_next_"+i;
			var wrap_txt=".con_wrap_"+i;
			
			(function(){   
				var index_num = i;
				var wrap_txt_inner=wrap_txt;
				$(link_txt).bind("click",function(){
					
					if(screen_num==index_num){
						$(".star_wrap").css({
							"margin-top": screen_h*screen_num*(-1)
						});
						
						$(".con_wrap_1").removeClass("con_wrap_1_show");
						$(".con_wrap_2").removeClass("con_wrap_2_show");
						$(".con_wrap_3").removeClass("con_wrap_3_show");
						$(".con_wrap_4").removeClass("con_wrap_4_show");
						$(".back_cover_wrap").removeClass("back_cover_wrap_show");
						$(".pliers_wrap").removeClass("get_diamond_2").removeClass("get_diamond_1");
						
						if(index_num==5){
							$(".back_cover_wrap").addClass("back_cover_wrap_show");
						}
						$(wrap_txt_inner).addClass("con_wrap_"+index_num+"_show");
						
						
						screen_num=index_num+1;
					}
					
				});
			
			})(); 
		}
		
	}
	
	bindClickEvent();
	
	/*
	$(".link_next_1").click(function(){
		if(screen_num==1){
			$(".star_wrap").css({
				"margin-top": screen_h*screen_num*(-1)
			});
			screen_num=2;
		}
	});
	
	$(".link_next_2").click(function(){
		if(screen_num==2){
			$(".star_wrap").css({
				"margin-top": screen_h*screen_num*(-1)
			});
			screen_num=3;
		}
	});
	
	
	$(".link_next_3").click(function(){
		if(screen_num==3){
			$(".star_wrap").css({
				"margin-top": screen_h*screen_num*(-1)
			});
			screen_num=4;
		}
	});
	*/
	
	//触摸触发事件
	/*$(".cover_wrap").touchwipe({
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
/*		wipeDown: function() { 
			$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
			$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_prepare");
			$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
		},*/
	/*	min_move_x: 80,
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
	});*/
	
	//点击触发事件
/*	$(".link_next_1").click(function(){
		$(".cover_wrap").addClass("wrap_hide");
		$(".con_wrap_1").removeClass("wrap_prepare").addClass("wrap_show");
	});
	
	$(".link_next_2").click(function(){
		$(".con_wrap_1").addClass("wrap_hide");
		$(".con_wrap_2").removeClass("wrap_prepare").addClass("wrap_show");
	});
	
	$(".link_next_4").click(function(){
		$(".con_wrap_2").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_3").removeClass("wrap_show").addClass("wrap_prepare");
	});*/
	
	/*
	$(".link_next_3").click(function(){
		$(".cover_wrap").removeClass("wrap_hide").addClass("wrap_show");
		$(".con_wrap_1").removeClass("wrap_hide").addClass("wrap_prepare");
		$(".con_wrap_2").removeClass("wrap_show").addClass("wrap_prepare");
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
	});*/
	
	$(".logo_small").click(function(){
		$(".con_wrap_2").addClass("wrap_hide");
		$(".con_wrap_3").removeClass("wrap_prepare").addClass("wrap_show");
	});
	
	$(".link_intro").click(function(){
		$(".con_wrap_2").addClass("wrap_hide");
		$(".con_wrap_3").removeClass("wrap_prepare").addClass("wrap_show");
	});
	
	
	/*微信转发图片*/
	
	var imgUrl = '../images/join.png';
	var lineLink = location.href;
	var descContent = "腾讯招聘官方微信全新改版，小腾姐带你四步玩转校招！";
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




















