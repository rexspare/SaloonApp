import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { lang } from '../../assets/languages'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { COLORS, FS_height, height, width } from '../../utils/Common';
import { Auth_Button } from '../../components/Buttons';
import apiRequest from '../../Data/remote/Webhandler';
import { ROUTES } from '../../Data/remote/Routes';
import { showFlash } from '../../utils/MyUtils'
import { useSelector } from 'react-redux';

const ReviewModal = (props) => {
    const user = useSelector((state) => state.authReducer.user)
    const [rating, setrating] = useState(4)
    const [comments, setcomments] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const addReview = async () => {
        if (rating && comments) {
            console.log({
                user_id: user?.id,
                vendor_id: props?.vendor_id,
                rating: rating,
                comments: comments
            });
            setisLoading(true)
            const result = await apiRequest({
                method: "POST",
                url: ROUTES.ADD_REVIEW,
                data: {
                    user_id: user?.id,
                    vendor_id: props?.vendor_id,
                    rating: rating,
                    comments: comments
                }
            }).catch((error) =>{
                showFlash("Something Went Wrong!", 'danger', 'none')
                setisLoading(false)
            } )
            if (result.data.status) {
                showFlash(result?.data?.message, 'success', 'none')
                props.getReviews()
                setisLoading(false)
                props.onclose()
            } else {
                showFlash(result?.data?.message, 'warning', 'none')

            }
            setisLoading(false)
        } else {
            showFlash("Leave a comment in the review", 'danger', 'none')
        }
    }

        return (
            <Modal
                visible={props.isVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => props.onclose()}
            >
                <TouchableOpacity style={styles.main} onPress={() => props.onclose()}>
                    <View style={styles.sheet}>
                        <AirbnbRating
                            count={5}
                            reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                            defaultRating={4}
                            size={FS_height(4)}
                            reviewSize={FS_height(3)}
                            selectedColor={"#FFD700"}
                            reviewColor={"#FFD700"}
                            onFinishRating={(rating) => setrating(rating)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={"Comments"}
                            placeholderTextColor={COLORS.subtle}
                            multiline={true}
                            onChangeText={(txt) => setcomments(txt)}
                        />

                        <Auth_Button
                            title={"Add Review"}
                            onpress={() => addReview()}
                            isLoading={isLoading}
                        />
                    </View>

                </TouchableOpacity>
            </Modal>
        )
    }

    const styles = StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)"
        },
        sheet: {
            width: width,
            backgroundColor: COLORS.primary,
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 10,
            paddingBottom: 30,
            alignItems: 'center'

        },
        input: {
            width: width * 0.9,
            height: 120,
            alignSelf: 'center',
            color: COLORS.secondary,
            borderRadius: 10,
            elevation: 3,
            backgroundColor: COLORS.primary,
            marginVertical: 25,
            textAlignVertical: 'top',
            padding: 10,
            fontSize: FS_height(2.4)
        }
    })

    export default ReviewModal