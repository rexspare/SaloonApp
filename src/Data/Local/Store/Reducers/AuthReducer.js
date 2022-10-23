import AsyncStorage from "@react-native-async-storage/async-storage";
import Types from '../Contants'

var defaultState = {
  user: {},
  findingUser: true,
  isUserLoggedIn: false,
  mylocaton: {},
  isLocationPermissionAllowed: false
};


var authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.USER_INFO: {
      let newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    }

    case Types.IS_USER_LOGGED_IN: {
      let newState = Object.assign({}, state);
      newState.isUserLoggedIn = action.payload;
      return newState;
    }



    case Types.MY_LOCATION: {
      let newState = Object.assign({}, state);
      newState.mylocaton = action.payload;
      return newState;
    }

  
    case Types.IS_LOCATION_PERMISSION_ALLOWED: {
      let newState = Object.assign({}, state);
      newState.isLocationPermissionAllowed = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
export default authReducer;