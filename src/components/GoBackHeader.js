import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FS_height, FS_val, width } from '../utils/Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import commonStyles from '../assets/styles/CommonStyles';
import If from './If';
import Label from './Label';

const GoBackHeader = (props) => {

  return (
    <View style={[styles._Container, { backgroundColor: COLORS.primary }, props.style]}>
      <TouchableOpacity style={[styles.arrowContainer]} activeOpacity={0.8}
        onPress={() => props.onpress()}>
       <AntDesign name="arrowleft" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
      <If condition={props.title}>
        <Label style={styles.title}>{props.title}</Label>
      </If>

    </View>
  )
}

GoBackHeader.defaultProps = {
  onpress: () => alert("onpress")
}

const styles = StyleSheet.create({
  _Container: {
    width: width,
    height: 50,
    paddingHorizontal: '2%',
    justifyContent: "center",
    flexDirection: "row"
  },
  arrowContainer: {
    width: 50,
    height: 50,
    ...commonStyles._center,
    position: "absolute",
    left:0

  },
  title: {
    alignSelf: "center",
    fontSize:FS_height(3)
  }
})

export default GoBackHeader