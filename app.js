const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const cityDropdown = document.querySelector("#city-dropdown");
const weatherDataDiv = document.querySelector(".weather-data"); // Select weather data div

const API_KEY = "8bff56bd423b1d9f00936f0a56ec31f2"; // API Key

// Load the last 5 searches from session storage
const loadSearchHistory = () => {
  const history = JSON.parse(sessionStorage.getItem("searchHistory")) || [];
  cityDropdown.innerHTML = `<option value="" disabled selected>Recent Search</option>`; // Default option
  if (history.length > 0) {
    history.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      cityDropdown.appendChild(option);
    });
    cityDropdown.classList.remove("hidden"); // Show dropdown after search history is loaded
  } else {
    cityDropdown.classList.add("hidden"); // Hide if there's no history
  }
};

// Update session storage with new search history
const updateSearchHistory = (city) => {
  let history = JSON.parse(sessionStorage.getItem("searchHistory")) || [];

  // Removinhg the city if it's already in the history to avoid duplicates
  history = history.filter((item) => item !== city);

  // Add the city to the beginning of the array
  history.unshift(city);

  // Keep only the last 5 searches
  if (history.length > 5) {
    history.pop();
  }

  // Save the updated history back to session storage
  sessionStorage.setItem("searchHistory", JSON.stringify(history));

  // Reload the dropdown with updated search history
  loadSearchHistory();
};

// Create weather card
const createWeatherCard = (cityName, weatherItem, index) => {
  //current weather details
  if (index === 0) {
    return `
      <div class="details">
        <h2 class="text-[1.7rem] sm:text-lg md:text-xl">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
        <h4 class="mt-3 text-base font-medium" >Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
        <h4 class="mt-3 text-base font-medium" >Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4 class="mt-3 text-base font-medium" >Humidity: ${weatherItem.main.humidity}%</h4>
      </div>
      <div class="icon text-center">
        <img class="max-w-[120px] -mt-4"  src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
        <h4 class="-mt-2 capitalize">${weatherItem.weather[0].description}</h4>
      </div>`;
  } else {
    // 5 day weather details
    return `
      <li class="cards list-none text-white p-4 rounded-md bg-[#609ed3] w-full sm:w-[calc(50%-10px)] md:w-[calc(100%/5)] shadow-md shadow-[#3c3c41] border border-[#609ed3] ">
        <h2 class="text-[1.5rem] sm:text-[1.1rem] md:tex-[1.2rem]" >${weatherItem.dt_txt.split(" ")[0]}</h2>
        <img class="max-w-[70px] my-1 mt-1 mb-[-12px]" src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
        <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
        <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
      </li>`;
  }
};

// Fetch weather details
const getWeatherDetails = (cityName, lat, lon, isGeolocation = false) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      cityInput.value = "";
      weatherCardsDiv.innerHTML = "";
      currentWeatherDiv.innerHTML = "";

      fiveDaysForecast.forEach((weatherItem, index) => {
        if (index === 0) {
          currentWeatherDiv.innerHTML = createWeatherCard(cityName, weatherItem, index);
        } else {
          weatherCardsDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, weatherItem, index)
          );
        }
      });

      // Show the weather data div
      weatherDataDiv.classList.remove("hidden");

      // Update the search history with the city name if not using geolocation
      if (!isGeolocation) updateSearchHistory(cityName);
    })
    .catch(() => {
      alert("An error occurred while fetching the weather forecast.");
    });
};

// Fetch city coordinates
const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  
  // Check if the input is empty
  if (!cityName) {
    alert("Please enter a city name before searching.");
    return;
  }

  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error occurred while fetching coordinates.");
    });
};


// Get user's coordinates
const getUserCoordinates = () => {
  if (!navigator.geolocation) return alert("Geolocation is not supported.");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherDetails("Your Location", latitude, longitude, true);
    },
    () => {
      alert("Unable to retrieve location.");
    }
  );
};

// Event Listeners
searchButton.addEventListener("click", getCityCoordinates);
locationButton.addEventListener("click", getUserCoordinates);

// Event listener for selecting from dropdown
cityDropdown.addEventListener("change", (e) => {
  const cityName = e.target.value;
  if (!cityName) return;

  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error occurred while fetching coordinates.");
    });
});

// Load initial search history
loadSearchHistory();
