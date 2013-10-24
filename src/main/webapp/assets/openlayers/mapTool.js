var MapTool = {

	options : {
		displayUnits : 'km',
		handlerOptions : {
			persist : true
		}
	},

	circleOptions : {
		displayUnits : 'km',
		handlerOptions : {
			sides : 35,
			persist : true
		}
	},

	measureControls : {
		line : new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
			displayUnits : 'km',
			handlerOptions : {
				persist : true
			}
		}),
		polygon : new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
			displayUnits : 'km',
			handlerOptions : {
				persist : true
			}
		}),
		circle : new OpenLayers.Control.Measure(
				OpenLayers.Handler.RegularPolygon, {
					displayUnits : 'km',
					handlerOptions : {
						sides : 35,
						persist : true
					}
				})
	},

	doMeasure : function() {
		var control;
		for ( var key in MapTool.measureControls) {
			control = MapTool.measureControls[key];
			control.onMeasure = MapTool.handleMeasurements;
			App.map.addControl(control);
		}
	},

	toggleControl : function(value) {
		for (key in MapTool.measureControls) {
			var control = MapTool.measureControls[key];
			if (value == key) {
				control.onMeasure = MapTool.handleMeasurements;    
	            App.map.addControl(control);
				control.activate();
			} else {
				control.deactivate();
			}
		}
	},

	handleMeasurements : function(geometry, length, area, units) {
		// var element = document.getElementById('output');
		alert(2)
		var out = "";
		if (geometry.CLASS_NAME == "OpenLayers.Geometry.LineString") {
			out += "length: " + length.toFixed(3) + " " + units;
		} else {
			out += "perimeter: " + length.toFixed(3) + " " + units + "<br />";
			out += "area: " + area.toFixed(3) + " " + units + "<sup>2</"
					+ "sup>";
		}
		alert(out);
		// element.innerHTML = out;
	}

}