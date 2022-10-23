import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FS_height, FONTS } from '../utils/Common'
import Label from './Label'
import Icon from "react-native-vector-icons/Foundation"
import If from './If'


const KeyValue = (props) => {
    const { _key, value } = props

    const getGender = (gender) => {
        switch (gender) {
            case 'male':
                return "male-symbol";
            case 'female':
                return "female-symbol";
            case 'male and female':
                return 'male-symbol';
            default:
                return 'male-symbol'
        }
    }

    return (
        <View style={styles.main}>
            <Label>{_key}</Label>
            <If condition={_key != 'Service For'}>
                <Label style={styles.cat}>{value}</Label>
            </If>
            <If condition={_key == 'Service For'}>
                <Icon name={getGender(value)} size={FS_height(3.6)} color={COLORS.secondary} />
            </If>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        borderBottomWidth: 1 / 2,
        borderColor: COLORS.subtle,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 15
    },
    cat: {
        fontSize: FS_height(2.3),
        fontFamily: FONTS.WorkSans_Medium,
        lineHeight: FS_height(3)
    }
})

export default KeyValue