import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, height, width, FS_height } from '../utils/Common'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Label from './Label'
import { useSelector } from 'react-redux'

const AppHeader = (props) => {
    const activeService = useSelector((state) => state.appReducer.activeService)
    return (
        <View style={styles.main}>
            <TouchableOpacity style={{ paddingTop: 3 }} activeOpacity={0.8}
                onPress={() => props.onpress()}>
                <AntDesign name='arrowleft' size={FS_height(3.5)} color={COLORS.primary} />
            </TouchableOpacity>
            <Label style={styles.title}>{props.title}</Label>
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
        fontSize: FS_height(3),
        paddingLeft: '5%'
    }
})

export default AppHeader