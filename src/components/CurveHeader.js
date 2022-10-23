import { View, ImageBackground, StyleSheet } from 'react-native'
import Branding from './Branding'
import React from 'react'
import { COLORS, height, width } from '../utils/Common'
import CommonStyles from '../assets/styles/CommonStyles'

const CurveHeader = () => {
  return (
    <View style={styles.curveContainer}>
      <ImageBackground
        source={require("../assets/images/Image_1.jpg")}
        style={styles.curveContainer}
      >
        <View style={styles.branding} >
          <Branding style={{width: 55, height: 55}}/>
        </View>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({

  curveContainer: {
    width: width,
    height: height * 0.16,
    alignItems: "center",
    ...CommonStyles._center
  },

  branding: {
    marginTop: height * 0.06,
    backgroundColor:COLORS.primary,
    borderRadius: 10,
    padding : 7,
    elevation: 5
  }

})


export default CurveHeader