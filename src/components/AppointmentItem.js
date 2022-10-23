import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FONTS, FS_height, height, width, COLORS } from '../utils/Common'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from './Label'
import { lang } from '../assets/languages';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../Data/remote/Routes';

const AppointmentItem = (props) => {
    const categories = useSelector((state) => state.appReducer.categories)

    const { item } = props
    const statusColor = (status) => {
        switch (status) {
            case "accepted":
                return COLORS.success
            case "cancelled":
                return COLORS.danger
            case 'pending':
                return '#636262'
            default:
                return '#636262'
        }
    }

    const getCategoryImage = (category_id) => {
        const exists = categories.find((x) => x.id == category_id)
        if (exists) {
            return BASE_URL + "uploads/" + exists.category_image
        } else {
            return "https://source.unsplash.com/user/c_v_r/1900x800"
        }

    }

    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress={() => props.onpress(item)}
            style={styles.main}>
            <View>
                <Image
                    source={{ uri: getCategoryImage(item?.category_id) }}
                    style={styles.image}
                />
            </View>
            <View style={styles.contextContainer}>
                <Label style={{ maxWidth: '94%' }}>{item?.business_name || "business_name"}</Label>
                <Label style={styles.serviceName}>{item?.service_title}</Label>
                <View style={styles.rowcontainer}>
                    <Ionicons name='time-outline' size={FS_height(2.5)} color={COLORS.secondary} />
                    <Label style={styles.serviceName}>{moment(item?.start_time).format("hh:mm A")} - {moment(item?.end_time).format("hh:mm A")}</Label>
                </View>
                <Label style={styles.serviceName}>{moment(item?.start_time).format("MMMM Do YYYY")}</Label>
                <View style={styles.rowcontainer}>
                    <Label style={{ fontSize: FS_height(1.9) }}>{lang._86}: </Label>
                    <View style={[styles.statusChip, { backgroundColor: statusColor(item?.booking_status) }]}>
                        <Label style={styles.statusText}>{item?.booking_status}</Label>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}

AppointmentItem.defaultProps = {
    onpress :() =>{}
}

const styles = StyleSheet.create({
    main: {
        width: width,
        paddingHorizontal: '5%',
        paddingVertical: FS_height(2),
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: COLORS.subtle
    },
    image: {
        width: width * 0.175,
        maxHeight: 120,
        height: width * 0.175,
        maxHeight: 120,
        borderRadius: 60
    },
    contextContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: "3%",
        flexWrap: 'wrap'
    },
    serviceName: {
        textAlign: 'left',
        fontSize: FS_height(1.8),
        // maxWidth: '94%',
        fontFamily: FONTS.WorkSans_Regular,
        textAlignVertical: 'center',
        flexWrap: 'wrap',
    },
    rowcontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 2
    },
    statusChip: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        elevation: 5
    },
    statusText: {
        fontSize: FS_height(1.8),
        color: COLORS.primary
    }
})

export default AppointmentItem