// From data.js
var tableData = data;

// Define table body 
var tbody = d3.select("tbody");

// Create function for writeable table
function writetable(data){

    // Clear table
    tbody.html("");

    // Update information with arrow function
    data.forEach((ufo) => {
        var row = tbody.append("tr");
        Object.values(ufo).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
        });
    });

}

// Create dictionary for filters
trackFilters ={}

// Define function to grab text from fields
function grabTextFromFields(){

    // Select all the input tags; this is a current object; research "this" - homework
    var changedElement = d3.select(this).select("input");
    var inputValue = changedElement.property("value");
    var FilterKeys = changedElement.attr("id");

    if(inputValue){
        trackFilters[FilterKeys] = inputValue;
    }
    else{
        delete trackFilters[FilterKeys];
    }

    filterTable();

}

// Develop function to preserve the table
function filterTable(){
    let filterData = tableData;

    Object.entries(trackFilters).forEach(([key,value]) => {
        filterData = filterData.filter( dataObj => dataObj[key] === value);
    });

    writetable(filterData);
}

// Always use functionality in everything that you do!
d3.selectAll(".filter").on("change",grabTextFromFields);
writetable(tableData);