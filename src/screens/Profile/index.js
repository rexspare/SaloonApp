import { View, Linking, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Heading, Layout, MenuItem } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FS_height, height, width } from '../../utils/Common'
import { Text_Button } from '../../components/Buttons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { lang } from '../../assets/languages'
import { useDispatch, useSelector } from 'react-redux'
import { setIsUserLoggedIn, setUser } from '../../Data/Local/Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../utils/StorageKeys'
import { BASE_URL} from '../../Data/remote/Routes'


const Profile = (props) => {
  
const Menu = [
  {
    id: 1,
    title: "My appointments",
    Icon: <MTCIcons name='calendar-month-outline' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Appointment",
    action : () => props.navigation.navigate("Appointment")
  },
  {
    id: 2,
    title: "My favorites",
    Icon: <Feather name='heart' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Favorites",
    action : () => props.navigation.navigate("Favorites")
  },
  {
    id: 3,
    title: "My orders",
    Icon: <Feather name='shopping-bag' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Appointment",
    action : () => props.navigation.navigate("Appointment")
  },
  {
    id: 4,
    title: "Settings",
    Icon: <Ionicons name='md-settings-outline' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Setting",
    action : () => props.navigation.navigate("Setting")
  },
  {
    id: 5,
    title: "Customer Support",
    Icon: <Feather name='life-buoy' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Appointment",
    action :() => Linking.openURL('mailto:nuyoubahamas@gmail.com')
  },
  {
    id: 6,
    title: "Log out",
    Icon: <Feather name='log-out' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Logout",
    action :() => handleLogout()
  },
]
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user)

  const handleLogout = () => {
    AsyncStorage.removeItem(storage_keys.USER_DATA_KEY)
      .then(() => {
        dispatch(setIsUserLoggedIn(false))
       dispatch(setUser({})) 
      })
  }

  useEffect(() => {
  console.log(user.username);
  },[])

  let avatar = user?.user_image ?
        user?.user_image?.includes('http') ?
            user?.user_image :
            BASE_URL + "uploads/" + user?.user_image
        :
        "https://www.w3schools.com/w3images/avatar2.png"

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
      <Layout fixed={false}>
        {/* Header */}
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: avatar }}
              style={styles.image} />
          </View>
          <Heading style={{ fontSize: FS_height(3.5), marginTop: '3%' }}>{user.username}</Heading>
          <Text_Button title={lang._42} textStyles={styles.viewProfile}
            onpress={() => props.navigation.navigate("ViewProfile")} />
        </View>
        {/* List Items */}
        {
          Menu.map((item) => (
            <MenuItem
              key={item.id}
              title={item.title}
              Icon={item.Icon}
              onpress={() => item.action()}
            />
          ))
        }
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: height * 0.41,
    justifyContent: "space-evenly",
    alignItems: 'center',
    paddingTop: "10%",
    paddingBottom: "8%"
  },
  imageContainer: {
    width: width * 0.37,
    height: width * 0.37,
    borderRadius: width * 0.2,
    borderWidth: 3,
    borderColor: COLORS.Links,
    ...commonStyles._center

  },
  image: {
    width: width * 0.37 - 10,
    maxWidth: 200,
    height: width * 0.37 - 10,
    maxHeight: 200,
    borderRadius: width * 0.2,
  },
  viewProfile: {
    color: COLORS.Links,
    fontSize: FS_height(2.4),
  }
})

export default Profile