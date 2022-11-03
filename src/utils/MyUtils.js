import React from "react"
import { Platform, Linking } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { FONTS } from "./Common";
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';


const showFlash = (msg, type, icon, isFloating) => {
    showMessage({
        message: msg,
        type: type,
        icon: icon,
        floating: true,
        textStyle: { fontFamily: FONTS.WorkSans_Medium }
    });
}

const getGeoCodePosition = (latitude, longitude, callBack) => {
    Geocoder.geocodePosition({
        lat: latitude,
        lng: longitude
    }).then(res => {
        callBack(res[0].formattedAddress)
    })
        .catch(() => { })
}

const SearchMap = () => {
    Geocoder.geocodeAddress(searchInput).then(res => {
        // setlat(res[0].position.lat);
        // setlon(res[0].position.lng)
        console.log(res[0].formattedAddress);
        setsearchInput(res[0].formattedAddress)
        setAddress(res[0].formattedAddress)

    })
        .catch(() => showFlash("Entervalid address", 'warning', 'none'))

}


const handleLocationRequest = () => {
    check(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
            if (result === RESULTS.GRANTED) {
                getCurrentLocation()
            } else {
                setisPermissionAllowed(false)
                request(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                    if (result === RESULTS.GRANTED) {
                        getCurrentLocation()
                    }
                    check(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                        if (result === RESULTS.GRANTED) {
                            getCurrentLocation()
                        }
                    })
                });
            }
        })
}

const getCurrentLocation = () => {
    if (isPermissionAllowed) {
        Geolocation.getCurrentPosition(
            (position) => {
                callBack({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                getGeoCodePosition(position.coords.latitude, position.coords.longitude);
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


const getRatingText = (rating) => {
    if (rating > 0 && rating <= 1) {
        return "Poor"
    } else if (rating > 1 && rating <= 2) {
        return "Average"
    } else if (rating > 2 && rating <= 3) {
        return "Good"
    }  else if (rating > 4 && rating <= 4) {
        return "Better"
    }  else if (rating > 5 && rating <= 5) {
        return "Great"
    } else if (rating == 0) {
        return "N/A"
    }
}

const categoryIntoArray = (primary, secondary) => {

    var array = primary.replace(/", "/g, "")
    var varry = secondary.replace(/", "/g, "")
    array = primary.split(",")
    varry = secondary.split(",")

   const finalArray = [...array, ...varry]
   return finalArray
}

function tConvert (time) {
    time = time.slice(0,5)
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

const openMaps = (lat, lng, _label) => {
    try {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${lat},${lng}`;
      const label = _label;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });

      Linking.openURL(url);
    } catch (error) {
      alert("Unable to open Maps")
    }
  }

export {
    showFlash,
    getGeoCodePosition,
    getRatingText,
    categoryIntoArray,
    tConvert,
    openMaps
}