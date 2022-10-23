import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CommonStyles from '../../../assets/styles/CommonStyles'
import { height, width, COLORS, FS_height, FS_val, FONTS } from '../../../utils/Common'
import { lang } from '../../../assets/languages'
import { Layout, Heading, Text_type1, Label, CurveHeader } from '../../../components'
import { Auth_Input, Phone_Input } from '../../../components/Input'
import { Auth_Button, Social_Button, Text_Button } from '../../../components/Buttons'
import apiRequest from '../../../Data/remote/Webhandler'
import { ROUTES } from '../../../Data/remote/Routes'
import { showFlash } from '../../../utils/MyUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Verify = (props) => {
  const [togglePolicy, settogglePolicy] = useState(false)
  const [toggleNotification, settoggleNotification] = useState(false)
  const { navigation, route } = props

  const [isLoading, setisLoading] = useState(false)
  const [token, settoken] = useState('')

  const handlecontinue = async () => {
    setisLoading(true)
    if (token != "") {
      const result = await apiRequest({
        method: "post",
        url: ROUTES.VERIFY_USER,
        data: { token },
      }).catch((err) => {
        showFlash("Somehomg Went Wrong", "danger", 'auto')
        setisLoading(false)
      });
      if (result.data.status) {
        showFlash(result.data.message, 'success', 'none')
        props.navigation.navigate("SignIn", { email : route.params.email})
        AsyncStorage.removeItem("@Email")
      } else {
        showFlash(result.data.message, 'danger', 'none')

      }
    } else {
        showFlash("Please Enter the OTP sent!", "warning", "auto")
    }
    setisLoading(false)

  }
 

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Layout fixed={false}>
        <View style={{height : height - 60}}>
        <CurveHeader />
        <View style={{}}>

          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.HeaderContainer}>
            <Heading style={{ fontSize: FS_val(24, 700), marginBottom: 7, letterSpacing: 0, textAlign:"left" }}>
              {`${lang._32} `}</Heading>

            <Text_type1 style={{ textAlign: "left" , }}>
              {`${lang._33} ${route.params?.email ?? ""}`}</Text_type1>
          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>


            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._34}</Label>
              <Auth_Input
                placeholder={lang._34}
                onChange={settoken}
                
              />
            </View>

          </View>
          {/*  ==============   END   =================== */}

        


        </View>

        <View style={styles.absoluteContainer}>
          <Auth_Button title={lang._3}
          isLoading={isLoading}
          onpress={() =>handlecontinue()}
          />
         </View>

         </View>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({


  HeaderContainer: {
    width: width,
    paddingHorizontal: '8%',
    paddingVertical: 25,
    
  },

  sectionContainer: {
    // paddingHorizontal: '5%',
    marginBottom: 15,
    ...CommonStyles._center,
  },
  inputContainer: {
    width: width,
    // borderWidth:2,
    alignItems: "flex-start",
    marginBottom: 20
  },

  labelStyles: {
    paddingVertical: 8,
    marginLeft: width * 0.06,
    fontSize: FS_height(2.3),
    fontFamily: FONTS.WorkSans_SemiBold
  },

  absoluteContainer :{
    ...CommonStyles._center,
    paddingVertical :10,
    position:"absolute",
    width:width,
    bottom:0
  }
 
 
})

export default Verify

