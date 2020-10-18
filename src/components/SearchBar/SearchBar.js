import React from 'react'

import classes from './SearchBar.module.css'
import SearchLogo from '../../assets/icons/SVG/magnifying-glass.svg'

const searchBar = (props) => (
  <form onSubmit={props.updateLocation} className={classes.SearchBar}>
    <input type ="text" placeholder="Enter a city name..." onChange={props.inputChange}/>
    <button type="submit">
      <img src={SearchLogo} alt="Search Logo" />
    </button>
  </form>
)

export default React.memo(searchBar)