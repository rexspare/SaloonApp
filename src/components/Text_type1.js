import { Text , StyleSheet} from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_height, FS_val } from '../utils/Common';

const Text_type1 = ({children, fontSize = FS_height(2.2) , style}) => {
    return (
      <Text style={[ {fontSize, color: COLORS.secondary}, _style.textStyle, style]}>
        {children}
      </Text>
    );
  };

  const _style = StyleSheet.create({
    textStyle: {
      fontFamily: FONTS.WorkSans_Regular,
    //   letterSpacing: 0.7,
      textAlign:"center"
    },
  });

export default Text_type1