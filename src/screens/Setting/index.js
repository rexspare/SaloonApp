import { SafeAreaView, StyleSheet, Linking,Platform } from 'react-native'
import React, { useState } from 'react'
import { GoBackHeader, Heading, Layout, MenuItem } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FS_height, height, width } from '../../utils/Common'
import ToggleSwitch from 'toggle-switch-react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

const Setting = (props) => {
    const Menu = [
        {
            id: 1,
            title: "Notification Settings",
            callBack: () => setisOn(!isOn)
        },
        {
            id: 2,
            title: "Change Password",
            callBack: () => props.navigation.navigate("ChangePassword")
        },
        {
            id: 3,
            title: "For Partners",
            callBack: () => {
                if (Platform.OS === 'ios') {
                  const link = 'itms-apps://apps.apple.com/tr/app/times-tables-lets-learn/id1055437768?l=tr';
                  Linking.canOpenURL(link).then(supported => {
                    supported && Linking.openURL(link);
                  }, (err) => console.log(err));
                } else {
                  Linking.openURL("http://play.google.com/store/apps/details?id=com.saloonappprovider")
                }
              }
        },
        {
            id: 4,
            title: "Privacy Policy",
            callBack: () => props.navigation.navigate("Privacy")
        },
        {
            id: 5,
            title: "Terms of Service",
            callBack: () => props.navigation.navigate("Terms")
        },
        {
            id: 6,
            title: "Terms of Use",
            callBack: () => props.navigation.navigate("Terms")
        },
    ]

    const [isOn, setisOn] = useState(false)

    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <GoBackHeader onpress={() => props.navigation.goBack()} />
            <Layout fixed={false}>

                {/* List Items */}
                {
                    Menu.map((item) => (
                        <MenuItem
                            key={item.id}
                            title={item.title}
                            onpress={() => item.callBack()}
                            element={
                                item.id == 1 ?
                                <ToggleSwitch
                                    isOn={isOn}
                                    onColor="green"
                                    offColor="red"
                                    size="medium"
                                    onToggle={() => setisOn(!isOn)}
                                /> 
                                :
                                <AntDesign name='right' size={FS_height(3.3)} color={COLORS.secondary} />
                            }
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

export default Setting