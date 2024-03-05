function toggleLayer(eve) {
    var lyrname = eve.target.value;
    var checkedStatus = eve.target.checked;
    var lyrList = map.getLayers();

    lyrList.forEach(function(element){
        if (lyrname == element.get('title')){
            element.setVisible(checkedStatus);
        }
    });

    if (targetLayer) {
        targetLayer.setVisible(checkedStatus);
        
        if (checkedStatus && !map.getLayers().getArray().includes(targetLayer)) {
            map.addLayer(targetLayer);
        } else if (!checkedStatus && map.getLayers().getArray().includes(targetLayer)) {
            map.removeLayer(targetLayer);
        }
    }
}

function changeBaseMap(event) {
    var selectedOption = event.target.value;

    if (selectedOption === 'osm') {
        osmTile.setVisible(true);
        googleSatellite.setVisible(false);
    } else if (selectedOption === 'google') {
        osmTile.setVisible(false);
        googleSatellite.setVisible(true);
    }
}

var mapView = new ol.View ({
    center: ol.proj.fromLonLat([-36.2, -7.3]),
    zoom: 8.6,
});

var map = new ol.Map({
    target: 'map',
    view: mapView,
});

var osmTile = new ol.layer.Tile ({
    title: 'Open Street Map',
    visible: true,
    opacity: 0.7,
    source: new ol.source.OSM(),
    visible: true,
});

var googleSatellite = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
    }),
    visible: false,
    type: 'base',
});

map.addLayer(googleSatellite);
map.addLayer(osmTile);


var divisasEstaduais = new ol.layer.Tile({
    title: "Divisas Estaduais da Paraíba",
    source: new ol.source.TileWMS({
        url: 'http://10.5.3.18:8080/geoserver/prh_rpb/wms',
        params: {'LAYERS':'prh_rpb:divisas_estaduais', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: false,
});

var hidrografiaPrincipal = new ol.layer.Tile({
    title: "Hidrografia principal",
    source: new ol.source.TileWMS({
        url: 'http://10.5.3.18:8080/geoserver/prh_rpb/wms',
        params: {'LAYERS':'prh_rpb:hidrografia_principal', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: false,
});

var acudes = new ol.layer.Tile({
    title: "Açudes",
    source: new ol.source.TileWMS({
        url: 'http://10.5.3.18:8080/geoserver/prh_rpb/wms',
        params: {'LAYERS':'prh_rpb:acudes', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: false,
});

var subBacias = new ol.layer.Tile({
    title: "Sub bacias do Rio Paraíba",
    source: new ol.source.TileWMS({
        url: 'http://10.5.3.18:8080/geoserver/prh_rpb/wms',
        params: {'LAYERS':'prh_rpb:sub_bacias_rpb', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: false,
});

var bacia = new ol.layer.Tile({
    title: "Bacia do Rio Paraíba",
    source: new ol.source.TileWMS({
        url: 'http://10.5.3.18:8080/geoserver/prh_rpb/wms',
        params: {'LAYERS':'prh_rpb:bacia_rpb', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: false,
});

map.addLayer(divisasEstaduais);
map.addLayer(hidrografiaPrincipal);
map.addLayer(acudes);
map.addLayer(subBacias);
map.addLayer(bacia);

