import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { GoBackHeader, Heading, If, Label, Layout, MenuItem, Text_type1 } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, FS_val, height, width } from '../../utils/Common'
import { Text_Button } from '../../components/Buttons'
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { lang } from '../../assets/languages'
import { useDispatch, useSelector } from 'react-redux'
import { Auth_Input } from '../../components/Input'
import { BASE_URL, ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { showFlash } from '../../utils/MyUtils'
import { setUser } from '../../Data/Local/Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../utils/StorageKeys'
import ImagePicker from 'react-native-image-crop-picker';

const ViewProfile = (props) => {
    const user = useSelector((state) => state.authReducer.user)
    const [isEdit, setisEdit] = useState(false)
    const [username, setusername] = useState(user?.username)
    const [phone, setphone] = useState(user?.phone)
    const [email, setemail] = useState(user?.email)
    const [user_image, setuser_image] = useState(user?.user_image)
    const [imageObject, setimageObject] = useState({})
    const dispatch = useDispatch()

    const handlePickImage = () => {
        Alert.alert(
            'Change Image',
            "Select an Image from",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                },
                {
                    text: "Camera",
                    onPress: () => { openCamera() },
                },
                {
                    text: "Gallery",
                    onPress: () => { openGallery() },
                }
            ]
        );
    }

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setimageObject(image)
        }).catch(() => {})
    }

    const openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setimageObject(image)
        }).catch(() => {})
    }

    const handleEdit = async () => {
        if (!isEdit) {
            setisEdit(true)
        } else {
            if (username && email && phone) {
                let form = new FormData()
                form.append('email', email);
                form.append('username', username);
                form.append('phone', phone);
                form.append('token', user?.token);
                form.append('user_id', user?.id);

                if (imageObject?.path) {
                    form.append('user_image',
                        { uri: imageObject?.path, type: imageObject?.mime, mime: imageObject?.mime, name: 'profile.png' })
                }

               const result = await fetch(BASE_URL + ROUTES.UPDATE_USER_PROFILE, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: form
                })
                    .then((response) => response.json())
                    .then((json) => {
                        return json
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                if (result?.status) {
                    showFlash(result?.message, 'success', 'none')
                    dispatch(setUser(result?.data))
                    AsyncStorage.setItem(storage_keys.USER_DATA_KEY,
                        JSON.stringify(result?.data))
                        .then(() => { setisEdit(false) })
                   

                } else {
                    showFlash(result?.message, 'danger', 'none')
                }
            } else {
                showFlash("Please Enter your information!", "warning", "auto")
            }
        }
    }

    let avatar = user?.user_image ?
        user?.user_image?.includes('http') ?
            user?.user_image :
            BASE_URL + "uploads/" + user?.user_image
        :
        "https://www.w3schools.com/w3images/avatar2.png"

    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            {
                console.log(user)}
            <GoBackHeader onpress={() => props.navigation.goBack()} />
            <Layout fixed={false}>
                {/* Image Container */}
                <View style={styles.topContainer}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => handlePickImage()}>
                        <Image source={{
                            uri: imageObject?.path ?
                                imageObject?.path :
                                avatar
                        }}
                            style={styles.image} />
                        <View style={styles.editIcon}>
                            <MTCIcons name='pencil-outline' size={FS_val(14, 700)} color={COLORS.pure_White} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Body */}
                <View style={{ backgroundColor: COLORS.primary }}>
                    <View style={styles.editProfileHeader}>
                        <Heading>{lang._46}</Heading>
                        <Text_Button textStyles={styles.btnTxt}
                            title={isEdit ? lang._107 : lang._47}
                            onpress={() => handleEdit()}
                        />
                    </View>

                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._106}</Label>
                        <If condition={!isEdit}>
                            <Label style={[styles.txtAlign, styles.value]}>{user.username}</Label>
                        </If>
                        <If condition={isEdit}>
                            <Auth_Input
                                style={{ marginTop: 5, marginBottom: -5 }}
                                value={username}
                                onChange={(txt) => setusername(txt)}
                            />
                        </If>
                    </View>

                    {/* Phone number */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._17}</Label>
                        <If condition={!isEdit}>
                            <Label style={[styles.txtAlign, styles.value]}>{user.phone}</Label>
                        </If>
                        <If condition={isEdit}>
                            <Auth_Input
                                style={{ marginTop: 5, marginBottom: -5 }}
                                value={phone}
                                onChange={(txt) => setphone(txt)}
                            />
                        </If>

                    </View>
                    {/* Email */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._51}</Label>
                        <If condition={!isEdit}>
                            <Label style={[styles.txtAlign, styles.value]}>{user.email}</Label>
                        </If>
                        <If condition={isEdit}>
                            <Auth_Input
                                style={{ marginTop: 5, marginBottom: -5 }}
                                value={email}
                                onChange={(txt) => setemail(txt)}
                            />
                        </If>
                    </View>

                </View>

                <View style={styles.sectionBreak}></View>

                {/* DELETE ACCOUNT */}
                <View style={{ backgroundColor: COLORS.primary, paddingTop: 10 }}>
                    <View style={[styles.editProfileHeader, { justifyContent: "flex-start" }]}>
                        <Heading>{lang._52}</Heading>
                    </View>

                    <Label style={[styles.value,
                    { marginVertical: FS_height(1), paddingHorizontal: '5%', textAlign: "left", fontSize: FS_height(2.4) }]}>
                        {lang._53}</Label>

                    <Text_Button style={styles.deleteBtn} textStyles={styles.deleteTxt}
                        title={lang._54}
                    />

                </View>


            </Layout>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    topContainer: {
        width: width,
        height: height * 0.3,
        ...commonStyles._center,
        marginTop: -12
    },
    imageContainer: {
        width: width * 0.38,
        height: width * 0.38,
        borderRadius: width * 0.2,
        borderColor: "#1e7bd6",
        ...commonStyles._center

    },
    image: {
        width: width * 0.36,
        maxWidth: 200,
        height: width * 0.36,
        maxHeight: 200,
        borderRadius: width * 0.2,
    },
    editIcon: {
        width: width * 0.07,
        maxWidth: 25,
        height: width * 0.07,
        maxHeight: 25,
        borderRadius: width * 0.05,
        backgroundColor: COLORS.Links,
        position: "absolute",
        bottom: '5%',
        right: '3%',
        borderWidth: 1.5,
        borderColor: COLORS.pure_White,
        ...commonStyles._center
    },
    editProfileHeader: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    btnTxt: {
        color: COLORS.Links,
        fontSize: FS_height(2.6)
    },
    txtAlign: {
        textAlign: "left",
        paddingLeft: '5%'
    },
    value: {
        fontFamily: FONTS.WorkSans_Regular
    },
    sectionBreak: {
        height: FS_height(2),
        backgroundColor: "#f4f3f8",
        marginTop: FS_height(1.8)
    },
    deleteBtn: {
        alignSelf: "flex-start",
        paddingLeft: "5%",
        marginBottom: FS_height(3)
    },
    deleteTxt: {
        color: "#c43059",
        fontSize: FS_height(2.7)
    }
})

export default ViewProfile