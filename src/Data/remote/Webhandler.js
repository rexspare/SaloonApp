import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Routes';

const apiRequest = async function (options) {
//   const authToken = await AsyncStorage.getItem('@auth_token');
  const authToken = '@auth_token'
  const onSuccess = (response) => {
    // log each request response
    return response;
  };
  const onError = function (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.response);
    if (error.response)
      // some error happened with the server side
      console.log(error.response);
    // some error happened while processing the request
    else console.error('Error Message:', error.message);
    return Promise.reject(error.response || error.message);
  };

  return axios({
    baseURL: BASE_URL,
    ...options,
    headers: {Authorization: `${authToken}`},
  })
    .then(onSuccess)
    .catch(onError);
};
export default apiRequest;
