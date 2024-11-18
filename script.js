function displayTemp(response) {
  let temperatureElement = document.querySelector("h1.main-temp");
  let temperature = Math.round(response.data.temperature.current);
  let mainCity = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");



  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="main-temp-icon" />`;
  mainCity.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = temperature;
}

function formatDate(date) {
  let hour = date.getHours();
  let min = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday", 
];
  let day = days[date.getDay()];

  if (min < 10) {
    min = `0${min}`;
  }
  function formatHourMin(hour, min, day) {
  if (hour < 10) {
    hour = 0${hour};
  }
  if (min < 10) {
    min = 0${min};
  }

  return ${day} ${hour}:${min};
}

function displayTemp(response) {
  const data = response.data;
  const hour = new Date(data.time * 1000).getHours();
  const min = new Date(data.time * 1000).getMinutes();
  const day = new Date(data.time * 1000).toLocaleDateString();

  const formattedTime = formatHourMin(hour, min, day);
  console.log(formattedTime);  // Display formatted time in console
}

function searchCity(city) {
  let apiKey = "746babd709fa838800e3o4f3b7ad9dc66f5t7fac3d";
  let apiUrl = https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey};
  axios.get(apiUrl).then(displayTemp);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", changeCity);

// Initial call to searchCity with a default city
searchCity("Athens");
