import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import PrefManager from '../../Data/Local/PrefManager';
import { useSelector, useDispatch } from 'react-redux';
import RootStack from '../../navigation/RootStack';
import Branding from '../../components/Branding';
import { View } from 'react-native';
import { COLORS } from '../../utils/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage_keys } from '../../utils/StorageKeys';
import { getAllServices, getCategories, setIsUserLoggedIn, setLocation, setUser, setisLocationPermissionAllowed, getAllVendors, getFavorites, getBookings } from '../../Data/Local/Store/Actions';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { showFlash } from '../../utils/MyUtils';

const prefManager = new PrefManager()

const Splash = () => {
  const dispatch = useDispatch()
  const isLocationPermissionAllowed = useSelector((state) => state.authReducer.isLocationPermissionAllowed)
  const [isLoaded, setisLoaded] = useState(false)

  const handleLocationRequest = () => {
    check(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          dispatch(setisLocationPermissionAllowed(true))
          getCurrentLocation()
        } else {
          dispatch(setisLocationPermissionAllowed(false))
          request(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
            if (result === RESULTS.GRANTED) {
              dispatch(setisLocationPermissionAllowed(true))
              getCurrentLocation()
            }
            check(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
              if (result === RESULTS.GRANTED) {
                dispatch(setisLocationPermissionAllowed(true))
                getCurrentLocation()
              }
            })
          });
        }
      })
  }

  const getCurrentLocation = () => {
    if (isLocationPermissionAllowed) {
      Geolocation.getCurrentPosition(
        (position) => {
          dispatch(setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }))
        },
        (error) => {
          // See error code charts below.
          showFlash(error.message, 'warning', 'none')
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getAllServices())
    dispatch(getAllVendors())
    AsyncStorage.getItem(storage_keys.USER_DATA_KEY)
      .then((data) => {
        if (data) {
          const user = JSON.parse(data)
          dispatch(getFavorites(user?.id))
          dispatch(getBookings(user?.id))
          dispatch(setUser(JSON.parse(data)));
          dispatch(setIsUserLoggedIn(true))
        } else {
          dispatch(setIsUserLoggedIn(false))
        }
      })
    setTimeout(() => {
      setisLoaded(true)
    }, 2000);
  }, [])



  useEffect(() => {
    handleLocationRequest()
  }, [isLocationPermissionAllowed])


  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={isLoaded}
      customComponent={<Branding />}
      backgroundColor={COLORS.primary}

    >
      <RootStack />
    </AnimatedSplash>
  )
}

export default Splash