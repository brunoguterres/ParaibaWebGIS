function adicionarCamadas(tituloCamada, nomeCamada, fonteCamada) {
    var layer = new ol.layer.Tile({
        title: tituloCamada,
        source: new ol.source.TileWMS({
            url: 'http://10.5.3.18:8080/geoserver/prh_rpb/wms',
            params: {'LAYERS': nomeCamada, 'TILED': true},
            serverType: 'geoserver',
            visible: true,
        }),
        attribution: fonteCamada,
    });
    map.addLayer(layer);
}

function adicionarBasemap(title, source) {
    var layer = new ol.layer.Tile({
        title: title,
        visible: true,
        source: source,
    });
    map.addLayer(layer);
}

var mapView = new ol.View ({
    center: ol.proj.fromLonLat([-36.6, -7.2]),
    zoom: 8.6,
});

var map = new ol.Map({
    target: 'map',
    view: mapView,
});

adicionarBasemap('Open Street Map', new ol.source.OSM());
//adicionarBasemap('Google Satellite', new ol.source.XYZ({url:'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',}));


adicionarCamadas('Divisas Estaduais da Paraíba', 'prh_rpb:divisas_estaduais', 'IBGE');
adicionarCamadas('Hidrografia principal', 'prh_rpb:hidrografia_principal', 'ANA');
adicionarCamadas('Açudes', 'prh_rpb:acudes', 'AESA');
adicionarCamadas('Sub bacias do Rio Paraíba', 'prh_rpb:sub_bacias_rpb', 'AESA');
adicionarCamadas('Bacia do Rio Paraíba', 'prh_rpb:bacia_rpb', 'AESA');
