var targetLayer = null;

function updateCheckboxState(layer) {
    var checkbox = document.getElementById(layer.get('title'));
    if (checkbox) {
        checkbox.checked = layer.getVisible();
    }
}

function toggleLayer(eve) {
    var lyrname = eve.target.value;
    var checkedStatus = eve.target.checked;
    var lyrList = map.getLayers();

    lyrList.forEach(function(element){
        if (lyrname === element.get('title')){
            element.setVisible(checkedStatus);
            updateCheckboxState(element);
        }
    });
}

function initializeCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        var layerName = checkbox.value;
        var layer = map.getLayers().getArray().find(function(element) {
            return element.get('title') === layerName;
        });
        if (layer) {
            checkbox.checked = layer.getVisible();
        }
    });
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
    center: ol.proj.fromLonLat([-36, -7.6]),
    zoom: 9,
});

var map = new ol.Map({
    target: 'map',
    view: mapView,
});

// Adicione um evento 'postrender' à visualização do mapa
map.getView().on('postrender', function() {
    // Initialize os checkboxes apenas após o mapa e as camadas terem sido completamente carregados
    initializeCheckboxes();
});

var osmTile = new ol.layer.Tile ({
    title: 'Open Street Map',
    visible: true,
    opacity: 0.8,
    source: new ol.source.OSM(),
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

var url_geoserver = 'https://geoserver.planorioparaiba.com.br/geoserver/prh_rpb/wms'

var divisasEstaduais = new ol.layer.Tile({
    title: "Divisas Estaduais da Paraíba",
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: {'LAYERS':'prh_rpb:divisas_estaduais', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: true,
});

var hidrografiaPrincipal = new ol.layer.Tile({
    title: "Hidrografia principal",
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: {'LAYERS':'prh_rpb:hidrografia_principal', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: true,
});

var acudes = new ol.layer.Tile({
    title: "Açudes",
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: {'LAYERS':'prh_rpb:acudes_pb', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: true,
});

var subBacias = new ol.layer.Tile({
    title: "Sub bacias do Rio Paraíba",
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: {'LAYERS':'prh_rpb:sub_bacias_rpb', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: true,
});

var bacia = new ol.layer.Tile({
    title: "Bacia do Rio Paraíba",
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: {'LAYERS':'prh_rpb:bacia_rpb', 'TILED':true},
        serverType: 'geoserver',
    }),
    visible: true,
});

map.addLayer(divisasEstaduais);
map.addLayer(hidrografiaPrincipal);
map.addLayer(acudes);
map.addLayer(subBacias);
map.addLayer(bacia);

initializeCheckboxes();
