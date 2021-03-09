// Create function build-chart
function getPlot(id) {
    d3.json("Data/samples.json").then(data)=> {
        console.log(data)

        var wfreq = data.metadata.map(d => d.wfreq)

        // filter sample values by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        // Capture the top 10
        var samplevalues = samples.sample_values.slice(0, 10).reverse();

        // Captue top 10 otu ids for plot and reverse
        var OTU_top = (samples.sample_values.slice(0,10).reverse();

        // Capture otu ids to appropriate form for plot
        var OTU_id = OTU_top.map(d => "OTU" + d);

        // Capture top 10 labels for plot
        var labels = samples.otu_labels.slice(0, 10);

        // Create trace variable for plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(142, 124, 195'},
            type:"bar",
            orientation: "h",
        };

        // Create data variable
        var data = [trace];

        // Create layout variable
        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
        }
        };


        // Create the bar plot
        Plotly.newPlot("bar", data, layout);

        // Create bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
            size: samples.sample_values,
            color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        // Set layout for bubble plot
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // Create data variable
        var data1 = [trace1];

        // Create the bubble plot
        Plotly.newPlot("bubble", data1, layout_b);

        // The gauge chart
        var data_g = [
            {
            domain: { x: [0,1], y: [0, 1] },
            value: parseFloat(wfreq),
            title: {text: `Weekly Washing Frequency` },
            type: "indicator",

            mode: "gauge+number",
            gauge: {axis: {range: [null, 9],
                    steps: [
                        { range: [0,2], color: "yellow"},
                        { range: [2,4], color: "cyan"},
                        { range: [4,6], color: "teal"},
                        { range: [6,8], color: "lime"},
                        { range: [8,9], color: "green"},
                    ]}
            }
        ];

        var layout_g = {
            width: 700,
            height: 600,
            margin: { t: 20, b: 40, l: 100, r: 100}
            };
        Plotly.newPlot("gauge", data_g, layout_g);
    });
    }

// Create function for meta-data; make the tool tips work
function getInfo(id) {
    //read json file to grab data
    d3.json("Data/samples.json").then((data)=> {

        // Grab metadata for demographics
        var metadata = data.metadata;

        console.log(metadata)

        // Filter metadata info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // Select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");

        // Empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // Grab necessary demographic data for id and append to panel
        Object.defineProperties(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

// Create function for the option-change
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// Initialize functions to display data and plots to page
function init ( {
    // Select the drop down menu
    var dropdown = d3.select("selDataset");

    // Read data
    d3.json("Data/samples.json").then((data)=> {

        // attach id data to dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Call function to display data and plots
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}
    //after filling the options
    // have it select the first option...have it show the graph, when you get on a page
    
    // Call initialize function - purpoose is to fill up the functions of the dropdown
    // No parameters 
    
    // Initialize open open ();

init();