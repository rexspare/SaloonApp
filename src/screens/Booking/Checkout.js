import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import commonStyles from '../../assets/styles/CommonStyles'
import {Auth_Button} from '../../components/Buttons'
import { Layout, ServiceHeader, Heading, Label, KeyValue } from '../../components'
import { COLORS } from '../../utils/Common'
import { styles } from './styles'
import { lang } from '../../assets/languages'

const Checkout = (props) => {
  return (
    <View>
      <Text>Checkout</Text>
    </View>
  )
}

export default Checkout