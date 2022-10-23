import { View, Text, SafeAreaView, StyleSheet, Image, StatusBar, Animated, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef } from 'react'
import { AppointmentItem, Heading, If, Label, Layout } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common'
import { lang } from '../../assets/languages'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { showFlash } from '../../utils/MyUtils'
import apiRequest from '../../Data/remote/Webhandler'
import { ROUTES } from '../../Data/remote/Routes'


const Upcomming = (props) => {
    const swipeableRef = useRef(Swipeable)
    const { DATA } = props

    const handlePress = (detail) => {
        if (detail?.business_lat) {
            props.navigation.navigate("PolyMap",
                { service: detail, })
        } else {
            showFlash("This Vendoe has Not added his Location", "none", 'none')
        }
    }

    const cancelBooking = async (item) => {
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
            props.getBookings()
            swipeableRef.current?.close();
            showFlash(result?.data?.message, 'success', 'none')
        } else {

        }
    }

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
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <StatusBar backgroundColor={COLORS.ServiceHeader} />

            <View style={styles.upcomingHeader}>
                <Heading style={styles.upAppoints}>{lang._39}</Heading>
            </View>

            <Layout fixed={false}>
                {
                    DATA.map((item, index) => (
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

        </SafeAreaView >
    )
}

export default Upcomming