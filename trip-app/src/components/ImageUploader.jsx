// ImageUploader.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Popconfirm, Button, message } from "antd";
import { uploadImage } from "@/utils/upload";

const ImageUploader = ({ images, setImages }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      const imgData = result.assets[0];
      const url = await uploadImage(imgData.uri, imgData.fileName);
      setImages([...images, url]);
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
              onClick={() => deleteImage(index)}
              style={styles.deleteButton}
            >
              X
            </Button>
          </View>
        ))}
        {images.length < 9 && (
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
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
    // width: "33%",
    // height: "33%",
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
    borderRadius: 5,
    padding: 5,
    zIndex: 1,
    color: "#fff",
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
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
});
