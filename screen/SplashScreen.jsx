import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state?.user && state?.token) {
        navigation.navigate('Home'); 
      } else {
        navigation.navigate('Login'); 
      }
    }, 3000); 

    
    setTimeout(() => {
      setShowText(true);
    }, 2000); 

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, state]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo_bedroom.png')} style={styles.logo} />
      {showText && (
        <Image source={require('../assets/images/bedroom_text.png')} style={styles.textImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  logo: {// Adjust width and height as needed
    height: 200,
    resizeMode: 'contain',
  },
  textImage: {
    width: 250, 
    height: 100,
    resizeMode: 'contain',
  },
});

export default SplashScreen;