import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import commonStyles from '../assets/styles/CommonStyles'
import { COLORS } from '../utils/Common'
import If from './If'
import Feather from 'react-native-vector-icons/Feather';

const CheckBox = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.7}
            onPress={() => props.onpress()}
            style={[styles.main, props.active ?? styles.active]}>
            <If condition={props.active}>
                <Feather name='"check' color={COLORS.pure_White} size={13} />
            </If>
        </TouchableOpacity>
    )
}

CheckBox.defaultProps = {
    active: false,
    onpress: () => { }
}

const styles = StyleSheet.create({
    main: {
        // 2196F3
        width: 20,
        height: 20,
        ...commonStyles._center,
        backgroundColor: COLORS.pure_White,
        elevation: 4,
        borderWidth: 2,
        borderColor: COLORS.subtle,
        borderRadius: 2
    },
    active: {
        backgroundColor: "#2196F3",
        borderWidth: 0
    }

})

export default CheckBox