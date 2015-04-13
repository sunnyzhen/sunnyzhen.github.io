$(document).ready(function(){
	
	/*var map=new google.maps.Map($(".ele_map")[0],{ google地图
		center: new google.maps.LatLng(22.63136824282355,114.27568438109391),
		zoom: 18,
		matTypeId: google.maps.MapTypeId.ROADMAP
	});*/
	
	var map = new soso.maps.Map($(".ele_map")[0], {
        // 地图的中心地理坐标。
		//mapTypeId:soso.maps.MapTypeId.SATELLITE,
        center: new soso.maps.LatLng(22.63136824282355,114.27568438109391),
		zoomLevel:18
    });
	
	var scaleControl = new soso.maps.ScaleControl({
		align: soso.maps.ALIGN.BOTTOM_LEFT,
		margin: soso.maps.Size(85, 15),
		map: map
	});
	
	var marker = new soso.maps.Marker({
		position: new soso.maps.LatLng(22.63136824282355,114.27568438109391),
		map: map
	});
	
});