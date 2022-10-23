import { View, Text, TouchableOpacity , StyleSheet} from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'

const Text_Button = (props) => {
    return (
       <View  style={[props.style, styles.btnConatiner]} >
         <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.onpress()}
            disabled={props.disable}
        >
            <Text style={[styles.btnText, props.textStyles]}>{props.title}</Text>
        </TouchableOpacity>
       </View>
    )
}

Text_Button.defaultProps = {
    title: "title",
    style: {},
    disable: false,
    onpress: () => alert("yeyy")
}

const styles = StyleSheet.create({
    btnConatiner: {
        ...commonStyles._center,
    },

    btnText :{
        fontFamily: FONTS.WorkSans_Regular,
        color:COLORS.accent,
        fontSize: FS_val(15, 700),
        letterSpacing:-0.8
    }

})

export default Text_Button