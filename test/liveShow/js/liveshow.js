$(function(){
	
	var tab_titleA = $(".tab_title a");
	var tab_mainItem = $(".tab_main .tab_item");
	
	tab_titleA.bind("mouseover",function(){
		var tabInd = tab_titleA.index(this);
		tab_titleA.removeClass("current").eq(tabInd).addClass("current");
		tab_mainItem.hide().eq(tabInd).show();
	});
	
	function ScrollQrCode(){
		var elem_top=$(".flag_link").offset().top;
		
		$(document).scroll(function(){
			var s_top=$(document).scrollTop();
			if(s_top >= elem_top){
				$(".flag_link").css({
					"margin-top" : (s_top-elem_top)+"px"
				});
			}
			else if(s_top < elem_top){
				$(".flag_link").css({
					"margin-top" : 0
				});
			}
			
		});
	}
	
	ScrollQrCode();
	
	var PLAYSTATE=0;
	
	function ResetVideo(){
		var video_list=$(".video_iframe");
		for(var i=0;i<video_list.length;i++){
			var dis_str=$(video_list[i]).css("display");
			if($(video_list[i]).css("display")=="block"||$(video_list[i]).css("display")=="inline"){
				var video_src=$(video_list[i]).attr('src');
				$(video_list[i]).attr('src',"");
				$(video_list[i]).attr('src',video_src);
			}
			//$(video_list[i]).attr("src");
		}
	}
	ResetVideo();
	
	$(".tab_1").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$("#video_1").show();
		PLAYSTATE=0;
	});
	$(".tab_2").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$("#video_2").show();
		PLAYSTATE=1;
	});
	$(".tab_3").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$("#video_3").show();
		PLAYSTATE=2;
	});
	$(".tab_4").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$("#video_4").show();
		PLAYSTATE=3;
	});
	$(".tab_5").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$("#video_5").show();
		PLAYSTATE=4;
	});
	$(".tab_6").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$("#video_6").show();
		PLAYSTATE=5;
	});
	
	$(".pop_iframe_wrap .close").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").hide();
		$(".mask").hide();
		var video_list=$(".video_iframe");
		$(video_list[PLAYSTATE]).show();
	});
	
	$("#tab_7").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_7").show();
		$(".mask").show();
	});
	
	$("#tab_8").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_8").show();
		$(".mask").show();
	});
	
	$("#tab_9").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_9").show();
		$(".mask").show();
	});
	
	$("#tab_10").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_10").show();
		$(".mask").show();
	});
	
	$("#tab_11").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_11").show();
		$(".mask").show();
	});
	
	$("#tab_12").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_12").show();
		$(".mask").show();
	});
	
	$("#tab_13").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_13").show();
		$(".mask").show();
	});
	
	$("#tab_14").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_14").show();
		$(".mask").show();
	});
	
	$("#tab_15").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_15").show();
		$(".mask").show();
	});
	
	$("#tab_16").bind("click",function(){
		ResetVideo();
		$(".video_iframe").hide();
		$(".pop_iframe_wrap").show();
		$("#video_16").show();
		$(".mask").show();
	});
	
	
	
})