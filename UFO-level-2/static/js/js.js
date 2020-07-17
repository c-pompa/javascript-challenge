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
        // tRow.className = 'ufo-data-row';
        // Add the "value" to each row in the table
        // Calling .text requests the string passing the value of object in tData.
        tData.text(value);
    });
});

/////////////////////////////////////////////////////////
//
// Search Option Verification
// 
// receives data, inputElement from line 118, and dropDownValues from line 123.
// if option matches known string, select certain data from dataset. return back as inputTypeArray.
// 
/////////////////////////////////////////////////////////

function searchOptions(data, inputElement, dropDownValues) {
    var greeting;
    if (inputElement === '') {
        greeting = "Nothing Found.";
        console.log(greeting);

        // Add filter option above input box
        var noItems = d3.select('tbody');
        var noItems_applied = noItems.text("No input found. Select a filter and add an input for data.");
        return null;

    } else if (dropDownValues == "City") {
        // var inputTypeArray;
        var inputTypeArray = data.filter(dt => dt.city === inputElement);
        greeting = `Found ${inputTypeArray.length} items.`;
        document.getElementById("results").innerHTML = greeting;
        console.log(greeting, inputTypeArray);
        return inputTypeArray;
    } else if (dropDownValues == "State") {
        // var inputTypeArray;
        var inputTypeArray = data.filter(dt => dt.state === inputElement);
        greeting = `Found ${inputTypeArray.length} items.`;
        document.getElementById("results").innerHTML = greeting;
        console.log(greeting, inputTypeArray);
        return inputTypeArray;
    } else if (dropDownValues == "Date") {
        // var inputTypeArray;
        var inputTypeArray = data.filter(dt => dt.datetime === inputElement);
        greeting = `Found ${inputTypeArray.length} items.`;
        document.getElementById("results").innerHTML = greeting;
        console.log(greeting, inputTypeArray);
        return inputTypeArray;
    } else {
        greeting = `Keep trying to fix this: ${inputElement}`;
        console.log(greeting);
        return null;
    };
};

//////////////////////////////////////////////////////////
// Events, Filtering, Refreshing the page.
// implementing fuction to "submit" button.
//////////////////////////////////////////////////////////
submitButton.on("click", function() {
    // clears data of current table        
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // select the 'input' element and get the raw html node
    var inputField = d3.select("#datetime");


    // get the value property of the "input" element 
    var inputElement = inputField.property("value");
    // print "You have just clicked the 'Filter Table' on console, for testing
    console.log(`You have searched for ${inputElement}`);


    var dropDownValues = d3.select('#options').property('value');
    console.log(dropDownValues);

    // Search Option Function
    var inputTypeArray = searchOptions(data, inputElement, dropDownValues);

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
        highlight_row()
    });
});



/////////////////////////////////////////////////////////
// Map settings
//////////////////////////////////////////////////////
$(document).ready(function() {
    $('#map').usmap({
        'stateStyles': {
            fill: '#161616',
            "stroke-width": 1,
            'stroke': '#292929'
        },

        'mouseoverState': {
            'HI': function(event, data) {
                //return false;
            }
        },
    });
});
////////////////////////////////////////////
// end



///////////////////////////////////////////////////////
//  Change search label text when clicking a filter
// d3
///////////////////////////////////////////////////////

// Get events from dropdown selection ( Date )
d3.selectAll("#date_option").on("click", function() {

    var x = document.getElementById("datetime").placeholder = '1/1/2010';
    console.log(x);
    // Add filter option above input box
    var listItem = d3.select('#labels');
    var listItemText = listItem.text("Filtered by Date");
    console.log(listItemText);
});

// Get events from dropdown selection ( city )
d3.selectAll("#city_option").on("click", function() {

    var x = document.getElementById("datetime").placeholder = 'el cajon';
    console.log(x);
    // Add filter option above input box
    var listItem = d3.select('#labels');
    var listItemText = listItem.text("Filtered by City");
    console.log(listItemText);
});

// Get events from dropdown selection ( state )
d3.selectAll("#state_option").on("click", function() {

    var x = document.getElementById("datetime").placeholder = 'ca';
    console.log(x);
    // Add filter option above input box
    var listItem = d3.select('#labels');
    var listItemText = listItem.text("Filtered by State");
    console.log(listItemText);
});
/////////////////////////////////////////////////
// end


////////////////////////////////////////////////
// Hover over tr, get td state column, activate hoverover event on map
// d3/js only
/////////////////////////////////////////////////

highlight_row();
// Hover out from state selected
function releaseHover() {
    myVar = setTimeout(hoverOut, 1500);
}

// Hover out from state selected
function hoverOut() {
    // Activate Map
    $('#map').usmap('trigger', state_for_map, 'mouseout', event);
    console.log(state_for_map);
};

function activeMapHover(state_for_map) {
    $('#map').usmap('trigger', state_for_map, 'mouseover', event);
    return state_for_map;
}


function highlight_row() {
    var table = document.getElementById('target-table-display');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onmouseover = function() {
            // Get the row id where the cell exists
            var rowId = (this.parentNode.rowIndex) - 1;
            // console.log(rowId);
            var rowsNotSelected = table.getElementsByTagName('tr');
            // console.log(rowsNotSelected);
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            // rowSelected.style.backgroundColor = "yellow";
            // rowSelected.className += " selected";

            state_for_map = rowSelected.cells[2].innerHTML;
            state_for_map_activate = activeMapHover(state_for_map);
            // msg += '\nThe cell value is: ' + this.innerHTML;
            console.log(state_for_map);
            releaseHover(state_for_map);
        }
    }

}
////////////////////////////////////////////////
//end



///////////////////////////////////////////////////
// jQuery that has been replaced with d3/js only
// ////////////////////////////////////////////////
// // Change search label text when clicking a filter
// // CHANGE THIS TO d3 TAGS IF POSSIBLE .. no $
// Updated to D3/JS only above ^^
// ////////////////////////////////////////////////
// $('#date_option').click(function(event) {
//     $('#labels')
//         .text('Filter by Date:');
//     // .stop()
//     $('#datetime')
//         .text('1/1/2010')
//         .stop()
// });
// $('#city_option').click(function(event) {
//     $('#labels')
//         .text('Filter by City:')
//         .stop()
// });
// $('#state_option').click(function(event) {
//     $('#labels')
//         .text('Filter by State:')
//         .stop()
// });

/////////////////////////////////////////////////
// end


/////////////////////////////////////////////////
///// Click state column and highlight the map behind
///// KNON ISSUE:  /////////////
// After searching a date successfully, and clicking a state value, state hoverout function does not activate.
///////////////////////////////


//     var listItemText = listItem.text();
//     console.log(listItemText);
// });

// function releaseHover() {
//     myVar = setTimeout(hoverOut, 2500);
// }

// // Hover out from state selected
// function hoverOut() {
//     // Activate Map
//     $('#map').usmap('trigger', state_, 'mouseout', event);
//     console.log(state_);
// };

// /////////////////////////////////////////////////
// // continued from above
// // Click state column and highlight the map behind
// // CONVERT: To d3 
// Converted
// ////////////////////////////////////////////////

// $("tr").ready(function() {

//     $("td").click(function() {


//         $(document).on('click', 'td', function() {
//             if ($(this).find('State').length == 0) {
//                 state_ = this.innerText
//                     // state_.toUpperCase()
//                 console.log(state_);

//                 $('#map').usmap('trigger', state_, 'mouseover', event);
//                 return state_;
//             };
//         });
//         releaseHover();
//     });
// });
////////////////////////////////////////////////
//end