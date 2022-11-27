import React, { useEffect, useState } from 'react';
import { Platform, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { COLORS } from '../utils/Common';
import Home from '../screens/Home'
import Appointment from '../screens/Appointment';
import Profile from '../screens/Profile';
import ViewProfile from '../screens/Profile/ViewProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import Setting from '../screens/Setting';
import Service from '../screens/Service';
import OnMap from '../screens/Service/OnMap';
import SearchServices from '../screens/Service/SearchServices';
import Searchresult from '../screens/Service/Searchresult';
import BookService from '../screens/Booking';
import Checkout from '../screens/Booking/Checkout';
import SelectTime from '../screens/Booking/SelectTime';
import Favorites from '../screens/Favorites';
import PolyMap from '../screens/Appointment/PolyMap';
import Vendors from '../screens/Vendors';
import TermsConditions from '../screens/About/TermsConditions'
import PrivacyPolicy from '../screens/About/PrivacyPolicy'
import ChangePassword from '../screens/Setting/ChangePassword';
import Reviews from '../screens/Reviews';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function RootStack() {

  return (
    <NavigationContainer>
      <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : 'light-content'}
        backgroundColor={COLORS.secondary } />
         <Stack.Navigator screenOptions={{
        headerShown: false,
        animation:"slide_from_right"
    }}>
        <Stack.Screen name='App' component={TabStack}/>
        <Stack.Screen name='ViewProfile' component={ViewProfile}/>
        <Stack.Screen name='Setting' component={Setting}/>
        <Stack.Screen name='Service' component={Service} />
        <Stack.Screen name='OnMap' component={OnMap} />
        <Stack.Screen name='SearchService' component={SearchServices} />
        <Stack.Screen name='SearchResult' component={Searchresult} />
        <Stack.Screen name='Bookservice_1' component={BookService} />
        <Stack.Screen name='SelectTime' component={SelectTime} />
        <Stack.Screen name='Checkout' component={Checkout} />
        <Stack.Screen name='Favorites' component={Favorites} />
        <Stack.Screen name='PolyMap' component={PolyMap} />
        <Stack.Screen name='Vendors' component={Vendors} />
        <Stack.Screen name='Terms' component={TermsConditions} />
        <Stack.Screen name='Privacy' component={PrivacyPolicy} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='Reviews' component={Reviews} />
    </Stack.Navigator>
    
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

const TabStack = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let keyboardEventListeners;
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach(eventListener => eventListener.remove());
      }
    };
  }, []);

  const user = useSelector((state) => state.authReducer.user)
  const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn)

  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarItemStyle: {},

      tabBarStyle: { height: Platform.OS === 'ios' ? 85 : 55,},
      tabBarShowLabel:false
    }}
  >
    <Tab.Screen name='Home' component={Home}
      options={{
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Ionicons
              name={focused ? "ios-compass" : 'ios-compass-outline'}
              size={35}
              color={COLORS.secondary} />
          )
        }
      }} />
    <Tab.Screen name="Appointment" component={Appointment}
      options={{
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Ionicons
              name={focused ? "ios-calendar" : 'ios-calendar-outline'}
              size={30}
              color={COLORS.secondary} />
          )
        }
      }} />
    <Tab.Screen name="Profile" component={ !isUserLoggedIn ? AuthStack : Profile}
      options={{
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Ionicons
              name={focused ? "person" : 'person-outline'}
              size={30}
              color={COLORS.secondary} />
          )
        }
      }} />
  </Tab.Navigator>
  )
}