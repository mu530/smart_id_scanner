import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bounding = ({children}) => {
  return ( 
    <View style={styles.boundingContainer}>
      <View style={styles.boundingTop} />
      <View style={styles.boundingMiddle}>
        <View style={styles.boundingLeft} />
        <View style={styles.boundingRight} />
      </View>
      
    </View>
   );
}
 
 
const styles = StyleSheet.create({
  
  boundingContainer: {
    position: 'absolute',
    left: '10%',
    top: '25%',
    width: '80%',
    height: '40%',
    borderWidth: 2,
    borderColor: '#00A7FF',
  },
  boundingTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  boundingLeft: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  boundingRight: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  boundingBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  boundingMiddle: {
    flex: 2,
    flexDirection: 'row',
  },
});
 
export default Bounding;