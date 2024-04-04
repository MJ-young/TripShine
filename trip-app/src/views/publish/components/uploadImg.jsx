import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'

const UploudImages = ({ uploud }) => {
    const [imageList, setImageList] = useState([]);

    const chooseImage = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri;
                const newImageList = [...imageList, uri];
                setImageList(newImageList);
                uploud(newImageList);
            }
        });
    };

    const deleteImage = (index) => {
        Alert.alert(
            "提示",
            "是否要删除该图片",
            [
                {
                    text: "取消",
                    style: "cancel",
                },
                {
                    text: "确定",
                    onPress: () => {
                        const newList = [...imageList];
                        newList.splice(index, 1);
                        setImageList(newList);
                        uploud(newList);
                    },
                },
            ]
        );
    };

    return (
        <View>
            <Text style={styles.text}>点击可预览选好的图片</Text>
            <Text style={styles.text}>{imageList.length}/9</Text>
            <View style={styles.imageContainer}>
                {imageList.map((image, index) => (
                    <View key={index} style={styles.imageItem}>
                        <TouchableOpacity onPress={() => deleteImage(index)}>
                            <Text style={styles.deleteButton}>删除</Text>
                        </TouchableOpacity>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                ))}
                <TouchableOpacity onPress={chooseImage} style={styles.addImageButton}>
                    <Text style={styles.addImageText} type="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple >选择图片</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageItem: {
        margin: 5,
    },
    image: {
        width: 100,
        height: 100,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
    },
    addImageButton: {
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addImageText: {
        fontSize: 16,
        color: '#333',
    },
});

export default UploudImages;
