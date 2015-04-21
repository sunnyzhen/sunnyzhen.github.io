(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在哪个页面
	var moving=0;
	var render_timer=1;
	var o_canvas;
	
	var renderer;
	var displacementTexture;
	var displacementFilter;
	var stage;
	var pondContainer;
	var bg;
	var count=0;
	var filtersToApply;
	var time_duration=20;
	var time_count=0;
	var param_range=5;
	var animation_stop=0;
	
	var last_count=0;
	var last_param_range=0;
	var param_vector=0;
	
	var num=1;
	
	//波纹pixi
	//var flag_stopAnimation=0;
	
	function canvas_create(){
	
	renderer = PIXI.autoDetectRenderer(640, 1008);
    renderer.view.style.position = "absolute"
    renderer.view.style.width = window.innerWidth + "px";
    renderer.view.style.height = window.innerHeight + "px";
    renderer.view.style.display = "block";

    // add render view to DOM
    document.body.appendChild(renderer.view);

    displacementTexture = PIXI.Texture.fromImage("displacement_map.jpg");
    displacementFilter = new PIXI.DisplacementFilter(displacementTexture);


    // create an new instance of a pixi stage
    stage = new PIXI.Stage(0xffffff, true);
    
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);
	

    stage.interactive = true;
    
    //bg = PIXI.Sprite.fromImage("displacement_BG.jpg");
    // pondContainer.addChild(bg);
    var img_list=["drop_1.png","drop_2.png","drop_3.png","drop_4.png"];
	var drop_list=[];
	var x=320;
	var y=504;
   
    for(var i=0;i<img_list.length;i++){
		drop_list.push(PIXI.Sprite.fromImage(img_list[i]));
		pondContainer.addChild(drop_list[i]);
		drop_list[i].position.x=x;
		drop_list[i].position.y=y;
		drop_list[i].pivot.x=504;
		drop_list[i].pivot.y=504;
		
		drop_list[i].scale.x=0.01;
		drop_list[i].scale.y=0.01;
		drop_list[i].alpha=0;
		
		if(i==0){
			drop_list[i].alpha=1;
		}
	}
	
	var scale_counter=1;
	
	var timer_scale=setInterval(function(){
		scale_counter++;
		/*if(scale_counter==50){
			drop_list[number].alpha=0;
			drop_list[number].alpha=1;
			
			drop_list[number].scale.x=drop_list[number].scale.x;
			drop_list[number].scale.y=drop_list[number].scale.x;
			drop_list[number].alpha=drop_list[number].scale.x;
			
			drop_list[number]=drop_list[number];
			
		}*/
		
		if(scale_counter>=30){
			drop_list[0].alpha-=0.03;
			if(drop_list[0].alpha<=0){
				drop_list[0].alpha=0;
			}
			
			drop_list[1].alpha+=0.03;
			if(drop_list[1].alpha>=1){
				drop_list[1].alpha=1;
			}
		}
		if(scale_counter>=100){
			drop_list[1].alpha-=0.02;
			if(drop_list[1].alpha<=0){
				drop_list[1].alpha=0;
			}
			
			drop_list[2].alpha+=0.02;
			if(drop_list[2].alpha>=1){
				drop_list[2].alpha=1;
			}
		}
		if(scale_counter>=200){
			drop_list[2].alpha-=0.02;
			if(drop_list[2].alpha<=0){
				drop_list[2].alpha=0;
			}
			
			drop_list[3].alpha+=0.02;
			if(drop_list[3].alpha>=1){
				drop_list[3].alpha=1;
			}
		}
		
		for(var number=0;number<drop_list.length;number++){
			if(drop_list[number].scale.x/*<1&&drop.scale.x>0*/){
				drop_list[number].scale.x+=0.005*(1-scale_counter/600);
				drop_list[number].scale.y+=0.005*(1-scale_counter/600);
				//drop_list[number].alpha=1-scale_counter/3200;
				drop_list[number].rotation+=0.0015;
			}
			else{
				drop_list[number].scale.x=1;
				drop_list[number].scale.y=1;
				drop_list[number].alpha=0;
			}
		}
		
		
		if(scale_counter>=502){
			clearInterval(timer_scale);
		}
		
	},20);
	
    
    displacementFilter.scale.x = 12;
    displacementFilter.scale.y = 12;
    
    count = 0;
    requestAnimFrame(animate);
	
	filtersToApply = [displacementFilter];
	pondContainer.filters = filtersToApply;
	
	o_canvas=$("canvas")[0];

    //console.log(stage);
    
	
	
	}
	
	function animate() {
        
/*        count += 0.1;
        
        var blurAmount = Math.cos(count) ;
        var blurAmount2 = Math.sin(count * 0.8)  ;

    
        displacementFilter.offset.x = count * 15;
        displacementFilter.offset.y = count * 15;
		
		renderer.render(stage);*/
		//requestAnimFrame(animate);
		$(".num").html(num++);
		
		if(animation_stop==0){
		
			var param_count=1000*10/time_duration;
			
			render_timer=setTimeout(function(){
				
				if(time_count<=param_count){
			
					displacementFilter.offset.x -= param_range*2/3;
					displacementFilter.offset.y -= param_range*2/3;
					renderer.render(stage);
					animate();
					
					//波纹 减速至停止
					if(param_range>=0){
						
						//console.log(param_vector+" "+param_range);
						
						if(param_vector==0){
							param_range-=0.01;
						}
						else if(param_vector==1&&param_range<=5){
							param_range+=0.02;
							if(param_range>=5){
								param_vector=0;
							}
						}
						
						param_range=Math.round(param_range*100)/100;
					}
					
					//console.log(param_range+" "+time_count);
					
					time_count++;
					
				}else{
					
					animation_stop=1;
					param_vector=1;
					param_range=0;
					last_count=count;
					last_param_range=param_range;
					
				}
				
				
				
			},time_duration);//减缓死刑
			
		}else{
			
			
		}
		
    }
	
	canvas_create();
	
	var o_canvas=$("canvas")[0];
	$(o_canvas).addClass("canvas");
	$(o_canvas).attr("id","o_canvas");
	
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			wipe_down();
		 },
		 wipeUp: function() { 
			wipe_up();
		 },
		 wipeLeft: function() {
			wipe_right();
		 },
		 wipeRight: function() { 
		 	wipe_left();
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	function wipe_right(){
		
	}
	
	function wipe_left(){
		
	}
	
	function wipe_up(){
		
	}
	
	function wipe_down(){
		//console.log(param_range);
		
		if(animation_stop==1){
			animation_stop=0;
			
			param_vector=1;
			param_range=last_param_range;
			time_count=-250;
			animate();
		}
		//$(".num").html(num++);
	}
	
});





































