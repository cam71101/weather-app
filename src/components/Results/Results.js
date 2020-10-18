import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import Result from './Result/Result';
import useHttp from '../../hooks/http';

import cities from '../../JSON/current.city.list.min.json';
import * as actionTypes from '../../store/actions';
import { Fade, Stagger } from 'react-animation-components';

import classes from './Results.module.css';

import LoadingWheel from '../LoadingWheel/LoadingWheel';
import FadeIn from 'react-fade-in';

const Results = (props) => {
  const { sendRequest, weatherData, isLoading } = useHttp();
  const [loading, setLoading] = useState(false);
  const [convertedWeather, setConvertedWeather] = useState();
  const [error, setError] = useState(false);
  const [convertedTemperature, setConvertedTemperature] = useState();
  const [firstLoad, setFirstLoad] = useState(true);
  const { temp, loc } = props;

  useEffect(() => {
    setLoading(true);
    function filterLocation() {
      const filteredLocation = cities.filter((city) => city.name === loc);
      if (filteredLocation.length !== 0) {
        setError(false);
        fetchLocation(filteredLocation);
      } else {
        setError(true);
      }
    }
    const fetchLocation = (filteredLocations) => {
      const filteredLocationsIDs = [];
      filteredLocations.forEach((location) => {
        filteredLocationsIDs.push(location.id);
      });
      const filteredLocationsIDsConcat = filteredLocationsIDs.join();
      sendRequest(
        `group?id=${filteredLocationsIDsConcat}&units=metric&appid=98df791eae9d9eb123a6ffbaf2aff6c6`
      );
    };
    if (loc) {
      filterLocation();
    }
  }, [loc, sendRequest]);

  const loadResults = useCallback(
    (weatherArray) => {
      if (firstLoad) {
        setConvertedWeather(weatherArray);
        setFirstLoad(false);
      } else {
        setTimeout(() => {
          setConvertedWeather(weatherArray);
          setLoading(false);
        }, 500);
      }
    },
    [firstLoad]
  );

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

  useEffect(() => {
    const convertWeather = () => {
      const temperatureUpdated = convertedWeather.map((locationWeather) => {
        const temperatureUpdate = { ...locationWeather };
        if (temp === true) {
          temperatureUpdate.temp.toString().length <= 5
            ? (temperatureUpdate.temp = temperatureUpdate.temp + '°C')
            : (temperatureUpdate.temp = convertToCelsius(
                temperatureUpdate.temp
              ));
        } else {
          temperatureUpdate.temp = convertToFarenheit(temperatureUpdate.temp);
        }
        return temperatureUpdate;
      });
      setConvertedTemperature(temperatureUpdated);
    };

    convertedWeather && convertWeather();
  }, [convertedWeather, temp]);

  const convertVisibility = (visibility) => visibility / 1000 + 'km';
  const convertWindSpeed = (windSpeed) => windSpeed + 'km/h';
  const convertTime = (time, timezone) => {
    time = time + timezone;
    const date = new Date(time * 1000);
    const hours = date.getHours() - 1;
    const minutes = '0' + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  };
  const convertPercentage = (humidity) => humidity + '%';
  const convertIcon = (icon) =>
    'http://openweathermap.org/img/wn/' + icon + '@2x.png';
  const convertFlag = (country) =>
    'https://www.countryflags.io/' + country + '/flat/64.png';
  const convertToFarenheit = (value) => {
    const parse = parseFloat(value);
    return parseFloat((parse * 9) / 5 + 32).toFixed(2) + '°F';
  };
  const convertToCelsius = (value) => {
    const parse = parseFloat(value);
    return parseFloat(((parse - 32) * 5) / 9).toFixed(2) + '°C';
  };

  const resultList = useMemo(() => {
    if (error) {
      return (
        <p className={classes.Location}> Unable to find searched location! </p>
      );
    } else if (!convertedTemperature) {
      return <div className={classes.Location}></div>;
    } else {
      return (
        <React.Fragment>
          {/* {loading ? <LoadingWheel /> : null} */}
          <Stagger delay={100} duration={500} in={!isLoading}>
            <Fade>
              <div className={classes.Location}>
                Found {convertedTemperature.length}{' '}
                {convertedTemperature.length === 1 ? 'location' : 'locations'}{' '}
                named
                <span className={classes.Name}>
                  {' '}
                  {convertedTemperature[0].name}
                </span>
              </div>
            </Fade>
            {convertedTemperature.map((city, index) => (
              <Fade key={index}>
                <Result
                  isLoading={isLoading}
                  temperature={city.temp}
                  description={city.description}
                  visibility={city.visibility}
                  wind={city.wind}
                  sunRise={city.sunrise}
                  humidity={city.humidity}
                  cloudiness={city.clouds}
                  sunSet={city.sunset}
                  icon={city.icon}
                  flag={city.flag}
                  key={index}
                  country={city.country}
                  location={city.name}
                />
              </Fade>
            ))}
          </Stagger>
        </React.Fragment>
      );
    }
  }, [isLoading, convertedTemperature, error]);

  return <main className={classes.Results}>{resultList}</main>;
};

const mapStateToProps = (state) => {
  return {
    temp: state.temperature,
    loc: state.location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTemperatureToggle: () =>
      dispatch({ type: actionTypes.TEMPERATURE_TOGGLE }),
    onLocationUpdate: (input) =>
      dispatch({ type: actionTypes.UPDATE_LOCATION, locationName: input }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
