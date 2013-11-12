/*
 * License goes here
 */

Geoportal.Page.Title = "Geoportal 2.0";


/* 
 * Geoportal Bookmarks
 *
 * Usage: to add a bookmark you may add a JSON object with keys: name, lon, lat and zoom.
 *        i.e. { "name" : "Caracas", "lon" : -66.88096, "lat": 10.43379, "zoom" : 11 }
 *
 */

Geoportal.Bookmarks.List = [
   {
       "name" : "My Bookmark",
       "lon"  : -66,
       "lat"  : 7.7,
       "zoom" : 6
   }
];


/*
 * Geoportal Map
 *
 * Usage: ...
 *
 */

Geoportal.Map.Layers = [
   {
       "name" : "New WMS Layer",
       "source" : "WMS",
       "url" : "",
       "layers" : "",
       "projection" : "",
       "visibility" : false
   },
   {
       "name" : "New KML Layer",
       "source" : "KML",
       "url" : "",
       "visibility" : false
   },
   {
       "name" : "New OSM Layer",
       "source" : "OSM"
   }
]
