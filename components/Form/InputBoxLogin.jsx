import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const InputBox = ({
    inputTitle,
    placeholder,
    autoComplete,
    keyboardType,
    size,
    secureTextEntry = false,
    value,
    setValue
}) => {
    const iconSize = parseInt(size, 10);
    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <FontAwesome5 name={inputTitle} size={iconSize} style={styles.icon} />
                <TextInput
                    style={styles.textInputBox}
                    placeholderTextColor="#592804"
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    autoCompleteType={autoComplete}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(text) => setValue(text)} 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 35,
        marginRight: 35,
    },
    inputBox: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#592804',
        marginTop: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    setColorText: {
        color: '#592804'
    },
    textInputBox: {
        flex: 1,
        height: 45,
        fontSize: 20,
        marginLeft: 5,
    },
    icon: {
        borderRightWidth: 2,
        borderRightColor: '#592804',
        paddingRight: 10,
        paddingVertical: 10,
        paddingLeft: 10
    }
});

export default InputBox;
