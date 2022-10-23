import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'
import {
    DotIndicator,
} from 'react-native-indicators';

const Auth_Button = (props) => {
    return (
        <TouchableOpacity style={[
            styles.btnConatiner,
            props.style
        ]}
            disabled={props.disable}
            activeOpacity={0.7}
            onPress={() => props.onpress()}
        >
            {props.isLoading ?
                <DotIndicator color={COLORS.primary} size={FS_val(6, 700)} />
                :
                <Text style={styles.btnText}>{props.title}</Text>}
        </TouchableOpacity>
    )
}

Auth_Button.defaultProps = {
    title: "title",
    style: {},
    disable: false,
    onpress: () => { },
    isLoading: false
}

const styles = StyleSheet.create({
    btnConatiner: {
        width: "88%",
        maxWidth: 500,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
        // alignSelf:"center",
        ...commonStyles._center,
    },

    btnText: {
        fontFamily: FONTS.WorkSans_SemiBold,
        color: COLORS.pure_White,
        fontSize: FS_val(16, 700)
    }

})

export default Auth_Button