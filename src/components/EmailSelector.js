import { TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { emails } from '../Data/Local/Data'
import Text_type1 from './Text_type1'
import CommonStyles from '../assets/styles/CommonStyles'
import { COLORS, FS_val } from '../utils/Common'

const EmailSelector = ({onpress}) => {
    return (
        <FlatList
            data={emails}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{marginVertical: 18, marginLeft: '5%'}}
            renderItem={({item}) => 
                <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => onpress(item.name)}
                style={styles.emailChip}>
                    <Text_type1 fontSize={FS_val(14, 700)}>{item.name}</Text_type1>
                </TouchableOpacity>
            }
        />
    )
}


const styles = StyleSheet.create({

    emailChip:{
      ...CommonStyles._border,
      backgroundColor:COLORS.primary,
      paddingVertical : 5,
      marginBottom:3,
      paddingHorizontal: 15,
      borderRadius: 25,
      marginRight: 10,
      elevation:2
    }
  
  })

export default EmailSelector