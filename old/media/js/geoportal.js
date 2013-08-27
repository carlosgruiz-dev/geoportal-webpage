/*
 * Geoportal (c) 2010, Carlos Gustavo Ruiz (arahat) 
 *
 *
 *
 *
 */

/* namespaces */

geoportal = {};
geoportal.config = {};
geoportal.layers = {};
geoportal.controls = {};
geoportal.functions = {};

/* configurations */
geoportal.config.Projection = new OpenLayers.Projection('EGPG:900913');
geoportal.config.DisplayProjection = new OpenLayers.Projection('EPSG:4326');
geoportal.config.MaxExtent = new OpenLayers.Bounds(-73.5,0,-57,16.5);
geoportal.config.Geobookmarks = [
  // ['Name', new OpenLayers.Bounds(min-X, min-Y, max-X, max-Y)]
  
  ]

/* layers */
geoportal.layers.osm = new OpenLayers.Layer.OSM()

/* map controls */
geoportal.controls.ZoomIn = new OpenLayers.Control.ZoomBox();
geoportal.controls.ZoomOut = new OpenLayers.Control.ZoomOut();
geoportal.controls.Pan = new OpenLayers.Control.DragPan();

/* functions */

geoportal.config.MaxExtent.transform(geoportal.config.DisplayProjection, geoportal.config.Projection);
geoportal.functions.ZoomMaxExtent = function () {
     geoportal.map.zoomToExtent(geoportal.config.MaxExtent, true);
  }

/* init */
geoportal.map = new OpenLayers.Map('map', {
    units: 'm', controls: [],
    projection: geoportal.config.Projection,
    displayProjection: geoportal.config.DisplayProjection,
    maxExtent: geoportal.config.MaxExtent,
    numZoomLevels:20});
geoportal.map.addLayer(geoportal.layers.osm);
geoportal.functions.ZoomMaxExtent();
