import { View, Text, SafeAreaView, StyleSheet, Image, Platform } from 'react-native'
import React from 'react'
import { Heading, If, Label, Layout } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common'
import { lang } from '../../assets/languages'
import W45_BTN from '../../components/Buttons/W45_BTN'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import Favorite_Services from './Favorite_Services'

const DATA = [
  {}
]

const Favorites = (props) => {


  return (
    <View style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
      {/* NO FAVORITES ADDED */}
      {
        Platform.OS === 'ios' ?
          <View style={{ width: width, height: 25, backgroundColor: COLORS.ServiceHeader }} />
          :
          <StatusBar backgroundColor={COLORS.ServiceHeader} barStyle={"light-content"} />
      }
      <If condition={DATA.length == 0}>
        <Layout fixed={true}>
          <Heading style={styles.noAppoints}>{lang._87}</Heading>
          <View style={[styles.absolutecontainer, { width: width * 0.9 }]}>
            <Image source={require("../../assets/images/No_Appoints.jpg")}
              style={styles.image} />
            <Heading style={{ marginVertical: FS_height(2), fontSize: FS_height(3) }}>{lang._88}</Heading>
            <Label style={styles.label}>{lang._89}</Label>
            <W45_BTN title={lang._90}
              onpress={() => { props.navigation.navigate("Home") }}
            />
          </View>
        </Layout>
      </If>
      {/* END */}
      {/* ================================= */}
      {/*  FAVORITES */}
      <If condition={DATA.length != 0}>
        <Layout fixed={true}>
          <Favorite_Services
            goBack={() => props.navigation.goBack()}
            gotoService={() => props.navigation.navigate("Bookservice_1")}
          />
        </Layout>
      </If>
    </View>
  )
}

export default Favorites