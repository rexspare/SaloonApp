import AsyncStorage from "@react-native-async-storage/async-storage";
import Types from '../Contants'

var defaultState = {
  categories: [],
  allServices: [],
  nearbyVendors: [],
  activeService: {},
  allVendors: [],
  isGettingNearby: false,
  favorites:[],
  myBookings:[],
  activeVendor :{}
};


var appReducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.CATEGORIES: {
      let newState = Object.assign({}, state);
      newState.categories = action.payload;
      return newState;
    }

    case Types.All_SERVICES: {
      let newState = Object.assign({}, state);
      newState.allServices = action.payload;
      return newState;
    }

    case Types.NEARBY_VENDORS: {
      let newState = Object.assign({}, state);
      newState.nearbyVendors = action.payload;
      return newState;
    }

    case Types.ACTIVE_SERVICE: {
      let newState = Object.assign({}, state);
      newState.activeService = action.payload;
      return newState;
    }

    case Types.ALL_VENDORS: {
      let newState = Object.assign({}, state);
      newState.allVendors = action.payload;
      return newState;
    }

    case Types.IS_GETTING_PROVIDERS: {
      let newState = Object.assign({}, state);
      newState.isGettingNearby = action.payload;
      return newState;
    }

    case Types.FAVORITES: {
      let newState = Object.assign({}, state);
      newState.favorites = action.payload;
      return newState;
    }

    case Types.MY_BOOKINGS: {
      let newState = Object.assign({}, state);
      newState.myBookings = action.payload;
      return newState;
    }

    case Types.ACTIVE_VENDOR: {
      let newState = Object.assign({}, state);
      newState.activeVendor = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
export default appReducer;