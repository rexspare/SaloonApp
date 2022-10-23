import { StyleSheet } from "react-native";
import { FS_height } from "../../utils/Common";

const styles = StyleSheet.create({

    nothingContainer: {
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: '2%'
    },
    noResults: {
        fontSize: FS_height(3.5),
        textAlign: "left",
    },
    nothingfound: {
        width: 200,
        height: 200
    }

});

export { styles}