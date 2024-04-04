import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import UniPopup from './components/pop';
import AddInput from './components/add';
import NavBar from './components/navBar';
import UploudImages from './components/uploadImg';

export default function CardPublish() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [showPopup, setShowPopup] = useState(true); // 控制遮罩显示状态


    const handlePublish = () => {
        if (title === '' || content === '' || images.length === 0) {
            Alert.alert('Incomplete Information', 'Please fill all the fields and upload at least one image.');
        } else {
            // Perform publishing action, e.g., send data to server
            Alert.alert('Published', 'Your post has been successfully published.');
            // Reset form fields
            setTitle('');
            setContent('');
            setImages([]);
        }
    };
    const hidePopup = () => {
        setShowPopup(false);
    };
    return (
        <View style={styles.container}>
            <AddInput onSubmit={handlePublish} setImageList={setImages} />
            <UniPopup show={showPopup} onHidePopup={hidePopup} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
