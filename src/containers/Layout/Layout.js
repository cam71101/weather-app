import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ExternalLink } from 'react-external-link';

import SearchBar from '../../components/SearchBar/SearchBar'
import TemperatureToggle from '../../components/TemperatureToggle/TemperatureToggle'
import Results from '../../components/Results/Results'

import * as actionTypes from '../../store/actions'

import classes from './Layout.module.css'

import Icon from "../../components/Icon/Icon";

const Layout = props => {

  const [searchBarInput, setSearchBarInput] = useState('')

  const handleInput = (input) => {
    setSearchBarInput(input.target.value)
  }

  const capitalizeWords = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const location = capitalizeWords(searchBarInput)
    props.onLocationUpdate(location)
  }

    return (
      <React.Fragment>
        <header className={classes.Header}>
          <h1 >Weather City App</h1>

          <ExternalLink href="https://github.com/cam71101/weather-app">
            <Icon className={classes.Icon} icon="github" />
          </ExternalLink>

          <SearchBar
            updateLocation={handleSubmit}
            inputChange={handleInput}
          />
          <TemperatureToggle
            temperatureToggle={props.onTemperatureToggle}
          />
        </header>
          <Results/>
      </React.Fragment>
    )
}

const mapStateToProps = state => {
  return {
    temp: state.temperature,
    loc: state.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTemperatureToggle: () => dispatch({type: actionTypes.TEMPERATURE_TOGGLE}),
    onLocationUpdate: (input) => dispatch({type: actionTypes.UPDATE_LOCATION, locationName: input })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)