import { View, Text } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash'
import { Provider } from 'react-redux';
import configureStore from "./src/Data/Local/Store/redux";

const store = configureStore()
const App = () => {
  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  )
}

export default App

// PRIVACY POLICY
// https://www.termsfeed.com/live/08f0e5c0-ec7e-4fd7-aa47-1be6f6bb2803
// TERMS AND CONDITIONS
// https://www.termsfeed.com/live/0ac73c65-f724-437c-88e4-ce34e95ae16c

// ONESIGNAL APP ID
// f65cce54-654b-43d2-b664-bd55c5e92cd8