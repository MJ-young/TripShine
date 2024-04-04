// UniNavBar.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';

const UniNavBar = ({ rightText }) => {
    const [privacy, setPrivacy] = useState('所有人可见');

    const onClickRight = () => {
        console.log(111222);;
    };
    return (
        <View style={styles.navBar}>
            <View style={styles.privacyContainer}>
                <Picker
                    selectedValue={privacy}
                    style={styles.picker}
                    onValueChange={(itemValue) => setPrivacy(itemValue)}
                >
                    <Picker.Item label="所有人可见" value="所有人可见" />
                    <Picker.Item label="仅自己可见" value="仅自己可见" />
                </Picker>
                <TouchableOpacity onPress={onClickRight} style={styles.button}>
                    <Text style={styles.buttonText}>{rightText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    privacyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picker: {
        width: 150, // Adjust width as needed
    },
    button: {
        padding: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
});

export default UniNavBar;
