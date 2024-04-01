import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import icon_share from "@/assets/share.png";

const CardDetail = ({ route }) => {
  console.log(route);
  const { title, content, authorName, authorAvatar, images, createdAt } =
    route.params;

  const handleShare = () => {
    // 在此处添加分享逻辑
    console.log("分享功能待实现");
  };
  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.swiper}
          loop={false}
          showsPagination={true}
          dotColor={"#CCCCCC"}
          activeDotColor={"green"}
          paginationStyle={styles.paginationStyle}
          showsButtons
        >
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: authorAvatar }} style={styles.avatar} />
          <View style={styles.authorTextContainer}>
            <Text style={styles.authorName}>{authorName}</Text>
            <Text style={styles.createdAt}>{createdAt}</Text>
          </View>
          <TouchableOpacity onPress={handleShare}>
            <Image source={icon_share} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  swiperContainer: {
    flex: 1,
  },
  swiper: {
    flex: 1,
  },
  paginationStyle: {
    bottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 10,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorTextContainer: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 12,
    color: "#999999",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  shareIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

export default CardDetail;
