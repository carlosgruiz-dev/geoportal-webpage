/*
 *  Licence goes here
 */




/**
 * Geoportal Objects Initialization
 */
var G = {};
G.Page = {};
G.Map = {};
G.Layers = {};
G.Controls = {};
G.Bookmarks = {};
    
/**
 * Constant: VERSION_NUMBER
 */
G.VERSION_NUMBER="2.0a";






/**
 * Function: G.Init
 * Starts Geoportal in the index page
 */
G.Init = function () {

    // Check values or set default values
    document.title = G.Page.Title || "Geoportal - " + G.VERSION_NUMBER;
    document.getElementById("brand").innerHTML = G.Page.brand || "Geoportal";
    G.Map.zoom = G.Map.zoom || 6;
    G.Map.center = G.Map.center || [7.88515, -65.56641];
    G.Map.scale = G.Map.scale || true;
    G.Layers.List = G.Layers.List || [{ name: "OpenStreetMap", layer: "OSM", visible: true }];

   


    // Fill Menus
    G.Layers.FillMenu();
    G.Bookmarks.Fill();
    // Display Map
    
    G.Map.map = L.map('geoportal', {
           center : G.Map.center,
	   zoom : G.Map.zoom,
           keyboard : true,
	   zoomControl : false
	   });
    G.Map.map.attributionControl.setPrefix("<a href=\"https://github.com/atmantree/geoportal-webpage/\" target=\"_blank\">Geoportal</a>");
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(G.Map.map);
    if (G.Map.scale) { L.control.scale().addTo(G.Map.map); }
    //L.tileLayer('http://{s}.tile.cloudmade.com/d4fc77ea4a63471cab2423e66626cbb6/997/256/{z}/{x}/{y}.png').addTo(map);

};


/*
 * G.Map Functions
 */
G.Map.ZoomToMaxExtent = function(map) {
    G.Map.map.setView(L.latLng(G.Map.center[0],G.Map.center[1]), G.Map.zoom);
};

G.Map.ZoomToBookmark = function(lon,lat,zoom) {
    G.Map.map.setView(L.latLng(lat,lon), zoom, {pan:{animate: true,}, zoom:{animate:true}});
};

G.Map.Fill = function() {
    alert("TODO: G.Map.Fill");
};

G.Map.ToogleAllLayersOn = function() {
    alert("TODO: G.Map.ToogleAllLayersOn");
};

G.Map.ToogleAllLayersOff = function() {
    alert("TODO: G.Map,ToogleAllLayersOff");
};


/*
 * G.Controls.ZoomIn Control
 */ 

G.Controls.ZoomIn = {};

G.Controls.ZoomIn.activated = false;

G.Controls.ZoomIn.Activate = function (status) {
    alert("TODO: G.Controls.ZoomIn.Activate");
}

G.Controls.ZoomIn.Action = function (rectangle) {
    alert("TODO: G.Controls.ZoomOut.Action");
}

/*
 * G.Controls.ZoomOut Control
 */ 


G.Controls.ZoomOut = {};

G.Controls.ZoomOut.activated = false;
G.Controls.ZoomOut.factor = 3;

G.Controls.ZoomOut.Activate = function (status) {
    alert("TODO: G.Controls.ZoomOut.Activate");
}

G.Controls.ZoomOut.Action = function(point) {
    alert("TODO: G.Controls.ZoomOut.Action");
}

/*
 * G.Controls.Move Control
 */

G.Controls.Move = {};

G.Controls.Move.activated = false;

G.Controls.Move.Activate = function (status) {

}

G.Controls.Move.Action = function(initial_point, final_point) {

}

/*
 * G.Bookmarks Functions
 */
G.Bookmarks.List = [];

G.Bookmarks.Fill = function() {
    gb = document.getElementById("geoportal-bookmarks");
    for (bm in G.Bookmarks.List){
        var li = document.createElement("li");
	li.innerHTML = "<a href=\"#\" onclick=\"G.Map.ZoomToBookmark(" +
		       G.Bookmarks.List[bm].lon + "," +
		       G.Bookmarks.List[bm].lat + "," +
		       G.Bookmarks.List[bm].zoom + ")\">" +
		       G.Bookmarks.List[bm].name + "</a>";
	gb.appendChild(li);
    }

    var di = document.createElement("li");
    di.setAttribute("class","divider");
    gb.appendChild(di);
    
    var last_li = document.createElement("li");
    last_li.innerHTML = "<a href=\"#\" onclick=\"G.Map.ZoomToMaxExtent()\">Zoom to Max Extent</a>";
    gb.appendChild(last_li);
};

/*
 * G.Layers Functions
 */


G.Layers.FillMenu = function() {
    gl = document.getElementById("geoportal-layers");
    
    for (lyr in G.Layers.List.reverse()) {
        var li = document.createElement("li");
        li.setAttribute("onClick","G.Layers.Update(\"lyr-" + lyr + "\")");
	if (G.Layers.List.reverse()[lyr].visible) {
            li.innerHTML = "<a href=\"#\"><input type=\"checkbox\" checked=\"checked\" id=\"lyr-" + lyr + "\"> " +
	      G.Layers.List.reverse()[lyr].name +"</input></a>";
	} else {
            li.innerHTML = "<a href=\"#\"><input type=\"checkbox\" id=\"lyr-" + lyr + "\"> " +
              G.Layers.List.reverse()[lyr].name +"</input></a>"; 
	}
        gl.appendChild(li);
    }

    var s = document.createElement("li");
    s.setAttribute("class","divider");
    gl.appendChild(s);

    var all_lyr_on = document.createElement("li");
    all_lyr_on.innerHTML = "<a href=\"#\" id=\"toogle-all-layers-on\" " + 
        "onClick=\"G.Map.ToogleAllLayersOn()\"> toggle all layers on</a>";
    gl.appendChild(all_lyr_on);
    
    var all_lyr_off = document.createElement("li");
    all_lyr_off.innerHTML = "<a href=\"#\" id=\"toogle-all-layers-off\" " + 
        "onCLick=\"G.Map.ToogleAllLayersOff()\"> toggle all layers off</a>";
    gl.appendChild(all_lyr_off);
};

G.Layers.FillMap = function() {
    alert("TODO: G.Layers.FillMap");
};

G.Layers.Update = function(lyr) {
    alert("TODO: G.Layers.Update (" + lyr + ")");
};

G.Layers.addOSMLayer = function () {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(G.Map.map);
}

/**
 *  Load Geoportal.conf.js
 */
	
function require(script) {
    $.ajax({
        url: script,
	dataType: "script",
	async: false, 
	success: function () { },
	error: function () {
	throw new Error("Could not load script " + script);
	}
    });
}

require("js/Geoportal.conf.js");
