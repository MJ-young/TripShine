import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity, Text, Picker, Modal } from 'react-native';
import { Button, message, Popconfirm, Upload } from 'antd';
import * as ImagePicker from 'expo-image-picker';

import UniPopup from './components/UniPopup';
import { addTripsUSer } from "../../api/statusTrip";



export default function CardPublish({ route }) {
    const [messageApi, contextHolder] = message.useMessage();

    const [titleValue, setTitleValue] = useState('');
    const [contentValue, setContentValue] = useState('');
    const [imageList, setImageList] = useState([]);

    const [previewImage, setPreviewImage] = useState(null); //预览图片
    const [modalVisible, setModalVisible] = useState(false); //预览框

    const [showPopup, setShowPopup] = useState(true); // 控制遮罩显示状态

    useEffect(() => {
        // 清空上一次保存的数据
        setTitleValue('');
        setContentValue('');
        setImageList([]);
        // 根据新传入的参数填充数据
        const { title, content, images } = route.params || {};
        setTitleValue(title);
        setContentValue(content);
        setImageList(images);
    }, [route.params]);

    const handleTitleChange = (text) => {
        setTitleValue(text);
    };

    const handleContentChange = (text) => {
        setContentValue(text);
    };

    const handlePublish = async () => {
        try {
            if (titleValue === '' && contentValue === '' && imageList.length === 0) {
                messageApi.info('请输入标题、内容和至少一张图片');
                return;
            }
            console.log("1111:", titleValue);
            console.log("2222:", contentValue);
            console.log("3333:", imageList);
            const data = {
                title: titleValue,
                content: contentValue,
                userId: 1,
                username: "mj",
                avatar: "http://dummyimage.com/100x100",
                // images: [],
            }
            // const formData = new FormData();
            // formData.append('title', titleValue);
            // formData.append('content', contentValue);
            imageList.forEach((image, index) => {
                // 将 file:// URI 转换为 Blob 对象
                const uriParts = image.split('.');
                const fileType = uriParts[uriParts.length - 1];
                const formDataImage = {
                    uri: image,
                    name: `image_${index}.${fileType}`,
                    type: `image/${fileType}`,
                };
                data["images"] = formDataImage;
                // data.append(`images[]`, formDataImage);
            });
            // console.log("4444:", formData);
            await addTripsUSer(data);
            messageApi.success('发布成功');
            // 后面仍会有一些操作
        } catch (error) {
            console.error('发布失败:', error);
            messageApi.error('发布失败，请稍后再试');
        }
        // }
    };
    const hidePopup = () => {
        setShowPopup(false);
    };

    const renderNavBar = () => {
        const [privacy, setPrivacy] = useState('所有人可见');

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
                backgroundColor: "#ff2741",
                color: "#fff"
            },
        });

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
                    {contextHolder}
                    <Button onClick={handlePublish} style={styles.button}>发布</Button>

                </View>
            </View>)
    };

    const renderImages = (images) => {


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
                position: 'relative',
                margin: 5,
            },
            image: {
                width: 100,
                height: 100,
            },
            deleteButton: {
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 5,
                padding: 5,
                zIndex: 1,
                color: '#fff',
            },
            addImageButton: {
                width: 100,
                height: 100,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                borderRadius: 5,
            },
            addImageText: {
                fontSize: 16,
                color: '#333',
            },
            modalContainer: {
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                justifyContent: 'center',
                alignItems: 'center',
            },
            previewImage: {
                width: '80%',
                height: '80%',
                resizeMode: 'contain',
            },
            closeButton: {
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
            },
            closeButtonText: {
                fontSize: 16,
            },
        });

        useEffect(() => {
            if (images) {
                setImageList(images);
            }
        }, [images]);

        const chooseImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) {
                setImageList([...imageList, result.assets[0].uri]); // 将新选择的图片URI添加到现有列表中
            }
        };
        const confirm = (index) => {
            const updatedImageList = [...imageList];
            updatedImageList.splice(index, 1); // Remove the image at the specified index
            setImageList(updatedImageList);

        };
        const cancel = (e) => {
            console.log(e);
            message.error('已取消');
        };
        const handlePreview = (image) => {
            setPreviewImage(image);
            setModalVisible(true);
        };
        return (
            <View>
                <Text style={styles.text}>点击可预览选好的图片</Text>
                <Text style={styles.text}>{imageList.length}/9</Text>
                <View style={styles.imageContainer}>
                    {imageList.map((image, index) => (
                        <View key={index} style={styles.imageItem}>
                            <Popconfirm
                                title="提示"
                                description="是否删除该图片?"
                                onConfirm={() => confirm(index)}            //将选中的图片index传过去，删除imageList[index]
                                onCancel={cancel}
                                okText="是"
                                cancelText="否"
                            >
                                <Button style={styles.deleteButton} >删除</Button>
                            </Popconfirm>

                            <TouchableOpacity onPress={() => handlePreview(image)}>
                                <Image source={{ uri: image }} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {imageList.length < 9 && (
                        <TouchableOpacity onPress={chooseImage} style={styles.addImageButton}>
                            <Text style={styles.addImageText}>选择图片</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: previewImage }} style={styles.previewImage} />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    };


    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                {renderNavBar()}

                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入标题~"
                        value={titleValue}
                        onChangeText={handleTitleChange}
                        onFocus={() => { }}
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="请输入内容~"
                        multiline={true}
                        value={contentValue}
                        onChangeText={handleContentChange}
                        onFocus={() => { }}
                    />
                    {renderImages(imageList)}
                </View>

            </ScrollView>
            <UniPopup show={showPopup} onHidePopup={hidePopup} />
        </View>
    );
}

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

