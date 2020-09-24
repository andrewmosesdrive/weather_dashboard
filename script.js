$(document).ready(() => {
  // create global constant for local storage passing city key
  const loadLocal = window.localStorage.getItem("city")
  // run main search to load page with last search
  mainSearchFunction(loadLocal)
  // console.log("document loaded");

  // autocomplete 
  // $(function () {
  //   let APIKey = "f2bff83dc128cd28c3b9e200e1c60bc9";
  //   let location = $("#search").val().trim();
  //   let queryURL =
  //     "https://api.openweathermap.org/data/2.5/weather?q=" +
  //     location +
  //     "&appid=" +
  //     APIKey +
  //     "&units=imperial";

  // got autocomplete workaround idea from https://stackoverflow.com/questions/39883425/materialize-autocomplete-with-dynamic-data-in-jquery-ajax

  //   $.ajax({
  //     url: queryURL,
  //     method: "GET",
  //     success: function (res) {
  //       let cityArray = res;
  //       console.log(res);
  //       let dataCity = {};
  //       for (let i = 0; i < cityArray.length; i++) {
  //         dataCity[cityArray[i].name] = cityArray[i];
  //       }
  //       $("input.autocomplete").autocomplete({
  //         data: dataCity,
  //         limit: 3,
  //       });
  //       console.log(dataCity);
  //     },
  //   });
  // });

  // create an onclick function so button click populates the data corresponding to the city searched
  $("#search").on("keypress", (event) => {
    if (event.which == 13) {
      // console.log("pls work");
      event.preventDefault();
      mainSearchFunction($("#search").val());
    }
  });

  // create an onclick function which clears visible search history
  $("#clearHistory").on("click", () => {
    $(".collection").empty();
  });

});

// main search function for all ajax calls, pass city to store locally for reload on last
function mainSearchFunction(city) {
  // clear old 5 day forecast
  $("#dynamic-5-day").empty();

  // current date variable
  let dateVar = moment().format("dddd");
  // console.log(dateVar)

  // set local storage, key city val city
  window.localStorage.setItem("city", city)

  // set up ajax call
  let APIKey = "f2bff83dc128cd28c3b9e200e1c60bc9";
  let location = city;
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    APIKey +
    "&units=imperial";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response1) => {
    // console.log(queryURL);
    console.log(response1.name);

    // UV API for UV index
    let uvIndexCall =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      response1.coord.lat +
      "&lon=" +
      response1.coord.lon;
    // console.log(uvIndexCall);

    // ajax call for UV index
    $.ajax({
      url: uvIndexCall,
      method: "GET",
    }).then((responseUV) => {
      // console.log(responseUV)
      $("#uvIndex").text("UV Index: " + responseUV.value);

      if (responseUV.value < 3) {
        $("#uvIndex").addClass("badge green");
      } else if (responseUV.value >= 3 && responseUV.value < 6) {
        $("#uvIndex").addClass("badge yellow darken-2");
      } else if (responseUV.value >= 6) {
        $("#uvIndex").addClass("badge red darken-2");
      }
    });

    // ajax outputs and update text
    $("#cityName").text("City: " + response1.name);
    $("#todaysDate").text(dateVar);
    $("#windSpeed").text("Wind Speed: " + response1.wind.speed + "mph");
    $("#humidity").text("Humidity: " + response1.main.humidity + "%");
    $("#temp").text("Temp: " + response1.main.temp + "℉");

    // Append most recent searches unless you're clicking on a recent search
    if (!$("#search").val()) {
      return;
    }
    let a = $("<li>");
    a.addClass("collection-item red lighten-2 white-text");
    a.text($("#search").val());
    a.click(() => mainSearchFunction(a.text()));
    $(".collection").prepend(a);
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

    // create new var for list
    let list = response2.list;
    // for loop to go through dates
    for (let i = 0; i < list.length; i += 8) {

      // re-assign dateVar for the 5 day forecast and use moment to format the response to get the specific days. created with help from @daneburns
      dateVar = moment(list[i].dt_txt.replace(" 00:00:00", "")).format("dddd");
      console.log(list[i].dt_txt)
      // console.log(dateVar)

      // create variable for future conditions
      // template literal with string interpolation created with assistance from @alligatormonday
      let futureConditions = `<div class="col card-panel hoverable teal" id"card-margin">
      <span class="white-text"
      <p id="current-day">${dateVar}</p>       
      <img src="https://openweathermap.org/img/wn/${list[i].weather[0].icon}@2x.png"/>
      <p>Temp: ${list[i].main.temp}℉</p>
      <p>Humidity: ${list[i].main.humidity}%</p>
      </span>
      </div>`;
      // console.log(futureConditions);

      $("#dynamic-5-day").append(futureConditions);
    }
  });

  // -----------------------------------------------------------
}
