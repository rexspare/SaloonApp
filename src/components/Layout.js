import React from 'react';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';
import If from './If';

const Layout=({
  children,
  containerStyle,
  fixed,
  contentContainerStyle,
}) => {
  return (
    <>
      <If condition={fixed}>
        <View
          style={[{flex:1},  containerStyle]}>
          {children}
        </View>
      </If>
      <If condition={!fixed}>
        <ScrollView
          style={[{flex:1}, containerStyle]}
          contentContainerStyle={contentContainerStyle}>
          {children}
        </ScrollView>
      </If>
    </>
  );
};

export default Layout;
