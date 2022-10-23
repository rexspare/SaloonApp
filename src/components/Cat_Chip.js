import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS , FONTS, FS_height} from '../utils/Common'
import commonStyles from '../assets/styles/CommonStyles'
import AntDesign from 'react-native-vector-icons/AntDesign' 
import If from './If'

const Cat_Chip = (props) => {
    const { item } = props
    return (
        <TouchableOpacity style={styles.chipContainer} activeOpacity={0.8}
        onPress={() => props.onpress(item)}>
            <If condition={props.showIcon}>
                <AntDesign name='staro' size={FS_height(2.3)} color={COLORS.Links} style={{marginRight : 5}}/>
            </If>
            <Text style={styles.text}>{item?.category_name}</Text>

        </TouchableOpacity>
    )
}

Cat_Chip.defaultProps = {
showIcon : false,
onpress:() =>{}
}

const styles = StyleSheet.create({
    chipContainer: {
        padding: 8,
        paddingHorizontal: 15,
        borderWidth : 1,
        borderRadius: 40,
        borderColor:COLORS.subtle,
        color : COLORS.Links,
        flexDirection:'row',
        ...commonStyles._center,
        margin: 5
    },
    text :{
        fontFamily: FONTS.WorkSans_Regular,
        fontSize: FS_height(2),
        color: COLORS.Links
    }
})

export default Cat_Chip