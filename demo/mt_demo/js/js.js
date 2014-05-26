// JavaScript Document

/*$(function(){
	
	var order_1=document.getElementById("order_1");
	
	var setPos = function (parent, elem) {
		var list = [];
		parent.height(parent.height());
		
		elem.each(function () {
			var $this = $(this);
			var c = {
				left: $this.offset().left,
				top: $this.offset().top,
				width: $this.width(),
				height: $this.height()
			};
			list.push(c);
			
			$this.css(c);
		});
		
		return list;
	};
	
	var css = setPos($('.project_list'), $('.mod_project'));
	
	
	var sort = function () {
		css.sort(function () {
			return Math.random() > 0.5;
		});
		
		$('.mod_project').each(function (index) {
			$(this).css({position: 'absolute'}).animate({
				top: css[index].top
			},600);
		});
		
		return false;
	}
	
	$("#order_1").click(function(){
		sort()
	});
	
});*/

$(function(){
	
	var order_1=document.getElementById("order_1");
	
	var setPos = function (parent, elem) {
		var list = [];
		parent.height(parent.height());
		
		elem.each(function () {
			var $this = $(this);
			var c = {
				left: $this.offset().left,
				top: $this.offset().top,
				width: $this.width(),
				height: $this.height()
			};
			list.push(c);
			
			$this.css(c);
		});
		
		return list;
	};
	
	var css = setPos($('.project_list'), $('.mod_project'));
	
	
	var sort = function () {
		css.sort(function () {
			return Math.random()>0.5 ? -1:1;
		});
		
		
		$('.mod_project').each(function (index) {
			if($(this).data("flag")!=1){
				$(this).fadeOut();
			}
			var that=this;
			setTimeout(function(){
				$(that).css({
					position: 'absolute',
					top: css[index].top
				});
				
			
				setTimeout(function(){
				
					if($(that).data("flag")!=1){
						$(that).fadeIn();
					}
				
				},600);
				
			},600);

			
			
		});
		
		return false;
	}
	
	$("#order_1").click(function(){
		sort();
		$(".update_wrap").addClass("update_wrap_hide");	
	});
	
	setTimeout(function(){
		$(".update_wrap").removeClass("update_wrap_hide");
		setTimeout(function(){
			$(".update_wrap").css({zIndex:3});
		},200);
	},800);
	
	$("#update_wrap_close").click(function(){
		$(".update_wrap").addClass("update_wrap_hide").css({zIndex:2});;	
		
	});
	
});









































