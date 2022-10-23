import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_height, width } from '../utils/Common'
import commonStyles from '../assets/styles/CommonStyles'
import Label from './Label'
import { BASE_URL } from '../Data/remote/Routes'

const DiscoverItem = (props) => {
    const { item, style } = props
    return (
        <TouchableOpacity style={[styles._container, style]} activeOpacity={0.8}
            onPress={() => props?.onpress()}>
            <Image source={{ uri: BASE_URL + "uploads/" + item?.category_image }}
                resizeMode="contain"
                style={styles._image} />
            <View style={styles._view}>
                <Label style={styles._label}>{item.category_name}</Label>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    _container: {
        width: width * 0.44,
        height: width * 0.35,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        elevation: 5,
        marginVertical: 5,
        borderWidth: 1 / 2,
        borderColor: COLORS.subtle
    },
    _image: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    _view: {
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: "center"
    },
    _label: {
        fontFamily: FONTS.WorkSans_SemiBold,
        fontSize: FS_height(2.2)
    }
})

export default DiscoverItem