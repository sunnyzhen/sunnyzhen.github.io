$(function(){
	var tab_titleA = $(".tab_title a");
	var tab_mainItem = $(".tab_main .tab_item");
	tab_titleA.bind("mouseover",function(){
		var tabInd = tab_titleA.index(this);
		tab_titleA.removeClass("current").eq(tabInd).addClass("current");
		tab_mainItem.hide().eq(tabInd).show();
	})
})