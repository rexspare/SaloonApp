import { StyleSheet } from "react-native";
import { FS_height, COLORS, FONTS, width, height } from "../../utils/Common";

const styles = StyleSheet.create({
    sectiionHeader: {
        width: width,
        height: height * 0.27,
        paddingTop: 10,
        alignItems: "flex-start",
    },
    _circle: {
        position: 'absolute',
        backgroundColor: COLORS.accent,
        width: width,
        height: width,
        borderRadius: width,
        bottom: width / 15,
        right: width / 3.3
    },
    _heading: {
        fontSize: FS_height(4.5),
        fontFamily: FONTS.WorkSans_Bold,
        marginLeft: '6%',
        marginTop: height * 0.02
    },
    _lable: {
        fontFamily: FONTS.WorkSans_Regular,
        marginLeft: '6%'
    },
    _input: {
        marginTop: 15
    },
    _header: {
        alignSelf: "flex-start",
        paddingLeft: '5%',
        fontSize: FS_height(3.2),
        marginVertical: FS_height(0.5),
    },
    _row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "5%"
    },
    nothing_found: {
        width: width * 0.9,
        height: FS_height(15),
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    Cat_lisContainer: {
        flexDirection: 'row',
        paddingHorizontal: '4%',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        marginTop: 10
    },

})

export { styles }