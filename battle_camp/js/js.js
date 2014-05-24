// JavaScript Document

$(document).ready(function(e) {
	var name_set=[];
	var bc_list=$(".bc_list");
	
	$(".bc_wrap").html(Get_monster_list("all"));
	
	$(".img_link").live('click', function(e) {
		var that=this;
		var monster_id=$(that).children(".monster_img").attr('id');
		
		$(".monster_detail_wrap").html(Get_detail_pop(monster_id));
		$(".monster_detail_wrap").addClass("monster_detail_wrap_show");
		
    });
	
	//获取首页怪物列表 返回ul怪物列表
	function Get_monster_list(param){
		
		var m_object=new Object();
		
		var list_string_start="<ul class='bc_list'>";
		var list_string_end="</ul>";
		var list_string_content="";
		
		var e_object=new Object();
		
		$.each(monsters, function(key, val){
			if(key == 'monsters'){
				$.each(val, function(key, val){
					var curID = val['id'];
			
					$.each(elements,function(key,val){
						if(key == 'monsters'){
							$.each(val, function(key, val){
								if(val.id == curID){
									if(val.public_rarity==param||param=="all"){
										list_string_content+= Get_monster_item(val);
									}
									return false;
								}
							});
						}
					});
					
					
				});
			}
		});
		
		//monsters.monsters.length
		/*for(var i=0;i<monsters.monsters.length;i++){
			new_object = monsters.monsters[i];
			
			
			list_string_content+= Get_monster_item(new_object);
		}*/
		
		var list_string=list_string_start+list_string_content+list_string_end;
		return list_string;
		
	}
	
	//获取首页怪物列表项 返回li项
	function Get_monster_item(object){
		return list_string_content="<li><a href='##' class='img_link'><img src='monster/"+object.id+".png' class='monster_img' id='"+object.id+"' alt=''/><p class='monster_name'>"+object.id+"</p></a></li>";
	}
	
	//console.log(monsters.monsters[0]);
	//console.log(names[0].earth1);
	
	//通过id获取怪物详情信息
	function Get_detail_pop(id){
		var m_monster=GetMMonster(id);
		var e_monster=GetEMonster(id);
		var name=GetNMonster(id);
		var location=m_monster.location_id;
		var isEvent=(e_monster["event"])?"<i class='flag_event'><span>E</span></i>":"";//event怪兽则赋值，否则不鸟
		var rarity=e_monster.public_rarity;
		var flag="<i class='flag flag_"+rarity+"'>"+GetRarity(rarity)+"</i>";
		var attack=m_monster.stats["attack"];
		var hp=m_monster.stats["max_hp"];
		var recovery=m_monster.stats["recovery"];
		var level=m_monster.stats["level"];
		var feed=m_monster.stats["feed"];
		var element=e_monster.element;
		
		var pr = m_monster.stats['max_hp'] / 5 +  m_monster.stats['attack'] + m_monster.stats['recovery'];
        pr = Math.floor(pr/100);
		
		if(rarity=="common"||rarity=="commonplus"){isEvent="";flag="";}
		
		var detail_tring="<div class='mod_monster'><div class='monster_avatar'><img src='monster/"+id+".png' class='monster_img' alt=''/>"+isEvent+flag+"</div><div class='info_wrap'><ul class='info_list'><li><p class='text text_title'><span class='txt m_name'>"+name+"</span><span class='data'><i class='icon_element element_"+element+"'></i></span></p></li><li><p class='text even'><span class='txt'>Attack</span><span class='data'>"+attack+"</span></p></li><li><p class='text'><span class='txt'>HP</span><span class='data'>"+hp+"</span></p></li><li><p class='text even'><span class='txt'>Recovery</span><span class='data'>"+recovery+"</span></p></li><li><p class='text'><span class='txt'>Level</span><span class='data'>"+level+"</span></p></li><li><p class='text even'><span class='txt'>Feed</span><span class='data'>"+feed+"</span></p></li><li><p class='text'><span class='txt'>Pr</span><span class='data'>"+pr+"</span></p></li></ul></div></div><a href='##' class='pop_wrap_close'>X</a>";
		
		return detail_tring;
	}
	
	//通过id查数据资料
	function GetMMonster(id){
		
		for(var i=0;i<monsters.monsters.length;i++){
			var monster=monsters.monsters[i];
			if(monster["id"]==id){
				return monster;
			}
		}
		
		return ;
	}
	
	//通过id查属性
	function GetEMonster(id){
		for(var i=0;i<elements.monsters.length;i++){
			var monster=elements.monsters[i];
			if(monster["id"]==id){
				return monster;
			}
		}
		
		return ;
		
	}
	
	//通过id查名字
	function GetNMonster(id){
		for(var i=0;i<names.length;i++){
			var monster=names[i];
			for(var a in monster){
			    if(a==id){
					return monster[id];
				}
			}
		}
		
		return ;
		
	}
	
	function GetRarity(rarity){
		switch(rarity){
			case "common": return "Common";
			case "commonplus": return "Special";
			case "uncommon": return "Rare";
			case "rareminus": return "Super";
			case "rare": return "Ultra";
			case "ultra": return "Epic";
			case "legendary": return "Legendary";
			case "secondevo": return "*2nd Evolution";
		}
	}
	
	$(".pop_wrap_close").live('click', function(e) {
		$(".monster_detail_wrap").removeClass("monster_detail_wrap_show");
	}); 
	
	$(".btn_fitler_show").live('click', function(e) {
		$(".function_wrap").addClass("function_wrap_show");
	}); 
	
	$(".btn_filter").live('click', function(e) {
		$(".function_wrap").removeClass("function_wrap_show");
		
		var that=this;
		$(".bc_wrap").html(Get_monster_list($(that).attr('value')));
	}); 
	
	$(".search_box .ipt_txt").focus(function(e){
		var string=$(".search_box .ipt_txt").val();
		
		if(string=="monster name"){
			$(".search_box .ipt_txt").val("");
		}
		
		if(name_set.length==0){//如果为空，则赋值记录名字数组
			$.each(names,function(id,value){
				$.each(value,function(key,value){
					name_set.push(value);
				});
			});
		}
		
	});
	
	$(".search_box .ipt_txt").blur(function(e){
		var string=$(".search_box .ipt_txt").val();
		if(string.trim()==""){
			$(".search_box .ipt_txt").val("monster name");
		}
	});
	
	function GetFilterMonster(){
		var string=$(".search_box .ipt_txt").val();
		var regexp=/^\w+$/g;
		var regexp_filter=new RegExp("^("+string+")[a-z]*","i");
		var filter_names=[];
		
		for(var i=0;i<name_set.length;i++){
			if(regexp_filter.test(name_set[i])){
				filter_names.push(name_set[i]);
			}
		}
		
		//$(".bc_wrap").html(Get_monster_by_name(filter_names));
		GetMonsterByName(filter_names)
		
	}
	
	$(".search_box .ipt_txt").live("keyup",GetFilterMonster);
	//$(".search_box .ipt_txt").live("change",GetFilterMonster);
	
	function GetMonsterByName(array){
		var id_list=[];
		var name_monster_list="";
					
		$.each(names, function(id, obj){
			$.each(obj, function(key, val){
				for(var i=0;i<array.length;i++){
					if(val == array[i]){
						var curID=key;
						
						$.each(elements,function(key,val){
							if(key == 'monsters'){
								$.each(val, function(key, val){
									if(val.id == curID){
										name_monster_list+= Get_monster_item(val);
										return false;
									}
								});
							}
						});
						
						return false;
					}
				}
				
			});
		});		
		
		$(".bc_list").html(name_monster_list);			
		
	}
	
});














































