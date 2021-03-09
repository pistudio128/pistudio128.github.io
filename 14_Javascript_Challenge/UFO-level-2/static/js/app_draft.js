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

// Part II 
// Filter by city

    inputElementCity = d3.select("#city");

    var inputValueCity = inputElementCity.property("value");

    console.log(inputValueCity);
    console.log(tableData);

var filteredDataCity = tableData.filter(table => table.City === inputValueCity);
console.log(filteredDataCity);

filteredDataCity.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.values(ufo).forEach(value => {
        var cell = row.append("td");
        cell.text(value);
    })
})

// Filter by state
inputElementState = d3.select("#state");

var inputValueState = inputElementState.property("value");

console.log(inputValueState)
console.log(tableData);

var filteredDataState = tableData.filter(table => table.State === inputValueState);
console.log(filteredDataState);

filteredDataState.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.values(ufo).forEach(value => {
        var cell = row.append("td");
        cell.text(value);
    })
})

// Filter by country
inputElementCountry = d3.select("#country");

var inputValueCountry = inputElementCountry.property("value");

console.log(inputValueCountry)
console.log(tableData);

var filteredDataCountry = tableData.filter(table => table.Country === inputValueCountry);
console.log(filteredDataCountry);

filteredDataCountry.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.values(ufo).forEach(value => {
        var cell = row.append("td");
        cell.text(value);
    })
})

// Filter by shape
inputElementShape = d3.select("#shape");

var inputValueShape = inputElementShape.property("value");

console.log(inputValueShape)
console.log(tableData);

var filteredDataShape = tableData.filter(table => table.Shape === inputValueShape);
console.log(filteredDataShape);

filteredDataShape.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.values(ufo).forEach(value => {
        var cell = row.append("td");
        cell.text(value);
    })
})

}
