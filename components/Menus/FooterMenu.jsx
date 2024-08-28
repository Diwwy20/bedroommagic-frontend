import { View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _signOut } from '../../config/firebase';
import { usePhotoContext } from '../../context/photoContext';
import Toast from 'react-native-toast-message';

const FooterMenu = () => {
  const [state, setState] = useContext(AuthContext);
  const { clearPhotoData } = usePhotoContext();
  const [activeIcon, setActiveIcon] = useState('home');
  const navigation = useNavigation();

  // logout
  const handleLogout = async () => {
    Alert.alert(
      'ยืนยันการ Logout',
      'คุณแน่ใจหรือไม่ที่จะออกจากระบบ?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel'
        },
        {
          text: 'ตกลง',
          onPress: async () => {
            await _signOut();
            // ทำการ Clear State และลบข้อมูลที่เก็บไว้
            setState({ token: '', user: null });
            await AsyncStorage.removeItem('@auth');
            await AsyncStorage.removeItem('@splashScreenShown');
            clearPhotoData({ imageSource: '', base64: '' });
            navigation.navigate('Login');
            
            Toast.show({
              type: 'success',
              text1: 'Logout Successful',
              text2: 'You have successfully logged out.',
              position: 'top',
          });

          }
        }
      ],
      { cancelable: false }
    );
  };

  const handlePress = (icon, screen) => {
    setActiveIcon(icon);
    navigation.navigate(screen);
    // clearPhotoData({ imageSource: '', base64: '' });
    // if (screen === 'Search') {
    //   navigation.navigate(screen, { initialButton: 'All' });
    // } else {
    //   navigation.navigate(screen);
    // }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress('home', 'Home')}>
        <View style={[styles.iconContainer, activeIcon === 'home' && styles.activeIconContainer]}>
          <View style={styles.iconBackground}>
            <FontAwesome5 name='home' style={styles.iconStyle} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('search', 'Search')}>
        <View style={[styles.iconContainer, activeIcon === 'search' && styles.activeIconContainer]}>
          <View style={styles.iconBackground}>
            <FontAwesome5 name='search' style={styles.iconStyle} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('magic', 'Magic')}>
        <View style={[styles.iconContainer, activeIcon === 'magic' && styles.activeIconContainer]}>
          <View style={styles.iconBackground}>
            <FontAwesome5 name='magic' style={styles.iconStyle} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <View style={[styles.iconContainer, activeIcon === 'account' && styles.activeIconContainer]}>
          <View style={styles.iconBackground}>
            <FontAwesome5 name='chevron-left' style={styles.iconStyle} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#592804',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: width
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    marginTop: -40,  
  },
  activeIconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    backgroundColor: '#ffffff', 
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#592804'
  },
  iconStyle: {
    fontSize: 30,
    color: '#592804', 
  },
});

export default FooterMenu;
