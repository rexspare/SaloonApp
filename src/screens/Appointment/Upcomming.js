import { View, Text, SafeAreaView, StyleSheet, Image, StatusBar, Animated, TouchableOpacity, FlatList, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { AppointmentItem, Heading, If, Label, Layout } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common'
import { lang } from '../../assets/languages'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { openMaps, showFlash } from '../../utils/MyUtils'
import apiRequest from '../../Data/remote/Webhandler'
import { ROUTES } from '../../Data/remote/Routes'
import { useFocusEffect } from '@react-navigation/native'


const Upcomming = (props) => {
    const swipeableRef = useRef(Swipeable)
    const { DATA } = props
    const allVendors = useSelector((state) => state.appReducer.allVendors)
    const bookingList = useSelector((state) => state.appReducer.myBookings)
    const [refreshState, setrefreshState] = useState(0)

    const handlePress = (detail) => {
        if (detail?.business_lat) {
            // props.navigation.navigate("PolyMap",
            //     { service: detail, })
            openMaps(detail?.business_lat, detail?.business_long, detail?.business_name)
        } else {
            showFlash("This Vendoe has Not added his Location", "none", 'none')
        }
    }

    const cancelBooking = async (item) => {

        const vendor = allVendors.find((x) => x?.id == item?.user_id)
        if (vendor) {
            const result = await apiRequest({
                method: "POST",
                url: ROUTES.UPDATE_BOOKING_STATUS,
                data: {
                    booking_id: item.booking_id,
                    booking_status: 'cancelled'
                }
            }).catch((error) => {
                showFlash(lang._98, 'warning', 'none')
            })
            if (result.data?.status) {
                // SEND NOTIFICATION IF BOOKING IS CANCLED
                if (vendor?.player_id) {
                    const notificationResponse = await apiRequest({
                        method: "post",
                        url: ROUTES.SEND_PROVIDER_NOTIFICATION,
                        data: {
                            player_id: vendor?.player_id,
                            message: `${user?.username} cancelled booking for order# ${item.booking_id} by`
                        }
                    }).catch((err) => {
                    });
                }
                props.getBookings()
                swipeableRef.current?.close();
                showFlash(result?.data?.message, 'success', 'none')
            } else {

            }
        } else {
        }

    }

    const sortedList = () =>{
        return bookingList.sort(function (a, b) {
            return (a.booking_status > b.booking_status
              ? 1 : (a.booking_status === b.booking_status ? 0 : -1))
          })
    }

    useFocusEffect(() =>{
        setTimeout(() =>{
            setrefreshState(refreshState + 1)
        }, 1500)
    })

    const swipeRight = (item) => {
        return (
            <Animated.View style={[commonStyles._center, styles.swipeBTN]}>
                <TouchableOpacity style={[styles.swipeBTN, commonStyles._center]} onPress={() => cancelBooking(item)}>
                    <MTCIcons name='cancel' size={FS_height(6)} color={COLORS.primary} />
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            {
                Platform.OS === 'ios' ?
                    <View style={{ width: width, height: 25, backgroundColor: COLORS.ServiceHeader }} />
                    :
                    <StatusBar backgroundColor={COLORS.ServiceHeader} barStyle={"light-content"} />
            }

            <View style={styles.upcomingHeader}>
                <Heading style={styles.upAppoints}>{lang._39}</Heading>
            </View>

            <Layout fixed={false}>
                {
                    sortedList().map((item, index) => (
                        <GestureHandlerRootView key={index}>
                            <Swipeable
                                ref={swipeableRef}
                                rightThreshold={-200}
                                renderRightActions={() => swipeRight(item)}
                                enabled={item?.booking_status != "cancelled"}
                            >
                                <Animated.View style={{ backgroundColor: COLORS.primary }}>
                                    <AppointmentItem item={item} onpress={(detail) => handlePress(detail)} />
                                </Animated.View>
                            </Swipeable>
                        </GestureHandlerRootView>
                    ))
                }
            </Layout>

        </View >
    )
}

export default Upcomming