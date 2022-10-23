import { View,  SafeAreaView,Image, } from 'react-native'
import React from 'react'
import { GoBackHeader, Heading, Label, Layout, ProviderCard, If } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FS_height, height, width } from '../../utils/Common'
import { lang } from '../../assets/languages'
import { styles } from './styles'



const Vendors = (props) => {
    const { vendors, title } = props?.route?.params
    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <GoBackHeader
                onpress={() => props.navigation.goBack()}
                title={title}
            />
            <If condition={vendors.length != 0}>
                <Layout fixed={false}>
                    {
                        vendors.map((item, index) => (
                            <ProviderCard item={item?.businessDetails} key={index}
                                onpress={() => props.navigation.navigate("Service", { provider: item })} />
                        ))
                    }

                </Layout>
            </If>
            {/* NO RESULTS */}
            <If condition={vendors.length == 0}>
                <Layout fixed={true}>
                    <View style={styles.nothingContainer}>
                        <Heading style={styles.noResults}>
                            {`${lang._61} ${title} ${lang._62}`}</Heading>
                        <Image source={require("../../assets/images/nothingfound.jpg")}
                            style={styles.nothingfound} />
                    </View>
                </Layout>
            </If>
        </SafeAreaView>
    )
}

export default Vendors