import { SafeAreaView, StatusBar, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { AppHeader, FavoriteItem, Layout } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common'
import { lang } from '../../assets/languages'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styles'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { getFavorites, setActiveService } from '../../Data/Local/Store/Actions/AppActions'
import { showFlash } from '../../utils/MyUtils'
import apiRequest from '../../Data/remote/Webhandler'
import { ROUTES } from '../../Data/remote/Routes'

const DATA = []

const Favorite_Services = (props) => {
    const swipeableRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.authReducer.user)
    const favorites = useSelector((state) => state.appReducer.favorites)
    const [isLoading, setisLoading] = useState(false)


    useEffect(() => {
        getFavoriteServices()
    }, [user])


    const getFavoriteServices = async () => {
        setisLoading(true)
        const result = await dispatch(getFavorites(user.id))
        setisLoading(false)
    }

    const removeFavorite = async (service) => {
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.REMOVE_FAVORITES,
            data: {
                fav_id: service.fav_id
            }
        }).catch((error) => { })
        console.log(result);
        if (result?.data?.status) {
            getFavoriteServices()
            showFlash(lang._97, "success", "none")
        } else {
            showFlash(lang._98, "warning", "none")

        }
    }

    const handleServicePress = (item) => {
        if (item?.service_active == 1) {
            dispatch(setActiveService(item))
            props.gotoService()
        } else {
            showFlash(lang._93, "", "none")
        }
    }

    const swipeRight = (item) => {
        return (
            <Animated.View style={[commonStyles._center, styles.swipeBTN]}>
                <TouchableOpacity style={[styles.swipeBTN, commonStyles._center,]}
                    onPress={() => removeFavorite(item)}>
                    <IonIcons name='md-heart-dislike-outline' size={FS_height(5)} color={COLORS.primary} />
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <StatusBar backgroundColor={COLORS.ServiceHeader} />

            <AppHeader
                title={lang._91}
                onpress={() => props.goBack()}
            />

            <Layout fixed={false}>
                <GestureHandlerRootView>
                    {
                        favorites.map((item, index) => (
                            <Swipeable
                                key={index}
                                ref={swipeableRef}
                                rightThreshold={-200}
                                renderRightActions={() => swipeRight(item)}
                            >
                                <Animated.View style={{ backgroundColor: COLORS.primary }}>
                                    <FavoriteItem item={item}
                                        onpress={() => handleServicePress(item)} />
                                </Animated.View>
                            </Swipeable>
                        ))
                    }
                </GestureHandlerRootView>
            </Layout>

        </SafeAreaView >
    )
}

export default Favorite_Services