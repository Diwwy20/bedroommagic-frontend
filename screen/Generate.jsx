import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import React from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAweSome5 from 'react-native-vector-icons/AntDesign';
import HeaderMenu from '../components/Menus/HeaderMenu';
import RNFetchBlob from 'rn-fetch-blob';
import ImageModal from 'react-native-image-modal';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const Generate = ({ route }) => {

    const { style, generatedImages, headerText } = route.params;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const checkPermission = async (imageURL) => {
        if (Platform.OS === 'ios') {
            downloadImage(imageURL)
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to download Photos'
                    }
                )
                if (granted === "granted" || granted === "never_ask_again") {
                    // console.log('Storage Permission Granted.');
                    downloadImage(imageURL);
                } else {
                    // alert('Storage Permission Not Granted');
                }
            } catch (error) {
                console.warn(error);
            }
        }
    }

    const downloadImage = (imageURL) => {
        let date = new Date();
        let ext = getExtension(imageURL);
        ext = '.' + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Image'
            }
        };
        config(options)
            .fetch('GET', imageURL)
            .then(res => {
                console.log('res -> ', JSON.stringify(res));
                // Alert.alert('Download Complete', 'Image downloaded successfully.');
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Download Complete',
                    text2: 'Image downloaded successfully.',
                });
            })
            .catch(error => {
                console.log('error -> ', JSON.stringify(error));
                // Alert.alert('Download Failed', 'An error occurred while downloading the image.');
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Download Failed',
                    text2: 'An error occurred while downloading the image.',
                });
            });
    }

    const getExtension = filename => {
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    }

    return (
        <View style={styles.container}>
            <HeaderMenu
                headerText={headerText}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>

                <View style={styles.header}>
                    <Text style={styles.headerLineFirst}>สไตล์ที่เลือก : {capitalizeFirstLetter(style)}</Text>
                    <Text style={styles.headerLineSecond}>แสดงผลลัพธ์ {generatedImages.length} รูปภาพ</Text>
                </View>

                {generatedImages.map((image, index) => (
                    <View style={styles.distanceImage} key={index}>
                        <View style={styles.imageContainer}>
                            <ImageModal
                                resizeMode="cover"
                                modalImageResizeMode="contain"
                                modalImageBackgroundColor="#000000"
                                style={styles.setImage}
                                source={{ uri: image.url }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.setText}>รูปภาพที่ {index + 1}</Text>
                            <TouchableOpacity style={[styles.btnSave]} onPress={() => checkPermission(image)}>
                                <Text style={styles.btnText}>SAVE</Text>
                                <FontAweSome5 name='download' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View style={styles.setMarginBottom}></View>

            </ScrollView>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingVertical: 50
    },
    distanceImage: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 15
    },
    imageContainer: {
        flex: 1.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 50
    },
    setImage: {
        width: 200,
        height: 200,
        backgroundColor: '#ffffff',
        resizeMode: 'cover',
    },
    header: {
        marginBottom: 20
    },
    headerLineFirst: {
        fontSize: 22,
        fontWeight: '600'
    },
    headerLineSecond: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10
    },
    setText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 15
    },
    btnSave: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginTop: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
        backgroundColor: 'white'
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 8
    },
    setMarginBottom: {
        marginBottom: 30
    }
});

export default Generate;