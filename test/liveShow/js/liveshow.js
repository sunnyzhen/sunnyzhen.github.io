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
	
})