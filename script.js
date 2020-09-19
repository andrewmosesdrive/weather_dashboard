// always start with document ready
$(document).ready(() => {
    console.log("document loaded");

    // set up ajax call 
    let APIKey = "";

    let location = "";

    let queryURL = "" + location + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then( (response) => {

        console.log(queryURL);

        console.log(response);
    })

    // -----------------------------------------------------------

    // use jquery to grab the following data based on city: name, the date, icon for weather conditions, wind speed, humidity, UV index, and temp
    $("#cityName").text("" + response);
    $("#todaysDate").text("" + response);
    $("#condIcon").text("" + response);
    $("#windSpeed").text("" + response);
    $("#humidity").text("" + response);
    $("#uvIndex").text("" + response);
    $("#temp").text("" + response);


    // use localstorage to save last search and append to html as clickable button to review it's respective data

    // declare a variable for the UV index which will present a color indicating conditions (favorite, moderate, severe)
    let UVindex = "";

    // declare a variable for the future weather conditions
    let futureCondtions = "";

    // --------------------------------------------------------------------
    // create ajax call for 5 day forecast data based on location
  
    let APIKey = "";

    let location = "";

    let queryURL = "" + location + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then( (response) => {

        console.log(queryURL);

        console.log(response);
    })

    // --------------------------------------------------------------------


    // create an onclick function so button click populates the data corresponding to the city searched, then uses localstorage to store the search, then appends the searched city as a button below it
    $("#search").on("click", () => {



    });

    // set browser to open with last searched city's data using localstorage memory

    // create an onclick function which clears localstorage (clear history)
    $("#clearHistory").on("click", () => {
        localStorage.clear();
    });

    
    // need to declare a variable for recent search 
    let recentSearchOption = "";

    // need to give newly created recent searches onclick function
    $("#recentSearchOption").on("click", () => {

    })












})