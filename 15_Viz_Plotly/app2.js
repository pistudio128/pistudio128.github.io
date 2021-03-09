
// Define data file
const file = "Data/samples.json";

// Define function to build charts
function buildCharts(samplechoice) {

    d3.json(file).then((data) => {


        var sample = data.samples.filter(a => a.id==samplechoice);
        var sampleotuids = sample[0].otu_ids;
        //console.log(sampleotuids);

        // Get data; define y ticks; put the otu_ids in descending order via reverse function
        var samplevalues = sample[0].sample_values;
        var yticks = sampleotuids.slice(0,10).reverse().map(item => `OTU ${item}`);

        // Define trace for bar chart 
        var trace = [{
            type: 'bar',
            y: yticks,
            x: samplevalues.slice(0, 10).reverse(),
            orientation: 'h'
          }];
        
          // Define layout for bar chart
          var layout2 = {
            title: 'Top 10 Bacteria per Sample'
        
            };

        Plotly.newPlot('bar', trace, layout2);


        // Define bubble plot layout
        var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          margin: { t: 0 },
          hovermode: "closest",
          xaxis: { title: "OTU ID" },
          margin: { t: 30},
          height: 600,
          width: 1000

        };

        var otu_labels = sample[0].otu_labels;

        // Define bubble plot data
        var bubbleData = [
          {
            x: sampleotuids,
            y: samplevalues,
            text: otu_labels,
            mode: "markers",
            marker: {
              size: samplevalues,
              color: sampleotuids,
              colorscale: "Earth"
            }
          }
        ];

          
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

          // Define pie chart data
          var pieData = [{
              type: 'pie',
              values: samplevalues.slice(0, 10),
              labels: sampleotuids,
              textinfo: "labels+percent",
              insidetextorientation: "horizontal"
          }];

          //var otu_labels = sample[0].otu_labels;

          // define pie chart layout
          var pie_layout = [{
            height: 600,
            width: 600,
            //margin: {"t" : 0, "b" : 0, "l" : 0, "r" : 0},
            showlegend: true
          }]

        Plotly.newPlot('pie', pieData, pie_layout)
  
        //    Define gauge chart data - Bonus   
        
        // Got the data; define the y ticks; put the otu_ids in descending order via reverse function
      
            // d3.json(file).then((data) => {
  //       var samplevalues = sample[0].sample_values;
  //       var washFreq = metadata.slice(0,10).reverse().map(item => `OTU ${item}`);
        
  //       //console.log(sampleotuids);

  //       var trace_g = [{
  //         domain: {x: [0,1], y: [0, 1]},
  //         value: parseInt(samplewfreq),
  //         title: {text: "<b>Belly Button Washing Frequency </b><br> (Scrubs per Week)"},
  //         type: "indicator",
  //         mode: "gauge+number+delta",
  //         gauge: {
  //           axis: {range: [null, 9]},
  //           steps: [
  //             {range: [0,1], color: "#e5d5d0"},
  //             {range: [1,2], color: "#dbc7c2"},
  //             {range: [2,3], color: "teal"},
  //             { range: [3, 4], color: "#c9ada7" },
  //             { range: [4, 5], color: "#ac9899" },
  //             { range: [5, 6], color: "#8a7e88" },
  //             { range: [6, 7], color: "#7d7482" },
  //             { range: [7, 8], color: "#706a7b" },
  //             { range: [8, 9], color: "#4a4e69" }
  //           ],
  //         threshold: {
  //           value: samplewfreq
  //         }
  //       }
  //     }
  // ];

  //       var layout_g = {
  //         width: 600,
  //         height: 450,
  //         margin: { t: 0, b: 0},
  //         };
  //         Plotly.newPlot("gauge", trace-g, layout_g);
        });
      }


// Define function for collecting metadata information
function meta(samplechoice) {

    // Define selection of metadata
    var selector = d3.select("#sample-metadata");

    // Pull data from file
    d3.json(file).then((data) => {

      var sample = data.metadata.filter(a => a.id==samplechoice);
      
      selector.html("");

      // Append information to appropriate demographic information
      selector.append("h5").text("ID: " + sample[0].id);
      selector.append("h5").text("Ethnicity: " + sample[0].ethnicity);
      selector.append("h5").text("Gender: " + sample[0].gender);
      selector.append("h5").text("Age: " + sample[0].age);
      selector.append("h5").text("Location: " + sample[0].location);
      selector.append("h5").text("Bb Type: " + sample[0].bbtype);
      selector.append("h5").text("Wfreq: " + sample[0].wfreq);

      //console.log(sample[0]);
      //var metadata = d3.select("#sample-metadata");
        
    });

}


// Define function for selecting options
function optionChanged(samplechoice) {

    buildCharts(samplechoice);
    meta(samplechoice);

}

// Define initialize function
function init() {

    d3.json(file).then((data) => {

        var selector = d3.select("#selDataset");

        console.log(data.names);

        data.names.forEach(element => {

            selector.append("option").text(element).property("value", element);
            
        });
    })

    // Define default chart and metadata
    buildCharts(940);
    meta(940);


}

init();