import React, { useState, useEffect, useRef } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import { COLORS, FONTS, width, height, FS_height } from '../../utils/Common'
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import { Auth_Button } from '../../components/Buttons'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import commonStyles from '../../assets/styles/CommonStyles';
import { Auth_Input } from '../../components/Input';
import { GoBackHeader, Heading, If, Label, Layout } from '../../components';
import { lang } from '../../assets/languages';
import { showFlash } from '../../utils/MyUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../Data/Local/Store/Actions';


const OnMap = (props) => {
    const user = useSelector((state) => state.authReducer.user)
    const mylocation = useSelector((state) => state.authReducer.mylocaton)
    const permission = useSelector((state) => state.authReducer.isLocationPermissionAllowed)
    const dispatch = useDispatch()
    const [lat, setlat] = useState(mylocation?.latitude)
    const [lon, setlon] = useState(mylocation?.longitude)
    const [myPosition, setmyPosition] = useState(mylocation)
    const [searchInput, setsearchInput] = useState("")
    const [Address, setAddress] = useState("")
    const [isPermissionAllowed, setisPermissionAllowed] = useState(false)
    const [vendorLocationArray, setvendroLocationArray] = useState([])
    const MapRef = useRef()

    useEffect(() => {
        setvendroLocationArray([...props?.route?.params?.locationArray])
    }, [props?.route?.params?.locationArray])


    const getGeoCodePosition = (latitude, longitude) => {
        Geocoder.geocodePosition({
            lat: latitude,
            lng: longitude
        }).then(res => {
            setsearchInput(res[0].formattedAddress)
            setAddress(res[0].formattedAddress)
        })
            .catch(() => showFlash("Error Getting Location", 'warning', 'none'))
    }

    const SearchMap = () => {
        Geocoder.geocodeAddress(searchInput).then(res => {
            setlat(res[0].position.lat);
            setlon(res[0].position.lng)
            console.log(res[0].formattedAddress);
            setsearchInput(res[0].formattedAddress)
            setAddress(res[0].formattedAddress)
            MapRef?.current?.animateCamera({
                center: {
                    latitude: res[0].position.lat,
                    longitude: res[0].position.lng,
                },
                duration: 1000
            });
        })
            .catch(() => showFlash("Entervalid address", 'warning', 'none'))

    }



    const handleLocationRequest = () => {
        check(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then((result) => {
                if (result === RESULTS.GRANTED) {
                    setisPermissionAllowed(true)
                    getCurrentLocation()
                } else {
                    setisPermissionAllowed(false)
                    request(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                        if (result === RESULTS.GRANTED) {
                            setisPermissionAllowed(true)
                            getCurrentLocation()
                        }
                        check(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                            if (result === RESULTS.GRANTED) {
                                setisPermissionAllowed(true)
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
                    setlat(position.coords.latitude)
                    setlon(position.coords.longitude)
                    setmyPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                    dispatch(setLocation(
                        {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    ))
                    getGeoCodePosition(position.coords.latitude, position.coords.longitude);

                    MapRef?.current?.animateCamera({
                        center: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        },
                        duration: 1000
                    });
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


    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={[Styles.MainConatner]}>

                <GoBackHeader title={lang._57} onpress={() => props.navigation.goBack()} />

                <If condition={mylocation?.latitude && vendorLocationArray.length != 0}>
                    {/* MAPS */}
                    <View style={Styles.mapContainer}>

                        <MapView
                            ref={MapRef}
                            style={Styles.map}
                            initialRegion={{
                                latitude: lat,
                                longitude: lon,
                                latitudeDelta: 0.0300,
                                longitudeDelta: 0.0300,
                            }}
                            // onRegionChange={(e) => { setlat(e.latitude); setlon(e.longitude) }}
                            onRegionChangeComplete={(e) => {
                                getGeoCodePosition(e.latitude, e.longitude);
                                setlat(e.latitude);
                                setlon(e.longitude)
                            }}
                        >
                            {/* MARKERS */}
                            {/* ME */}
                            <Marker
                                key={"me"}
                                coordinate={myPosition}
                                title={user.username}
                                description={"You are here"}
                            >
                                <MTIcon name='location-pin' size={45} color={COLORS.secondary} />
                            </Marker>
                            {/* SERVICES NEAR ME */}
                            {vendorLocationArray?.map((marker, index) => (
                                <Marker
                                    key={index}
                                    coordinate={marker}
                                    title={marker?.data?.business_name || "title"}
                                    description={marker?.data?.primary_category || "desc"}
                                    onCalloutPress={() => {
                                        try {
                                            props.navigation.goBack()
                                        } catch (error) {
                                            
                                        }
                                    }}

                                />
                            ))}

                        </MapView>
                        <View style={{ position: 'absolute', paddingBottom: height * 0.042 }}>
                            {/* <MTIcon name='location-pin' size={45} color={COLORS.secondary} /> */}
                        </View>

                        {/* INPUT  */}
                        <View style={[Styles.Field, {}]}>
                            <Auth_Input
                                style={{ color: COLORS.secondary, fontSize: RFPercentage(1.7) }}
                                placeholder='Search' placeholderTextColor={COLORS.placeholder}
                                value={searchInput}
                                onChange={(text) => setsearchInput(text)}
                                Icon={
                                    <TouchableOpacity onPress={() => { SearchMap() }}>
                                        <AntDesign name="search1" size={25} color="#E75950" />
                                    </TouchableOpacity>
                                }
                            />


                        </View>

                        {/* Buttons */}
                        <View style={Styles.BtnContainer}>
                            <TouchableOpacity style={Styles.squareBtn} onPress={() => { handleLocationRequest() }} >
                                <MTIcon name="my-location" size={25} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>


                    </View>

                </If>
                <If condition={!mylocation?.latitude}>
                    <Layout fixed={true}>
                        <View style={{ flex: 1, ...commonStyles._center }}>
                            <Auth_Button
                                title={"Allow Permission"}
                                onpress={() => handleLocationRequest()}
                            />
                        </View>
                    </Layout>
                </If>
                <If condition={mylocation?.latitude && vendorLocationArray.length == 0}>
                    <Layout fixed={true}>
                        <View style={Styles.nothingContainer}>
                            <Heading style={Styles.noResults}>
                                {`${lang._61} ${props.route?.params?.category} ${lang._62}`}</Heading>
                            <Image source={require("../../assets/images/nothingfound.jpg")}
                                style={Styles.nothingfound} />
                        </View>
                    </Layout>
                </If>
            </View>
        </SafeAreaView>
    )
}

export default OnMap

const Styles = StyleSheet.create({
    MainConatner: {
        flex: 1,
        // borderWidth: 2,
    },
    header: {
        width: width,
        height: height * 0.075,
        flexDirection: 'row',
        // borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    map: {
        ...StyleSheet.absoluteFillObject,
        height: height * 0.925,
        width: width
    },

    mapContainer: {
        height: height * 0.925,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Field: {
        width: width,
        marginVertical: height * 0.015,
        borderRadius: RFPercentage(1),
        justifyContent: 'space-between',
        borderRadius: RFPercentage(1),
        position: 'absolute',
        top: RFPercentage(1),
        alignItems: 'center'
    },
    BtnContainer: {
        flexDirection: 'row',
        width: width * 0.82,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: RFPercentage(5)
    },

    squareBtn: {
        width: 50,
        height: 50,
        ...commonStyles._center,
        backgroundColor: COLORS.secondary,
        borderRadius: 10
    },

    nothingContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    noResults: {
        fontSize: FS_height(4),
        textAlign: "left",
    },
    nothingfound: {
        width: 200,
        height: 200
    }

});
