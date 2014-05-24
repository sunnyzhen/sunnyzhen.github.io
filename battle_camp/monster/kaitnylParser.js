var $ = jQuery.noConflict();
$(document).ready(function(){

	var idx = 0;
	var genNamesJson = [];

	$.each(monsters, function(key, val){
		if(key == 'monsters'){
			$.each(val, function(key, val){
				var curID = val['id'];
				var elementRarity;
				var petName;
				
				$.each(elements, function(key, val){
					if(key == 'monsters'){
						$.each(val, function(key, val){
							if(val.id == curID){
								elementRarity = val;
								return false;
							}
						});
					}
				});

				$.each(names, function(id, obj){
					$.each(obj, function(key, val){
						if(key == curID){
							petName = val;
							return false;
						}
					});
				});			

                var PR = val['stats']['max_hp'] / 5 +  val['stats']['attack'] + val['stats']['recovery'];
                PR = Math.floor(PR/100);

				var line = '<ul>';
				line += '<li class="name ' + elementRarity.public_rarity + '"><span>Name </span>' + petName + '</li>';
				line += '<li class="photo"><img src="/bc/monsters/' + val['id'] + '.png"></li>';
				line += '<li class="id"><span>ID </span>' +  val['id'] + '</li>';
				line += '<li class="element"><span>Element </span><img src="/bc/elements/' + elementRarity.element + '.png"></li>';
				line += '<li><span>Level </span>' +  val['stats']['level'] + '</li>';
				line += '<li class="hp"><span>HP </span>' +  val['stats']['max_hp'] + '</li>';
				line += '<li class="attack"><span>Attack </span>' +  val['stats']['attack'] + '</li>';
				line += '<li><span>Recovery </span>' +  val['stats']['recovery'] + '</li>';
				line += '<li><span>Feed Value </span>' +  val['stats']['feed'] + '</li>';	
				line += '<li class="pr"><span>PR</span>' + PR + '</li>';			
				line += '</ul>';

				$('.catalogue').append('<li>' + line + '</li>');
				
				idx++;
			});
		}
	});

	$('.search').on('change input', function(){
		var typed = $('.search').val();
		$('.catalogue>li').each(function(){
			if($(this).find('.name').text().toLowerCase().indexOf(typed.toLowerCase()) >= 0 || typed == '')
				$(this).removeClass('search-hidden');
			else
				$(this).addClass('search-hidden');
		});
	});
	
	$('.filters .rarity').on('change', function(){
		var rarity = $('.filters .rarity').val();

		$('.catalogue>li').each(function(){
			var show;
			
			if(rarity == 'secondevo')
				show = ($(this).find('.id').text().indexOf('_3') >= 0);
			else
				show = ($(this).find('.name').hasClass(rarity) || rarity == '');
				
			show ? $(this).removeClass('rarity-hidden') : $(this).addClass('rarity-hidden');
		});		
	});
	
	$('.filters .element').on('change', function(){
		var element = $('.filters .element').val();
		$('.catalogue>li').each(function(){
			if($(this).find('.element img').attr('src').indexOf(element) >= 0 || element == '')
				$(this).removeClass('element-hidden');
			else
				$(this).addClass('element-hidden');
		});
	});	
	
	$('.reset').on('click', function(){
		$('.filters .rarity').val('').trigger('change');
		$('.filters .element').val('').trigger('change');
		$('.search').val('').trigger('change');
	});

	$('.sorter').click(function(e){
		e.preventDefault();
		var sindex = $('.sorter').index($(this));
		var $rows = $('.catalogue>li');
		var sortBy, order;

		switch(sindex){
			case 0:
				sortBy = '.name';
				break;
			case 1:
				sortBy = '.hp';
				break;	
			case 2:
				sortBy = '.attack';
				break;
			case 3:
				sortBy = '.pr'
				break;
		}

		if($(this).hasClass('done')){
			$(this).removeClass('done');
			order = -1;
		}
		else{
			$(this).addClass('done');
			order = 1;
		}

		$rows.sortElements(function(a, b){
			$a = $(a).find(sortBy).text(); 
			$b = $(b).find(sortBy).text();
			
			if(sindex > 0){
				$a = parseInt($a.replace( /^\D+/g, ''));
				$b = parseInt($b.replace( /^\D+/g, ''));
			}
			
			if($a == $b)
				return 0;
			else
				return $a > $b ? order : (order * (-1));
		});
	});	


});