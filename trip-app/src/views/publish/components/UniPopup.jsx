import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

export default function UniPopup({ show, onHidePopup }) {
    const hide = () => {
        onHidePopup();
    };

    return (
        <View>
            {show && (
                <TouchableOpacity style={styles.mask} onPress={hide}>
                    <View style={styles.popup}>
                        {/* <Text>{msg}</Text> */}
                        {/* Render additional content here */}
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../assets/warn.png')} style={styles.image} resizeMode="contain" />
                        </View>
                        {/* <Image source={require('../../assets/warn.png')} style={styles.image} resizeMode="contain" /> */}
                        <View style={styles.info}>
                            <Text>1.涉及黄色，政治，广告及骚扰信息</Text>
                            <Text>2.涉及黄色，政治，广告及骚扰信息</Text>
                            <Text>3.涉及黄色，政治，广告及骚扰信息</Text>
                            <Text>4.涉及黄色，政治，广告及骚扰信息</Text>
                        </View>
                        <Button title="俺晓得了" onPress={hide} color="#dc630c" />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mask: {
        position: 'fixed',
        zIndex: 999,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    info: {
        marginBottom: 10,
    },
});
