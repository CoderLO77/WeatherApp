function formatDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  return ` ${currentDay} ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;
}
let currentTime = document.querySelector("#current-time");
let currentDate = new Date();
currentTime.innerHTML = formatDate(currentDate);

function showForecast(response){
  let forecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if (index<8){
  forecastHTML=
  forecastHTML+
  `
        <div class="col-3">
        <div class="weather-forecastdate">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt=""
            width="40"
            />
            <div class="weather-forecasttemp">
           <span>${Math.round(forecastDay.temp.max)}°</span>|<span>${Math.round(forecastDay.temp.min)}°</span>
       </div>
       </div>
       `;
  }
  });
       forecastHTML=forecastHTML+ `</div>`;
       forecastElement.innerHTML=forecastHTML;
      
}

function getForecast(coordinates){
  let apiKey="0ab851116d25275147c4636ad9ba56ee";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}`;
  let h2 = document.querySelector("#city");
  h2.innerHTML = `${response.data.name}`;
 
  fahrenheitTemperature=response.data.main.temp
  
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let descriptionElement=document.querySelector("#description");
  let iconElement=document.querySelector("#icon");
  let forecastElement=document.querySelector("#forecast");
  humidityElement.innerHTML=response.data.main.humidity;
  windElement.innerHTML= Math.round(response.data.wind.speed);
  descriptionElement.innerHTML= response.data.weather[0].description;
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord)
   }

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0ab851116d25275147c4636ad9ba56ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  searchInput.innerHTML = cityInput.value;
  search(cityInput.value);
}


function search(city) {
  let apiKey = "0ab851116d25275147c4636ad9ba56ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showTemperature);
}
  
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getLocation);

function showCelsiusTemperature(event){
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement=document.querySelector("#temp");
  let celsiusTemperature=(fahrenheitTemperature-32)*5/9;
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}


function showFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement=document.querySelector("#temp");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature= null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

search("Austin");


