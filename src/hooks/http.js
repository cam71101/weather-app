import { useReducer, useCallback } from 'react';

import axios from 'axios';

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { ...curHttpState, loading: true, error: null };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        weatherData: action.responseData.list,
      };
    case 'ERROR':
      return { loading: false, error: action.weather };
    default:
      throw new Error('Error');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    weatherData: null,
  });

  const sendRequest = useCallback((url) => {
    try {
      dispatchHttp({ type: 'SEND' });
      axios.get(url).then((response) => {
        dispatchHttp({ type: 'RESPONSE', responseData: response.data });
      });
    } catch (error) {
      dispatchHttp({ type: 'ERROR', errorMessage: error });
    }
  }, []);

  return {
    isLoading: httpState.loading,
    weatherData: httpState.weatherData,
    error: httpState.error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
