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

// controls for the OpenLayers Map Widget
gp.control = {};
gp.control.Bar = new OpenLayers.Control.PanZoomBar();
gp.control.ZoomIn = new OpenLayers.Control.ZoomBox();
gp.control.ZoomOut = new OpenLayers.Control.ZoomOut();
gp.control.Pan = new OpenLayers.Control.DragPan();
gp.control.Position = new OpenLayers.Control.MousePosition();
gp.control.Select = new OpenLayers.Control.SelectFeature();
gp.control.Navigation = new OpenLayers.Control.Navigation();

gp.controls = [
    gp.control.Bar,
    gp.control.ZoomIn,
    gp.control.ZoomOut,
    gp.control.Pan,
    gp.control.Position,
    gp.control.Select,
    gp.control.Navigation
];

// atributes
gp.layers = new Array();

// functions for geoPortal
gp.LoadLayersIntoList = function () {
    for (i in gp.layers_list) {
        if (gp.layers_list[i].type=='wms') {
            ly = new OpenLayers.Layer.WMS(
                gp.layers_list[i].name,
                gp.layers_list[i].url,
                gp.layers_list[i].params,
                gp.layers_list[i].properties);
        } else if (gp.layers_list[i].type=='kml') {
            ly = new OpenLayers.Layer.Vector(
                gp.layers_list[i].name, {
                projection: gp.map.displayProjection,
                strategies: [new OpenLayers.Strategy.Fixed()],
                visibility: gp.layers_list[i].visibility,
                protocol: new OpenLayers.Protocol.HTTP({
                    url: gp.layers_list[i].url,
                    format: new OpenLayers.Format.KML({
                        extractStyles: true,
                        extractAttributes: true
                        })
                    })
                });
        } else if (gp.layers_list[i].type=="text") {
            ly = new OpenLayers.Layer.Text(
                gp.layers_list[i].name,
                gp.layers_list[i].params
            );
        }
        gp.layers.push(ly);
    }
}

gp.LoadLayersIntoLegend = function () {
    legend_div = document.getElementById('legend')
    for (i=gp.layers.length-1;i>-1;i--) {
        e = document.createElement('div');
        e.className = "leyend-element";
        if (!gp.layers[i].isBaseLayer) {
            html = gp.layers[i].name + '<br />';
            html_view = '<img src="img/world.png" '+
                   ' onmouseover="gp.TipOn(\'View Layer\',\'layer_view\');" ' +
                   ' onmouseout="gp.TipOff()" />'+
                   '<input id="lyrView_' + gp.layers[i].name +
                   '" type="checkbox" onClick="gp.ViewLayer(' + i +')"';
            if (gp.layers[i].getVisibility()) {
                html_view += ' checked ';
            }
            html_view += '/>';
            html += html_view;
            if (gp.layers_list[i].data){
                html += '<img src="img/table.png" '+
                   ' onmouseover="gp.TipOn(\'Show Layer Data\',\'layer_data\');" ' +
                   ' onmouseout="gp.TipOff()" /><input id="lyrInfo' + i +
                   '" type="checkbox" onClick="alert(\'En Construcción\');' +
                   'document.getElementById(\'lyrInfo'+i+'\').checked=false;" />';
            }
            if (gp.param.LayerLink) {
                if (gp.layers_list[i].link) {
                html +=' - <img src="img/link.png" '+
                   ' onmouseover="gp.TipOn(\'Show Link\',\'layer_link\');" ' +
                   ' onmouseout="gp.TipOff()" onClick="window.location=\'' +
                   gp.layers_list[i].link_url + '\'";/>';
                }
            }
            e.innerHTML = html;
        } else {
            e.innerHTML = gp.layers[i].name;
        }
        legend_div.appendChild(e);
    }
}

gp.ViewLayer = function (i) {
    if (gp.layers[i].getVisibility()) {
        gp.layers[i].setVisibility(false);
    } else {
        gp.layers[i].setVisibility(true);
    }
}

gp.GoHome = function (){
    window.location = gp.param.HomePageURL;
}

gp.ToogleLegend = function (){
    if (gp.param.LegendStatus) {
        document.getElementById("legend").style.width = '0px';
        document.getElementById("map").style.left = '0px';
        gp.param.LegendStatus = false;
        gp.map.updateSize();
    }else{
        document.getElementById("legend").style.width = gp.param.LegendWidth;
        document.getElementById("map").style.left = gp.param.LegendWidth;
        gp.param.LegendStatus = true;
        gp.map.updateSize();
    }
    gp.SetMapSize();
}

gp.SetLegend = function () {
    if (gp.param.LegendStatus) {
        document.getElementById("legend").style.width = gp.param.LegendWidth;
        document.getElementById("map").style.left = gp.param.LegendWidth;
    }else{
        document.getElementById("legend").style.width = '0px';
        document.getElementById("map").style.left = '0px';
    }
}

gp.ZoomFullExtent = function (){
    gp.map.zoomToExtent(gp.param.MaxExtent,true);
}

gp.ZoomIn = function (){
    document.getElementById("ActiveTool").innerHTML = "<img src='img/magnifier.png' /> Zoom In";
    gp.control.Pan.deactivate();
    gp.control.ZoomIn.activate();
    gp.control.Select.deactivate();
}

gp.ZoomOut = function (){
    gp.control.ZoomOut.trigger();
}

gp.Pan = function (){
    document.getElementById("ActiveTool").innerHTML="<img src='img/mouse.png' /> Pan";
    gp.control.Pan.activate();
    gp.control.ZoomIn.deactivate();
    gp.control.Select.deactivate();
}

gp.ShowAllLayers = function () {
    allLayers = gp.map.getLayersBy('isBaseLayer',false);
    for (lyr in allLayers) {
        allLayers[lyr].setVisibility(true);
        document.getElementById('lyrView_' + allLayers[lyr].name).checked = true;
    }
}

gp.HideAllLayers = function () {
        allLayers = gp.map.getLayersBy('isBaseLayer',false);
    for (lyr in allLayers) {
        allLayers[lyr].setVisibility(false);
        document.getElementById('lyrView_' + allLayers[lyr].name).checked = false;
    }
}

gp.Identify = function (){
    document.getElementById("ActiveTool").innerHTML = "<img src='img/information.png' /> Identify";
    gp.control.Pan.deactivate();
    gp.control.ZoomIn.deactivate();
    gp.control.Select.activate();
}

gp.TipOn = function (msj,bullet){
    if (bullet=='tool') {
        bullet_img = "<img src='img/bullet_wrench.png' />";
    } else if (bullet=='layer_view') {
        bullet_img = "<img src='img/bullet_green.png' />";
    } else if (bullet=='layer_data') {
        bullet_img = "<img src='img/bullet_white.png' />";
    } else if (bullet=='layer_link') {
        bullet_img = "<img src='img/link.png' />";
    } else {
        bullet_img = "<img src='img/bullet_orange.png' />";
    }
    html = bullet_img + msj;
    document.getElementById("Status").innerHTML = html;
}

gp.TipOff = function (){
    document.getElementById("Status").innerHTML = "";
}

gp.About = function () {
    msg = "© 2010 Carlos Gustavo Ruiz (arahat)\n";
    msg += "geoPortal is under the GNU GPL v3 licence.\n";
    msg += "for more information visit:\n";
    msg += "http://bitbucket.org/arahat/geoportal"
    alert(msg);
}

gp.AddgeoBookmarks = function () {
    geoBM = document.getElementById("geoBookmarks");
    for (bm in gp.geoBookmarks) {
        e = document.createElement('option');
        e.value = gp.geoBookmarks[bm][0];
        e.text = gp.geoBookmarks[bm][0];
        try {
            geoBM.add(e,null);
        } catch (ex) {
            geoBM.add(e);
        }
        
    }
}

gp.onPopupClose = function (evt) {
            select.unselectAll();
        }

gp.onFeatureSelect = function (event) {
    var feature = event.feature;
    var content = "<h2>" + feature.attributes.name + "</h2>" + feature.attributes.description;
    popup = new OpenLayers.Popup.FramedCloud("chicken", 
                                     feature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(100,100),
                                     content,
                                     null, true, gp.onPopupClose);
    feature.popup = popup;
    gp.map.addPopup(popup);
}

gp.onFeatureUnselect = function (event) {
    var feature = event.feature;
    if (feature.popup) {
        gp.map.removePopup(feature.popup);
        feature.popup.destroy();
        delete feature.popup;
    }
}

gp.AddKMLLayersToSelectControl = function () {
    a = new Array();
    for (ly in gp.layers_list) {
        if (gp.layers_list[ly].type=="kml") {
            a.push(gp.map.layers[ly]);
        }
    }
    
    gp.control.Select.layers = a
    for (ly in a) {
        a[ly].events.on({
            "featureselected": gp.onFeatureSelect,
            "featureunselected": gp.onFeatureUnselect
        })
    }
    //gp.control.Select.activate();
}

gp.ChangeExtentgeoBookmark = function () {
    geoBM = document.getElementById("geoBookmarks");
    if (geoBM.selectedIndex != 0) {
        gbm = geoBM[geoBM.selectedIndex].value;
        for (g in gp.geoBookmarks) {
            if (gp.geoBookmarks[g][0] == gbm) {
                gp.map.zoomToExtent(gp.geoBookmarks[g][1],true);
            }
        }
    }
}

gp.SetPageTitle = function () {
    document.title = gp.param.PageTitle;
}

gp.SetPageHeader = function () {
    ph = document.getElementById('head');
    ph.innerHTML = gp.param.PageHeader;
}

gp.SetMapSize = function () {
    b = document.getElementsByTagName('body')[0];
    l = document.getElementById('legend');
    m = document.getElementById('map');
    if (gp.param.LegendStatus  == true) {
        m.style.width = (b.scrollWidth - gp.param.LegendWidth.slice(0,-2)) + "px";
    } else {
        m.style.width = b.scrollWidth + "px";
    }
    m.style.height = l.scrollHeight + "px";
}


gp.init  = function (){
    gp.SetPageTitle();
    gp.SetPageHeader();
    gp.SetMapSize();
    OpenLayers.ProxyHost="/proxy/?url="
    gp.map = new OpenLayers.Map('map',
            { controls: gp.controls,
            projection: gp.param.Projection});
    gp.LoadLayersIntoList();
    gp.LoadLayersIntoLegend();
    gp.SetLegend();
    gp.AddgeoBookmarks();
    gp.map.addLayers(gp.layers);
    gp.AddKMLLayersToSelectControl();
    gp.map.zoomToExtent(gp.param.MaxExtent,true);
}
