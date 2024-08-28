import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import InputBoxLogin from '../../components/Form/InputBoxLogin';
import SubmitButton from '../../components/Form/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { _signInWithGoogle } from '../../config/firebase';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {
    const [state, setState] = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegisterPage = () => {
        setUsername('');
        setPassword('');
        navigation.navigate('Register');
    };

    const signInWithGoogle = async () => {
        const userInfo = await _signInWithGoogle();
        if (userInfo) {
            const authData = {
                user: userInfo.user,
                token: userInfo.idToken
            };
            setState(authData);
            await AsyncStorage.setItem('@auth', JSON.stringify(authData));
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Login Successful',
                text2: 'Welcome back!',
            });
            navigation.navigate('Home');
            console.log(authData);
        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Failed to sign in with Google.',
            });
            console.log("=> error");
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!username || !password) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error',
                    text2: 'Please fill all fields.',
                });
                setLoading(false);
                return;
            }
            const { data } = await axios.post('/auth/login', { username, password });
            setState(data);
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Login Successful',
                text2: data.message,
            });
            navigation.navigate('Home');
            console.log('Login Data ==> ', { username, password });
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: error.response.data.message,
            });
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground source={require('../../assets/images/background-login.png')} style={styles.backgroundImage}>
                    <View style={styles.container}>
                        <View style={styles.setDefault}>
                            <TouchableOpacity style={styles.setLoginGoogle} onPress={signInWithGoogle}>
                                <Image source={require('../../assets/images/google-icon.webp')} style={styles.googleIcon} />
                                <Text style={styles.setFont}>Sign in with Google{"       "}</Text>
                            </TouchableOpacity>
                            <View style={styles.setAlign}>
                                <Text style={styles.setColor}>Or Continue with username</Text>
                            </View>
                            <InputBoxLogin 
                                inputTitle={'user'}
                                keyboardType='username'
                                autoComplete='username'
                                placeholder="username"
                                size="40"
                                value={username}
                                setValue={setUsername}
                            />
                            <InputBoxLogin 
                                inputTitle={'key'}
                                secureTextEntry={true}
                                autoComplete='password'
                                placeholder="password"
                                size="35"
                                value={password}
                                setValue={setPassword}
                            />
                            <View style={styles.setLayoutSignup}>
                                <View style={styles.setTextSignUp}>
                                    <Text style={styles.setTextForget}>Don't have an account ?  </Text>
                                </View>
                                <TouchableOpacity onPress={() => handleRegisterPage()}>
                                    <Text style={styles.setTextSignUp}>Sign Up!</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.setBtnSubmit}>
                                <SubmitButton
                                    btnTitle='Sign in'
                                    handleSubmit={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    googleIcon: {
        width: 50,
        height: 50
    },
    setDefault: {
        backgroundColor: '#ffffff',
        margin: 30,
        borderRadius: 20,
    },
    setLayoutSignup: {
        flexDirection: 'row',
        marginLeft: 40,
        marginVertical: 10
    },
    setLoginGoogle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 30,
        borderWidth: 2,
        borderColor: '#592804',
        borderRadius: 20
    },
    setFont: {
        fontSize: 20,
        color: '#592804'
    },
    setColor: {
        color: '#592804'
    },
    setAlign: {
        alignItems: 'center',
    },
    setTextForget: {
        color: 'rgb(186, 113, 97)'
    },
    setTextSignUp: {
        color: 'rgb(186, 113, 97)',
        textDecorationLine: 'underline'
    },
    setBtnSubmit: {
        paddingHorizontal: 30
    }
});

export default Login;