import * as actionTypes from './actions';

const initialState = {
  location: null,
  temperature: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEMPERATURE_TOGGLE:
      return {
        ...state,
        temperature: !state.temperature,
      };
    case actionTypes.UPDATE_LOCATION:
      return {
        ...state,
        location: action.locationName,
      };
    default:
      return state;
  }
};

export default reducer;
