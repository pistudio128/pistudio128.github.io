// Create the base map - updated version
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

// Store API query variables for earthquake data
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

    // PART 2 - Generate layers for satellite, grayscale, outdoors, tectonic plates, earthquakes
    // Create functino to add layers to map
    function createMap(baseMap) {
        
        var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.outdoors",
            accessToken: API_KEY
          });

        var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.light",
            accessToken: API_KEY
          });


          var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
          streets   = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});
          var map = L.map('map', {
                center: [39.73, -104.99],
                zoom: 10,
                layers: [grayscale, cities]
            });
        // var grayscale = L.tileLayer.grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>", 
        //     maxZoom: 18,
        //     });
 
        var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.satellite",
            accessToken: API_KEY
        })

        // Define a baseMaps object to hold our base layers
        var baseMaps = {
            "Light Map": light,
            "Outdoors": outdoors,
            "Satellite" : satellite,
            "Grayscale" : grayscale
        };

        // Create overlay object to hold our overlay layer
        var overlayMaps = {
            Earthquakes: earthquakes,
        };

        // Create our map, giving it the streetmap and earthquakes layers to display on load
        var myMap = L.map("map", {
            center: [
                37.09, -95.71
    ],
            zoom: 5,
            layers: [satellite, earthquakes]
});

  // Add basemaps and overlayMap
  L.control.layers(baseMaps, overlayMaps.addTo(map);
  
  // add the lagend to the map
  legend.addTo(baseMap);

}