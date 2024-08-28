// import { View, Text } from 'react-native'
// import React, { useContext } from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { AuthContext } from '../../context/authContext'
// import Login from '../../screen/auth/Login'
// import Register from '../../screen/auth/Register'
// import Home from '../../screen/Home'
// import Search from '../../screen/Search'
// import Magic from '../../screen/Magic'
// import All from '../Search/All'
// import UploadImage from '../Search/UploadImage'
// import Generate from '../../screen/Generate'
// import UseCamera from '../../screen/UseCamera'
// import SplashScreen from '../../screen/SplashScreen'

// const ScreenMenu = () => {
//     // global state
//     const [state] = useContext(AuthContext);
//     // auth condition true false
//     const authenticatedUser = state?.user && state?.token;
//     const Stack = createNativeStackNavigator();

//   return (
//     <Stack.Navigator initialRouteName='Splash'>
//         <Stack.Screen
//         name="Splash"
//         component={SplashScreen}
//         options={{ headerShown: false }}
//       />
//         {authenticatedUser ?
//         (
//         <>
//             <Stack.Screen 
//             name="Home"
//             component={Home}
//             options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//             name="Search"
//             component={Search}
//             options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//             name="Magic"
//             component={Magic}
//             options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//             name="All"
//             component={All}
//             options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//             name="UploadImage"
//             component={UploadImage}
//             options={{ headerShown: false }}
//             />
//             <Stack.Screen 
//             name="Generate"
//             component={Generate}
//             options={{ headerShown: false }}
//             />
//             <Stack.Screen
//             name="UseCamera"
//             component={UseCamera}
//             options={{ headerShown: false }}
//             />
//         </>
//         ) : (
//             <>
//                 <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
//                 <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
//             </>
//         )
//     }
//     </Stack.Navigator>
//   )
// }

// export default ScreenMenu





























import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/authContext';
import Login from '../../screen/auth/Login';
import Register from '../../screen/auth/Register';
import Home from '../../screen/Home';
import Search from '../../screen/Search';
import Magic from '../../screen/Magic';
import All from '../Search/All';
import UploadImage from '../Search/UploadImage';
import Generate from '../../screen/Generate';
import UseCamera from '../../screen/UseCamera';
import SplashScreen from '../../screen/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const ScreenMenu = () => {
    const [state] = useContext(AuthContext);
    const [initialLoad, setInitialLoad] = useState(true);

    const authenticatedUser = state?.user && state?.token;

    useEffect(() => {
        // Check if the app is being launched for the first time
        const checkInitialLoad = async () => {
            const splashScreenShown = await AsyncStorage.getItem('@splashScreenShown');
            if (!splashScreenShown) {
                await AsyncStorage.setItem('@splashScreenShown', 'true');
            } else {
                setInitialLoad(false);
            }
        };
        checkInitialLoad();
    }, []);

    return (
        <Stack.Navigator initialRouteName={initialLoad ? 'Splash' : (authenticatedUser ? 'Home' : 'Login')}>
            {initialLoad && (
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
            )}
            {authenticatedUser ? (
                <>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                    <Stack.Screen name="Magic" component={Magic} options={{ headerShown: false }} />
                    <Stack.Screen name="All" component={All} options={{ headerShown: false }} />
                    <Stack.Screen name="UploadImage" component={UploadImage} options={{ headerShown: false }} />
                    <Stack.Screen name="Generate" component={Generate} options={{ headerShown: false }} />
                    <Stack.Screen name="UseCamera" component={UseCamera} options={{ headerShown: false }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default ScreenMenu;