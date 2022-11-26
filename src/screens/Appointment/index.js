import { View, Text, SafeAreaView, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Heading, If, Label, Layout } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common'
import { lang } from '../../assets/languages'
import W45_BTN from '../../components/Buttons/W45_BTN'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styles'
import Upcomming from './Upcomming'
import { getBookings } from '../../Data/Local/Store/Actions'


const Appointment = (props) => {
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn)
  const nearbyData = useSelector((state) => state.appReducer.nearbyVendors)
  const bookingList = useSelector((state) => state.appReducer.myBookings)
  const user = useSelector((state) => state.authReducer.user)
  const [sortedList, setsortedList] = useState([])
  const [refreshState, setrefreshState] = useState(1)
  const dispatch = useDispatch()

  const findSalonNearby = () => {
    const NearbySalons = nearbyData.map((x) => (
      {
        data: x.businessDetails,
        latitude: parseFloat(x.businessDetails?.business_lat),
        longitude: parseFloat(x.businessDetails?.business_long)
      }
    ))
    props.navigation.navigate("OnMap",
      {
        locationArray: NearbySalons,
        category: "Near you"
      })
  }

  const getBookingHistory = () => {
    setrefreshState((prev) => prev + 1)
    dispatch(getBookings(user?.id));
  
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      getBookingHistory()
    }
  }, [isUserLoggedIn])

  useEffect(() => {
    const sorted = bookingList.sort(function (a, b) {
      return (a.booking_status > b.booking_status
        ? 1 : (a.booking_status === b.booking_status ? 0 : -1))
    })
    setsortedList(sorted)
  }, [bookingList?.length, refreshState])



  return (
    <View style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
      {/* USER NOT LOGGED IN */}
      <If condition={!isUserLoggedIn}>
        <Layout fixed={true}>
          <Heading style={styles.noAppoints}>{lang._39}</Heading>
          <View style={styles.absolutecontainer}>
            <Image source={require("../../assets/images/No_Appoints.jpg")}
              style={styles.image} />
            <Heading style={{ marginVertical: FS_height(2) }}>{lang._40}</Heading>
            <W45_BTN title={lang._41} onpress={() => props.navigation.navigate("Profile")} />
          </View>
        </Layout>
      </If>
      {/* END */}
      <If condition={isUserLoggedIn}>
        {/* NO UPCOMMNG APPOINTMENTS */}
        <If condition={bookingList.length == 0}>
          <Layout fixed={true}>
            <Heading style={styles.noAppoints}>{lang._39}</Heading>
            <View style={[styles.absolutecontainer, { width: width * 0.9 }]}>
              <Image source={require("../../assets/images/No_Appoints.jpg")}
                style={styles.image} />
              <Heading style={{ marginVertical: FS_height(2), fontSize: FS_height(3) }}>{lang._43}</Heading>
              <Label style={styles.label}>{lang._44}</Label>
              <W45_BTN title={lang._45} style={{ width: width * 0.6 }}
                onpress={() => findSalonNearby()} />
            </View>
          </Layout>
        </If>
        {/* END */}
        {/* ================================= */}
        {/*  UPCOMMING APPOINTMENTS */}
        <If condition={bookingList.length != 0}>
          <Layout fixed={true}>
            <Upcomming DATA={sortedList} navigation={props.navigation} getBookings={getBookingHistory} />
          </Layout>
        </If>
        {/* END */}
      </If>
    </View>
  )
}


export default Appointment