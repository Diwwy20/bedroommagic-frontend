import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const InputBoxRegister = ({
    inputTitle,
    placeholder,
    autoComplete,
    keyboardType,
    secureTextEntry = false,
    value,
    setValue
}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.inputTitle}>{inputTitle}</Text>
        <TextInput 
        style={styles.inputBox} 
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete} 
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    inputTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#592804'
    },
    inputBox:{
        height: 50,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#592804',
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 15,
        color: '#af9f85',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default InputBoxRegister