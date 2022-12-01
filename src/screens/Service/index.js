import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Heading, Label, Layout, MenuItem, SingleService } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FS_height, height, width } from '../../utils/Common'
import { Text_Button, W45_BTN } from '../../components/Buttons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { lang } from '../../assets/languages'
import { useDispatch } from 'react-redux'
import { getServicesByID, setIsUserLoggedIn } from '../../Data/Local/Store/Actions'
import { styles } from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Swiper from 'react-native-swiper'
import { getGeoCodePosition, getRatingText, categoryIntoArray, showFlash, tConvert, openMaps } from '../../utils/MyUtils'
import { setActiveService } from '../../Data/Local/Store/Actions';
import apiRequest from '../../Data/remote/Webhandler'
import { BASE_URL, ROUTES } from '../../Data/remote/Routes'

const Service = (props) => {
    const { businessDetails } = props.route?.params?.provider
    const dispatch = useDispatch()
    const [formattedAddrees, setformattedAddrees] = useState('')
    const [categories, setcategories] = useState(
        categoryIntoArray(businessDetails?.primary_category, businessDetails?.secondary_category))
    const [opacity, setopacity] = useState(0)
    const [servicesArray, setservicesArray] = useState([])
    const [reviewsList, setreviewsList] = useState([])
    const [gallery, setgallery] = useState([])


    const CoverImages = [
        { _id: 1, name: "Beauty Salon", image: "https://source.unsplash.com/user/c_v_r/1900x800" },
    ]


    useEffect(() => {
        console.log('====================================');
        console.log(businessDetails);
        console.log('====================================');
        getGeoCodePosition(
            parseFloat(businessDetails?.business_lat),
            parseFloat(businessDetails?.business_long),
            setformattedAddrees);
        dispatch(getServicesByID(businessDetails?.id, setservicesArray))
    }, [businessDetails?.business_lat])

    // GET REVIEWS
    useEffect(() => {
        getReviews()
    }, [businessDetails?.id])

    const getReviews = async () => {
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.GET_REVIEWS,
            data: { vendor_id: businessDetails?.id }
        }).catch((error) => {
            console.log("Error Getting Reviews ==>>", error);
        })
        if (result.data?.status) {
            setreviewsList(result.data?.reviews)
        }
    }

    // GET GALLERY 

    useEffect(() => {
        getgallery()
    }, [businessDetails?.id])

    const getgallery = async () => {
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.GET_GALLERY_IMAGE,
            data: { user_id: businessDetails?.id }
        }).catch((err) => {
            showFlash("Network Error", "danger", 'auto',)
        })
        if (result?.data?.status == true) {
            setgallery(result?.data?.data)
        }
    }

    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>

            <Animated.ScrollView style={{ flex: 1 }}
                onScroll={(e) => {
                    if (e.nativeEvent.contentOffset.y > 200) {
                        setopacity(1)
                    }
                    if (e.nativeEvent.contentOffset.y < 200) {
                        setopacity(0)
                    }
                }}
            >
                {/* CONTENT */}
                {/* COVER IMAGES SWIPER */}
                <View style={styles.coverContainer}>
                    {
                        gallery?.length > 0 ?
                            <Swiper
                                paginationStyle={{ marginBottom: - FS_height(2) }}
                                dot={<Octicons name="dot-fill" size={FS_height(2.2)} color={"#b8b6b6"} style={{ marginHorizontal: '1%' }} />}
                                activeDot={<Octicons name="dot-fill" size={FS_height(2.2)} color={COLORS.primary} style={{ marginHorizontal: '1%' }} />}
                            >
                                {
                                    gallery.map((item, index) => (
                                        <Image key={index}
                                            source={{ uri: BASE_URL + "uploads/" + item.image }}
                                            style={{ width: '100%', height: '100%' }} />
                                    ))
                                }
                            </Swiper>
                            :
                            <Image
                                source={require('../../assets/images/business.png')}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="contain"
                            />
                    }
                </View>

                <View style={{ paddingHorizontal: "4%", alignItems: 'flex-start' }}>
                    {/* Brand and Categories */}
                    <Heading style={styles.brand}>{businessDetails?.business_name}</Heading>
                    <Label style={{ textAlign: "left" }}>
                        {

                            categories.map((item, index) => (
                                <Label key={index} style={styles.cate}>{item}
                                    {categories[index + 1] && <Label style={[styles.cate, { fontSize: FS_height(1.3) }]}>  ●  </Label>}</Label>
                            ))
                        }
                    </Label>
                    {/* END */}

                    <Label style={[styles.cate, styles.address]}>
                        {formattedAddrees}
                    </Label>

                    <Text_Button
                        title={lang._55}
                        textStyles={styles.mapBtn}
                        onpress={() => {
                            openMaps(parseFloat(businessDetails?.business_lat),
                                parseFloat(businessDetails?.business_long),
                                businessDetails?.business_name
                            )
                            // props.navigation.navigate("OnMap",
                            // {
                            //     locationArray: [{
                            //         data: businessDetails,
                            //         latitude: parseFloat(businessDetails?.business_lat),
                            //         longitude: parseFloat(businessDetails?.business_long)
                            //     }],
                            // })
                        }}
                    />

                    {/* OTHER DETAILS  */}
                    <View style={styles.otherDetails}>
                        {/* BUSINESS TIME */}
                        <View style={styles.singleDetailContainer}>
                            <Ionicons name='time-outline' size={FS_height(3.2)} color={COLORS.secondary} />
                            <Label style={styles.singleDetailText}>
                                {businessDetails?.business_close_time && `${tConvert(businessDetails?.business_open_time)} - ${tConvert(businessDetails?.business_close_time)}`}</Label>
                        </View>
                    </View>
                    {/* END */}

                    {/* RATING */}
                    <View style={[styles.ratingContainer, { width: '100%', justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name='star' size={FS_height(2.2)} color="#ffa534" />
                            <Label style={styles.ratingTxt}>{`${businessDetails.rating} ${getRatingText(businessDetails.rating)}`}</Label>
                            <Label style={styles.ratingCount}>{`(${reviewsList?.length})`}</Label>
                        </View>

                        <Text_Button
                            title={lang._108}
                            textStyles={styles.mapBtn}
                            onpress={() => props.navigation.navigate("Reviews", { reviews: reviewsList, vendor_id: businessDetails?.id })}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Heading style={commonStyles.textLeft}>{lang._58}</Heading>
                    {
                        servicesArray.map((item, index) => (
                            <SingleService item={item} key={index}
                                onpress={() => {
                                    dispatch(setActiveService(item))
                                    props.navigation.navigate("Bookservice_1")
                                }} />
                        ))
                    }
                </View>


            </Animated.ScrollView>

            {/* HEADER */}
            <Animated.View style={[styles.HeaderContainer, {
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            }]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => props.navigation.goBack()}>
                    <AntDesign name="arrowleft" size={FS_height(3.7)} color={COLORS.secondary} />
                </TouchableOpacity>
            </Animated.View>


            {/* ABSOLUTE BUTTON */}
            <View style={styles.absoluteBTNCnntainer}>
                <Label style={[styles.cate, styles.address]} >{`${servicesArray.length} services`}</Label>
                <W45_BTN
                    title={lang._56}
                    onpress={() => {
                        if (servicesArray.length != 0) {

                        } else {
                            showFlash(lang._63, "", "none")
                        }
                    }}
                />

            </View>
            {/* END */}



        </SafeAreaView>
    )
}

export default Service