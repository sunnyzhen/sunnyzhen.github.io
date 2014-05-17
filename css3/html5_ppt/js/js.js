// JavaScript Document
$(document).ready(function(){
    var conBoxList=$(".conBox");
	$(".start").click(function(){
		$(conBoxList[0]).addClass("conBoxMove");
		$(conBoxList[1]).addClass("conBoxMove");
		$(conBoxList[2]).addClass("conBoxMove");
		var that=this;
		setTimeout(function(){
			$(".conBoxMove").removeClass("conBoxMove");
			$(that).closest(".conBox").addClass("conBoxPrevious");
			var next=$(that).closest(".conBox").next();
			$(next).removeClass("conBoxNext");
			$(next).next().addClass("conBoxNext");
		},2900);
	});
	
	$(".next").click(function(){
	    var thisCon=$(this).closest(".conBox");
		$(thisCon).removeClass("conBoxNext").addClass("conBoxMove");
		var prev=$(thisCon).prev();
		$(prev).removeClass("conBoxMove").addClass("old conBoxPrevious conBoxMove");
		var next=$(thisCon).next();
		$(next).removeClass("conBoxprepare conBoxMove").addClass("conBoxNext conBoxMove");
		next=$(next).next().addClass("conBoxMove");
		
		setTimeout(function(){
			$(".conBoxMove").removeClass("conBoxMove");
			$(".old").remove();
			$(thisCon).addClass("conBoxPrevious");
			var next=$(thisCon).next();
			$(next).removeClass("conBoxNext");
			$(next).next().addClass("conBoxNext");
		},2800);
	});
	
	var cloverContainer	=$(".cloverContainer");	
	$(".hideBg").toggle(function(){
		$(cloverContainer).css("background","none").css("border","none");
	},function(){
		$(cloverContainer).css("background","rgba(255, 255, 255, 0.7)").css("border","1px solid rgba(255, 255, 255, 0.8)");
								
	});
	
	
	var addBox=$(".addBox");
	$(".btn_show").toggle(function(){
		$(addBox).addClass("showAddBox");
		
	},function(){
		$(addBox).removeClass("showAddBox");
		
	});
	
	$(".btn_clear").click(function(){
		$(".addDiv").attr("style","opacity:1;");
		var ctx=$(".canvas")[0].getContext("2d");
		ctx.fillStyle="rgba(255,255,255,1)";
		ctx.fillRect(0,0,500,300);
	});
	
	$(".btn_paint").toggle(function(){
		$(".canvas").show();
		$(this).css("color","#fff");
		
	},function(){
		$(".canvas").hide();
		$(this).css("color","");
	});
	
});










