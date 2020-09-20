// always start with document ready
$(document).ready(() => {
  console.log("document loaded");

  // create an onclick function so button click populates the data corresponding to the city searched, then uses localstorage to store the search, then appends the searched city as a button below it
  $("#search").on("keypress", (event) => {
    // got autocomplete workaround idea from https://stackoverflow.com/questions/39883425/materialize-autocomplete-with-dynamic-data-in-jquery-ajax
    // autocomplete
    // $("#search").autocomplete({
    //     data: {
    //       "Apple": null,
    //       "Microsoft": null,
    //       "Google": 'https://placehold.it/250x250'
    //     },
    //   });

    if (event.which == 13) {
      console.log("pls work");

      event.preventDefault();
      // set up ajax call
      let APIKey = "f2bff83dc128cd28c3b9e200e1c60bc9";

      let location = $("#search").val().trim();

      let queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=" +
        APIKey +
        "&units=imperial";
      //   api.openweathermap.org/data/2.5/weather?q=Tempe&appid=f2bff83dc128cd28c3b9e200e1c60bc9
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then((response1) => {
        // console.log(queryURL);
        // console.log(response1.name);

        // use jquery to grab the following data based on city: name, the date, icon for weather conditions, wind speed, humidity, UV index, and temp
        $("#cityName").text("City: " + response1.name);
        // $("#todaysDate").text("" + response1);
        // $("#condIcon").text(response1);
        $("#windSpeed").text("Wind Speed: " + response1.wind.speed + "mph");
        $("#humidity").text("Humidity: " + response1.main.humidity + "%");
        // $("#uvIndex").text("UV Index: " + response1);
        $("#temp").text("Temp: " + response1.main.temp + "℉");

        // need to append most recent search 
        let a = $("<li>");

        a.addClass("collection-item");

        a.text($("#search").val());

        $(".collection").append(a);

        $("#search").val("");
      });

      // create ajax call for 5 day forecast data based on location

      let APIKey2 = "f2bff83dc128cd28c3b9e200e1c60bc9";

      let queryURL2 =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        location +
        "&appid=" +
        APIKey2 +
        "&units=imperial";

      $.ajax({
        url: queryURL2,
        method: "GET",
      }).then((response2) => {
        // console.log(queryURL);
        console.log(response2);

        // $("#day1").text("" + response2);
        // $("#day2").text("" + response2);
        // $("#day3").text("" + response2);
        // $("#day4").text("" + response2);
        // $("#day5").text("" + response2);
      });

      // -----------------------------------------------------------
    }
  });

  // use localStorage to save last search and append to html as clickable button to review it's respective data

  // declare a variable for the UV index which will present a color indicating conditions (favorable, moderate, severe)
  let UVindex = "";

  // declare a variable for the future weather conditions
  let futureConditions = "";

  // --------------------------------------------------------------------

  // --------------------------------------------------------------------

  // set browser to open with last searched city's data using localStorage memory

  // create an onclick function which clears localStorage (clear history)
  $("#clearHistory").on("click", () => {
    $(".collection").empty();
  });

  // need to declare a variable for recent search
  let recentSearchOption = "";

  // need to give newly created recent searches onclick function
  $("#recentSearchOption").on("click", () => {});
});
