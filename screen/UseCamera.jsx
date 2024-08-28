// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Alert } from 'react-native';
// import { Camera, useCameraDevice } from 'react-native-vision-camera';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
// import { readFile } from 'react-native-fs';
// import { usePhotoContext } from '../context/photoContext';

// const UseCamera = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { showCamera } = route.params || {}; // Get parameter from route
//     const { setPhotoData } = usePhotoContext();
//     const [imageSource, setImageSource] = useState('');
//     const [cameraType, setCameraType] = useState('back'); // default to back camera
//     const [showCameraState, setShowCameraState] = useState(showCamera || false); // Set initial state based on parameter
//     const [base64, setBase64] = useState('');
//     const [hasPermission, setHasPermission] = useState(false); // New state for permission
//     const camera = useRef(null);
//     const device = useCameraDevice(cameraType); // Use the selected camera type

//     useEffect(() => {
//         async function getPermission() {
//             const permission = await Camera.requestCameraPermission();
//             console.log(`Camera permission status: ${permission}`);
//             if (permission === 'granted') {
//                 setHasPermission(true); 
//             } else if(permission === 'denied'){
//                 Alert.alert(
//                     "Permission Denied",
//                     "Camera access is required to take pictures. Would you like to open settings and grant permission?",
//                     [
//                         {
//                             text: "Cancel",
//                             style: "cancel",
//                             onPress: () => navigation.goBack()
//                         },
//                         {
//                             text: "Open Settings",
//                             onPress: async () => {
//                                 navigation.goBack();
//                                 await Linking.openSettings();
//                             }
//                         }
//                     ]
//                 );
//             }
//         }
//         getPermission();
//     }, []);

//     const capturePhoto = async () => {
//         if (camera.current && device) {
//             try {
//                 const photo = await camera.current.takePhoto({});
//                 const fileUri = `file://${photo.path}`;
//                 const base64 = await readFile(photo.path, 'base64');
//                 setImageSource(fileUri);
//                 setBase64(base64);
//                 setShowCameraState(false);

//                 // Update context data image
//                 // setPhotoData({ imageSource: fileUri, base64 });

//             } catch (error) {
//                 console.error("Capture photo error:", error);
//             }
//         } else {
//             console.error("Camera reference or device is not available");
//         }
//     };

//     const openGallery = () => {
//         launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.errorCode) {
//                 console.log('ImagePicker Error: ', response.errorMessage);
//             } else {
//                 const uri = response.assets[0].uri;
//                 readFile(uri, 'base64').then((base64) => {
//                     setImageSource(uri);
//                     setBase64(base64);
//                     setShowCameraState(false);
                    
//                     // Update context data
//                     setPhotoData({ imageSource: uri, base64 });
//                 });
//             }
//         });
//     };

//     const handleUsePhoto = () => {
//         setPhotoData({ imageSource: imageSource, base64 });
//         navigation.goBack();
//     };

//     if (!hasPermission) {
//         return <Text></Text>;
//     }

//     if (device == null) {
//         return <Text>Camera not available</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             {showCameraState ? (
//                 <>
//                     <Camera
//                         ref={camera}
//                         style={StyleSheet.absoluteFill}
//                         device={device}
//                         isActive={showCameraState}
//                         photo={true}
//                         photoQualityBalance={"speed"}
//                     />
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity
//                             style={styles.galleryButton}
//                             onPress={openGallery} // Open gallery when pressed
//                         >
//                             <Text style={styles.galleryButtonText}>Gallery</Text>
//                         </TouchableOpacity>
                        
//                         <TouchableOpacity
//                             style={styles.camButton}
//                             onPress={capturePhoto}
//                         />

//                         <TouchableOpacity
//                             style={styles.switchButton}
//                             onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
//                         >
//                             <Text style={styles.switchButtonText}>Switch Camera</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </>
//             ) : (
//                 <>
//                     {imageSource !== '' ? (
//                         <Image
//                             style={styles.image}
//                             source={{ uri: imageSource }}
//                         />
//                     ) : null}

//                     <View style={styles.backButton}>
//                         <TouchableOpacity
//                             style={styles.button}
//                             onPress={() => navigation.goBack()}
//                         >
//                             <Text style={styles.buttonText}>Back</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.buttonContainer}>
//                         <View style={styles.buttons}>
//                             <TouchableOpacity
//                                 style={[styles.button, styles.retakeButton]}
//                                 onPress={() => setShowCameraState(true)}
//                             >
//                                 <Text style={styles.buttonText}>Retake</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[styles.button, styles.usePhotoButton]}
//                                 onPress={handleUsePhoto}
//                             >
//                                 <Text style={styles.buttonText}>Use Photo</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     backButton: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: 150,
//         padding: 20,
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         flexDirection: 'row', // Align items horizontally
//         justifyContent: 'space-between', // Distribute space between items
//         padding: 20,
//         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: '#77c3ec',
//         padding: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#77c3ec',
//     },
//     galleryButton: {
//         marginLeft: 20,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         padding: 10,
//         borderRadius: 10,
//     },
//     galleryButtonText: {
//         color: 'white',
//         fontWeight: '500',
//     },
//     switchButton: {
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         padding: 10,
//         borderRadius: 10,
//     },
//     switchButtonText: {
//         color: 'white',
//         fontWeight: '500',
//     },
//     camButton: {
//         height: 80,
//         width: 80,
//         borderRadius: 40,
//         backgroundColor: '#B2BEB5',
//         alignSelf: 'center',
//         borderWidth: 4,
//         borderColor: 'white',
//     },
//     buttons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     retakeButton: {
//         borderColor: '#fff',
//     },
//     usePhotoButton: {
//         backgroundColor: '#77c3ec',
//         borderColor: 'white',
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: '500',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         aspectRatio: 8 / 16,
//     },
// });

// export default UseCamera;



































import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { readFile } from 'react-native-fs';
import { usePhotoContext } from '../context/photoContext';

const UseCamera = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { showCamera } = route.params || {}; // Get parameter from route
    const { setPhotoData, clearPhotoData } = usePhotoContext();
    const [imageSource, setImageSource] = useState('');
    const [cameraType, setCameraType] = useState('back'); // default to back camera
    const [showCameraState, setShowCameraState] = useState(showCamera || false); // Set initial state based on parameter
    const [base64, setBase64] = useState('');
    const [hasPermission, setHasPermission] = useState(false); // New state for permission
    const camera = useRef(null);
    const device = useCameraDevice(cameraType); // Use the selected camera type

    useEffect(() => {
        async function getPermission() {
            const permission = await Camera.requestCameraPermission();
            console.log(`Camera permission status: ${permission}`);
            if (permission === 'granted') {
                setHasPermission(true); 
            } else if(permission === 'denied'){
                Alert.alert(
                    "Permission Denied",
                    "Camera access is required to take pictures. Would you like to open settings and grant permission?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: "Open Settings",
                            onPress: async () => {
                                navigation.goBack();
                                await Linking.openSettings();
                            }
                        }
                    ]
                );
            }
        }
        getPermission();
    }, []);

    const capturePhoto = async () => {
        if (camera.current && device) {
            try {
                const photo = await camera.current.takePhoto({});
                const fileUri = `file://${photo.path}`;
                const base64 = await readFile(photo.path, 'base64');
                setImageSource(fileUri);
                setBase64(base64);
                setShowCameraState(false);

                // Update context data image
                setPhotoData({ imageSource: fileUri, base64 });

            } catch (error) {
                console.error("Capture photo error:", error);
            }
        } else {
            console.error("Camera reference or device is not available");
        }
    };

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                readFile(uri, 'base64').then((base64) => {
                    setImageSource(uri);
                    setBase64(base64);
                    setShowCameraState(false);
                    
                    // Update context data
                    setPhotoData({ imageSource: uri, base64 });
                });
            }
        });
    };

    const handleUsePhoto = () => {
        setPhotoData({ imageSource: imageSource, base64 });
        navigation.goBack();
    };

    if (!hasPermission) {
        return <Text></Text>;
    }

    if (device == null) {
        return <Text>Camera not available</Text>;
    }

    return (
        <View style={styles.container}>
            {showCameraState ? (
                <>
                    <Camera
                        ref={camera}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={showCameraState}
                        photo={true}
                        photoQualityBalance={"speed"}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.galleryButton}
                            onPress={openGallery} // Open gallery when pressed
                        >
                            <Text style={styles.galleryButtonText}>Gallery</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={styles.camButton}
                            onPress={capturePhoto}
                        />

                        <TouchableOpacity
                            style={styles.switchButton}
                            onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
                        >
                            <Text style={styles.switchButtonText}>Switch Camera</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    {imageSource !== '' ? (
                        <Image
                            style={styles.image}
                            source={{ uri: imageSource }}
                        />
                    ) : null}

                    <View style={styles.backButton}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={[styles.button, styles.retakeButton]}
                                onPress={() => setShowCameraState(true)}
                            >
                                <Text style={styles.buttonText}>Retake</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.usePhotoButton]}
                                onPress={handleUsePhoto}
                            >
                                <Text style={styles.buttonText}>Use Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 150,
        padding: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-between', // Distribute space between items
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#77c3ec',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#77c3ec',
    },
    galleryButton: {
        marginLeft: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderRadius: 10,
    },
    galleryButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    switchButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderRadius: 10,
    },
    switchButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    camButton: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: '#B2BEB5',
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: 'white',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    retakeButton: {
        borderColor: '#fff',
    },
    usePhotoButton: {
        backgroundColor: '#77c3ec',
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 9 / 16,
    },
});

export default UseCamera;