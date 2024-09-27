import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const AuthInput = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#a0cfcf"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    autoCapitalize="none"
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
});

export default AuthInput;