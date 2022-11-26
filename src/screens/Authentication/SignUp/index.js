import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import CommonStyles from '../../../assets/styles/CommonStyles'
import { height, width, COLORS, FS_height, FS_val, FONTS } from '../../../utils/Common'
import { lang } from '../../../assets/languages'
import { Layout, Heading, Text_type1, Label, CurveHeader } from '../../../components'
import { Auth_Input, Phone_Input } from '../../../components/Input'
import { Auth_Button, Social_Button, Text_Button } from '../../../components/Buttons'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../Data/Local/Store/Actions/AuthActions'
import { showFlash } from '../../../utils/MyUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUp = (props) => {
  const [togglePolicy, settogglePolicy] = useState(true)
  const { navigation, route, } = props
  const dispatch = useDispatch()

  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [password, setpassword] = useState('')
  const [phone, setphone] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const handlecontinue = async () => {
    setisLoading(true)
    if (firstName != '' && lastName != '' && password != '' && phone != '' && togglePolicy) {
      const result = dispatch(
        registerUser({
          email: route.params.email,
          username: firstName + " " + lastName,
          phone,
          role: 'customer',
          password
        },
          () => callBack())
      );
      if (result) {

      }

    } else {
      if (!togglePolicy) {
        showFlash("You need to Agree to terms!", 'danger', 'none')
      } else {
        showFlash("All Fields are required!", 'danger', 'none')
      }
    }
    setisLoading(false)

  }

  const callBack = () => {
    showFlash("Success! you can now sign in to Nuyou!", 'success', 'none')
    props.navigation.replace("SignIn", { email : route.params.email})
    // AsyncStorage.setItem("@Email", route.params.email)
  }

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Layout fixed={false}>
        <CurveHeader />
        <View style={{}}>

          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.HeaderContainer}>
            <Heading style={{ fontSize: FS_val(22, 700), marginBottom: 7, letterSpacing: 0 }}>
              {"" + lang._8}</Heading>

            <Text_type1 style={{ textAlign: "left" }}>
              {`${lang._9} ${route.params?.email ?? ""}, ${lang._10}`}</Text_type1>
          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._11}</Label>
              <Auth_Input
                placeholder={lang._12}
                onChange={setfirstName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._13}</Label>
              <Auth_Input
                placeholder={lang._14}
                onChange={setlastName}

              />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._15}</Label>
              <Auth_Input
                placeholder={lang._16}
                isPassword={true}
                onChange={setpassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._17}</Label>
              <Phone_Input
                onChange={setphone}
                placeholder={"phone #"}
              />

            </View>
          </View>
          {/*  ==============   END   =================== */}

          <View style={styles.sectionContainer}>
            <View style={styles.agreementContainer}>

              <CheckBox
                disabled={false}
                value={togglePolicy}
                onValueChange={(newValue) => { settogglePolicy(newValue) }}
                tintColors={{ true: COLORS.Links, false: "#rf66tt" }}
                onTintColor="#FF0000"
                style={{ marginLeft: '5%', marginRight: '3%' }}
              />

              <Label style={styles.LabelAgree}>{lang._18}
                <Text onPress={() => alert("geg")} style={[styles.agreebtn]}>Pricvacy Policy</Text>
                {" "}and{" "}
                <Text style={[styles.agreebtn]}>Term & Conditions </Text>
              </Label>
            </View>

            <Auth_Button title={lang._21}
              onpress={() => handlecontinue()}
              isLoading={isLoading}
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
    paddingHorizontal: '5%',
    paddingVertical: 25,
    ...CommonStyles._center,
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
  }
  ,
  agreementContainer: {
    flexDirection: 'row',
    width: "100%",
    marginBottom: 15
  },
  LabelAgree: {
    fontSize: FS_height(2),
    fontFamily: FONTS.Merriweather_Regular,
    textAlign: "left",
    width: '70%'
  },

  agreebtn: {
    color: COLORS.Links,
    fontSize: FS_height(2),
    fontFamily: FONTS.Merriweather_Regular,
  }
})

export default SignUp


//Certificate fingerprints:
// SHA1: 44:9C:30:85:26:14:DD:53:51:EF:93:49:E2:B9:AA:2A:06:85:13:82
// SHA256: D8:3D:D5:E5:90:63:B3:32:6B:08:DE:01:49:2E:DB:F4:87:43:77:4E:45:49:2E:55:62:CA:4E:76:1E:2C:EF:F8
// Signature algorithm name: SHA256withRSA
// Subject Public Key Algorithm: 2048-bit RSA key