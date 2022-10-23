import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'

const Social_Button = (props) => {


const titleSelector = () => {
    switch(props.type) {
        case "google" : 
        return "Continue with Google";
        case "facebook" : 
        return "Continue with Facebook";
        default :
        return "type";
    }
}

const iconSelector = () => {
    switch(props.type){
        case "google" : 
        return require("../../assets/images/Google-logo.png");
        case "facebook" : 
        return require("../../assets/images/Facebook-logo.png");
        default :
        return require("../../assets/images/Facebook-logo.png");
    }
}

    return (
        <TouchableOpacity style={[
            styles.btnConatiner,
            props.style
        ]}
            disabled={props.disable}
            activeOpacity={0.7}
            onPress={() =>props.onpress()}
        >
                <Image source={iconSelector()}
                style={styles.icon}
                />

            <Text style={styles.btnText}>{titleSelector()}</Text>
        </TouchableOpacity>
    )
}

Social_Button.defaultProps = {
    style: {},
    disable: false,
    onpress: () =>{}
}

const styles = StyleSheet.create({
    btnConatiner: {
        flexDirection:"row",
        width: "88%",
        maxWidth: 500,
        height: 50,
        borderRadius: 3,
        backgroundColor:COLORS.primary,
        ...commonStyles._border,
        ...commonStyles._center,
    },

    btnText :{
        fontFamily: FONTS.WorkSans_Medium,
        color:COLORS.pure_Black,
        fontSize: FS_val(16, 700)
    },
    icon: {
        width: 28,
        height : 28,
        position:"absolute",
        left:'3%',
    }

})


export default Social_Button