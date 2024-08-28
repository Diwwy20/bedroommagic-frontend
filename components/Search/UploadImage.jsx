import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { usePhotoContext } from '../../context/photoContext';
import ImageCropPicker from 'react-native-image-crop-picker';
import { readFile } from 'react-native-fs';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const UploadImage = ({ isLoading, setIsLoading }) => {
  const navigation = useNavigation();
  const { photoData, setPhotoData } = usePhotoContext();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [imageUrl, setImageUrl] = useState(photoData?.imageSource || null);
  const [base64, setBase64] = useState(photoData?.base64 || null);
  const [styleOpen, setStyleOpen] = useState(false);

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

  const handleSearchImage = async () => {
    if (!base64) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Image Upload Required',
        text2: 'Please upload an image before clicking Generate.',
      });
      return;
    }

    if (!selectedStyle) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Style Selection Required',
        text2: 'Please select a style before clicking Generate.',
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post('/upload/cbir', {
        base64: base64,
        style: selectedStyle,
      });

      setIsLoading(false);
      console.log("CBIR Response: ", response.data.similarImages);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Retrieval Successful',
        text2: 'The retrieval of similar images was successful.',
      });

      navigation.navigate('Generate', {
        style: selectedStyle,
        generatedImages: response.data.similarImages,
        headerText: 'Result of CBIR'
      });
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'An error occurred during the search.',
      });
      console.error('Upload Error: ', error);
    }
  };

  const handleImageClick = () => {
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
        const base64Data = await readFile(croppedUri, 'base64');
        setBase64(base64Data);
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
    <View style={styles.view}>
      <View style={styles.layoutBtn}>
        <DropDownPicker
          open={styleOpen}
          value={selectedStyle}
          items={styleOptions}
          setOpen={setStyleOpen}
          setValue={setSelectedStyle}
          placeholder="Select Style"
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownStyle={styles.dropdown}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownPlaceholder}
          labelStyle={styles.dropdownLabel}
          dropDownContainerStyle={styles.dropdownContainer}
          itemStyle={styles.dropdownItem}
        />
        <TouchableOpacity
          style={[styles.btn, styles.flex, styles.btnSecond]}
          onPress={() => navigation.navigate('UseCamera', { showCamera: true })}
        >
          <View style={styles.textContainer}>
            <Text style={styles.setSizeText}>Take a photo</Text>
            <FontAwesome5 name='camera' size={36} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.distanceImage}>
        <TouchableOpacity onPress={handleImageClick}>
          <Image source={{ uri: imageUrl }} style={[styles.setImage, imageUrl ? null : styles.setImageBorder]} />
        </TouchableOpacity>
      </View>

      <View style={styles.btnSearchContainer}>
        <TouchableOpacity style={styles.btnSearch} onPress={handleSearchImage}>
          <Text style={styles.searchText}>ค้นหา</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginVertical: 60,
    marginHorizontal: 20
  },
  layoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#592804'
  },
  btnSecond: {
    marginLeft: 30
  },
  setSizeText: {
    fontSize: 17,
    color: '#592804',
    fontWeight: 'bold'
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  textContainer: {
    position: 'relative',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#592804',
    position: 'absolute',
    top: -35,
    right: 0,
    backgroundColor: '#fff'
  },
  distanceImage: {
    marginTop: 20,
    alignItems: 'center'
  },
  setImage: {
    width: width * 0.9,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  setImageBorder: {
    borderWidth: 2,
    borderColor: '#592804',
  },
  btnSearchContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginVertical: height * 0.03
  },
  btnSearch: {
    padding: 12,
    backgroundColor: '#592804',
    alignItems: 'center',
    borderRadius: 50,
    width: 150,
  },
  searchText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  selectedStyleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  selectedStyleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: width * 0.4,
    alignSelf: 'center'
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#592804',
    borderWidth: 2,
    borderRadius: 30
  },
  dropdownText: {
    fontSize: 16,
    color: '#592804',
    fontWeight: 'bold'
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#592804'
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#592804'
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 8
  },
});

export default UploadImage;