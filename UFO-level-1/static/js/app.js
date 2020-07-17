// from data.js
// Assign a variable to retreive data from data.js
var tableData = data;

// Table Body: Select the body of the table. We will add data to this area.
// Call using d3.select()
var tbody = d3.select("#target-table-display");

// select the "submit" button & "input field" area.
// Use d3 to select ID tags for date input field and 'filter by date' button.
var inputField = d3.select("#datetime");
var submitButton = d3.select("#filter-btn-date");

// Create table in the html file. Insert each data object.
data.forEach(obj => {
    // for each "element" in the object create a row
    // Element includes dict key and values being selected and added to single row.
    var tRow = tbody.append("tr");
    // "Object" becomes the targetet array (element)
    // Entries obtains everything in object and can be looped through with key,value
    Object.entries(obj).forEach(([key, value]) => {
        // Test key,value
        // console.log(`The key is: ${key} and the value is: ${value}`);
        // tData will append td to each tRow by calling tRow.append()
        var tData = tRow.append("td");
        // Add the "value" to each row in the table
        // Calling .text requests the string passing the value of object in tData.
        tData.text(value);
    });
});



// Events, Filtering, Refreshing the page.
// implementing fuction to "submit" button.
submitButton.on("click", function() {
    // clears data of current table        
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // print "You have just clicked the 'Filter Table' on console, for testing
    console.log("Test Click.");


    // select the 'input' element and get the raw html node
    var inputField = d3.select("#datetime");
    // get the value property of the "input" element 
    var inputElement = inputField.property("value");
    // print value in console
    console.log(inputElement);
    // use the "field input" to filter the data by "date" only
    var inputTypeArray = data.filter(dt => dt.datetime === inputElement);
    console.log(inputTypeArray)


    // display in the html file (append it at the end, after displaying all original data)
    inputTypeArray.forEach((selection) => {
        // for each "element" create a row
        var row = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selection).forEach(([key, value]) => {
            var cell = row.append("td");
            // adds the "value" to each row in the table
            cell.text(value);
        });
    });
});