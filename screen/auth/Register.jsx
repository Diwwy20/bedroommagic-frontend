// import { View, Text, ImageBackground, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
// import React, { useState } from 'react';
// import InputBoxRegister from '../../components/Form/InputBoxRegister';
// import SubmitButton from '../../components/Form/SubmitButton';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';

// const Register = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');

//   // function
//   const handleSubmitReg = async () => {
//     try {
//       setLoading(true);
      
//      // Reset error messages
//       setUsernameError('');
//       setPasswordError('');
//       setConfirmPasswordError('');

//       let isValid = true;

//       // Validate inputs
//       if (!username || !password || !confirmPassword) {
//         Toast.show({
//           type: 'error',
//           position: 'top',
//           text1: 'Error',
//           text2: 'Please fill in all the fields!',
//         });
//         isValid = false;
//       }

//       if (username && password && !confirmPassword) {
//         setConfirmPasswordError('Confirm password is required');
//         isValid = false;
//       }

//       if (password && password.length < 8) {
//         setPasswordError('Password must be at least 8 characters');
//         Toast.show({
//           type: 'error',
//           position: 'top',
//           text1: 'Registration Failed',
//           text2: 'Password must be at least 8 characters!',
//         });
//         isValid = false;
//       }

//       if (password && confirmPassword && password !== confirmPassword) {
//         setConfirmPasswordError('Passwords do not match');
//         Toast.show({
//           type: 'error',
//           position: 'top',
//           text1: 'Registration Failed',
//           text2: 'Passwords do not match. Please check and try again!',
//         });
//         isValid = false;
//       }

//       if (!isValid) {
//         setLoading(false);
//         return;
//       }

//       const { data } = await axios.post('/auth/register', {
//         username,
//         password
//       });

//       setLoading(false);
//       Toast.show({
//         type: 'success',
//         position: 'top',
//         text1: 'Registration Successful',
//         text2: 'You have successfully registered!'
//     });
//       navigation.navigate('Login');
//     } catch (error) {
//       setLoading(false);
//       Alert.alert(error.response?.data?.message || 'An error occurred');
//       console.log(error);
//     }
//   }

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <ImageBackground 
//           source={require('../../assets/images/background-register.jpg')} 
//           style={styles.backgroundImage}
//         >
//           <View style={styles.container}>
//             <View style={styles.formWrapper}>
//               <View style={styles.pageTitleContainer}>
//                 <Text style={styles.pageTitle}>Register</Text>
//               </View>
//               <View style={styles.inputContainer}>
//                 <InputBoxRegister 
//                   inputTitle='Username'
//                   placeholder='Enter Username'
//                   value={username}
//                   setValue={setUsername}
//                 />
//                 {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
//                 <InputBoxRegister 
//                   inputTitle='Password'
//                   secureTextEntry={true}
//                   autoComplete='password'
//                   placeholder='Enter Password'
//                   value={password}
//                   setValue={setPassword}
//                 />
//                 {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
//                 <InputBoxRegister 
//                   inputTitle='Confirm Password'
//                   secureTextEntry={true}
//                   autoComplete='password'
//                   placeholder='Confirm Password'
//                   value={confirmPassword}
//                   setValue={setConfirmPassword}
//                 />
//                 {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
//                 <View style={styles.setLayoutPageLogin}>
//                   <View>
//                       <Text style={styles.setTextColor}>Already have an account? </Text>
//                   </View>
//                   <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                       <Text style={[styles.setTextColor, { textDecorationLine: 'underline'}]}>Sign in!</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>   
//               <View style={styles.buttonContainer}>
//                 {loading ? (
//                   <ActivityIndicator size="large" color="#0000ff" />
//                 ) : (
//                   <SubmitButton 
//                     btnTitle='Sign Up' 
//                     handleSubmit={handleSubmitReg}
//                   />
//                 )}
//               </View>
//             </View>
//           </View>
//         </ImageBackground>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   )
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(225, 213, 201, 0.2)',
//     paddingHorizontal: 20,
//   },
//   formWrapper: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 30,
//     padding: 10,
//   },
//   pageTitleContainer: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#1e2225',
//     alignSelf: 'center', 
//     marginVertical: 30
//   },
//   pageTitle: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#1e2225',
//   },
//   inputContainer: {
//     marginHorizontal: 20
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//     marginTop: -10,
//     marginLeft: 5,
//   },
//   buttonContainer: {
//     alignItems: 'center',  
//     justifyContent: 'center',  
//     marginTop: 20,
//   },
//   setLayoutPageLogin: {
//     flexDirection: 'row'
//   },
//   setTextColor: {
//     color: 'rgb(186, 113, 97)'
//   }
// });

// export default Register;

import { View, Text, ImageBackground, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import InputBoxRegister from '../../components/Form/InputBoxRegister';
import SubmitButton from '../../components/Form/SubmitButton';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // function
  const handleSubmitReg = async () => {
    try {
      setLoading(true);
      
     // Reset error messages
      setUsernameError('');
      setPasswordError('');
      setConfirmPasswordError('');

      let isValid = true;

      // Validate inputs
      if (!username) {
        setUsernameError('Username is required');
        isValid = false;
      } else if (username.length < 6) {
        setUsernameError('Username must be at least 6 characters');
        isValid = false;
      }

      if (!password) {
        setPasswordError('Password is required');
        isValid = false;
      } else if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
        isValid = false;
      }

      if (!confirmPassword) {
        setConfirmPasswordError('Confirm password is required');
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        isValid = false;
      }

      if (!isValid) {
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Please check the form for errors and try again!',
        });
        return;
      }

      const { data } = await axios.post('/auth/register', {
        username,
        password
      });

      setLoading(false);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Registration Successful',
        text2: 'You have successfully registered!'
      });
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Registration Failed',
        text2: error.response?.data?.message || 'An error occurred',
      });
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground 
          source={require('../../assets/images/background-register.jpg')} 
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <View style={styles.formWrapper}>
              <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>Register</Text>
              </View>
              <View style={styles.inputContainer}>
                <InputBoxRegister 
                  inputTitle='Username'
                  placeholder='Enter Username'
                  value={username}
                  setValue={setUsername}
                />
                {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
                <InputBoxRegister 
                  inputTitle='Password'
                  secureTextEntry={true}
                  autoComplete='password'
                  placeholder='Enter Password'
                  value={password}
                  setValue={setPassword}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <InputBoxRegister 
                  inputTitle='Confirm Password'
                  secureTextEntry={true}
                  autoComplete='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                <View style={styles.setLayoutPageLogin}>
                  <View>
                      <Text style={styles.setTextColor}>Already have an account? </Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={[styles.setTextColor, { textDecorationLine: 'underline'}]}>Sign in!</Text>
                  </TouchableOpacity>
                </View>
              </View>   
              <View style={styles.buttonContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <SubmitButton 
                    btnTitle='Sign Up' 
                    handleSubmit={handleSubmitReg}
                  />
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(225, 213, 201, 0.2)',
    paddingHorizontal: 20,
  },
  formWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    padding: 10,
  },
  pageTitleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#1e2225',
    alignSelf: 'center', 
    marginVertical: 30
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e2225',
  },
  inputContainer: {
    marginHorizontal: 20
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
    marginLeft: 5,
  },
  buttonContainer: {
    alignItems: 'center',  
    justifyContent: 'center',  
    marginTop: 20,
  },
  setLayoutPageLogin: {
    flexDirection: 'row'
  },
  setTextColor: {
    color: 'rgb(186, 113, 97)'
  }
});

export default Register;
