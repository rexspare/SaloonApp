import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_height, width } from '../utils/Common'
import Label from './Label'
import { BASE_URL } from '../Data/remote/Routes'
import commonStyles from '../assets/styles/CommonStyles'
import { useSelector } from 'react-redux'

const FavoriteItem = (props) => {
    const { item } = props
    const categories = useSelector((state) => state.appReducer.categories)



    const getCategoryImage = () => {
        const exists = categories.find((x) => x.id == item.category_id)
        if (exists) {
            return BASE_URL + "uploads/" + exists.category_image
        } else {
            return "https://source.unsplash.com/user/c_v_r/1900x800"
        }
    }

    return (
        <TouchableOpacity style={styles.mainContainer} activeOpacity={0.8}
            onPress={() => props.onpress()}>
            <View style={styles.circle}>
                <Image source={{ uri: getCategoryImage() }}
                    style={styles.circleImage}
                    resizeMode="contain" />
            </View>
            <View style={styles.titleContainer}>
                <Label style={styles.title}>{item?.service_title.length > 20 ?
                    item?.service_title.slice(0, 20) + "..." : item?.service_title}</Label>
                <Text style={styles.time}>{item?.business_name ?? item?.service_time}</Text>
            </View>
            {/* PRICE */}
            <View style={styles.price}>
                <Label style={styles.priceTxt}>{item?.service_price}</Label>
            </View>
        </TouchableOpacity>
    )
}

FavoriteItem.defaultProps = {

}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: '3%',
        borderBottomWidth: 1,
        borderColor: COLORS.subtle
    },
    circle: {
        borderWidth: 1,
        borderRadius: width * 0.07,
        padding: 1,
        ...commonStyles._center
    },
    circleImage: {
        width: width * 0.12 - 2,
        height: width * 0.12 - 2,
        borderRadius: width * 0.06
    },
    titleContainer: {
        height: "100%",
        paddingHorizontal: 10
    },
    title: {
        fontSize: FS_height(2.3)
    },
    time: {
        fontSize: FS_height(2),
        fontFamily: FONTS.WorkSans_Regular,
        color: COLORS.subtle
    },
    price: {
        position: "absolute",
        right: '4%'
    },
    priceTxt: {
        fontSize: FS_height(2.8),
        fontFamily: FONTS.WorkSans_Medium
    }
})

export default FavoriteItem