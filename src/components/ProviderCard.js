import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React ,{useEffect, useState}from 'react'
import { COLORS, FONTS, FS_height, FS_val, width,  } from '../utils/Common'
import { getGeoCodePosition, getRatingText } from '../utils/MyUtils'
import Label from './Label'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BASE_URL } from '../Data/remote/Routes'

const ProviderCard = (props) => {
  const address = "Bukhari Lane 12, Karachi (Defense Housing Association)"
  const [formattedAddrees, setformattedAddrees] = useState('')
  const {item} = props
  useEffect(() => {
    getGeoCodePosition(parseFloat(item?.business_lat), parseFloat(item?.business_long), setformattedAddrees)
  }, [item?.business_lat])
  
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.container, props.style]}
    onPress={() => props.onpress()}>
      <Image source={item?.user_image ? {uri : BASE_URL + "uploads/" +  item?.user_image } : require('../assets/images/business.png')}
        style={styles.image}
        resizeMode="contain"
        />
      <View>
        <Label style={styles.name}>{item?.business_name}</Label>
        <Label style={styles.address}>
          {formattedAddrees.slice(0,37).concat("...")}</Label>
        <View style={styles.ratingContainer}>
            <AntDesign name='star' size={FS_height(2.2)} color="#ffa534"/>
            <Label style={styles.ratingTxt}>{`${item.rating} ${getRatingText(item.rating)}`}</Label>
            {/* <Label style={styles.ratingCount}>{`${}`}</Label> */}
        </View>
      </View>
    </TouchableOpacity>
  )
}

ProviderCard.defaultProps = {
  onpress : () =>{}
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: 10
  },
  image: {
    width: "100%",
    height: width / 2,
    borderRadius: FS_val(5, 700)
  },
  name :{
    textAlign :"left"
  },
  address :{
    textAlign:"left",
    fontSize :FS_height(2.2),
    fontFamily:FONTS.WorkSans_Regular,
    color:COLORS.subtle
  },
  ratingContainer :{
    flexDirection:'row',
    alignItems:'center',
    marginBottom : '2%'
  },
  ratingTxt:{
    fontSize: FS_height(2.2),
    marginHorizontal: 5
  },
  ratingCount :{
    fontSize: FS_height(2.2),
    fontFamily:FONTS.WorkSans_Regular,
    color:COLORS.subtle,
    paddingLeft: 5
  }
})

export default ProviderCard