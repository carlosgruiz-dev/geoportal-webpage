/*
 *  Licence goes here
 */




/**
 * Geoportal Objects Initialization
 */
var Geoportal = {};
Geoportal.Page = {};
Geoportal.Map = {};
Geoportal.Controls = {};
Geoportal.Bookmarks = {};
    
/**
 * Constant: VERSION_NUMBER
 */
Geoportal.VERSION_NUMBER="2.0a";






/**
 * Function: Geoportal.Init
 * Starts Geoportal in the index page
 */
Geoportal.Init = function () {

    // Set Page Data
    Geoportal.Page.Title = Geoportal.Page.Title || "Geoportal - " + Geoportal.VERSION_NUMBER;
    document.title = Geoportal.Page.Title;

    // Fill Menus
    Geoportal.Bookmarks.Fill();
    // Display Map
    var map = new OpenLayers.Map({
          div: "map",
          theme: null,
          controls: [
              new OpenLayers.Control.Attribution(),
              new OpenLayers.Control.TouchNavigation({
                  dragPanOptions: {
                      enableKinetic: true
                  }
              }),
              new OpenLayers.Control.Zoom()
          ],
          layers: [
              new OpenLayers.Layer.OSM("OpenStreetMap", null, {
                  transitionEffect: "resize",
                  attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              })
          ],
          center: new OpenLayers.LonLat(0, 0),
          zoom: 1
      });
};


/*
 * Geoportal.Map Functions
 */
Geoportal.Map.Layers = [];
Geoportal.Map.ZoomToMaxExtent = function() {
    alert("TODO");
};
Geoportal.Map.ZoomToBookmark = function(lon,lat,zoom) {
    alert("TODO");
};

Geoportal.Map.Fill = function() {
    alert("TODO");
};

/*
 * Geoportal.Bookmarks Functions
 */
Geoportal.Bookmarks.List = [];

Geoportal.Bookmarks.Fill = function() {
    gb = document.getElementById("geoportal-bookmarks");
    for (bm in Geoportal.Bookmarks.List){
        var li = document.createElement("li");
	li.innerHTML = "<a href=\"#\" onclick=\"Geoportal.Map.ZoomToBookmark(" +
		       Geoportal.Bookmarks.List[bm].lon + "," +
		       Geoportal.Bookmarks.List[bm].lat + "," +
		       Geoportal.Bookmarks.List[bm].zoom + ")\">" +
		       Geoportal.Bookmarks.List[bm].name + "</a>";
	gb.appendChild(li);
    }

    var di = document.createElement("li");
    di.setAttribute("class","divider");
    gb.appendChild(di);
    
    var last_li = document.createElement("li");
    last_li.innerHTML = "<a href=\"#\" onclick=\"Geoportal.Map.ZoomToMaxExtent()\">Zoom to Max Extent</a>";
    gb.appendChild(last_li);
};





/**
 *  Load Geoportal.conf.js
 */
	
function require(script) {
    $.ajax({
        url: script,
	dataType: "script",
	async: false,           // <-- This is the key
	success: function () {
	    // all good...
	},
	error: function () {
	throw new Error("Could not load script " + script);
	}
    });
}

require("js/Geoportal.conf.js");
