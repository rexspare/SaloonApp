import { StyleSheet } from "react-native";
import commonStyles from "../../assets/styles/CommonStyles";
import { COLORS, FONTS, FS_height, height, width } from "../../utils/Common";

const styles = StyleSheet.create({
    HeaderContainer: {
        width: width,
        minHeight: 50,
        height: height * 0.1,
        maxHeight: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute"
    },
    backBtn: {
        width: 50,
        height: '100%',
        ...commonStyles._center
    },
    twoBtnContainer: {
        height: '100%',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    coverContainer: {
        width: width,
        height: width * 0.6 + 50,
        maxHeight: height * 0.45
    },
    brand: {
        fontSize: FS_height(3.5),
        marginTop: FS_height(2),
        marginBottom: FS_height(1.5)
    },
    brandSelectTime :{
         marginTop: 20, 
         paddingLeft: '4%',
         fontSize: FS_height(3.3),
    },
    cate: {
        fontSize: FS_height(2.3),
        color: COLORS.subtle,
        fontFamily: FONTS.WorkSans_Regular,
        lineHeight: FS_height(3)
    },

    address: {
        color: COLORS.secondary,
        fontSize: FS_height(2.4),
        textAlign: "left",
        marginVertical: FS_height(1)
    },
    mapBtn: {
        color: COLORS.Links,
        fontSize: FS_height(2.4)
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '2%',
        marginVertical: FS_height(2)
    },
    ratingTxt: {
        fontSize: FS_height(2.2),
        marginHorizontal: 5
    },
    ratingCount: {
        fontSize: FS_height(2.2),
        fontFamily: FONTS.WorkSans_Regular,
        color: COLORS.subtle,
        paddingLeft: 5
    },
    absoluteBTNCnntainer:{
        minHeight : 65,
        height : height * 0.11,
        maxHeight: 82,
        backgroundColor: COLORS.primary,
        ...commonStyles._center,
    },
    noAppoints: {
        fontSize: FS_height(2.5),
        textAlign: "left",
        paddingLeft: "5%",
        marginTop: 10
    },
    absolutecontainer: {
        width: width * 0.85,
        alignSelf: 'center',
        paddingVertical: 10,
        ...commonStyles._center,
        marginTop: 10
    },
    image: {
        width: 100,
        height: 100
    },
    noDateSelected :{
        textAlign:'center',
        fontFamily:FONTS.WorkSans_Regular,
        alignSelf:'center',
        marginTop: 15
    }
})


export { styles }