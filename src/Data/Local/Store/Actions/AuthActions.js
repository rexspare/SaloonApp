import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "../../../remote/Routes";
import apiRequest from "../../../remote/Webhandler";
import Types from '../Contants'
import { showFlash } from '../../../../utils/MyUtils'

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const setUser = (data) => async (dispatch) => {
  dispatch({ type: Types.USER_INFO, payload: data });
};

export const setIsUserLoggedIn = (data) => async (dispatch) => {
  dispatch({ type: Types.IS_USER_LOGGED_IN, payload: data });
};

export const setLocation = (data) => async (dispatch) => {
  dispatch({ type: Types.MY_LOCATION, payload: data });
};


export const setisLocationPermissionAllowed = (data) => async (dispatch) => {
  dispatch({ type: Types.IS_LOCATION_PERMISSION_ALLOWED, payload: data });
};

export const registerUser = (data, callBack) => async (dispatch) => {
  console.log(data);
  const result = await apiRequest({
    method: "post",
    url: ROUTES.REGISTER,
    data: { ...data },
  }).catch((err) => {
    showFlash("Network Error", "danger", 'auto',)
    return false;
  });
  if (result.data.status) {
    console.log(result.data);
    showFlash(result.data?.message?.replace("\n", ""), 'success', 'none')
    callBack(result)
    return result.data;
  } else {
    showFlash(result.data.message?.replace("\n", ""), 'danger', 'none')
    return result;
  }
};



