// Create the base map - final version
var baseMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add tile layer for the background of map
var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}).addTo(baseMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Create a function to adjust marker size depending on mag values
function getRadius(mag) {
    return mag * 5
}

d3.json(baseURL, function (response) {

    // Loop through data and get colors
    function getColors(d) {
        if (d < 1) {
            return "#800026"
        }
        else if (d < 2) {
            return "#BD0026"
        }
        else if (d < 3) {
            return "#E31A1C"
        }
        else if (d < 4) {
            return "#FC4E2A"
        }
        else if (d < 5) {
            return "#FD8D3C"
        }
        else {
            return "#FEB24C"
        }
    }

    L.geoJSON(response, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },


        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Magnitude : "
                + feature.properties.mag
                + "<br>"
                + feature.properties.place
                + "<br>"
                + feature.geometry.coordinates[2]
            )
        },

        style: function (feature) {
            return {
                "color": "white",
                "weight": .2,
                "opacity": 1,
                "fillColor": getColors(feature.geometry.coordinates[2]),
                "radius": getRadius(feature.properties.mag)
            }
        },

    }).addTo(baseMap);

// Create legend - update this area
var legend = L.control({position: "bottomright" });
legend.onAdd = function(){

    // Create div for Legend
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90]
        labels = [];
        var colors = [
            "#800026",
            "#BD0026",
            "#E31A1C",
            "#FC4E2A",
            "#FD8D3C",
            "#FEB24C"
          ];
  
    // Loop through density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + colors[i] + '"></i> ' +
              grades[i] + (grades[i +1 ] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    legend.addTo(baseMap)
})
