import React, { useState  } from "react";
import { Animated } from 'react-native'
import { render } from "@testing-library/react";

const Stagger = props => {

  const [animatedValues, setAnimatedValues] = useState([])

  const animatedValuesArray = []
  for (let i = 0; i < 1000; i++) {
    animatedValuesArray.push(new Animated.Value(0))
  }
  setAnimatedValues(animatedValuesArray)

  const staggerAnimate = () => {
    const animations = animatedValues.map((animatedValue) => {
      return Animated.timing(
        animatedValue,
        {
          toValue: 1,
          curation: 4000
        }
      )
    })
    Animated.stagger(10, animations).start()
  }
  const animatedViews = animatedValues.map((animatedValue, idex) => {
    return <Animated.View key=P:
  })
  return (
    
  )
}

export default Stagger 