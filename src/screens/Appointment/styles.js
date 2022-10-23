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
        width: width,
        minHeight: 80,
        height: height * 0.1,
        maxHeight: 120,
        backgroundColor: COLORS.ServiceHeader,
        justifyContent: 'center',
        paddingLeft: '5%'
    },
    upAppoints: {
        fontSize: FS_height(3.2),
        textAlign: "left",
        color: COLORS.primary
    },
    swipeBTN: {
        width: width * 0.3,
        height: '100%',
        backgroundColor: COLORS.danger,
    },
    MainConatner: {
        flex: 1,
        // borderWidth: 2,
    },
    header: {
        width: width,
        height: height * 0.075,
        flexDirection: 'row',
        // borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    map: {
        ...StyleSheet.absoluteFillObject,
        height: height * 0.925,
        width: width
    },

    mapContainer: {
        height: height * 0.925,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Field: {
        width: width,
        marginVertical: height * 0.015,
        borderRadius: FS_height(1),
        justifyContent: 'space-between',
        borderRadius: FS_height(1),
        position: 'absolute',
        top: FS_height(1),
        alignItems: 'center'
    },
    BtnContainer: {
        flexDirection: 'row',
        width: width * 0.82,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: FS_height(5)
    },

    squareBtn: {
        width: 50,
        height: 50,
        ...commonStyles._center,
        backgroundColor: COLORS.secondary,
        borderRadius: 10
    },

})


export { styles }