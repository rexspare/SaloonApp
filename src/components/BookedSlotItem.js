import { View, StyleSheet } from 'react-native'
import React from 'react'
import { FS_height, width } from '../utils/Common'
import Text_type1 from './Text_type1'
import { lang } from '../assets/languages'
import {tConvert} from '../utils/MyUtils'

const BookedSlotItem = (props) => {
    const {item} = props
  return (
    <View style={styles.main}>
      <Text_type1>{`${lang._75} ${tConvert(item?.startTime)}`}</Text_type1>
      <Text_type1>{`${lang._76} ${tConvert(item?.endTime)}`}</Text_type1>
    </View>
  )
}

const styles = StyleSheet.create({
main :{
    paddingVertical:FS_height(2),
    borderBottomWidth:1/2,
    width: width * 0.9,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center"
}
})

export default BookedSlotItem