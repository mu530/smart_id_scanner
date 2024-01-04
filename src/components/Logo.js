import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = (props) => {

  const { width, height } = props;

  return ( 
    <Image 
      style={[styles.logo, { width: width, height: height }]} 
      source={require('../../assets/logo.png')} 
    />
   );
}
 
const styles =StyleSheet.create({
  logo: {
    resizeMode: 'contain',
  },
});

export default Logo;