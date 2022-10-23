import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "../../../remote/Routes";
import apiRequest from "../../../remote/Webhandler";
import Types from '../Contants'
import { showFlash } from '../../../../utils/MyUtils'


export const getCategories = () => async (dispatch) => {
    const result = await apiRequest({
        method: "GET",
        url: ROUTES.GET_CATEGORIES,
    }).catch((err) => {
        return false;
    });
    if (result.data.status) {
        dispatch({ type: Types.CATEGORIES, payload: result?.data?.categories });
        return result.data;
    } else {
        return result;
    }

}

export const getAllServices = () => async (dispatch) => {
    const result = await apiRequest({
        method: "post",
        url: ROUTES.GET_SERVICES,
    }).catch((err) => {
        return false;
    });
    if (result.data.status) {
        dispatch({ type: Types.All_SERVICES, payload: result?.data?.services });
        return result.data;
    } else {
        return result;
    }

}

export const getServicesByID = (id, callBack) => async (dispatch) => {
    const result = await apiRequest({
        method: "post",
        url: ROUTES.GET_SERVICES,
        data: { user_id: id }
    }).catch((err) => {
        return false;
    });
    if (result.data.status) {
        callBack(result?.data?.services)
        return result.data;
    } else {
        return result;
    }

}

export const getNearbyProviders = (data) => async (dispatch) => {
    dispatch({ type: Types.IS_GETTING_PROVIDERS, payload: true });
    const result = await apiRequest({
        method: "post",
        url: ROUTES.GET_NEARBY_SERVICES,
        data: { ...data },
    }).catch((err) => {
        return false;
    });
    if (result.data.status) {
        delete result?.data?.data?.userData
        const array = Object.keys(result.data.data)
            .map(function (key) {
                return result.data.data[key];
            });
        dispatch({ type: Types.NEARBY_VENDORS, payload: array });
        dispatch({ type: Types.IS_GETTING_PROVIDERS, payload: false });
        return result.data;
    } else {
        dispatch({ type: Types.IS_GETTING_PROVIDERS, payload: false });
        return result;
    }
}

export const isGettingProvider = (data) => async (dispatch) => {
    dispatch({ type: Types.IS_GETTING_PROVIDERS, payload: data });
};

export const getAllVendors = () => async (dispatch) => {
    const result = await apiRequest({
        method: "post",
        url: ROUTES.GET_USERS,
        data: { role: 'vendor' },
    }).catch((err) => {
        return false;
    });
    if (result.data.status) {
        dispatch({ type: Types.ALL_VENDORS, payload: result?.data.userData || result?.data.useraData });
        return result.data;
    } else {
        return result;
    }
}

export const getFavorites = (user_id) => async (dispatch) => {
    const result = await apiRequest({
        method: "post",
        url: ROUTES.GET_FAVORITES,
        data: { user_id}
    }).catch((err) => {
        return false;
    });
    if (result.data.status) {
        dispatch({type: Types.FAVORITES, payload: result.data.data})
        return result.data;
    } else {
        return result;
    }
}

export const getBookings = (user_id) => async (dispatch) => {
    const result = await apiRequest({
        method: "post",
        url: ROUTES.GET_BOOKING_HISTORY,
        data:{
            user_id,
            type: 'customer',
            // booking_status:'pending'
          }
    }).catch((err) => {
        return false;
    });
    if (result.status == 200 && result?.data?.data?.length != 0) {
        dispatch({type: Types.MY_BOOKINGS, payload: result.data.data})
        return result.data.data;
    } else {
        return result;
    }
}

export const setActiveService = (data) => async (dispatch) => {
    dispatch({ type: Types.ACTIVE_SERVICE, payload: data });
};


