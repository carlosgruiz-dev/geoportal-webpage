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
    
    var map = L.map('geoportal').setView([10.49288, -66.87618],13);
    L.tileLayer('http://{s}.tile.cloudmade.com/d4fc77ea4a63471cab2423e66626cbb6/997/256/{z}/{x}/{y}.png', { 
        attribution: 'Geoportal &copy; 2013',
        maxZoom: 18
    }).addTo(map);

};


/*
 * Geoportal.Map Functions
 */
Geoportal.Map.Layers = [];
Geoportal.Map.ZoomToMaxExtent = function() {
    alert("TODO: Geoportal.Map.ZoomToMaxExtent");
};

Geoportal.Map.ZoomToBookmark = function(lon,lat,zoom) {
    alert("TODO: Geoportal.Map.ZoomToBookmark");
};

Geoportal.Map.Fill = function() {
    alert("TODO: Geoportal.Map.Fill");
};

document.getElementById("toogle-all-layers-on").onclick = function() {
    alert("TODO: Geoportal.Map.ToogleAllLayersOn");
};

document.getElementById("toogle-all-layers-off").onclick = function() {
    alert("TODO: Geoportal.Map,ToogleAllLayersOff");
};


/*
 * Geoportal.Controls Control List
 */ 

Geoportal.Controls = {};

/*
 * Geoportal.Controls.ZoomIn Control
 */ 

Geoportal.Controls.ZoomIn = {};

Geoportal.Controls.ZoomIn.activated = false;

Geoportal.Controls.ZoomIn.Activate = function (status) {
    alert("TODO: Geoportal.Controls.ZoomIn.Activate");
}

Geoportal.Controls.ZoomIn.Action = function (rectangle) {
    alert("TODO: Geoportal.Controls.ZoomOut.Action");
}

/*
 * Geoportal.Controls.ZoomOut Control
 */ 


Geoportal.Controls.ZoomOut = {};

Geoportal.Controls.ZoomOut.activated = false;
Geoportal.Controls.ZoomOut.factor = 3;

Geoportal.Controls.ZoomOut.Activate = function (status) {
    alert("TODO: Geoportal.Controls.ZoomOut.Activate");
}

Geoportal.Controls.ZoomOut.Action = function(point) {
    alert("TODO: Geoportal.Controls.ZoomOut.Action");
}

/*
 * Geoportal.Controls.Move Control
 */

Geoportal.Controls.Move = {};

Geoportal.Controls.Move.activated = false;

Geoportal.Controls.Move.Activate = function (status) {

}

Geoportal.Controls.Move.Action = function(initial_point, final_point) {

}

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
