import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputBoxRegister from '../../components/Form/InputBoxRegister';
import SubmitButton from '../../components/Form/SubmitButton';

const ForgetPassword = ({ navigation }) => {
  // state
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
          <Image source={require('../../assets/images/logo_bedroom.png')} style={styles.logo}/>
          <Text style={styles.heading}>Forgot your password?</Text>
          <Text style={styles.title}>Reset password with email</Text>
          <View style={{ marginVertical: 25}}>
            <InputBoxRegister 
              inputTitle='Email'
              placeholder='name@example.com'
              keyboardType='email-address'
              autoComplete='email'
              value={email}
              setValue={setEmail}
            />
          </View>
          <View >
            <TouchableOpacity style={styles.btnReset}>
              <Text style={styles.btnText}>Reset password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.already}>
            <Text style={{ fontSize: 18}}>Already have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontSize: 18, color: 'blue'}}>Login</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  form: {
    marginHorizontal: 50,
    justifyContent: 'center'
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 50
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '500',
    alignSelf: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center'
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
    color: '#ffffff',
    alignSelf: 'center'
  },
  already: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  }
});

export default ForgetPassword