// UFO Challenge - Part I
// From data.js
var tableData = data;

// Define table body 
var tbody = d3.select("tbody");

// Use D3 to select the table
var table = d3.select("table");

// Use D3 to set the table class to `table table-striped`
//table.attr("class", "table table-striped");

// Update information with arrow function
tableData.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.values(ufo).forEach(value => {
        var cell = row.append("td");
        cell.text(value);
    });
});

// Select the button
var button = d3.selectAll("#filter-btn");

// Select the form
var form = d3.selectAll("form");

// Activate button and form
button.on("click", activate);
form.on("submit", activate);

// Finish function for form
function activate () {

    d3.event.preventDefault();

    // Isolate input element via datetime
    inputElement = d3.select("#datetime");

    // Isolate property of input element
    var inputValue = inputElement.property("value");

 //   console.log(inputValue);
 //   console.log(tableData);

 // Filter the table with input value
 var filteredData = tableData.filter(table => table.datetime === inputValue);
// console.log(filteredData);

// Select the tbody element
var tbody = d3.select("tbody");

tbody.html("");

filteredData.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.values(ufo).forEach(value => {
        var cell = row.append("td");
        cell.text(value);
    });
});

}
