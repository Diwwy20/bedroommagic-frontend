import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { usePhotoContext } from '../context/photoContext';
import FooterMenu from '../components/Menus/FooterMenu';
import DropDownPicker from 'react-native-dropdown-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { readFile } from 'react-native-fs';
import Toast from 'react-native-toast-message';
import { Chase } from 'react-native-animated-spinkit'

const { width, height } = Dimensions.get('window');

const Magic = ({ navigation }) => {
    const [generatedImages, setGeneratedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { photoData, setPhotoData } = usePhotoContext();
    const [imageUrl, setImageUrl] = useState(photoData?.imageSource || null);
    const [base64, setBase64] = useState(photoData?.base64 || null);
    const [styleOpen, setStyleOpen] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState(null);

    useEffect(() => {
        if (photoData?.imageSource) {
            setImageUrl(photoData.imageSource);
        }
        if (photoData?.base64) {
            setBase64(photoData.base64);
        }
    }, [photoData]);

    const styleOptions = [
        { label: 'Minimal Style', value: 'minimal' },
        { label: 'Modern Style', value: 'modern' },
        { label: 'Classic Style', value: 'classic' },
        { label: 'Scandinavian Style', value: 'scandinavian' },
        { label: 'Vintage Style', value: 'vintage' },
    ];

    const handleGenerateImage = async () => {
        
        if (!base64) {
            Toast.show({
                type: 'error',
                text1: 'No Image Uploaded',
                text2: 'Please upload an image before generating.',
                position: 'top',
            });
            return;
        }

        if (!selectedStyle) {
            Toast.show({
                type: 'error',
                text1: 'Style Not Selected',
                text2: 'Please select a style before generating.',
                position: 'top',
            });
            return;
        }

        if (selectedStyle && base64) {
            try {
                setIsLoading(true);
                const response = await axios.post('/upload/generate', {
                    base64: base64,
                    style: selectedStyle,
                });

                setIsLoading(false);
                console.log('Upload Success: ', response.data);
                setGeneratedImages(response.data.generatedImages);

                Toast.show({
                    type: 'success',
                    text1: 'Generate Successful',
                    text2: 'The image has been successfully generated.',
                    position: 'top',
                });

                navigation.navigate('Generate', {
                    style: selectedStyle,
                    generatedImages: response.data.generatedImages,
                    headerText: 'Result of AI'
                });
            } catch (error) {
                setIsLoading(false);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'An error occurred while generating the image.',
                    position: 'top',
                });
                console.error('Upload Error: ', error);
            }
        }
    };

    const handleImageClick = async () => {
        if (!imageUrl) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'No Image Uploaded',
                text2: 'Please upload an image before cropping.',
              });
            return;
        }

        ImageCropPicker.openCropper({
            path: imageUrl,
            cropping: true
        }).then(async (image) => {
            const croppedUri = image.path;
            setImageUrl(croppedUri);
            try {
                // Read cropped image as base64
                const base64Data = await readFile(croppedUri, 'base64');
                setBase64(base64Data);
                // Update context data
                setPhotoData({ imageSource: croppedUri, base64: base64Data });

                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Image Cropped',
                    text2: 'The image has been cropped successfully.',
                  });
            } catch (error) {
                console.error('Error reading cropped image:', error);
            }
        }).catch(error => {
            console.error('Image crop error:', error);
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View>
                    <View style={styles.layoutTitle}>
                        <Text style={styles.title}>สร้างสรรค์ห้องนอนในฝันด้วย AI</Text>
                    </View>

                    <View style={styles.distanceImage}>
                        <TouchableOpacity onPress={handleImageClick} disabled={isLoading}>
                            <Image 
                                source={{ uri: imageUrl || '' }} 
                                style={[styles.setImage, !imageUrl && styles.defaultImageBorder]} 
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={styleOpen}
                            value={selectedStyle}
                            items={styleOptions}
                            setOpen={setStyleOpen}
                            setValue={setSelectedStyle}
                            placeholder="Select Style"
                            containerStyle={styles.dropdownContainerStyle}
                            style={styles.dropdown}
                            dropDownStyle={styles.dropdown}
                            textStyle={styles.dropdownText}
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.photo} 
                        onPress={() => navigation.navigate('UseCamera', { showCamera: true })}
                    >
                        <Text style={[styles.photoText, styles.shadowText]}>Take a Photo</Text>
                        <FontAwesome5 name='camera' size={32} style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.generated} 
                        onPress={handleGenerateImage}
                    >
                        <Text style={styles.generateText}>Generate</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <FooterMenu />
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <Chase size={70} color='#592804' />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 30,
    },
    layoutTitle: {
        marginVertical: 25,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    distanceImage: {
        alignItems: 'center',
        marginVertical: 10,
    },
    setImage: {
        width: width * 0.8,
        height: height * 0.4,
        resizeMode: 'contain',
    },
    defaultImageBorder: {
        borderWidth: 2,
        borderColor: '#592804',
    },
    dropdownContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    dropdownContainerStyle: {
        width: width * 0.8,
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderColor: '#592804',
        borderWidth: 2,
        borderRadius: 30,
    },
    dropdownText: {
        fontSize: 22,
        color: '#592804',
        fontWeight: 'bold',
    },
    disabledDropdown: {
        backgroundColor: '#e0e0e0',
        borderColor: '#b0b0b0',
    },
    photo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.8,
        height: height * 0.07,
        borderWidth: 5,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 15,
    },
    photoText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    generated: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: width * 0.8,
        height: height * 0.09,
        borderWidth: 5,
        alignSelf: 'center',
        backgroundColor: '#592804',
        marginVertical: 10,
        borderRadius: 15,
    },
    generateText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    icon: {
        color: '#592804',
        paddingLeft: 10,
    },
    disabledButton: {
        backgroundColor: '#b0b0b0',
        borderColor: '#a0a0a0',
    },
    shadowText: {
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    loadingContainer: {
        // backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
});

export default Magic;