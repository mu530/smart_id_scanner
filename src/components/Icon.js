import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Icon(props) {

  const { title, onPress, icon, iconColor, height, width } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.icon, { width: width, height: height }]}>
      <MaterialIcons name={icon} size={28} color={'#FFD700'} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    borderColor: 'red',
    backgroundColor: '#00A7FF',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFD700',
    marginLeft: 10,
  },
});