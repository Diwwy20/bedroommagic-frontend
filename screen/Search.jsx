import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu';
import UploadImage from '../components/Search/UploadImage';
import All from '../components/Search/All';
import { Chase } from 'react-native-animated-spinkit'

const Search = ({ route }) => {
  const [selectedButton, setSelectedButton] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params?.initialButton) {
      setSelectedButton(route.params.initialButton);
    }
  }, [route.params?.initialButton]);

  const handleButtonPress = (buttonName) => {
    if (buttonName !== selectedButton) {
      setSelectedButton(buttonName);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <View style={styles.layoutTitle}>
            <Text style={styles.title}>ค้นหาห้องนอนในฝันของคุณ</Text>
          </View>
          <View style={styles.heading}>
            <TouchableOpacity
              style={[styles.button, selectedButton === 'All' && styles.selectedButton]}
              onPress={() => handleButtonPress('All')}
            >
              <Text style={styles.setContentHeading}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedButton === 'Search' && styles.selectedButton]}
              onPress={() => handleButtonPress('Search')}
            >
              <Text style={styles.setContentHeading}>Search by image</Text>
            </TouchableOpacity>
          </View>
          <View>
            {selectedButton === 'All' ? (
              <All />
            ) : selectedButton === 'Search' ? (
              <UploadImage isLoading={isLoading} setIsLoading={setIsLoading} />
            ) : (
              <Text>Component not found</Text>
            )}
          </View>
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
  },
  scrollView: {
    flexGrow: 1,
  },
  layoutTitle: {
    marginVertical: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  setContentHeading: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  button: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: '#592804',
  },
  selectedButton: {
    borderBottomWidth: 5,
    borderBottomColor: '#592804',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default Search;
