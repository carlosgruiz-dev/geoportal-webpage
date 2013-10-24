/*
 *  Licence goes here
 */


/**
 * Geoportal Object Initialization
 */
var Geoportal = Geoportal || {}; 
    
/**
 * Constant: VERSION_NUMBER
 */
Geoportal.VERSION_NUMBER="2.0a";

/**
 * Function: Geoportal.Init
 * Starts Geoportal in the index page
 */
Geoportal.Init = function () {
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

