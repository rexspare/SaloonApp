import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React ,{useState, useEffect}from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Cat_Chip, Heading, Label, Layout, If } from '../../components';
import commonStyles from '../../assets/styles/CommonStyles';
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common';
import { lang } from '../../assets/languages'
import Auth_Input from '../../components/Input/Auth_Input';
import { useSelector } from 'react-redux';


const SearchServices = (props) => {
    const categories = useSelector((state) => state.appReducer.categories)
    const [categoryList, setcategoryList] = useState([])
    const [searchInput, setsearchInput] = useState("")

    useEffect(() => {
     if(searchInput == ""){
        setcategoryList(categories)
     } else {
        const filtered = categories.filter((x) => x.category_name.toUpperCase().includes(searchInput.toUpperCase()))
        setcategoryList(filtered)
     }
    }, [searchInput])
    

    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <Auth_Input
                Icon={<AntDesign name="arrowleft" size={25} color={COLORS.secondary} />}
                iconPressed={() => props.navigation.goBack()}
                style={{ marginVertical: FS_height(3) }}
                placeholder={lang._28}
                onChange={(txt) => setsearchInput(txt)}
            />
            <Layout fixed={false}>
                <If condition={categories.length != 0}>
                    <View style={{ flexWrap: "wrap", flexDirection: 'row', paddingHorizontal: "5%" }}>
                        <Cat_Chip item={{ category_name: "All Categories", id: "001" }}
                            showIcon={true} onpress={(item) => { props.navigation.navigate("SearchResult", { item: item }) }} />
                        {
                            categoryList.map((item) => (
                                <Cat_Chip item={item} key={item.id}
                                    onpress={(item) => { props.navigation.navigate("SearchResult", { item: item }) }}
                                />
                            ))
                        }
                    </View>
                </If>




            </Layout>
        </SafeAreaView>
    )
}

export default SearchServices