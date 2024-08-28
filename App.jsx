import { LogBox } from 'react-native'; // Import LogBox

// Ignore specific warnings
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './navigation'
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootNavigation />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </>
    
    
  );
}

// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import React from 'react';
// import RNFetchBlob from 'rn-fetch-blob';

// const App = () => {

//   const image_URL = "https://media.istockphoto.com/id/1390233984/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%AB%E0%B8%A3%E0%B8%B9%E0%B8%AB%E0%B8%A3%E0%B8%B2%E0%B8%97%E0%B8%B1%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=8_SIQ7W0OlbCEbwZR3C1l9pHwTTsOi7g36kevXbpCkg=";

//   const downloadImage = (imageURL) => {
//     let date = new Date();
//     let ext = getExtension(imageURL);
//     ext = '.' + ext[0];
//     const { config, fs } = RNFetchBlob;
//     let PictureDir = fs.dirs.PictureDir;
//     let options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
//         description: 'Image'
//       }
//     };
//     config(options)
//       .fetch('GET', imageURL)
//       .then(res => {
//         console.log('res -> ', JSON.stringify(res));
//         Alert.alert('Download Complete', 'Image downloaded successfully.');
//       })
//       .catch(error => {
//         console.log('error -> ', JSON.stringify(error));
//         Alert.alert('Download Failed', 'An error occurred while downloading the image.');
//       });
//   }

//   const getExtension = filename => {
//     return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => downloadImage(image_URL)}>
//         <Text style={styles.buttonText}>Download</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 20,
//     color: 'blue',
//   },
// });

// export default App;