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
import { useDispatch } from 'react-redux'
import {setUser, setIsUserLoggedIn} from '../../../Data/Local/Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../../utils/StorageKeys'

const SignIn = (props) => {
  const { navigation, route } = props
  const dispatch = useDispatch()
  const [password, setpassword] = useState("")
  const [isLoading, setisLoading] = useState(false)

  const handlecontinue = async () => {
    setisLoading(true)
    if (password != "") {
      const result = await apiRequest({
        method: "post",
        url: ROUTES.LOGIN,
        data: {email :route.params.email, password, role : "customer" }
      }).catch((err) => {
        showFlash("Somehomg Went Wrong", "danger", 'auto')
        setisLoading(false)
      });
      if (result?.data?.status) {
        console.log(result.data);
        showFlash(result.data.message, 'success', 'none')
        dispatch(setUser(result?.data?.userData))
        AsyncStorage.setItem(storage_keys.USER_DATA_KEY, JSON.stringify(result?.data?.userData))
        dispatch(setIsUserLoggedIn(true))
        AsyncStorage.removeItem("@Email")
      } else {
        showFlash(result.data.message, 'danger', 'none')

      }
    } else {
        showFlash("Please Enter your password!", "warning", "auto")
    }
    setisLoading(false)

  }

  const handleForgot = async () => {
    setisLoading(true)
      const result = await apiRequest({
        method: "post",
        url: ROUTES.RESET_PASSWORD,
        data: { email : route.params.email },
      }).catch((err) => {
        showFlash("Somehomg Went Wrong", "danger", 'auto')
        setisLoading(false)
      });
      if (result?.data?.status) {
        showFlash(result.data.message, 'success', 'none')
        navigation.replace("SignIn", {email : route.params.email})
      } else {
        showFlash(result.data.message, 'danger', 'none')

      }
    setisLoading(false)

  }

  return (
    <View style={CommonStyles.container}>
      <Layout fixed={true}>
        <View style={{height : height - 60}}>
        <CurveHeader />
        <View style={{}}>

          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.HeaderContainer}>
            <Heading style={{ fontSize: FS_val(24, 700), marginBottom: 7, letterSpacing: 0, textAlign:"left" }}>
              {`${lang._23} `}</Heading>

            <Text_type1 style={{ textAlign: "left" , }}>
              {`${lang._22} ${route.params?.email ?? ""}`}</Text_type1>
          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>


            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._15}</Label>
              <Auth_Input
                placeholder={lang._16}
                isPassword={true}
                onChange={setpassword}
              />
            </View>

            <Text_Button  title={lang._24 + "?"} 
            textStyles={{fontSize:FS_height(2.4), color:COLORS.Links}}
            style={{marginLeft : '-40%'}}
            onpress={() => handleForgot()}
            />

          </View>
          {/*  ==============   END   =================== */}

        


        </View>

        <View style={styles.absoluteContainer}>
          <Auth_Button title={lang._29}
          onpress={() => handlecontinue()}
          isLoading={isLoading}
          />
         </View>

         </View>
      </Layout>
    </View>
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
    bottom:FS_height(3)
  }
 
 
})

export default SignIn


//Certificate fingerprints:
// SHA1: 44:9C:30:85:26:14:DD:53:51:EF:93:49:E2:B9:AA:2A:06:85:13:82
// SHA256: D8:3D:D5:E5:90:63:B3:32:6B:08:DE:01:49:2E:DB:F4:87:43:77:4E:45:49:2E:55:62:CA:4E:76:1E:2C:EF:F8
// Signature algorithm name: SHA256withRSA
// Subject Public Key Algorithm: 2048-bit RSA key