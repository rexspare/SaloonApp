import { StyleSheet } from "react-native";
import { FS_height, FONTS, COLORS, width, height } from "../../utils/Common";
import commonStyles from "../../assets/styles/CommonStyles";

const styles = StyleSheet.create({
    noAppoints: {
        fontSize: FS_height(3.8),
        textAlign: "left",
        marginTop: '15%',
        paddingLeft: "5%"
    },
    absolutecontainer: {
        width: width * 0.85,
        alignSelf: 'center',
        paddingVertical: 10,
        ...commonStyles._center,
        top: height * 0.2
    },
    image: {
        width: 100,
        height: 100
    },
    label: {
        color: COLORS.subtle,
        fontSize: FS_height(2.2),
        fontFamily: FONTS.WorkSans_Regular,
        lineHeight: FS_height(3.2),
        marginBottom: FS_height(3)
    },
    upcomingHeader: {
        width:width,
        minHeight: 80,
        height: height * 0.1,
        maxHeight: 120,
        backgroundColor: COLORS.ServiceHeader,
        paddingLeft: '5%',
        flexDirection:'row',
        alignItems:'center'
    },
    upAppoints :{
        fontSize: FS_height(3.2),
        textAlign: "left",
        color: COLORS.primary
    },
    swipeBTN :{
        width: width * 0.3,
        height: '100%',
        backgroundColor:COLORS.danger,
    }
})


export { styles }