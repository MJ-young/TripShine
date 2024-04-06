// AddInput.jsx
import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import UniNavBar from './navBar';
import UploudImages from './uploadImg';


const AddInput = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageList, setImageList] = useState([]);

    const handlePublish = () => {
        onSubmit({ title, content, imageList });
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <UniNavBar rightText="发布" />
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="请输入标题~"
                    value={title}
                    onChangeText={setTitle}
                    onFocus={() => { }}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="请输入内容~"
                    multiline={true}
                    value={content}
                    onChangeText={setContent}
                    onFocus={() => { }}
                />
                <UploudImages uploud={setImageList} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        marginVertical: 5,
        borderRadius: 5,
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        backgroundColor: 'transparent', // Make input transparent
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top', // Align text at the top
        backgroundColor: 'transparent', // Make textarea transparent
    },
});

export default AddInput;
