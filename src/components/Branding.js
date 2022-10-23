import { Image } from 'react-native'
import React from 'react'

const Branding = ({style}) => {
  return (
    <>
       <Image 
       source={require("../assets/images/appicon.png")}
       style={{
        width : 60,
        height : 60,
        borderRadius: 10,
        elevation:5,
        ...style
       }}
       />
    </>
  )
}

export default Branding