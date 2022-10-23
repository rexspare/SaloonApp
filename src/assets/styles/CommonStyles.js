import { StyleSheet } from "react-native";
import { COLORS, FONTS, FS_val } from "../../utils/Common";

const commonStyles = StyleSheet.create({

    container :{
        flex:1,
        backgroundColor:COLORS.primary,
    },

    _center: {
        justifyContent: "center",
        alignItems: "center"
    },
    _errorText :{
        color:"#ff0000",
        fontFamily:FONTS.WorkSans_Medium,
        alignSelf:"flex-start",
        marginLeft: "6%",
        marginTop:10,
        fontSize: FS_val(13, 700)
    },

    _border :{
        borderWidth:1,
        borderColor : COLORS.subtle
    },
    textLeft :{
        textAlign:'left',
        paddingLeft:'5%'
    }
    ,
    fs_12: { fontSize: 12 },
    fs_16: { fontSize: 16 },
    fs_14: { fontSize: 14 },
    fs_20: { fontSize: 20 },
    fs_28: { fontSize: 28 },
    fs_40: { fontSize: 40 },

    fw_500: { fontWeight: '500' },
    fw_600: { fontWeight: '600' },
    fw_400: { fontWeight: '400' },
})

export default commonStyles