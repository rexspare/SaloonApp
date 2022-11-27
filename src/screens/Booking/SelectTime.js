import { View, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import commonStyles from '../../assets/styles/CommonStyles'
import { Auth_Button, W45_BTN } from '../../components/Buttons'
import { Layout, ServiceHeader, Heading, Label, BookedSlotItem, If } from '../../components'
import { COLORS, FS_height } from '../../utils/Common'
import { styles } from './styles'
import { lang } from '../../assets/languages'
import { Auth_Input } from '../../components/Input'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import apiRequest from '../../Data/remote/Webhandler'
import { showFlash } from '../../utils/MyUtils'
import { ROUTES } from '../../Data/remote/Routes'
import { getBookings, getFavorites } from '../../Data/Local/Store/Actions'

const SelectTime = (props) => {
    const activeService = useSelector((state) => state.appReducer.activeService)
    const user = useSelector((state) => state.authReducer.user)
    const dispatch = useDispatch()
    const { Vendor } = props?.route?.params
    const [isLoading, setisLoading] = useState(false)
    const [showDatePicker, setshowDatePicker] = useState(false)
    const [showFromdatePicker, setshowFromdatePicker] = useState(false)
    // DATE STATES
    const [date, setDate] = useState(new Date());
    const [dateString, setdateString] = useState('')
    // FROM TIME STATES
    const [fromTime, setfromTime] = useState(new Date())
    const [fromTimeString, setfromTimeString] = useState('')

    const [isFormValid, setisFormValid] = useState(false)

    // BOOKING SLOTS STATE
    const [bookingList, setbookingList] = useState([])

    useEffect(() => {
        if (dateString != "") {
            getBookedSlots()
        }
    }, [dateString])

    const getBookedSlots = async () => {
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.GET_BOOKING_SLOTS,
            data: {
                user_id: Vendor?.id,
                date: dateString
            }
        }).catch((err) => { });
        console.log(result.data);
        if (result.data?.status) {
            setbookingList(result.data?.alreadyBooking)
        } else {
            setbookingList([])
        }
    }

    const handleDate = (date) => {
        var dateString = JSON.stringify(date)
        dateString = dateString.replace(/"/g, "")
        setdateString(dateString.split("T")[0])
    }

    const handleFromTime = (time) => {
        setfromTimeString(moment(time).format('hh:mm A'))
        setfromTime(time)
    }

    const handleToTime = () => {
        const mServiceTime = activeService.service_time.replace(/[ hour hours min minute minutes Hour Hours Min Minute Minutes]/g, '');
        let time
        if (activeService.service_time.toUpperCase().includes("H")) {
            time = moment(fromTime.getTime() + mServiceTime * 60 * 60 * 1000).format('HH:mm:ss')
        } else if (activeService.service_time.toUpperCase().includes("M")) {
            time = moment(fromTime.getTime() + mServiceTime * 60 * 1000).format('HH:mm:ss')
        } else {
            time = moment(fromTime.getTime() + mServiceTime * 60 * 1000).format('HH:mm:ss')
        }
        return time
    }

    const handleBookService = async () => {
        setisLoading(true)
        const result = await apiRequest({
            method: "post",
            url: ROUTES.BOOK_SERVICE,
            data: {
                customer_id: user.id,
                vendor_id: activeService.user_id,
                service_id: activeService?.service_id,
                start_time: dateString + " " + moment(fromTime).format('HH:mm:ss'),
                end_time: dateString + " " + handleToTime(),
            }
        }).catch((err) => {
            showFlash("Somehomg Went Wrong", "danger", 'auto')
            setisLoading(false)
        });
        console.log(result.data);
        if (result.data?.status) {
                // SEND NOTIFICATION IF PLAYERIS EXISTS
                if(Vendor?.player_id){
                    const notificationResponse = await apiRequest({
                        method: "post",
                        url: ROUTES.SEND_PROVIDER_NOTIFICATION,
                        data: {
                            player_id : Vendor?.player_id,
                            message : `You have a new booking for service id:${activeService?.service_id} by ${user?.username}`
                        }
                    }).catch((err) => {
                    });

                    console.log('====================================');
                    console.log(notificationResponse.data);
                    console.log('====================================');
                }
            showFlash("Service Booked Successfully", "success", 'none')
            dispatch(getFavorites(user.id))
            dispatch(getBookings(user.id))
            props.navigation.navigate("Appointment")
        } else {
            showFlash(result?.data?.message, 'warning', 'none')
        }
        setisLoading(false)
    }


    useEffect(() => {
        if (dateString != '' && fromTimeString != "") {
            setisFormValid(true)
        } else {
            setisFormValid(false)
        }
    }, [dateString, fromTimeString])


    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <StatusBar backgroundColor={COLORS.ServiceHeader} />
            <ServiceHeader onpress={() => props.navigation.goBack()} />
            <Layout fixed={false}>
                <View style={{ paddingHorizontal: "2%", alignItems: "flex-start" }}>
                    {/* Brand and Categories */}
                    <Heading style={[styles.brand, styles.brandSelectTime]}>{lang._74}</Heading>

                    <TouchableOpacity style={{ width: '100%' }}
                        onPress={() => setshowDatePicker(true)}>
                        <Auth_Input
                            placeholder={"Select Date"}
                            editable={false}
                            value={dateString}

                        />
                    </TouchableOpacity>

                    <Heading style={[styles.brand, styles.brandSelectTime]}>{lang._73}</Heading>
                    <Label style={[styles.cate, styles.address, { paddingLeft: "5%", marginTop: 15 }]}>
                        {lang._75}
                    </Label>
                    <TouchableOpacity style={{ width: '100%' }}
                        onPress={() => setshowFromdatePicker(true)}>
                        <Auth_Input
                            placeholder={"Select Date"}
                            editable={false}
                            value={fromTimeString}

                        />
                    </TouchableOpacity>

                    <Heading style={[styles.brand, styles.brandSelectTime]}>
                        {lang._94}
                    </Heading>
                    {/* ALREADY BOOKED OF THIS VENDOR */}
                    <If condition={bookingList.length != 0 && dateString != ""}>
                        <View style={{ width: '100%' }}>
                            {
                                bookingList.map((item, index) => (
                                    <BookedSlotItem item={item} key={index} />
                                ))
                            }
                        </View>
                    </If>
                    
                    {/* NOTHING BOOKED OF THIS VENDOR */}
                    <If condition={bookingList.length == 0 && dateString != ""}>
                        <View style={styles.absolutecontainer}>
                            <Image source={require("../../assets/images/No_Appoints.jpg")}
                                style={styles.image} />
                            <Heading style={styles.noAppoints}>{lang._95}</Heading>
                        </View>
                    </If>

                    {/* SELECT DATE FOR BOOKING */}
                    <If condition={dateString == ""}>
                            <Label style={styles.noDateSelected}>{lang._96}</Label>
                    </If>

                </View>

            </Layout>
            <View style={styles.absoluteBTNCnntainer}>
                <Auth_Button
                    isLoading={isLoading}
                    title={lang._72}
                    disable={!isFormValid}
                    style={{
                        backgroundColor: isFormValid ? COLORS.secondary : COLORS.subtle
                    }}
                    onpress={() => handleBookService()}
                />
            </View>

            {/* DATE PICKER */}
            <DatePicker
                modal
                open={showDatePicker}
                date={date}
                onConfirm={(date) => {
                    handleDate(date)
                    setshowDatePicker(false)
                }}
                onCancel={() => {
                    setshowDatePicker(false)
                }}
                androidVariant="iosClone"
                mode='date'
                minimumDate={new Date()}
            />

            {/* FROM TIME PICKER */}
            <DatePicker
                modal
                open={showFromdatePicker}
                date={fromTime}
                onConfirm={(time) => {
                    handleFromTime(time)
                    setshowFromdatePicker(false)
                }}
                onCancel={() => {
                    setshowFromdatePicker(false)
                }}
                androidVariant="iosClone"
                mode='time'
            />

        </SafeAreaView>
    )
}

export default SelectTime