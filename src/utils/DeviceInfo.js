import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get("screen")

const isTablet = () => {
    const istab = DeviceInfo.isTablet()
    return istab
}

const isTabletMode = () => {
    const isTabletMode = DeviceInfo.isTabletMode();
    return isTabletMode
}

const isTabletBasedOnRatio = () => {
    const ratio = height / width
    if (ratio > 1.6) {
        return false
    } else {
        return true
    }
}

const hasNotch = () => {
    const hasNotch = DeviceInfo.hasNotch();
    return hasNotch
}

const isLocationEnable = (callBack) => {
    DeviceInfo.isLocationEnabled().then((enabled) => {
        callBack(enabled)
    });

}


export {
    isTablet,
    isTabletMode,
    isTabletBasedOnRatio,
    hasNotch,
    isLocationEnable,

}