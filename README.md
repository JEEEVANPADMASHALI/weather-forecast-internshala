
# Weather Forecast Application

## **Project Overview**
This weather forecast application provides real-time weather updates and extended forecasts for any location. Built using JavaScript, HTML, CSS, and Tailwind CSS, it integrates the OpenWeatherMap API to display accurate and user-friendly weather data. Key features include location-based forecasts, current weather conditions, and a 5-day extended forecast.

---

## **Features**

### **Core Features**
- **Search by City**: Retrieve weather information by entering a city name.
- **Current Location Support**: Automatically fetch weather data based on the user’s location.
- **Recent Searches Dropdown**:
  - Stores recent searches (searched via input box).
  - Allows users to quickly revisit recent city forecasts.
- **Current Weather Display**:
  - Temperature
  - Humidity
  - Wind Speed
  - Weather Icons representing conditions (e.g., sunny, cloudy).
- **5-Day Forecast**: Provides extended forecasts with date, temperature, humidity, wind speed, and weather icons.

### **Additional Features**
- **Responsive Design**: Optimized for desktop, iPad Mini, and iPhone SE.
- **Error Handling**: Displays appropriate error messages for invalid inputs or API errors.

---

## **Technologies Used**

- **Frontend**:
  - HTML
  - CSS
  - Tailwind CSS for styling
- **Backend/Integration**:
  - JavaScript
  - OpenWeatherMap API for weather data

---

## **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd weather-forecast-app
   ```

3. **Open the Application**:
   - Simply open `index.html` in a web browser to view the application.

---

## **Usage Guide**

1. **Search for a City**:
   - Enter a city name in the search box and press Enter or click the search button.
   - The current weather and 5-day forecast will appear.

2. **Use Current Location**:
   - Click the "Current Location" button to fetch weather data for your current location.

3. **Dropdown for Recent Searches**:
   - If a city is searched via the search box, it gets added to the dropdown.
   - Click any city in the dropdown to update the displayed weather data.

4. **View Extended Forecast**:
   - Scroll down to view the 5-day forecast with detailed weather information.

---

## **Screenshots**

### **Search Results**



## **Known Issues**
- Current location searches do not add to the recent searches dropdown.
- Recent searches are not persistent (not stored in localStorage).

---

## **Future Enhancements**
- Add localStorage support for persisting recent searches.
- Include hourly weather forecasts for more granular data.
- Improve UI/UX with animations and transitions.

---

## **Credits**
- **Weather API**: [OpenWeatherMap](https://openweathermap.org/)
- **Icons**: Weather condition icons provided by OpenWeatherMap.
- **Styling**: Tailwind CSS for responsive design.

---

## **License**
This project is licensed under the MIT License. See the LICENSE file for details.
