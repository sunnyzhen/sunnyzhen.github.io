$(document).ready(function(){
	
	/*var map=new google.maps.Map($(".ele_map")[0],{ google地图
		center: new google.maps.LatLng(22.63136824282355,114.27568438109391),
		zoom: 18,
		matTypeId: google.maps.MapTypeId.ROADMAP
	});*/
	
/*	var map = new soso.maps.Map($(".ele_map")[0], {
        // 地图的中心地理坐标。
		//mapTypeId:soso.maps.MapTypeId.SATELLITE,
        center: new soso.maps.LatLng(22.63136824282355,114.27568438109391),
		zoomLevel:18
    });
	
	var scaleControl = new soso.maps.ScaleControl({
		align: soso.maps.ALIGN.TOP_LEFT,
		margin: soso.maps.Size(85, 15),
		map: map
	});
	
	var marker = new soso.maps.Marker({
		position: new soso.maps.LatLng(22.63136824282355,114.27568438109391),
		map: map
	});
	
	var maptypectrl = new soso.maps.MapTypeControl({map:map});
*/	

	var map = new BMap.Map($(".ele_map")[0]);           
	var point = new BMap.Point(114.28233,22.63726);    
	map.centerAndZoom(point,17);                     
	map.addControl(new BMap.ZoomControl()); //添加地图缩放控件
	map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
	var marker = new BMap.Marker(point);  //创建标注
	map.addOverlay(marker); 
	
	 
});