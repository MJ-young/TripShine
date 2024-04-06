import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import UniPopup from './components/pop';
import AddInput from './components/add';

export default function CardPublish({ route }) {
    console.log(route);
    const { title = '', content = '', images = [] } = route.params || {};

    const [showPopup, setShowPopup] = useState(true); // 控制遮罩显示状态


    const handlePublish = () => {
        if (title === '' || content === '' || images.length === 0) {
            Alert.alert('Incomplete Information', 'Please fill all the fields and upload at least one image.');
        } else {
            Alert.alert('Published', 'Your post has been successfully published.');
        }
    };
    const hidePopup = () => {
        setShowPopup(false);
    };
    return (
        <View style={styles.container}>
            <AddInput
                onSubmit={handlePublish}
                title={title}
                content={content}
                images={images}
            />
            <UniPopup show={showPopup} onHidePopup={hidePopup} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
