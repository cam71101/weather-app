import React from 'react'

import classes from './TemperatureToggle.module.css'

const temperatureToggle = props => (
    <div className={classes.Switch}>
      <input id="switch" className={classes.SwitchInput} type="checkbox" onClick={props.temperatureToggle}/>
      <label htmlFor="switch" className={classes.SwitchLabel}>
        <div className={classes.Temp}>
          <div className={classes.F}>C</div>
          <div className={classes.C}>F</div>
        </div>
      </label>
    </div>
)

export default React.memo(temperatureToggle)