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
	var param_range=20;
	
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
    stage = new PIXI.Stage(0x151e45, true);
    
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);
	

    stage.interactive = true;
    
    bg = PIXI.Sprite.fromImage("displacement_BG.jpg");
    pondContainer.addChild(bg);
    
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
		
		render_timer=setTimeout(function(){
			var param_count=1000*10/time_duration;
			
			
			if(time_count<=param_count){
				
				count += 0.1;
				
				count=Math.round(count*10)/10; 
				//取整
				
				var blurAmount = Math.cos(count);
				var blurAmount2 = Math.sin(count * 0.8);
				
				//console.log(blurAmount+" "+blurAmount2);
		
				displacementFilter.offset.x = count * param_range;
				displacementFilter.offset.y = count * param_range;
				renderer.render(stage);
				animate();
				
				if(param_range>=0){
					param_range-=0.05;
					param_range=Math.round(param_range*10)/10;
				}
				
				console.log(param_range);
				
				time_count++;
				
			}else{
				
				clearTimeout(render_timer);
				
			}
			
			
			
		},time_duration);//减缓死刑
		
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
		
		console.log(renderer);
		/*count=0;
		$(renderer.view).remove();
		
		
		
		renderer = PIXI.autoDetectRenderer(640, 1008);
		renderer.view.style.position = "absolute"
		renderer.view.style.width = window.innerWidth + "px";
		renderer.view.style.height = window.innerHeight + "px";
		renderer.view.style.display = "block";
		document.body.appendChild(renderer.view);
		
		renderer.render(stage);
		//requestAnimFrame(animate);
		
		clearTimeout(render_timer);
		time_duration=20;
		animate();*/
		
		//pondContainer.filters =[null];
		
		//console.log(stage.getChildAt(0).filters);
		
		
/*		displacementTexture;
		displacementFilter;
		stage;
		pondContainer;
		bg;
		filtersToApply;*/
		
		
		
		//$(".num").html(num++);
	}
	
});





































