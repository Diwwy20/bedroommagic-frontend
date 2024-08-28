import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


const HeaderMenu = ({ headerText }) => {
  

    return (
    <View style={styles.boxHeader}>
        <Text style={styles.setText}>{headerText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
      boxHeader: {
          paddingVertical: 20, 
          backgroundColor: '#592804', 
          alignItems: 'center'
      },
      setText: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: 'white'
      }
  })

export default HeaderMenu