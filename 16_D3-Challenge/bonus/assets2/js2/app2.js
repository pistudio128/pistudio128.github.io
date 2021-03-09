var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");

  // Group charts
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data
  d3.csv("data/data.csv").then(function(censusData) {
    //did not create a time parser
    // d3.timeParser("%Y")
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    censusData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.age = +data.age;
      data.smokes = +data.smokes;
      data.obesity = +data.obesity;
      data.income = +data.income;
    });


    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(censusData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(censusData, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    bottomAxis.ticks(5);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // Step 6: Add State Abbreviation to Circles
    chartGroup.selectAll("text.text-circles")
    .data(censusData)
    .enter()
    .append("text")
    .classed("text-circles",true)
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy",5)
    .attr("text-anchor","middle")
    .attr("font-size","12px")
    .attr("fill", "white");

    // Step 7: Initialize tool tip
    // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
    //   });

    // Step 7 (Better view of info)
    var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
        return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcareLow}`);
        });          
    
        // Step 8: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);
    
    // Step 9: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Step 10: Create axes labels
    // x axis
    chartGroup.append("text")
    .attr("y", height + margin.bottom/2 - 10)
    .attr("x", width / 2)
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Poverty Rate (%)");

    // y axis
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 30 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Lacks Healthcare (%)");

});