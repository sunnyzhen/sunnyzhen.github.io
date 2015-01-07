
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
	if(system.type=="Android"){
		$(".banner_ios").hide();
		$(".banner_android").show();
		
		if(system.version=='4.1'){
			$(".video_area").css({
				"width": window.screen.width+"px"
			});
			$(".video_area").css({
				"height": window.screen.height+"px"
			})
		}
	}
	
	var $date=new Date();
	var videoid=window.location.href.split("=")[1];
	var year_string=$date.getFullYear()+"-"+($date.getMonth()+1 < 10 ? '0'+($date.getMonth()+1) : $date.getMonth()+1)+"-"+$date.getDate();
	//console.log(year_string);
	//var json_string="http://117.121.10.68:8081/videoserver/app?msgCode=3005&videoId=54aa31c0e4b0425dd033687f&userid=-1&clientid=2&format=json&loginuserid=-1&timestamp=2014-03-24%2012:12:12&softVersion=1.4.5";
	var json_string="http://test.highand.cn/videoserver/app?msgCode=3005&videoId="+videoid+"&userid=-1&clientid=2&format=json&loginuserid=-1&timestamp="+year_string+"%2012:12:12&softVersion=1.4.5";
	
	//console.log(json_string);
	$.getJSON(json_string, function(json){
		
	   $(".video_area").attr("src",json.videouri);
	   $(".details_wrap .details").html(json.description);
	   $(".details_wrap .location .txt").html(json.city);
	   $(".hot .txt").html(json.likenum);
	   $(".view .txt").html(json.looknum);
	   
	   var date_string="";
	    if(parseInt(json.createtime/1000/60/60/24)){
	 		date_string=parseInt(json.createtime/1000/60/60/24)+"天前";
	    }
	    else if(parseInt(json.createtime/1000/60/60)){
		 	  date_string=parseInt(json.createtime/1000/60/60)+"小时前";
		}
		else if(parseInt(json.createtime/1000/60/60)){
		 	  date_string=parseInt(json.createtime/1000/60)+"分前";
		}
		else if(parseInt(json.createtime/1000/60/60)){
		 	  date_string="刚刚";
		}
		
	   $(".time .txt").html(date_string);
	   
	});
	
	
	
	
});




















