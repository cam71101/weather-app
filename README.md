<h1 align="center">Weather City App</h1>
<h2 align="center">

<p align="center">
<img src="https://img.shields.io/badge/madeby-cam71101-green" />
<img src="https://img.shields.io/github/languages/top/cam71101/weather-app" />
<img src="https://img.shields.io/github/last-commit/cam71101/weather-app" />
<a href="https://twitter.com/d_fisherWebDev" alt="twitter">
<img src="https://img.shields.io/twitter/follow/d_fisherWebDev?style=social" />
</a>
<img src="https://img.shields.io/badge/react-17.0.1-green" />
</p>

<h2 align="center"><a  href="https://cam71101.github.io/weather-app/">Live Demo</a></h2>

## Description

<h2 align="center"><a  href="https://d-fisher.com/weather-city-app">CLICK HERE FOR FULL PROJECT BREAKDOWN</a></h2>

<p align="center">
<img src="https://res.cloudinary.com/dndp8567v/image/upload/v1608667951/WeatherAppDesktop_e19956018e.gif" />
</p>

Weather City App allows users to enter a city name and receive current weather data using the <a href="https://openweathermap.org/api"> OpenWeatherMap API.</a>

All cities with the specified name are displayed, and a temperature unit toggle is available to switch between Celsius and Fahrenheit.

## Tecnologies Used

- React & Javascript
- SASS
- Git & Github

## Main Features

- Responsive design
- Search for weather data
- Displays different coloured cards and weather icons dependant on the weather

## Technical details

An example of array iteration and converting the response data into displayable information. Full script <a href="https://github.com/cam71101/weather-app/blob/ea60d4804585279221b926ec67b19f9aa510d9e7/src/containers/Results/Results.js#L96-L122"> here </a>.

```javascript
useEffect(() => {
  (function convertWeather() {
    if (weatherData) {
      const weather = () => {
        return {
          visibility: null,
          wind: null,
          sunrise: null,
          humidity: null,
          clouds: null,
          sunset: null,
          temp: null,
          icon: null,
          flag: null,
          country: null,
          name: null,
          description: null,
        };
      };

      const weatherArray = [];

      for (let i = 0; i < weatherData.length; i++) {
        weatherArray.push(weather());
      }

      let count = 0;
      weatherData.forEach((newWeather) => {
        weatherArray[count].country = newWeather.sys.country;
        weatherArray[count].name = newWeather.name;
        weatherArray[count].description = newWeather.weather[0].description;
        weatherArray[count].temp = newWeather.main.temp;
        weatherArray[count].visibility = convertVisibility(
          newWeather.visibility
        );
        weatherArray[count].speed = convertWindSpeed(newWeather.wind.speed);
        weatherArray[count].sunrise = convertTime(
          newWeather.sys.sunrise,
          newWeather.sys.timezone
        );
        weatherArray[count].humidity = convertPercentage(
          newWeather.main.humidity
        );
        weatherArray[count].clouds = convertPercentage(newWeather.clouds.all);
        weatherArray[count].sunset = convertTime(
          newWeather.sys.sunset,
          newWeather.sys.timezone
        );
        weatherArray[count].icon = convertIcon(newWeather.weather[0].icon);
        weatherArray[count].flag = convertFlag(newWeather.sys.country);
        weatherArray[count].wind = convertWindSpeed(newWeather.wind.speed);
        ++count;
      });

      loadResults(weatherArray);
    }
  })();
}, [weatherData, loadResults]);
```

## Responsive Design

<p align="center">
<img src="https://res.cloudinary.com/dndp8567v/image/upload/v1608667951/WeatherAppResponsive_d9cffe6537.gif" />
</p>

## Project setup

```
npm install
npm start
```
