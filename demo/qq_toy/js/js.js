(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	var word_string="qq toy family".replace(/[ ]/g,"");
	
	//q Json
	var word_list={ q_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,0,0,1,1,1,1,0,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,1,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,0,1,1,1,1,0,1,0],
							[0,0,0,0,0,0,0,0,0,0]],
							
					t_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,1,1,1,1,1,1,1,1,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0]],
							
					o_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,0,0,1,1,1,1,0,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,1,0,0,0,0,1,0,0],
							[0,0,0,1,1,1,1,0,0,0],
							[0,0,0,0,0,0,0,0,0,0]],
					
					y_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,1,1,0,0,0,0,1,1,0],
							[0,0,1,1,0,0,1,1,0,0],
							[0,0,0,1,1,1,1,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0]],
					
					f_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,0,1,1,1,1,1,1,0,0],
							[0,0,1,1,1,1,1,1,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,1,1,1,0,0,0],
							[0,0,1,1,1,1,1,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0]],
							
					a_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,1,1,1,1,0,0,0],
							[0,0,0,1,0,0,1,0,0,0],
							[0,0,1,1,0,0,1,1,0,0],
							[0,0,1,1,0,0,1,1,0,0],
							[0,1,1,1,1,1,1,1,1,0],
							[0,1,0,0,0,0,0,0,1,0],
							[0,1,0,0,0,0,0,0,1,0],
							[0,0,0,0,0,0,0,0,0,0]],
							
					m_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,1,1,0,0,0,0,1,1,0],
							[0,1,1,1,0,0,1,1,1,0],
							[0,1,0,1,0,0,1,0,1,0],
							[0,1,0,1,1,1,1,0,1,0],
							[0,1,0,0,1,1,0,0,1,0],
							[0,1,0,0,0,0,0,0,1,0],
							[0,1,0,0,0,0,0,0,1,0],
							[0,1,0,0,0,0,0,0,1,0],
							[0,0,0,0,0,0,0,0,0,0]],
					
					i_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,1,1,0,0,0,0],
							[0,0,0,0,0,0,0,0,0,0]],
							
					l_list:[[0,0,0,0,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,0,0,0,0,0,0],
							[0,0,1,1,1,1,1,1,0,0],
							[0,0,1,1,1,1,1,1,0,0],
							[0,0,0,0,0,0,0,0,0,0]]
					
				};
	
	function setLiList(){
		var list=$(".qq_toy_list");
		var li_string="";
		for(var i=0;i<100;i++){
			var num=Math.ceil(Math.random()*12);
			if(num<10){
				num="0"+num;
			}
			li_string+="<li><a href='#'><img src='data/"+num+".jpg' class='toy_img' alt=''/></a></li>";
		}
		$(list).html(li_string);
	}
	
	setLiList();
	
	function SetWord(word){
		
		var img_list=$(".qq_toy_list li");
		$(img_list).removeClass("show_word");
		
	/*	for(var k=0;k<5;k++){
			var tem_num_weak=Math.round(Math.random()*100);
			$($(img_list)[tem_num_weak]).addClass("special_key_weak");
			
			var tem_num_strong=Math.round(Math.random()*100);
			$($(img_list)[tem_num_strong]).addClass("special_key_strong");

		}*/
		
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				if(word_list[word+"_list"][i][j]==1){
					$($(img_list)[i*10+j]).addClass("show_word");
				}
			}
		}
		
		
				
	}
	
	//SetWord('q');
	
	function ShowString(words){
		var string_array=words.split("");
		
		var index=-1;
		var flag=0;
		
		var timer=setInterval(function(){
			
			if(flag==1){
				clearInterval(timer);
			}
			
			if(index<string_array.length-1){ 
				index++;
				
				SetWord(string_array[index]);
			}
			else{
				flag=1;
				var img_list=$(".qq_toy_list li");
				$(img_list).removeClass("show_word");
				clearInterval(timer);
				setRipple();
				var timer=setTimeout(function(){
					$(".qq_toy_wrap").addClass("show_cover");
				},1200);
				//index=0;
			}
			
			//SetWord(string_array[index]);
			
		},1000);
	}
	
	function ShowString2(){}
	
	ShowString(word_string);
	
	function setOpacity(){
		
		var img_list=$(".qq_toy_list li");
		$(img_list).removeClass("show_word");
		
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				if(word_list[word+"_list"][i][j]==1){
					//$($(img_list)[i*10+j]).addClass("show_word");
				}
			}
		}
	}
	
	function setRipple(){
		var img_list=$(".qq_toy_list li");
		
		for(var k=0;k<10/2;k++){
			for(var i=k;i<10-k;i++){
				for(var j=k;j<10-k;j++){
					$(img_list[i*10+j]).data("a_num",10/2-k);
				}
			}
		}
		
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				$(img_list[i*10+j]).addClass("ripple_word");
				$(img_list[i*10+j]).children().children(".toy_img").css("-webkit-animation-delay",$(img_list[i*10+j]).data("a_num")/10+"s");
				//$(img_list[i*10+j]).data("a_num")
			}
		}
		
	}
	
	
	
	/*微信转发图片*/
	
	var imgUrl = 'http://sunnyzhen.github.io/public/img/sunny.jpg';
	var lineLink = location.href;
	var descContent = "QQ Toy Family";
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




















