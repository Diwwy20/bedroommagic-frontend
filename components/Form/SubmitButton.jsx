import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({ btnTitle, handleSubmit }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.btnText}>{btnTitle}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    submitButton:{
        backgroundColor: 'rgb(175, 132, 122)',
        height: 50,
        width: 130,
        alignSelf: 'flex-end',
        borderRadius: 80,
        justifyContent: 'center',
        marginBottom: 20,
    },
    btnText:{
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '400'
    }
});

export default SubmitButton