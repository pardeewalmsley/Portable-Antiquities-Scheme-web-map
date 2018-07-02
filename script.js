// Add Basemap

var cartoDB = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cartodb.com">cartoDB</a>',
    maxZoom: 18,
});

var bounds = [
  [58.906438, 5.142366],
  [49.040144, -8.656461],
]

var map = L.map('mapid', {
   layers: [cartoDB],
   maxZoom: 8,
   minZoom: 6,
   maxBounds: bounds,
}).setView([53.733513,-3.016235], 6);

// Style Counties Layer

function getColorCounties(d) {
    return d > 100000 ? '#253494' :
           d > 15000  ? '#2c7fb8' :
           d > 2000  ? '#41b6c4' :
           d > 400  ? '#7fcdbb' :
           d > 50   ? '#c7e9b4' :
           d > 0   ? '#ffffcc' :
                      '#636363';
}

function styleCounties(feature) {
    return {
        fillColor: getColorCounties(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

// Style Neolithic Layer

function getColorNeolithic(d) {
    return d > 3000 ? '#007F18' :
           d > 1000  ? '#199931' :
           d > 500  ? '#33B24B' :
           d > 100  ? '#4CCC64' :
           d > 10   ? '#66E57E' :
           d > 0   ? '#7FFF97' :
                      '#636363';
}

function styleNeolithic(feature) {
    return {
        fillColor: getColorNeolithic(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

// Style Bronze Age Layer

function getColorBronzeAge(d) {
    return d > 900 ? '#007F65' :
           d > 500  ? '#19997E' :
           d > 100  ? '#33B298' :
           d > 50  ? '#4CCCB1' :
           d > 10   ? '#66E5CB' :
           d > 0   ? '#7FFFE4' :
                      '#636363';
}

function styleBronzeAge(feature) {
    return {
        fillColor: getColorBronzeAge(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

// Style Iron Age Layer

function getColorIronAge(d) {
    return d > 3500 ? '#00007F' :
           d > 2500  ? '#191A99' :
           d > 1000  ? '#3333B2' :
           d > 600  ? '#4C4DCC' :
           d > 200   ? '#6666E5' :
           d > 0   ? '#7F80FF' :
                      '#636363';
}

function styleIronAge(feature) {
    return {
        fillColor: getColorIronAge(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

// Style Roman Layer

function getColorRoman(d) {
    return d > 15000 ? '#4A007F' :
           d > 8000  ? '#641999' :
           d > 4000  ? '#7D33B2' :
           d > 1000  ? '#974CCC' :
           d > 500   ? '#B066E5' :
           d > 0   ? '#CA7FFF' :
                      '#636363';
}

function styleRoman(feature) {
    return {
        fillColor: getColorRoman(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

// Style Early Medieval Layer

function getColorEarlyMedieval(d) {
    return d > 3000 ? '#7F0041' :
           d > 1000  ? '#99195A' :
           d > 500  ? '#B23374' :
           d > 300  ? '#CC4C8D' :
           d > 100   ? '#E566A7' :
           d > 0   ? '#FF7FC0' :
                      '#636363';
}

function styleEarlyMedieval(feature) {
    return {
        fillColor: getColorEarlyMedieval(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

// Style Medieval Layer

function getColorMedieval(d) {
    return d > 20000 ? '#7F0B00' :
           d > 10000  ? '#992419' :
           d > 5000  ? '#B23E33' :
           d > 1500  ? '#CC574C' :
           d > 800   ? '#E57166' :
           d > 0   ? '#FF8A7F' :
                      '#636363';
}

function styleMedieval(feature) {
    return {
        fillColor: getColorMedieval(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

// Style Post-Medieval Layer

function getColorPostMedieval(d) {
    return d > 10000 ? '#7F3000' :
           d > 6000  ? '#994A19' :
           d > 2000  ? '#B26333' :
           d > 1000  ? '#CC7D4C' :
           d > 500   ? '#E59666' :
           d > 0   ? '#FFB07F' :
                      '#636363';
}

function stylePostMedieval(feature) {
    return {
        fillColor: getColorPostMedieval(feature.properties.Objects),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    };
}

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
  var layer = e.target;

  layer.setStyle({
      weight: 1,
      color: '#ffffff',
      fillOpacity: 0.7,
  });

}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    // Content of 'displayCase' div
    document.getElementById('displayCaseText').innerHTML =
    "<h1><b>" + e.target.feature.properties.ctyua15nm + '</b><br>' + (e ?
        + e.target.feature.properties.Objects : "0") + " objects found </h1><br><h2>" +
        e.target.feature.properties.photo1 + "<br><b>" +
        (e ? e.target.feature.properties.period1 : "") + "</b><br>" +
        (e ? e.target.feature.properties.label1 : "") + "</h2>";
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

// Toggle 'About' div

document.getElementById('about').innerHTML =
    "<p>In England, Wales and Northern Ireland, all finders of gold and silver objects," +
    " as well as groups of coins over 300 years old which are found within the same context," +
    " have a legal obligation to report such items under the Treasure Act 1996. <br> </p>";

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if ( e.style == 'display: block' )
          e.style = 'display: none';
    else
          e.style = 'display: block';
}

// Add geoJSON data as layers

var countiesLayer = L.geoJSON(counties, {
    style: styleCounties,
    onEachFeature: onEachFeature
});

var neolithicLayer = L.geoJSON(neolithic, {
    style: styleNeolithic,
    onEachFeature: onEachFeature
});

var bronzeAgeLayer = L.geoJSON(bronzeAge, {
    style: styleBronzeAge,
    onEachFeature: onEachFeature
});

var ironAgeLayer = L.geoJSON(ironAge, {
    style: styleIronAge,
    onEachFeature: onEachFeature
});

var romanLayer = L.geoJSON(roman, {
    style: styleRoman,
    onEachFeature: onEachFeature
});

var earlyMedievalLayer = L.geoJSON(earlyMedieval, {
    style: styleEarlyMedieval,
    onEachFeature: onEachFeature
});

var medievalLayer = L.geoJSON(medieval, {
    style: styleMedieval,
    onEachFeature: onEachFeature
});

var postMedievalLayer = L.geoJSON(postMedieval, {
    style: stylePostMedieval,
    onEachFeature: onEachFeature
});

var baseLayers = {
  "Overview" : countiesLayer,
  "Neolithic: <p>4000 - 2500 BC</p>" : neolithicLayer,
  "Bronze Age: <p>2500 - 800 BC</p>" : bronzeAgeLayer,
  "Iron Age: <p>800 BC - AD 43</p>" : ironAgeLayer,
  "Roman: <p>AD 43 - AD 410</p>" : romanLayer,
  "Early Medieval: <p>AD 410 - AD 1066</p>" : earlyMedievalLayer,
  "Medieval: <p>AD 1066 - AD 1485</p>" : medievalLayer,
  "Post-Medieval: <p>AD 1485 - 20th Century</p>" : postMedievalLayer,
};

L.control.layers(baseLayers).addTo(map);
