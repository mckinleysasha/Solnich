function displayTemp(response) {
    const temperatureElement = document.querySelector("h1.main-temp");
    const temperature = Math.round(response.data?.temperature?.current || 0); // Fallback to 0 if undefined
    const mainCity = document.querySelector("#city");
    const descriptionElement = document.querySelector("#description");
    const humidityElement = document.querySelector("#humidity");
    const windElement = document.querySelector("#wind");
    const timeElement = document.querySelector("#time");
    const date = new Date(response.data?.time * 1000 || Date.now()); // Fallback to current time if undefined
    const iconElement = document.querySelector("#icon");

    // Check if the condition and icon are available
    if (response.data?.condition?.icon_url) {
        iconElement.innerHTML = <img src="${response.data.condition.icon_url}" class="main-temp-icon" alt="Weather icon" />;
    }

    // Use fallback values to avoid issues if data is missing
    mainCity.textContent = response.data?.city || "Unknown City";
    descriptionElement.textContent = response.data?.condition?.description || "No description available";
    humidityElement.textContent = ${response.data?.temperature?.humidity || 0}%;
    windElement.textContent = ${response.data?.wind?.speed || 0} m/s;
    timeElement.textContent = formatDate(date);
    temperatureElement.textContent = temperature;
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
