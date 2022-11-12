import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import commonStyles from '../../assets/styles/CommonStyles'
import { Auth_Button, Text_Button } from '../../components/Buttons'
import { Layout, ServiceHeader, Heading, Label, KeyValue } from '../../components'
import { COLORS } from '../../utils/Common'
import { styles } from './styles'
import { lang } from '../../assets/languages'
import { getGeoCodePosition, showFlash } from '../../utils/MyUtils'
import apiRequest from '../../Data/remote/Webhandler'
import { ROUTES } from '../../Data/remote/Routes'

const BookService = (props) => {
    const activeService = useSelector((state) => state.appReducer.activeService)
    const isUserLoggedIn = useSelector((state) => state.authReducer.isUserLoggedIn)
    const user = useSelector((state) => state.authReducer.user)
    const allVendors = useSelector((state) => state.appReducer.allVendors)
    const [isLoading, setisLoading] = useState(false)
    const [Vendor, setVendor] = useState({})
    const [formattedAddrees, setformattedAddrees] = useState('')


    useEffect(() => {
        const exists = allVendors.find((x) => x?.id == activeService?.user_id)
        if (exists) {
            setVendor(exists)
            alert(JSON.stringify(exists))
        } else {
            setVendor({})
        }
        // getVendor()
    }, [activeService?.service_id])

    const getVendor = async () =>{
        // const result = await apiRequest({
        //     method: "post",
        //     url: ROUTES.GET_USERS,
        //     data: {id :  activeService?.user_id}
        //   }).catch((err) => { 
        //     showFlash("Somehomg Went Wrong", "danger", 'auto')
        //     setisLoading(false)
        //   });

        //   if(result.data.status){
        //     alert(JSON.stringify(result.data))
        //   }
    }

    useEffect(() => {
        if (Vendor?.business_lat && Vendor?.business_long) {
            getGeoCodePosition(
                parseFloat(Vendor?.business_lat),
                parseFloat(Vendor?.business_long),
                setformattedAddrees);
        }
    }, [Vendor])

    const handleOnMap = () => {
        if (Vendor?.business_lat) {
            props.navigation.navigate("OnMap",
                {
                    locationArray: [{
                        data: Vendor,
                        latitude: parseFloat(businessDetails?.business_lat),
                        longitude: parseFloat(businessDetails?.business_long)
                    }],
                })
        } else {
            showFlash(lang._83, "warning", 'none')
        }
    }

    const handleNotLoggedIn = () => {
        showFlash("Log In to continue", 'danger', 'auto')
        props.navigation.navigate("Profile")
    }



    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <StatusBar backgroundColor={COLORS.ServiceHeader} />
            <ServiceHeader
                onpress={() => props.navigation.goBack()}
            />
            <Layout fixed={false}>
                <View style={{ paddingHorizontal: "4%", alignItems: "flex-start" }}>
                    {/* Brand and Categories */}
                    <Heading style={styles.brand}>{lang._64}</Heading>
                    <Label style={[styles.cate, styles.address]}>
                        {activeService.service_description}
                    </Label>

                    <KeyValue _key={lang._68} value={activeService.category_name} />
                    <KeyValue _key={lang._65} value={activeService.service_price} />
                    <KeyValue _key={lang._66} value={activeService.service_for} />
                    <KeyValue _key={lang._67} value={activeService.service_time} />
                </View>

                <View style={{ paddingHorizontal: "4%", alignItems: "flex-start" }}>

                    {/* Brand and Categories */}
                    <Heading style={styles.brand}>Vender</Heading>
                    <Label style={[styles.cate, styles.address]}>
                        {formattedAddrees || lang._83}
                    </Label>


                    <KeyValue _key={lang._77} value={Vendor?.business_name || ""} />
                    <KeyValue _key={lang._82} value={Vendor?.rating || "N/A"} />
                    <KeyValue _key={lang._78} value={Vendor?.phone || ""} />
                    <KeyValue _key={lang._79} value={Vendor?.business_website || ""} />
                    <KeyValue _key={lang._80} value={Vendor?.business_open_time || ""} />
                    <KeyValue _key={lang._81} value={Vendor?.business_close_time || ""} />


                </View>

            </Layout>
            <View style={styles.absoluteBTNCnntainer}>
                <Auth_Button
                    isLoading={isLoading}
                    title={isUserLoggedIn ? lang._72 : lang._29}
                    disable={!activeService?.service_active == 1}
                    style={{
                        backgroundColor: activeService?.service_active == 1 ? COLORS.secondary : COLORS.subtle
                    }}
                    onpress={() => {
                        isUserLoggedIn ?
                            props.navigation.navigate("SelectTime", { Vendor: Vendor })
                            :
                            handleNotLoggedIn()
                    }}
                />
            </View>

        </SafeAreaView>
    )
}

export default BookService