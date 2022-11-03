import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DiscoverItem, DiscoverItem_2, Heading, If, Label, Layout, ProviderCard } from '../../components';
import commonStyles from '../../assets/styles/CommonStyles';
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common';
import { lang } from '../../assets/languages'
import Auth_Input from '../../components/Input/Auth_Input';
import { useDispatch, useSelector } from 'react-redux';
import { getNearbyProviders } from '../../Data/Local/Store/Actions/AppActions';
import { styles } from './styles';


const Data = [
  { _id: 1, name: "Beauty Salon", image: "https://picsum.photos/200/300" },
  { _id: 2, name: "Hair Salon", image: "https://picsum.photos/200/300" },
  { _id: 3, name: "Babarshop", image: "https://picsum.photos/200/300" },
  { _id: 4, name: "Tattoo & Peircing", image: "https://picsum.photos/200/300" },
]

const Home = (props) => {
  const user = useSelector((state) => state.authReducer.user)
  const mylocation = useSelector((state) => state.authReducer.mylocaton)
  const permission = useSelector((state) => state.authReducer.isLocationPermissionAllowed)
  const categories = useSelector((state) => state.appReducer.categories)
  const isGettingNearby = useSelector((state) => state.appReducer.isGettingNearby)
  const nearbyData = useSelector((state) => state.appReducer.nearbyVendors)
  const dispatch = useDispatch()

  useEffect(() => {
    if (mylocation?.latitude) {
      dispatch(getNearbyProviders({
        origin: `${mylocation?.latitude},${mylocation?.longitude}`,
        range: `12`
      }))
    }
  }, [mylocation?.latitude])


  const showCategoriesOnMap = (cat) => {
    var vendersByCategory = nearbyData.filter((x) =>
      x.businessDetails?.primary_category?.includes(cat.category_name) || x.businessDetails?.secondary_category?.includes(cat.category_name))
    console.log(vendersByCategory);
    vendersByCategory = vendersByCategory.map((x) => (
      {
        data: x.businessDetails,
        latitude: parseFloat(x.businessDetails?.business_lat),
        longitude: parseFloat(x.businessDetails?.business_long)
      }
    ))
    props.navigation.navigate("OnMap",
      {
        locationArray: vendersByCategory,
        category: cat.category_name
      })
  }


  const showCategoriesList = (cat) => {
    var vendersByCategory = nearbyData.filter((x) =>
      x.businessDetails?.primary_category?.includes(cat.category_name) || x.businessDetails?.secondary_category?.includes(cat.category_name))
    props.navigation.navigate("Vendors",
      {
        vendors : vendersByCategory,
        title : cat.category_name
      })
  }


  return (
    <View style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
      <Layout fixed={false}>

        {/* HEADER SECTION */}
        <View style={[styles.sectiionHeader, {paddingTop :Platform.OS == 'ios' ? 25 : 0}]}>
          <View style={styles._circle}></View>
          <Heading style={styles._heading} >{user?.username?.length > 12 ?
            user?.username?.slice(0, 10) + "..." : user?.username
            || lang._25}</Heading>
          <Label style={styles._lable}>{lang._26}</Label>
          <Auth_Input
            onMainPress={() => props.navigation.navigate("SearchService")}
            styles={styles._input}
            placeholder={lang._28}
            Icon={<Feather name="search" size={24} color={COLORS.subtle} />}
          />
        </View>
        {/* End */}

        <View>
          <Heading style={styles._header}>{lang._27}</Heading>

          <View style={styles.Cat_lisContainer}>
            {
              categories.slice(0, 4).map((item, index) => (
                <DiscoverItem
                  key={index}
                  item={item}
                  onpress={() => { showCategoriesList(item) }}
                  style={{ marginTop: width * 0.035 }}
                />
              ))
            }
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Heading style={styles._header}>{lang._37}</Heading>

          <FlatList
            data={categories}
            horizontal
            style={{ marginLeft: '3%', marginTop: 10 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              <DiscoverItem_2 item={item} onpress={() => { showCategoriesList(item) }} />}
          />
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles._row} activeOpacity={0.9}>
            <Heading style={styles._header}>{lang._38}</Heading>
            <AntDesign name="arrowright" size={26} color={COLORS.secondary} />
          </TouchableOpacity>

          <ProviderCard onpress={() => props.navigation.navigate("Service")} />
        </View> */}

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles._row} activeOpacity={0.9}>
            <Heading style={styles._header}>{lang._59}</Heading>
            <AntDesign name="arrowright" size={26} color={COLORS.secondary} />
          </TouchableOpacity>

          <If condition={nearbyData.length != 0 && isGettingNearby == false}>
            <FlatList
              data={nearbyData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) =>
                <View style={{ width: width }}>
                  <ProviderCard item={item?.businessDetails}
                    onpress={() => props.navigation.navigate("Service", { provider: item })} />
                </View>
              }
            />
          </If>
          <If condition={nearbyData.length == 0 && isGettingNearby == false}>
            <View style={styles.nothing_found}>
              <Heading>{lang._84}</Heading>
            </View>
          </If>
          <If condition={isGettingNearby}>
            <View style={styles.nothing_found}>
              <ActivityIndicator size={FS_height(6)} color={COLORS.secondary} />
            </View>
          </If>

        </View>


      </Layout>
    </View>
  )
}


export default Home