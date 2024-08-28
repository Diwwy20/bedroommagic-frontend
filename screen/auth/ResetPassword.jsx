import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputBoxRegister from '../../components/Form/InputBoxRegister';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 30}}>
        <View style={{ marginVertical: 20}}>
            <Text style={styles.heading}>Reset Account Password</Text>
            <Text style={styles.title}>Please enter the desired new password.</Text>
        </View>
         <View style={{ marginVertical: 20}}>
            <InputBoxRegister 
                inputTitle='New password'
                placeholder='Enter new password'
                keyboardType='password'
                autoComplete='password'
                secureTextEntry={true}
                value={password}
                setValue={setPassword}
            />
         </View>
         <View style={{ marginVertical: 20}}>
            <InputBoxRegister 
                inputTitle='Confirm password'
                placeholder='Confirm new password'
                keyboardType='password'
                autoComplete='password'
                secureTextEntry={true}
                value={newPassword}
                setValue={setNewPassword}
            />
         </View>
         <View style={{ marginVertical: 20}}>
            <TouchableOpacity style={styles.btnReset}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 28,
        fontWeight: '800',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: 5
    },
    btnReset: {
        backgroundColor: '#592804',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 5,
        marginTop: 10
      },
      btnText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
        alignSelf: 'center'
      }
});

export default ResetPassword