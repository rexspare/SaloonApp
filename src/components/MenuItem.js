import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, height, width, FS_height, FONTS } from '../utils/Common'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Label from './Label';
import If from './If';


const MenuItem = (props) => {
    const { Icon, title, onpress } = props
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: COLORS.primary }]}
            onPress={() => onpress()}>
            <If condition={Icon}>
                {Icon}
            </If>
            <If condition={!Icon}>
                <View style={{ width: 0 }}></View>
            </If>
            <Label style={[styles.title, { left: Icon ? '12%' : 0 }]}>{title}</Label>
                {props.element}
        </TouchableOpacity>
    )
}

MenuItem.defaultProps = {
    onpress: () => { },
    title: "Apponintments",
    element : <AntDesign name='right' size={FS_height(3.3)} color={COLORS.secondary} />
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: width * 0.95,
        minHeight: 55,
        height: height * 0.1,
        maxHeight: 70,
        borderBottomWidth: 0.5,
        borderColor: COLORS.subtle,
        alignSelf: "flex-end",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingRight: '3%'

    },
    title: {
        fontFamily: FONTS.WorkSans_Medium,
        fontSize: FS_height(2.6),
        position: "absolute",
    }
})

export default MenuItem