/*-----------------------------------------------------------------------------+
This file is part of geoPortal.

    geoPortal is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    geoPortal is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with geoPortal.  If not, see <http://www.gnu.org/licenses/>.
+-----------------------------------------------------------------------------*/

// "gp" is the namespace for all functions and variables into geoPortal
var gp = {};


// this section are parameters for geoPortal
// for more information go to params seccion in the documentation page
gp.param = {}
gp.param.HomePageURL = "http://geoportal.atman-tree.org/";
gp.param.Projection = new OpenLayers.Projection('4326');
gp.param.DisplayProjection = new OpenLayers.Projection('4326');
gp.param.MaxExtent = new OpenLayers.Bounds(-73.5,0,-57,16.5);
gp.param.LegendStatus = true;
gp.param.LegendWidth = "200px";
gp.param.LayerLink = true;
gp.param.PageTitle = "demo geoportal";
gp.param.PageHeader = "<img src='img/logo32.png'> &nbsp; demo geoportal";

// geoBookmarks are map bounds for quick access zones in the map.
gp.geoBookmarks = [
    // ['NAME', new OpenLayers.Bounds(minX, minY, maxX, maxY)]
    ['Caracas', new OpenLayers.Bounds(-67.1240, 10.3685, -66.7107, 10.5480)],
    ['Full Extent', gp.param.MaxExtent]
]


// En el arreglo 'gp.layers_list' se declaran las capas que iran en el mapa
gp.layers_list = [
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Metacarta',
    url:'http://vmap0.tiles.osgeo.org/wms/vmap0',
    params:{layers: 'basic'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:true}},
    
    // capas IGVSB
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Relieve',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{layers:'relieve'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Paises Vecinos',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'paises_vecinos'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Límite',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'limite'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:true, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Límite Norte',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", transparent:true,  format:"image/png", layers:'limite_norte'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Estados',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'division_estadal'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Municipios',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'division_municipal'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Cuerpos de Agua',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'cuerpos_de_agua'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Hidrografía',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'hidrografia'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Curvas de Nivel',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'curvas'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Vialidad',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'trancal'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Ciudades',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'cuidades'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Centros Poblados',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'poblados'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: false, link_url: null,
    data: false,
    name:'Geoportal - Capitales de Municipio',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'capital_municipio'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'wms',
    link: true, link_url: 'http://igvsb.geoportalsb.gob.ve/',
    data: false,
    name:'Geoportal - Capitales de Estado',
    url:'http://www.geoportalsb.gob.ve/cgi-bin/mapserv?map=/data/MAPFILE/IGVSB/igvsb.map',
    params:{transparent:true,  format:"image/png", layers:'capital_estado'},
    properties:{projection: 'EPSG:4326', buffer:2, gutter:1, visibility:false, isBaseLayer:false}},
    
    {type:'text',
    link: false, link_url: null,
    data: false,
    name: 'Capa de Texto',
    params: {location:'./data/sample.txt', visibility:false}},
    
    {type:'kml',
    link: true, link_url:"http://www.atman-tree.com/",
    data: false,
    name: 'Capa KML',
    url: "data/sample.kml",
    visibility:false}
];
