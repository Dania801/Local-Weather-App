var currentSun = 'pe-is-w-sun-1 pe-4x pe-va' ;
var currentRain = 'pe-is-w-rain-1 pe-4x pe-va' ;
var currentSnow = 'pe-is-w-snow pe-4x pe-va' ;
var currentCloud = 'pe-is-w-mostly-cloudy-1 pe-4x pe-va';
var currentThunder = 'pe-is-w-severe-thunderstorm pe-4x pe-va' ;
var currentMist = 'pe-is-w-wind-2 pe-4x pe-va';
var forecastRain = 'pe-is-w-rain-1 pe-lg pe-va' ;
var forecastSnow = 'pe-is-w-snow pe-lg pe-va' ;
var forecastCload = 'pe-is-w-mostly-cloudy-1 pe-lg pe-va' ;
var forecastThunder = 'pe-is-w-severe-thunderstorm pe-lg pe-va';
var forecastMist = 'pe-is-w-wind-2 pe-lg pe-va' ;
var forecastSun = 'pe-is-w-sun-1 pe-lg pe-va';
var humidityIcon = 'pe-is-w-drop-percentage' ;
var windIcon = 'pe-is-w-compass' ;


function getLocation(){
  $.get("https://ipinfo.io", function(response) {
      $("#location-div").html('<span id = "city">'+response.city + ", " + response.country + '</span>');
  }, "jsonp");
};

function getCurrentWeather(){
  var latitude = "" ;
  var longitude = "" ;
  var apiKey = "a16eb1572f324d317071bf9107b6183d";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude ;
      longitude = position.coords.longitude;

      var currentQuery = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

      $.getJSON(currentQuery).then(function(weather) {
        var currentTemp = weather.main.temp;
        var currentHumidity = weather.main.humidity ;
        var currentDesc = weather.weather[0].description ;
        var currentIcon = weather.weather[0].icon ;
        var currentWind = weather.wind.speed ;

        displayCurrentWeatherInFehren(currentTemp , currentHumidity , currentWind , currentDesc , currentIcon);
      });
    })
  }
};

function getCurrentWeatherInCilicius(){
  var latitude = "" ;
  var longitude = "" ;
  var apiKey = "5526d9f78b114e09666772228def5897";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude ;
      longitude = position.coords.longitude;

      var currentQuery = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=Imperial" + "&APPID=" + apiKey;

      $.getJSON(currentQuery).then(function(weather) {
        var currentTemp = weather.main.temp;
        var currentHumidity = weather.main.humidity ;
        var currentDesc = weather.weather[0].description ;
        var currentIcon = weather.weather[0].icon ;
        var currentWind = weather.wind.speed ;

        displayCurrentWeather(toCilicius(currentTemp) , currentHumidity , currentWind , currentDesc , currentIcon);
      });
    })
  }
};

function getForecastInCilicius(){
  var latitude = "" ;
  var longitude = "" ;
  var apiKey = "5526d9f78b114e09666772228def5897";

  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude ;
    longitude = position.coords.longitude;

    var currentForecast = "http://api.openweathermap.org/data/2.5/forecast?lat="+ latitude + "&lon=" + longitude + "&units=Imperial" + "&APPID=" + apiKey;

      $.getJSON(currentForecast).then(function(weather) {

        var div = document.getElementById('forecast-div');
        var tbl  = document.createElement('table');

        $('#forecast-div').empty();

        for(var i = 7 ; i < weather.list.length ; i+=8){
          var tr = tbl.insertRow();
          var newTemp = toCilicius(weather.list[i].main.temp) ;
          var newDesc = weather.list[i].weather[0].description;
          var newDate = weather.list[i].dt_txt ;
          var newIcon = weather.list[i].weather[0].icon ;
          var newWind = weather.list[i].wind.speed;
          var newHumidity = weather.list[i].main.humidity ;

          var dateStr = newDate.split("-");
          var actualDate1 = dateStr[1]+"/"+dateStr[2] ;
          var actualDate2 = actualDate1.split(" ") ;

          var td5 = tr.insertCell();
          td5.style.fontSize = '20px' ;
          td5.innerHTML =  '<span style="font-size:25px; color:#4CAF50;">' + actualDate2[0] + '</span>' ;

          var td1 = tr.insertCell();
          td1.style.fontSize = '20px' ;
          td1.innerHTML = newTemp + " &deg;C";

          var td6 = tr.insertCell();
          td6.style.fontSize = '20px';
          td6.innerHTML = '<span class="'+chooseForecastIcon(newIcon)+'"></span>' ;

          var td2 = tr.insertCell();
          td2.style.fontSize = '20px' ;
          td2.innerHTML = newWind + '<span style="font-size:12px; color:lightblue"> mph </span>' ;

          var td3 = tr.insertCell();
          td3.style.fontSize = '20px' ;
          td3.innerHTML = newHumidity + '<span style="font-size:12px;color:orange"> %</span>' ;


          var td4 = tr.insertCell();
          td4.style.fontWeight = 'bold';
          td4.appendChild(document.createTextNode(newDesc));
        }
        div.appendChild(tbl);
      });
    });
  }
}

function getForecastInFehren(){

  var latitude = "" ;
  var longitude = "" ;
  var apiKey = "5526d9f78b114e09666772228def5897";

  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude ;
    longitude = position.coords.longitude;

    var currentForecast = "http://api.openweathermap.org/data/2.5/forecast?lat="+ latitude + "&lon=" + longitude + "&units=Imperial" + "&APPID=" + apiKey;

      $.getJSON(currentForecast).then(function(weather) {

        var div = document.getElementById('forecast-div');
        var tbl  = document.createElement('table');
        tbl.setAttribute("id" , "myTable") ;

        $('#forecast-div').empty();

        for(var i = 7 ; i < weather.list.length ; i+=8){
          var tr = tbl.insertRow();
          var newTemp = weather.list[i].main.temp ;
          var newDesc = weather.list[i].weather[0].description;
          var newWind = weather.list[i].wind.speed;
          var newHumidity = weather.list[i].main.humidity ;
          var newIcon = weather.list[i].weather[0].icon ;
          var newDate = weather.list[i].dt_txt ;

          var dateStr = newDate.split("-");
          var actualDate1 = dateStr[1]+"/"+dateStr[2] ;
          var actualDate2 = actualDate1.split(" ") ;

          var td5 = tr.insertCell();
          td5.style.fontSize = '20px' ;
          td5.innerHTML =  '<span style="font-size:25px; color:#4CAF50;">' + actualDate2[0] + '</span>' ;

          var td1 = tr.insertCell();
          td1.style.fontSize = '20px' ;
          td1.appendChild(document.createTextNode(newTemp));
          td1.innerHTML = newTemp + " &deg;F";

          var td6 = tr.insertCell();
          td6.style.fontSize = '20px';
          td6.innerHTML = '<span class="'+chooseForecastIcon(newIcon)+'"></span>' ;


          var td2 = tr.insertCell();
          td2.style.fontSize = '20px' ;
          td2.innerHTML = newWind + '<span style="font-size:12px;color:lightblue"> mph </span>' ;


          var td3 = tr.insertCell();
          td3.style.fontSize = '20px' ;
          td3.innerHTML = newHumidity + '<span style="font-size:12px;color:orange"> %</span>' ;


          var td4 = tr.insertCell();
          td4.style.fontWeight = 'bold';
          td4.appendChild(document.createTextNode(newDesc));
        }
        div.appendChild(tbl);
      });
    });
  }
};

function displayCurrentWeather(temp , humidity , wind , desc ,icon){
    $("#temp-div").html('<span class="'+chooseCurrentIcon(icon)+'"></span></br></br>'
                        +temp + '&deg;C <br/><span class="'
                        + humidityIcon+'"></span> <span style="font-size:20px;">'
                        +humidity + '%</span><br/><span class="'
                        +windIcon+'"></span><span style="font-size:20px;"> '
                        +wind+'</span></br>'
                        +desc) ;
};

function displayCurrentWeatherInFehren(temp , humidity , wind , desc , icon){
  $("#temp-div").html('<span class="'+chooseCurrentIcon(icon)+'"></span></br></br>'
                      +temp + '&deg;F <br/><span class="'
                      + humidityIcon+'"></span> <span style="font-size:20px;">'
                      +humidity + '%</span><br/><span class="'
                      +windIcon+'"></span><span style="font-size:20px;"> '
                      +wind+'</span></br>'
                      +desc) ;
}

function chooseCurrentIcon(iconID){
  var actualIcon = "" ;
  switch (iconID) {
    case "01n":
      actualIcon = currentSun ;
      break;
    case "02n":
    case "03n":
    case "04n":
      actualIcon = currentCloud ;
      break ;
    case "09n":
    case "10n":
      actualIcon = currentRain ;
      break ;
    case "11n":
      actualIcon = currentThunder ;
      break ;
    case "50n":
      actualIcon = currentMist ;
      break ;
    default:
      actualIcon = currentSun ;
  };

  return actualIcon ;
};

function chooseForecastIcon(iconID){
  var actualIcon = "" ;
  switch (iconID) {
    case "01n":
      actualIcon = forecastSun ;
      break;
    case "02n":
    case "03n":
    case "04n":
      actualIcon = forecastCloud ;
      break ;
    case "09n":
    case "10n":
      actualIcon = forecastRain ;
      break ;
    case "11n":
      actualIcon = forecastThunder ;
      break ;
    case "50n":
      actualIcon = forecastMist ;
      break ;
    default:
      actualIcon = forecastSun ;
  };

  return actualIcon ;
}

function toCilicius(fehr){
  return Math.round(((fehr-32)*5)/9) ;
};

function toFahrenheit(celc){
  return Math.round((celc*9)/5)+32 ;
};

function convertToCilicius(){
  getCurrentWeatherInCilicius() ;
  getForecastInCilicius() ;
};

function convertToFehren(){
  getCurrentWeather() ;
  getForecastInFehren() ;
};

$(document).ready(function(){
  getLocation() ;
  getCurrentWeather() ;
  getForecastInFehren() ;
});
