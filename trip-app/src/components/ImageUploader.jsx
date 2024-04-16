import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import { uploadImage, uploadImageByUri } from "@/utils/upload";

const ImageUploader = ({ images, setImages }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const imgData = result.assets[0];
      console.log("uploader imgData:", imgData);
      let localUri = imgData.uri;
      const parts = localUri.match(/^data:(.+);base64,(.+)$/);
      if (parts) {
        const weburl = await uploadImage(
          localUri,
          imgData.fileName,
          imgData.mimeType
        );
        console.log("weburl:", weburl);
        setImages([...images, weburl]);
      } else {
        const url = await uploadImageByUri(localUri);
        console.log("url:", url);
        setImages([...images, url]);
      }
    }
  };

  const handlePreview = (image) => {
    setPreviewImage(image);
    setModalVisible(true);
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <Provider>
      <View>
        <Text style={styles.text}>点击可预览选择的图片</Text>
        <Text style={styles.text}>{images.length}/9</Text>
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageItem}>
              <TouchableOpacity onPress={() => handlePreview(image)}>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Button
                icon="close"
                size={20}
                style={styles.deleteButton}
                onPress={() => deleteImage(index)}
                color="#fff"
              />
            </View>
          ))}
          {images.length < 9 && (
            <TouchableOpacity
              onPress={chooseImage}
              style={styles.addImageButton}
            >
              <Text style={styles.addImageText}>选择图片</Text>
            </TouchableOpacity>
          )}
        </View>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Image source={{ uri: previewImage }} style={styles.previewImage} />
            <Button
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              关闭
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageItem: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 0,
    zIndex: 1,
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  addImageText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  previewImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 10,
  },
});
