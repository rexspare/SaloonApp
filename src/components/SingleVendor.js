import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React ,{useEffect, useState} from 'react'
import { COLORS, FONTS, FS_height, width } from '../utils/Common'
import Label from './Label'
import { BASE_URL } from '../Data/remote/Routes'
import commonStyles from '../assets/styles/CommonStyles'
import { getGeoCodePosition } from '../utils/MyUtils'

const SingleVendor = (props) => {
  const { item } = props
  const [formattedAddrees, setformattedAddrees] = useState('')

  useEffect(() => {
    getGeoCodePosition(parseFloat(item?.business_lat), parseFloat(item?.business_long), setformattedAddrees)
  }, [item?.business_lat])
  
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View style={styles.circle}>
        <Image source={{ uri: BASE_URL + "uploads/" }}
          style={styles.circleImage}
          resizeMode="contain" />
      </View>
      <View style={styles.titleContainer}>
        <Label style={styles.title}>{item?.business_name.length > 20 ?
          item?.business_name.slice(0, 20) + "..." : item?.business_name}</Label>
        <Text style={styles.time}>{formattedAddrees.slice(0,22).concat("...")}</Text>
      </View>
      {/* PRICE */}
      <View style={styles.price}>
        <Label style={styles.priceTxt}>{JSON.stringify(item.vendorDistance).slice(0,3)} km</Label>
      </View>
    </TouchableOpacity>
  )
}

SingleVendor.defaultProps = {

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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: FS_height(2.3),
    textAlign:'left'
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

export default SingleVendor