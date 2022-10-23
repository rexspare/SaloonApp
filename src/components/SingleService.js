import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_height, width } from '../utils/Common'
import Label from './Label'
import { BASE_URL } from '../Data/remote/Routes'
import commonStyles from '../assets/styles/CommonStyles'

const SingleService = (props) => {
  const { item } = props
  return (
    <TouchableOpacity style={styles.mainContainer} activeOpacity={0.8}
      onPress={() => props.onpress()}>
      <View style={styles.circle}>
        <Image source={{ uri: BASE_URL + "uploads/" + item.category_image }}
          style={styles.circleImage}
          resizeMode="contain" />
      </View>
      <View style={styles.titleContainer}>
        <Label style={styles.title}>{item.service_title.length > 20 ?
          item.service_title.slice(0, 20) + "..." : item.service_title}</Label>
        <Text style={styles.time}>{item.service_time}</Text>
      </View>
      {/* PRICE */}
      <View style={styles.price}>
        <Label style={styles.priceTxt}>{item.service_price}</Label>
      </View>

    </TouchableOpacity>
  )
}

SingleService.defaultProps = {

}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: FS_height(1),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: '3%',
    borderBottomWidth: 1,
    borderColor: COLORS.subtle
  },
  circle: {
    borderWidth: 1,
    borderRadius: width * 0.07,
    padding: 1,
    ...commonStyles._center
  },
  circleImage: {
    width: width * 0.12 - 2,
    height: width * 0.12 - 2,
    borderRadius: width * 0.06
  },
  titleContainer: {
    height: "100%",
    paddingHorizontal: 10
  },
  title: {
    fontSize: FS_height(2.3)
  },
  time: {
    fontSize: FS_height(2),
    fontFamily: FONTS.WorkSans_Regular,
    color: COLORS.subtle
  },
  price: {
    position: "absolute",
    right: '4%'
  },
  priceTxt: {
    fontSize: FS_height(2.8),
    fontFamily: FONTS.WorkSans_Medium
  }
})

export default SingleService