import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { GoBackHeader, Heading, If, Label, Layout, MenuItem, Text_type1 } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, FS_val, height, width } from '../../utils/Common'
import { Text_Button } from '../../components/Buttons'
import { lang } from '../../assets/languages'
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReviewModal from './ReviewModal'


const Reviews = (props) => {
    const { reviews, vendor_id } = props?.route?.params
    const [isVisible, setisVisible] = useState(false)
    const [reviewsList, setreviewsList] = useState(reviews || [])

    const getReviews = async () => {
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.GET_REVIEWS,
            data : {vendor_id : vendor_id}
        }).catch((error) => {
            console.log("Error Getting Reviews ==>>", error);
        })
        if (result.data?.status) {
            setreviewsList(result.data?.reviews)
        }
    }

    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            {console.log(vendor_id)}
            <GoBackHeader onpress={() => props.navigation.goBack()} title={lang._108} />
            <Layout fixed={false}>
                <View>
                    {/* NO REVIEWS */}
                    <If condition={reviews?.length == 0}>
                        <Text_type1 style={{ marginTop: 40 }}>
                            {lang._109}</Text_type1>
                    </If>

                    {/* REVIEWS */}
                    <If condition={reviews?.length != 0}>
                        <View>
                            {
                                reviewsList?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={styles.mainItem}
                                    >
                                        <Label>{item.username}</Label>
                                        <Rating
                                            showRating={false}
                                            readonly={true}
                                            imageSize={FS_height(2.4)}
                                            startingValue={item?.rating_star}
                                            style={{ marginVertical: 5 }}
                                        />
                                        <Text_type1 style={{ textAlign: "left" }}>
                                            {item?.comments}</Text_type1>
                                    </View>
                                ))
                            }
                        </View>
                    </If>
                </View>
            </Layout>
            <TouchableOpacity style={styles.floatingBtn}
            onPress={() => setisVisible(true)}>
                <Label style={{ color: COLORS.primary }}>+</Label>
            </TouchableOpacity>
            <ReviewModal
                isVisible={isVisible}
                onclose={() => setisVisible(false)}
                getReviews={getReviews}
                vendor_id={vendor_id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainItem: {
        width: width * 0.9,
        alignItems: 'flex-start',
        marginHorizontal: '5%',
        paddingVertical: 15,
        borderBottomWidth: 1 / 2,
        borderColor: COLORS.subtle

    },
    nameRating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatingBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.secondary,
        position: "absolute",
        bottom: 20,
        right: 20,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Reviews