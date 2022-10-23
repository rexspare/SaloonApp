import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Cat_Chip, Heading, Label, Layout, If, GoBackHeader, SingleService, SingleVendor } from '../../components';
import commonStyles from '../../assets/styles/CommonStyles';
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common';
import { lang } from '../../assets/languages'
import Auth_Input from '../../components/Input/Auth_Input';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveService } from '../../Data/Local/Store/Actions';

const Searchresult = (props) => {
  const { route } = props
  const dispatch = useDispatch()
  const AllServices = useSelector((state) => state.appReducer.allServices)
  const nearbyVendors = useSelector((state) => state.appReducer.nearbyVendors)
  const [ServicesList, setServicesList] = useState([])
  const [venueList, setvenueList] = useState([])
  const [searchValue, setsearchValue] = useState("")
  const [isLoading, setisLoading] = useState(false)

  const getServices = () => {
    if (route?.params.item?.id != "001") {
      setServicesList(AllServices.filter((x) => x.category_id == route?.params.item?.id))
    } else {
      setServicesList(AllServices)
    }
  }

  useEffect(() => {
    getServices()
    setvenueList(nearbyVendors)
  }, [])

  const onSearch = (txt) => {
    setsearchValue(txt)
    if (txt != "") {
      setServicesList(ServicesList.filter((x) => x.service_title.includes(txt)))
      setvenueList(nearbyVendors.filter((x) => x?.businessDetails?.business_name.includes(txt)))
    } else {
      getServices()
    }
  }

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
      <GoBackHeader title={route?.params?.item?.category_name}
        onpress={() => props.navigation.goBack()} />
      <Auth_Input
        Icon={<AntDesign name="search1" size={25} color={COLORS.secondary} />}
        style={{ marginVertical: FS_height(2) }}
        placeholder={lang._28}
        onChange={(txt) => onSearch(txt)}
      />
      <Layout fixed={false}>


        <If condition={ServicesList.length != 0}>
          <Heading style={commonStyles.textLeft}>{lang._58}</Heading>
          {
            ServicesList.map((item, index) => (
              <SingleService item={item} key={index}
               onpress={() =>{
                dispatch(setActiveService(item))
                props.navigation.navigate("Bookservice_1")
              }}/>
            ))
          }
        </If>

        <If condition={venueList.length !=0 && searchValue != ''}>
          <Heading style={[commonStyles.textLeft, { marginTop: 15 }]}>{lang._60}</Heading>
          {
            venueList.map((item, index) => (
              <SingleVendor item={item.businessDetails} key={index} />
            ))
          }
        </If>


      </Layout>
    </SafeAreaView>
  )
}

export default Searchresult