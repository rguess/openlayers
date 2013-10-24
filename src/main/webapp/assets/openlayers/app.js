var App = {
	map : null,
	osm : null,
	esriLayer : null,
	wmsLayer : null,
	drawing : null,
	nav : null,
	init : function() {
		// 使用指定的文档元素创建地图
		var initExtent = Config.initialextent.split(" ");
		var options = {
			extent: new OpenLayers.Bounds(366202.2184268466, 3054062.949545825, 405658.2869223172, 3077776.2782224827),
//			restrictedExtent : new OpenLayers.Bounds(6679169.333,0,20037508*2,13358338.667)
		}
		App.map = new OpenLayers.Map("rcp1_map",options);
		// 创建一个 OpenStreeMap raster layer
		// 把这个图层添加到map中
		App.osm = new OpenLayers.Layer.OSM();
		
		App.esriLayer = new OpenLayers.Layer.ArcGIS93Rest( "ESRI",
                "http://192.168.1.13:6080/arcgis/rest/services/LGH/MapServer/export");
		
		App.wmsLayer = new OpenLayers.Layer.WMS(
                "OpenLayers WMS",
                "http://192.168.1.13:6080/arcgis/services/LGH/MapServer/WMSServer?",
                {layers: '0,1,2,3,4,5,6',version: '1.3.0'}
            ) 
		
		App.map.addLayer(App.wmsLayer);
		// 设定视图缩放地图程度为最大
		App.map.zoomToMaxExtent({restricted:true});
		
		App.map.addControl(new OpenLayers.Control.PanZoomBar());
		// App.map.addControl(new
		// OpenLayers.Control.LayerSwitcher({'ascending':false}));
		// App.map.addControl(new OpenLayers.Control.Permalink());
		// App.map.addControl(new OpenLayers.Control.Permalink('permalink'));
		App.map.addControl(new OpenLayers.Control.MousePosition());
		App.map.addControl(new OpenLayers.Control.OverviewMap());
		App.map.addControl(new OpenLayers.Control.KeyboardDefaults());
		
		App.drawing  = new OpenLayers.Layer.Vector();
		App.map.addLayer(App.drawing);
		
//		App.map.addControl(new OpenLayers.Control.EditingToolbar(App.drawing));
		
		App.map.removeControl(App.map.getControl("OpenLayers_Control_Zoom_11"));
		console.log(App.map.controls);
		
//		MapTool.doMeasure();
		
//		App.drawing.events.on({
//			beforefeatureadded: App.beforeAddFeatyre,
//		    featureadded : App.onAddFeature
//		});
	},

	// 放大
	zoomIn : function() {
		App.map.zoomIn();
	},

	// 缩小
	zoomOut : function() {
		App.map.zoomOut();
	},
	
	onAddFeature : function(feature){
		 alert(feature);
		 document.getElementById("result").innerHTML=feature.geometry;
	},
	
	beforeAddFeatyre : function(event){
        var geometry = event.feature.geometry;
        document.getElementById("result").innerHTML=geometry;
        App.drawing.filter = new OpenLayers.Filter.Spatial({
            type: OpenLayers.Filter.Spatial.INTERSECTS,
            value: event.feature.geometry
        });
        App.drawing.refresh({force: true});
        return false;
    }
	
	
	
}