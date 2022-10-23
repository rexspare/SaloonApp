import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useRef } from "react";
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'
import If from '../If'
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput,{isValidNumber} from "react-native-phone-number-input";

const Phone_Input = (props) => {
    const [value, setValue] = useState("");
    const phoneInput = useRef();

    return (
        <>

            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="US"
                layout="first"
                // onChangeText={(text) => {
                //     console.log(text);
                // }}
                onChangeFormattedText={(text) => {
                    props.onChange(text)
                }}
                containerStyle={[Styles.mainContainer,Styles.inputContainer]}
                textContainerStyle={Styles.TextContainer}
                textInputStyle={Styles.inputStyle}
                codeTextStyle={[Styles.inputStyle,{textAlignVertical:"center"}]}
                placeholder={props.placeholder}
                textInputProps={{ placeholderTextColor: COLORS.subtle }}
                flagButtonStyle={{borderRightWidth:1, borderColor:COLORS.subtle}}
            />
        </>
    )
}

Phone_Input.defaultProps = {
    title: "title",
    placeholder: "placeholder",
    onChange: () => { },
    isPassword: false,
    isInvalid: false
}

const Styles = StyleSheet.create({
    mainContainer: {
        width: '88%',
        maxWidth: 500,
        alignSelf: "center",
    },
    inputContainer: {
        height: 50,
        borderRadius: 5,
        ...commonStyles._border,
        elevation: 3,
        backgroundColor:COLORS.primary

    },
    inputStyle: {
            height:50,
        fontFamily: FONTS.WorkSans_Medium,
        fontSize: FS_val(15, 700),
        // backgroundColor:COLORS.primary
        
    },
    TextContainer:{
        borderTopRightRadius:5,
        borderBottomRightRadius:5, 
        backgroundColor: COLORS.primary
    }

})


export default Phone_Input