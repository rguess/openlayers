var App = {
	map : null,
	osm : null,
	init : function() {
		// 使用指定的文档元素创建地图
		App.map = new OpenLayers.Map("rcp1_map");
		// 创建一个 OpenStreeMap raster layer
		// 把这个图层添加到map中
		App.osm = new OpenLayers.Layer.OSM();
		App.map.addLayer(App.osm);
		// 设定视图缩放地图程度为最大
		App.map.zoomToMaxExtent();
	},

	// 放大
	zoomIn : function() {
		App.map.zoomIn();
	},

	// 缩小
	zoomOut : function() {
		App.map.zoomOut();
	},

	//画图
	drawPolygon : function() {
		var draw_polygon_control = new OpenLayers.Control.DrawFeature(App.osm,OpenLayers.Handler.Polygon);// Polgyon类型DrawControl
		// 添加到map上
		App.map.addControl(draw_polygon_control);
		// 激活Draw Control
		draw_polygon_control.featureAdded = App.onAddFeature;
		draw_polygon_control.activate();
	},
	
	onAddFeature : function(feature){
		 document.getElementById("result").innerHTML=feature.geometry;
	}
	
	
}