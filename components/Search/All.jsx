import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';

const All = () => {
  return (
    <View style={styles.view}>

      <View style={styles.container}>
        <View style={styles.leftContent}>
          <Image style={styles.image} source={require('../../assets/bedroom/minimal/1.jpg')} />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.text}>สไตล์มินิมอล          ( Minimal Style )</Text>
          <View style={styles.imagesContainer}>
            <Image style={[styles.smallImage, styles.firstImage]} source={require('../../assets/bedroom/minimal/6.jpg')} />
            <Image style={[styles.smallImage, styles.secondImage]} source={require('../../assets/bedroom/minimal/61.jpg')} />
            <Image style={[styles.smallImage, styles.thirdImage]} source={require('../../assets/bedroom/minimal/84.jpg')} />
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.leftContent}>
          <Image style={styles.image} source={require('../../assets/bedroom/classic/102.jpg')} />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.text}>สไตล์คลาสสิก              ( Classic Style )</Text>
          <View style={styles.imagesContainer}>
            <Image style={[styles.smallImage, styles.firstImage]} source={require('../../assets/bedroom/classic/12.jpg')} />
            <Image style={[styles.smallImage, styles.secondImage]} source={require('../../assets/bedroom/classic/19.jpg')} />
            <Image style={[styles.smallImage, styles.thirdImage]} source={require('../../assets/bedroom/classic/20.jpg')} />
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.leftContent}>
          <Image style={styles.image} source={require('../../assets/bedroom/scandinavian/2.jpg')} />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.text}>สไตล์สแกนดิเวียน ( Scandinavian Style )</Text>
          <View style={styles.imagesContainer}>
            <Image style={[styles.smallImage, styles.firstImage]} source={require('../../assets/bedroom/scandinavian/5.jpg')} />
            <Image style={[styles.smallImage, styles.secondImage]} source={require('../../assets/bedroom/scandinavian/13.jpg')} />
            <Image style={[styles.smallImage, styles.thirdImage]} source={require('../../assets/bedroom/scandinavian/17.jpg')} />
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.leftContent}>
          <Image style={styles.image} source={require('../../assets/bedroom/modern/4.jpg')} />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.text}>สไตล์โมเดิร์น               ( Modern Style )</Text>
          <View style={styles.imagesContainer}>
            <Image style={[styles.smallImage, styles.firstImage]} source={require('../../assets/bedroom/modern/5.jpg')} />
            <Image style={[styles.smallImage, styles.secondImage]} source={require('../../assets/bedroom/modern/11.jpg')} />
            <Image style={[styles.smallImage, styles.thirdImage]} source={require('../../assets/bedroom/modern/12.jpg')} />
          </View>
        </View>
      </View>

      <View style={[styles.container, { marginBottom: 60}]}>
        <View style={styles.leftContent}>
          <Image style={styles.image} source={require('../../assets/bedroom/vintage/26.jpg')} />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.text}>สไตล์วินเทจ            ( Vintage Style )</Text>
          <View style={styles.imagesContainer}>
            <Image style={[styles.smallImage, styles.firstImage]} source={require('../../assets/bedroom/vintage/29.jpg')} />
            <Image style={[styles.smallImage, styles.secondImage]} source={require('../../assets/bedroom/vintage/33.jpg')} />
            <Image style={[styles.smallImage, styles.thirdImage]} source={require('../../assets/bedroom/vintage/35.jpg')} />
          </View>
        </View>
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  view: {
    marginVertical: 30
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 12,
  },
  leftContent: {
    marginRight: 14,
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 70,
    marginHorizontal: 12
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  smallImage: {
    resizeMode: 'cover',
    position: 'absolute',
  },
  firstImage: {
    zIndex: 3,
    left: 0,
    width: 80,
    height: 100
  },
  secondImage: {
    zIndex: 2,
    left: '25%',
    width: 80,
    height: 90,
    marginTop: 5
  },
  thirdImage: {
    zIndex: 1,
    left: '50%',
    width: 80,
    height: 80,
    marginTop: 10
  },
});

export default All;
