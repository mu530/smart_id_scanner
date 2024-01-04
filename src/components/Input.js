import React, {useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Input = (props) => {

  const { placeholder, value, onChangeText, secureTextEntry, style, multiline, } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput, multiline && { height: 200 }]}
        multiline={multiline}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !passwordVisible}
        returnKeyType="done"
      />
      {secureTextEntry && (
        <Feather
          name={passwordVisible ? 'eye' : 'eye-off'}
          size={24}
          color="#00A7FF"
          style={styles.passwordToggle}
          onPress={togglePasswordVisibility}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00A7FF',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  passwordToggle: {
    position: 'absolute',
    top: '25%',
    right: 10,
    zIndex: 1,
  },
});

export default Input;