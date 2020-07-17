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


// document.addEventListener('DOMContentLoaded', function(e) {
//     FormValidation.formValidation(
//         document.getElementById('form'), {
//             fields: {
//                 birthday: {
//                     validators: {
//                         date: {
//                             format: 'D/M/YYYY',
//                             message: 'The value is not a valid date',
//                         }
//                     }
//                 },
//             },
//             plugins: {
//                 trigger: new FormValidation.plugins.Trigger(),
//                 bootstrap: new FormValidation.plugins.Bootstrap(),
//                 submitButton: new FormValidation.plugins.SubmitButton(),
//                 icon: new FormValidation.plugins.Icon({
//                     valid: 'fa fa-check',
//                     invalid: 'fa fa-times',
//                     validating: 'fa fa-refresh'
//                 }),
//             },
//         }
//     );
// });

/////////////////////////////////////////////////////////
//
// Search Option Verification
// 
/////////////////////////////////////////////////////////
function searchOptions(data, inputElement, dropDownValues) {
    var greeting;
    if (inputElement === '') {
        greeting = "Nothing Found.";
        console.log(greeting);
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




    // use the "field input" to filter the data by "date" only
    // var inputTypeArray = data.filter(dt => dt.datetime === inputElement);
    var inputTypeArray = searchOptions(data, inputElement, dropDownValues);

    // display in the html file (append it at the end, after displaying all original data)
    inputTypeArray.forEach((selection) => {
        // for each "element" create a row
        var row = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selection).forEach(([key, value]) => {
            var cell = row.append("td");

            ///////////////////
            ///////////////////


            // adds the "value" to each row in the table
            cell.text(value);
        });
    });
});




// Map settings
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



// TEST


// function hoverMap() {
//     // Select table body
//     myTable = document.getElementsByTagName("tbody")[0];
//     console.log(myTable);
//     // now, get all the p elements that are descendants of the body
//     trs = myTable.getElementsByTagName("tr");
//     console.log(trs);

//     // now, get all the p elements that are descendants of the body
//     tds = trs.getElementsByTagName("td");
//     console.log(tds);

//     // Find the State
//     state_map = tds[2].textContent;
//     console.log(state_map);
//     tds.forEach(obj => {
//         // for each "element" in the object create a row
//         // Element includes dict key and values being selected and added to single row.
//         var tRow = tds[2].textContent;
//         // "Object" becomes the targetet array (element)
//         // Entries obtains everything in object and can be looped through with key,value
//         Object.entries(obj).forEach(([key, value]) => {
//             // Test key,value
//             var state_map = tRow;
//             // Add the "value" to each row in the table
//             // Calling .text requests the string passing the value of object in tData.
//             tData.text(state_map);
//         });
//     });


// // Activate Map
// $('#map').usmap('trigger', state_map, 'mouseover', event);
// console.log(state_map)
// return state_map

// $('#td').mouseover(function(event) {
//             $('#map').usmap('trigger', 'CA', 'mouseover', event);
// });

// TEST

///////////////////////////////////////////////////////
// Click state in table, highlight state in background
///////////////////////////////////////////////////////

function releaseHover() {
    myVar = setTimeout(hoverOut, 1500);
}

// Hover out from state selected
function hoverOut() {
    // Activate Map
    $('#map').usmap('trigger', state_, 'mouseout', event);
    console.log(state_);
};

///// FIX LATER /////////////
d3.selectAll("tr").on("click", function() {
    // you can select the element just like any other selection
    var listItem = d3.select(this);
    console.log(d3.select('tr:nthChild'));
    // listItem.style("color", "blue");

    var listItemText = listItem.text();
    console.log(listItemText);
});


/////////////////////////////////////////////////
// Click state column and highlight the map behind
// CONVERT: To d3 
////////////////////////////////////////////////
$("tr").ready(function() {
    $("td").click(function() {


        $(document).on('click', 'td', function() {
            if ($(this).find('State').length == 0) {
                state_ = this.innerText
                    // state_.toUpperCase()
                console.log(state_);

                $('#map').usmap('trigger', state_, 'mouseover', event);
                return state_;
            };
        });
        releaseHover();
    });
});


////////////////////////////////////////////////
//end

////////////////////////////////////////////////
// Change search label text when clicking a filter
// CHANGE THIS TO d3 TAGS IF POSSIBLE .. no $$
////////////////////////////////////////////////
$('#date_option').click(function(event) {
    $('#labels')
        .text('Search by Date:')
        .stop()
});
$('#city_option').click(function(event) {
    $('#labels')
        .text('Search by City:')
        .stop()
});
$('#state_option').click(function(event) {
    $('#labels')
        .text('Search by State:')
        .stop()
});

/////////////////////////////////////////////////
// end