// Add Basemap

var cartoDB = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cartodb.com">cartoDB</a>',
    maxZoom: 18,
});

var map = L.map('mapid', {
   layers: [cartoDB],
   maxZoom: 8,
}).setView([53.133513,-6.916235], 6);

// Add county geoJSON data

L.geoJSON(counties).addTo(map);

// Style data

function getColor(d) {
    return d > 100000 ? '#045a8d' :
           d > 15000  ? '#2b8cbe' :
           d > 2000  ? '#74a9cf' :
           d > 400  ? '#a6bddb' :
           d > 50   ? '#d0d1e6' :
           d > 0   ? '#f1eef6' :
                      '#cccccc';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.6,
    };
}

L.geoJson(counties, {style: style}).addTo(map);

// Control hover event for each county

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#993404',
        fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    // Content of 'displayCase' div
    document.getElementById('displayCase').innerHTML =
    "<p><b>" + e.target.feature.properties.ctyua15nm + '</b><br>' +
        e.target.feature.properties.Objects + " objects found<br>" +
        e.target.feature.properties.photo1 + "</p>";
    // Close 'About' div
    document.getElementById('about').style.display = 'none';
}

function onEachFeature(feature, layer) {
    layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
      }

geojson = L.geoJson(counties, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// Toggle 'About' div

document.getElementById('about').innerHTML =
    "<p>In England, Wales and Northern Ireland, all finders of gold and silver objects," +
    "and groups of coins from the same finds, over 300 years old," +
    "have a legal obligation to report such items under the Treasure Act 1996. <br> </p>";

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if ( e.style == 'display: block' )
          e.style = 'display: none';
    else
          e.style = 'display: block';
}

// Add legend

var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 400, 2000, 15000, 100000],
        labels = [];

    // loop through density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
