import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, height, width, FS_height } from '../utils/Common'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import apiRequest from '../Data/remote/Webhandler'
import { ROUTES } from '../Data/remote/Routes'
import { showFlash } from '../utils/MyUtils'
import { getFavorites } from '../Data/Local/Store/Actions'

const ServiceHeader = (props) => {
    const activeService = useSelector((state) => state.appReducer.activeService)
    const favorites = useSelector((state) => state.appReducer.favorites)
    const user = useSelector((state) => state.authReducer.user)
    const dispatch = useDispatch()


    const isFavorite = () => {
        const exists = favorites.find((x) => x?.service_id == activeService?.service_id)
        if (exists) {
            return true
        } else {
            return false
        }
    }

    const handlePressFavorite = async () => {
        const result = await apiRequest({
            method: "post",
            url: ROUTES.ADD_FAVORITE,
            data: {
                user_id: user?.id,
                service_id: activeService?.service_id
            }
        }).catch((error) => {
            showFlash("Somehomg Went Wrong", "danger", 'auto')
        })
        if (result?.data?.status) {
            showFlash(result?.data?.message, "success", "none")
            dispatch(getFavorites(user?.id))
        } else {
            showFlash(result?.data?.message, "", "none")
        }
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity style={{ paddingTop: 3 }} activeOpacity={0.8}
                onPress={() => props.onpress()}>
                <AntDesign name='arrowleft' size={FS_height(3.5)} color={COLORS.primary} />
            </TouchableOpacity>
            <Label style={styles.title}>{activeService.service_title.length > 20 ?
                activeService.service_title.slice(0, 20) + "..." : activeService.service_title}</Label>
            <TouchableOpacity style={styles.heart} onPress={() => handlePressFavorite()}>
                <AntDesign name={isFavorite() ? "heart" : "hearto"} color={COLORS.primary} size={FS_height(4)} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: width,
        minHeight: 80,
        height: height * 0.1,
        maxHeight: 120,
        backgroundColor: COLORS.ServiceHeader,
        flexDirection: "row",
        paddingHorizontal: '5%',
        alignItems: "center",
        paddingBottom: "2%"
    },
    title: {
        color: COLORS.primary,
        fontSize: FS_height(2.9),
        paddingLeft: '5%',
    },
    heart: {
        position: 'absolute',
        right: width * 0.05
    }
})

export default ServiceHeader